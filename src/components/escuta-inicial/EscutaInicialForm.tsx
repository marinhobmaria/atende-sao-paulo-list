
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { MotivoConsultaSection } from "./MotivoConsultaSection";
import { AntropometriaSection } from "./AntropometriaSection";
import { SinaisVitaisSection } from "./SinaisVitaisSection";
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Motivo da Consulta */}
        <MotivoConsultaSection form={form} />

        <Separator />

        {/* Antropometria */}
        <AntropometriaSection 
          form={form} 
          onValuesChange={updateProcedimentosAutomaticos}
        />

        <Separator />

        {/* Sinais Vitais */}
        <SinaisVitaisSection 
          form={form} 
          onValuesChange={updateProcedimentosAutomaticos}
        />

        <Separator />

        {/* Procedimentos */}
        <ProcedimentosSection 
          form={form}
          procedimentosAutomaticos={procedimentosAutomaticos}
        />

        <Separator />

        {/* Classificação de Risco */}
        <ClassificacaoRiscoSection form={form} />

        <Separator />

        {/* Desfecho */}
        <DesfechoSection form={form} />

        {/* Botões de ação */}
        <FormActions onCancel={onCancel} isLoading={isLoading} />
      </form>
    </Form>
  );
};
