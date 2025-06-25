
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FinalizacaoAtendimentoForm } from "./FinalizacaoAtendimentoForm";

interface FinalizacaoAtendimentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  isLoading?: boolean;
}

export const FinalizacaoAtendimentoModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  isLoading 
}: FinalizacaoAtendimentoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Finalização do Atendimento</DialogTitle>
        </DialogHeader>
        <FinalizacaoAtendimentoForm
          onSave={onSave}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
