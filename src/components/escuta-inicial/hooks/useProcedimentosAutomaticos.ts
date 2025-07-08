
import { useState } from "react";

export const useProcedimentosAutomaticos = () => {
  const [procedimentosAutomaticos, setProcedimentosAutomaticos] = useState<string[]>([]);

  const updateProcedimentosAutomaticos = (novosValores: any) => {
    const procedimentos: string[] = [];
    
    if (novosValores.peso && novosValores.altura) {
      procedimentos.push("AVALIAÇÃO ANTROPOMÉTRICA - 0101040024 (Adicionado automaticamente)");
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
      procedimentos.push("AFERIÇÃO DE PRESSÃO ARTERIAL - 0301100039 (Adicionado automaticamente)");
    }
    if (novosValores.frequenciaCardiaca || novosValores.frequenciaRespiratoria) {
      procedimentos.push("Verificação de sinais vitais");
    }
    if (novosValores.temperatura) {
      procedimentos.push("AFERIÇÃO DE TEMPERATURA - 0301100250 (Adicionado automaticamente)");
    }
    if (novosValores.saturacaoOxigenio) {
      procedimentos.push("Verificação de saturação periférica de oxigênio");
    }
    if (novosValores.glicemiaCapilar) {
      procedimentos.push("GLICEMIA CAPILAR - 0214010015 (Adicionado automaticamente)");
    }

    setProcedimentosAutomaticos(procedimentos);
  };

  return {
    procedimentosAutomaticos,
    updateProcedimentosAutomaticos
  };
};
