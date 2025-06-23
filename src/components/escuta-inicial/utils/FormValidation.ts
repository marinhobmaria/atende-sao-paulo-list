
export const validateEscutaInicialForm = (data: any, setError: (field: string, error: { message: string }) => void) => {
  // Basic required field validations
  if (!data.ciap2) {
    setError("ciap2", { message: "Campo obrigatório" });
    return false;
  }

  if (!data.classificacaoRisco) {
    setError("classificacaoRisco", { message: "Campo obrigatório" });
    return false;
  }

  if (!data.desfecho) {
    setError("desfecho", { message: "Campo obrigatório" });
    return false;
  }

  // Validations specific to "adicionar_lista" outcome
  if (data.desfecho === "adicionar_lista") {
    if (!data.profissionalDesfecho && !data.equipeDesfecho) {
      setError("profissionalDesfecho", { 
        message: "Selecione um profissional ou equipe" 
      });
      return false;
    }
    if (!data.tipoServicoDesfecho) {
      setError("tipoServicoDesfecho", { 
        message: "Selecione o tipo de serviço" 
      });
      return false;
    }
  }

  // Validations specific to "agendar" outcome
  if (data.desfecho === "agendar") {
    if (!data.tipoServicoAgendamento || !data.profissionalDesfecho || !data.dataAgendamento || !data.horarioAgendamento) {
      if (!data.tipoServicoAgendamento) {
        setError("tipoServicoAgendamento", { 
          message: "Campo obrigatório" 
        });
      }
      if (!data.profissionalDesfecho) {
        setError("profissionalDesfecho", { 
          message: "Campo obrigatório" 
        });
      }
      if (!data.dataAgendamento) {
        setError("dataAgendamento", { 
          message: "Campo obrigatório" 
        });
      }
      if (!data.horarioAgendamento) {
        setError("horarioAgendamento", { 
          message: "Campo obrigatório" 
        });
      }
      return false;
    }
  }

  return true;
};
