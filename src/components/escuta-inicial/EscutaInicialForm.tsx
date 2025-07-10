
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { MotivoConsultaSection } from "./MotivoConsultaSection";
import { AntropometriaSection } from "./AntropometriaSection";
import { SinaisVitaisGlicemiaSection } from "./SinaisVitaisGlicemiaSection";
import { ProcedimentosSection } from "./ProcedimentosSection";
import { ClassificacaoRiscoSection } from "./ClassificacaoRiscoSection";
import { DesfechoSection } from "./DesfechoSection";
import { FormActions } from "./FormActions";
import { useProcedimentosAutomaticos } from "./hooks/useProcedimentosAutomaticos";
import { validateEscutaInicialForm } from "./utils/FormValidation";
import { getFormDefaultValues } from "./utils/FormDefaults";

interface EscutaInicialFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const EscutaInicialForm = ({ onSubmit, onCancel, isLoading }: EscutaInicialFormProps) => {
  const { procedimentosAutomaticos, updateProcedimentosAutomaticos } = useProcedimentosAutomaticos();

  const form = useForm({
    defaultValues: getFormDefaultValues()
  });

  const handleFormSubmit = (data: any) => {
    // Validate form data
    const isValid = validateEscutaInicialForm(data, form.setError);
    if (!isValid) {
      return;
    }

    // Include automatic procedures and timestamps
    const dadosCompletos = {
      ...data,
      procedimentosAutomaticos,
      dataHoraInicio: new Date().toISOString(),
      dataHoraFim: new Date().toISOString()
    };

    onSubmit(dadosCompletos);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Motivo da Consulta */}
          <MotivoConsultaSection form={form} />

          <Separator className="my-6" />

          {/* Antropometria, Sinais Vitais e Glicemia */}
          <AntropometriaSection 
            form={form} 
            onValuesChange={updateProcedimentosAutomaticos}
          />

          <Separator className="my-6" />

          {/* Procedimentos */}
          <ProcedimentosSection 
            form={form}
            procedimentosAutomaticos={procedimentosAutomaticos}
          />

          <Separator className="my-6" />

          {/* Classificação de Risco */}
          <ClassificacaoRiscoSection form={form} />

          <Separator className="my-6" />

          {/* Desfecho */}
          <DesfechoSection form={form} />

          {/* Botões de ação */}
          <div className="pt-4">
            <FormActions onCancel={onCancel} isLoading={isLoading} />
          </div>
          
          {/* Rodapé com rascunho */}
          <div className="pt-4 border-t mt-6">
            <div className="text-xs text-muted-foreground text-center">
              Rascunho salvo automaticamente às 14:17
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
