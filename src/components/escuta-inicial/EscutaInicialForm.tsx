import { useState } from "react";
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

interface EscutaInicialFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const EscutaInicialForm = ({ onSubmit, onCancel, isLoading }: EscutaInicialFormProps) => {
  const [procedimentosAutomaticos, setProcedimentosAutomaticos] = useState<string[]>([]);

  const form = useForm({
    defaultValues: {
      // Motivo da consulta
      ciap2: "",
      descricaoLivre: "",
      
      // Antropometria
      peso: "",
      altura: "",
      circunferenciaAbdominal: "",
      perimetroCefalico: "",
      perimetroPanturrilha: "",
      
      // Sinais vitais
      pressaoSistolica: "",
      pressaoDiastolica: "",
      frequenciaCardiaca: "",
      frequenciaRespiratoria: "",
      temperatura: "",
      saturacaoOxigenio: "",
      glicemiaCapilar: "",
      momentoColeta: "",
      
      // Procedimentos
      procedimentosManuais: [],
      
      // Classificação de risco
      classificacaoRisco: "",
      
      // Desfecho
      desfecho: "",
      profissionalDesfecho: "",
      equipeDesfecho: "",
      tipoServicoDesfecho: [],
      dataAgendamento: "",
      horarioAgendamento: "",
      observacoesAgendamento: ""
    }
  });

  const handleFormSubmit = (data: any) => {
    // Validações finais
    if (!data.ciap2) {
      form.setError("ciap2", { message: "Campo obrigatório" });
      return;
    }

    if (!data.classificacaoRisco) {
      form.setError("classificacaoRisco", { message: "Campo obrigatório" });
      return;
    }

    if (!data.desfecho) {
      form.setError("desfecho", { message: "Campo obrigatório" });
      return;
    }

    // Validações específicas por desfecho
    if (data.desfecho === "adicionar_lista") {
      if (!data.profissionalDesfecho && !data.equipeDesfecho) {
        form.setError("profissionalDesfecho", { 
          message: "Selecione um profissional ou equipe" 
        });
        return;
      }
    }

    if (data.desfecho === "agendar") {
      if (!data.profissionalDesfecho || !data.dataAgendamento || !data.horarioAgendamento) {
        form.setError("profissionalDesfecho", { 
          message: "Preencha todos os campos obrigatórios para agendamento" 
        });
        return;
      }
    }

    // Incluir procedimentos automáticos
    const dadosCompletos = {
      ...data,
      procedimentosAutomaticos,
      dataHoraInicio: new Date().toISOString(),
      dataHoraFim: new Date().toISOString()
    };

    onSubmit(dadosCompletos);
  };

  const updateProcedimentosAutomaticos = (novosValores: any) => {
    const procedimentos: string[] = [];
    
    if (novosValores.peso && novosValores.altura) {
      procedimentos.push("Aferição de peso e altura");
    }
    if (novosValores.circunferenciaAbdominal) {
      procedimentos.push("Medição de circunferência abdominal");
    }
    if (novosValores.perimetroCefalico) {
      procedimentos.push("Medição de perímetro cefálico");
    }
    if (novosValores.perimetroPanturrilha) {
      procedimentos.push("Medição de perímetro da panturrilha");
    }
    if (novosValores.pressaoSistolica || novosValores.pressaoDiastolica) {
      procedimentos.push("Verificação de pressão arterial");
    }
    if (novosValores.frequenciaCardiaca || novosValores.frequenciaRespiratoria) {
      procedimentos.push("Verificação de sinais vitais");
    }
    if (novosValores.temperatura) {
      procedimentos.push("Verificação de temperatura corporal");
    }
    if (novosValores.saturacaoOxigenio) {
      procedimentos.push("Verificação de saturação periférica de oxigênio");
    }
    if (novosValores.glicemiaCapilar) {
      procedimentos.push("Verificação de glicemia capilar");
    }

    setProcedimentosAutomaticos(procedimentos);
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
      </form>
    </Form>
  );
};
