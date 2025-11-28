import { Lock } from 'lucide-react';

interface PremiumBadgeProps {
  variant?: 'small' | 'large';
}

export const PremiumBadge = ({ variant = 'small' }: PremiumBadgeProps) => {
  if (variant === 'large') {
    return (
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
        <div className="flex flex-col items-center gap-2 text-white">
          <Lock className="w-8 h-8" />
          <span className="text-sm font-semibold">Conteúdo Premium</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold z-10">
      <Lock className="w-3 h-3" />
      Premium
    </div>
  );
};