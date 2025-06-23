
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  isLoading: boolean;
}

export const FormActions = ({ onCancel, isLoading }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancelar Atendimento
      </Button>
      <Button
        type="submit"
        disabled={isLoading}
        className="min-w-[200px]"
      >
        {isLoading ? "Finalizando..." : "Finalizar Escuta Inicial"}
      </Button>
    </div>
  );
};
