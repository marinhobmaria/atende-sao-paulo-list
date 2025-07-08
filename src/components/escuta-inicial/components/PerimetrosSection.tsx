
import { Badge } from "@/components/ui/badge";
import { AnthropometricField } from "./AnthropometricField";

interface PerimetrosSectionProps {
  form: any;
  fieldWarnings: Record<string, string>;
  onFieldChange: (fieldName: string, value: string) => void;
}

export const PerimetrosSection = ({ 
  form, 
  fieldWarnings, 
  onFieldChange 
}: PerimetrosSectionProps) => {
  const panturrilha = parseFloat(form.watch("perimetroPanturrilha")) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <AnthropometricField
        form={form}
        name="perimetroCefalico"
        label="Perímetro cefálico (cm)"
        placeholder="Informe"
        unit="cm"
        min={30}
        max={70}
        warning={fieldWarnings.perimetroCefalico}
        onFieldChange={onFieldChange}
        type="altura"
      />

      <AnthropometricField
        form={form}
        name="perimetroPanturrilha"
        label="Perímetro da panturrilha (cm)"
        placeholder="Informe"
        unit="cm"
        min={15}
        max={60}
        warning={fieldWarnings.perimetroPanturrilha}
        onFieldChange={onFieldChange}
        type="altura"
      />

      <div className="lg:col-span-2">
        {panturrilha > 0 && panturrilha < 31 && (
          <div className="flex items-center mt-6">
            <Badge className="bg-yellow-500 text-white text-xs px-2 py-1">
              Atenção
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};
