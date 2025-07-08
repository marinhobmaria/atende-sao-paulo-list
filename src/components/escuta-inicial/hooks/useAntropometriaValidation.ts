
import { useState } from "react";

export const useAntropometriaValidation = () => {
  const [fieldWarnings, setFieldWarnings] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldName: string, value: string) => {
    const warnings = { ...fieldWarnings };
    const numValue = parseFloat(value);

    switch (fieldName) {
      case "peso":
        if (numValue < 0.5 || numValue > 500) warnings[fieldName] = "Deve ter valor entre 0,5 e 500.";
        else delete warnings[fieldName];
        break;
      case "altura":
        if (numValue < 20 || numValue > 250) warnings[fieldName] = "Deve ter valor entre 20 e 250.";
        else delete warnings[fieldName];
        break;
      case "circunferenciaAbdominal":
        delete warnings[fieldName];
        break;
      case "perimetroCefalico":
        if (numValue < 10 || numValue > 200) warnings[fieldName] = "Deve ter valor entre 10 e 200.";
        else delete warnings[fieldName];
        break;
      case "perimetroPanturrilha":
        delete warnings[fieldName];
        break;
    }

    setFieldWarnings(warnings);
  };

  return { fieldWarnings, handleFieldChange };
};
