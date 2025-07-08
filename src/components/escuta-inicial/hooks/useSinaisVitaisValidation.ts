import { useState } from "react";

export const useSinaisVitaisValidation = () => {
  const [fieldWarnings, setFieldWarnings] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldName: string, value: string) => {
    const warnings = { ...fieldWarnings };
    const numValue = parseFloat(value);

    switch (fieldName) {
      case "pressaoSistolica":
      case "pressaoDiastolica":
        delete warnings[fieldName];
        break;
      case "frequenciaCardiaca":
        delete warnings[fieldName];
        break;
      case "frequenciaRespiratoria":
        if (numValue < 0 || numValue > 200) warnings[fieldName] = "Deve ter valor entre 0 e 200.";
        else delete warnings[fieldName];
        break;
      case "temperatura":
        if (numValue < 20 || numValue > 45) warnings[fieldName] = "Deve ter valor entre 20 e 45.";
        else delete warnings[fieldName];
        break;
      case "saturacaoOxigenio":
        delete warnings[fieldName];
        break;
      case "glicemiaCapilar":
        if (numValue < 0 || numValue > 800) warnings[fieldName] = "Deve ter valor entre 0 e 800.";
        else delete warnings[fieldName];
        break;
    }

    setFieldWarnings(warnings);
  };

  return { fieldWarnings, handleFieldChange };
};