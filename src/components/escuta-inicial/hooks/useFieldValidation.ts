export const useFieldValidation = () => {
  const validateField = (fieldName: string, value: string): string => {
    const numValue = parseFloat(value.replace(',', '.'));
    
    if (!value || isNaN(numValue)) return '';
    
    switch (fieldName) {
      case "peso":
        if (numValue < 0.5 || numValue > 500) {
          return "Deve ser entre 0,5 e 500 kg.";
        }
        break;
        
      case "altura":
        if (numValue < 20 || numValue > 250) {
          return "Deve ser entre 20 cm e 250 cm.";
        }
        break;
        
      case "pressaoSistolica":
        if (numValue < 70 || numValue > 250) {
          return "Deve ser entre 70 mmHg e 250 mmHg.";
        }
        break;
        
      case "pressaoDiastolica":
        if (numValue < 40 || numValue > 150) {
          return "Deve ser entre 40 mmHg e 150 mmHg.";
        }
        break;
        
      case "frequenciaCardiaca":
        if (numValue < 30 || numValue > 220) {
          return "Deve ser entre 30 bpm e 220 bpm.";
        }
        break;
        
      case "frequenciaRespiratoria":
        if (numValue < 8 || numValue > 80) {
          return "Deve ser entre 8 rpm e 80 rpm.";
        }
        break;
        
      case "temperatura":
        if (numValue < 32 || numValue > 42) {
          return "Deve ser entre 32 °C e 42 °C.";
        }
        break;
        
      case "saturacaoOxigenio":
        if (numValue < 70 || numValue > 100) {
          return "Deve ser entre 70% e 100%.";
        }
        break;
        
      case "glicemiaCapilar":
        if (numValue < 20 || numValue > 600) {
          return "Deve ser entre 20 mg/dL e 600 mg/dL.";
        }
        break;
        
      case "perimetroCefalico":
        if (numValue < 10 || numValue > 200) {
          return "Deve ter valor entre 10 e 200.";
        }
        break;
        
      default:
        return '';
    }
    
    return '';
  };

  const validateNumericOnly = (value: string): boolean => {
    return /^[\d,]*$/.test(value);
  };

  const getErrorMessage = (isValid: boolean): string => {
    return isValid ? '' : 'Este campo aceita apenas números.';
  };

  return {
    validateField,
    validateNumericOnly,
    getErrorMessage
  };
};