
import { useState } from "react";

export const useProcedimentosAutomaticos = () => {
  const [procedimentosAutomaticos, setProcedimentosAutomaticos] = useState<string[]>([]);

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

  return {
    procedimentosAutomaticos,
    updateProcedimentosAutomaticos
  };
};
