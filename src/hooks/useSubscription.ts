import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useSubscription = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // If no subscription exists, user is on free plan
        if (error.code === 'PGRST116') {
          return { status: 'inactive', plan_type: 'free' };
        }
        throw error;
      }

      return data;
    },
    enabled: !!user,
  });
};

export const useHasPremiumAccess = () => {
  const { data: subscription } = useSubscription();
  return subscription?.status === 'active';
};