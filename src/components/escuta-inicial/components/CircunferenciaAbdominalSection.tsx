
import { Badge } from "@/components/ui/badge";
import { AnthropometricField } from "./AnthropometricField";

interface CircunferenciaAbdominalSectionProps {
  form: any;
  fieldWarnings: Record<string, string>;
  onFieldChange: (fieldName: string, value: string) => void;
}

export const CircunferenciaAbdominalSection = ({ 
  form, 
  fieldWarnings, 
  onFieldChange 
}: CircunferenciaAbdominalSectionProps) => {
  const circunferencia = parseFloat(form.watch("circunferenciaAbdominal")) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <AnthropometricField
        form={form}
        name="circunferenciaAbdominal"
        label="Circunferência abdominal (cm)"
        placeholder="120"
        unit="cm"
        min={0}
        max={200}
        warning={fieldWarnings.circunferenciaAbdominal}
        onFieldChange={onFieldChange}
      />

      <div className="lg:col-span-3">
        {circunferencia > 102 && (
          <div className="flex items-center mt-6">
            <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
              Risco cardiovascular alto
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};
