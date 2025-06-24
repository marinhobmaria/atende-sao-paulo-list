
import { useState } from "react";

export const useAntropometriaValidation = () => {
  const [fieldWarnings, setFieldWarnings] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldName: string, value: string) => {
    const warnings = { ...fieldWarnings };
    const numValue = parseFloat(value);

    switch (fieldName) {
      case "peso":
        if (numValue < 0.5) warnings[fieldName] = "Peso muito baixo";
        else if (numValue > 500) warnings[fieldName] = "Peso não pode exceder 500kg";
        else delete warnings[fieldName];
        break;
      case "altura":
        if (numValue < 20) warnings[fieldName] = "Altura muito baixa";
        else if (numValue > 250) warnings[fieldName] = "Altura não pode exceder 250cm";
        else delete warnings[fieldName];
        break;
      case "circunferenciaAbdominal":
        if (numValue > 200) warnings[fieldName] = "Valor muito alto para circunferência abdominal";
        else delete warnings[fieldName];
        break;
      case "perimetroCefalico":
        if (numValue < 30) warnings[fieldName] = "Valor muito baixo para perímetro cefálico";
        else if (numValue > 70) warnings[fieldName] = "Valor muito alto para perímetro cefálico";
        else delete warnings[fieldName];
        break;
      case "perimetroPanturrilha":
        if (numValue < 15) warnings[fieldName] = "Valor muito baixo para perímetro da panturrilha";
        else if (numValue > 60) warnings[fieldName] = "Valor muito alto para perímetro da panturrilha";
        else delete warnings[fieldName];
        break;
    }

    setFieldWarnings(warnings);
  };

  return { fieldWarnings, handleFieldChange };
};
