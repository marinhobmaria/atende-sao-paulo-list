
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-lg font-semibold text-blue-800 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          Antropometria
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {/* Peso e Altura */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            Medidas Básicas
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
        </div>

        <Separator className="my-4" />

        {/* Circunferência Abdominal */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            Circunferência
          </h4>
          <CircunferenciaAbdominalSection
            form={form}
            fieldWarnings={fieldWarnings}
            onFieldChange={handleFieldChangeWrapper}
          />
        </div>

        <Separator className="my-4" />

        {/* Perímetros */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            Perímetros
          </h4>
          <PerimetrosSection
            form={form}
            fieldWarnings={fieldWarnings}
            onFieldChange={handleFieldChangeWrapper}
          />
        </div>
      </CardContent>
    </Card>
  );
};
