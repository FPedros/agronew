import { Lock, X, Check, Zap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const benefits = [
    'Acesso ilimitado a todas as notícias premium',
    'Conteúdo exclusivo de especialistas',
    'Relatórios e análises aprofundadas',
    'Webinars ao vivo e gravados',
    'Acesso prioritário a novos serviços',
    'Consultoria personalizada',
  ];

  const handleUpgrade = () => {
    if (!user) {
      navigate('/auth');
    } else {
      // Aqui você pode implementar a lógica de checkout/pagamento
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Upgrade para Premium
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Premium Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
              <Zap className="w-5 h-5 fill-current" />
              <span className="font-bold text-lg">Plano Premium</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-bold">R$ 49,90</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Cancele quando quiser
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">O que está incluído:</h4>
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/80">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold py-6 text-lg"
            size="lg"
          >
            {user ? 'Assinar Agora' : 'Fazer Login e Assinar'}
          </Button>

          {/* Trust Badge */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              🔒 Pagamento seguro • Cancele a qualquer momento
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};