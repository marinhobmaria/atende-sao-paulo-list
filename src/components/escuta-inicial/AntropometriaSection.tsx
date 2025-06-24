
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMCDisplay } from "./components/IMCDisplay";
import { AnthropometricField } from "./components/AnthropometricField";
import { CircunferenciaAbdominalSection } from "./components/CircunferenciaAbdominalSection";
import { PerimetrosSection } from "./components/PerimetrosSection";
import { useAntropometriaValidation } from "./hooks/useAntropometriaValidation";

interface AntropometriaSectionProps {
  form: any;
  onValuesChange: (values: any) => void;
}

export const AntropometriaSection = ({ form, onValuesChange }: AntropometriaSectionProps) => {
  const { fieldWarnings, handleFieldChange } = useAntropometriaValidation();

  const handleFieldChangeWrapper = (fieldName: string, value: string) => {
    const currentValues = form.getValues();
    const newValues = { ...currentValues, [fieldName]: value };
    onValuesChange(newValues);
    handleFieldChange(fieldName, value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-teal-700">Antropometria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Linha 1: Peso, Altura e IMC */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <AnthropometricField
            form={form}
            name="peso"
            label="Peso (kg)"
            placeholder="90"
            unit="kg"
            min={0.5}
            max={500}
            step="0.001"
            warning={fieldWarnings.peso}
            onFieldChange={handleFieldChangeWrapper}
          />

          <AnthropometricField
            form={form}
            name="altura"
            label="Altura (cm)"
            placeholder="170"
            unit="cm"
            min={20}
            max={250}
            warning={fieldWarnings.altura}
            onFieldChange={handleFieldChangeWrapper}
          />

          <IMCDisplay 
            peso={form.watch("peso")} 
            altura={form.watch("altura")} 
          />
        </div>

        {/* Linha 2: Circunferência Abdominal */}
        <CircunferenciaAbdominalSection
          form={form}
          fieldWarnings={fieldWarnings}
          onFieldChange={handleFieldChangeWrapper}
        />

        {/* Linha 3: Perímetros */}
        <PerimetrosSection
          form={form}
          fieldWarnings={fieldWarnings}
          onFieldChange={handleFieldChangeWrapper}
        />
      </CardContent>
    </Card>
  );
};
