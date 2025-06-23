
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldAlert } from "./FieldAlert";
import { useState } from "react";

interface AntropometriaSectionProps {
  form: any;
  onValuesChange: (values: any) => void;
}

export const AntropometriaSection = ({ form, onValuesChange }: AntropometriaSectionProps) => {
  const [fieldWarnings, setFieldWarnings] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldName: string, value: string) => {
    const currentValues = form.getValues();
    const newValues = { ...currentValues, [fieldName]: value };
    onValuesChange(newValues);

    // Check field limits and show warnings
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
    }

    setFieldWarnings(warnings);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-teal-700">Antropometria</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FormField
            control={form.control}
            name="peso"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Peso (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.001"
                    className="w-full max-w-[140px]"
                    placeholder="70.000"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || (parseFloat(value) >= 0.5 && parseFloat(value) <= 500)) {
                        field.onChange(e);
                        handleFieldChange("peso", e.target.value);
                      }
                    }}
                  />
                </FormControl>
                <div className="text-xs text-gray-500">0,5-500 kg</div>
                <FieldAlert 
                  type="warning" 
                  message={fieldWarnings.peso || ""} 
                  show={!!fieldWarnings.peso} 
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="lg:col-span-1">
          <FormField
            control={form.control}
            name="altura"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Altura (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    className="w-full max-w-[140px]"
                    placeholder="170.0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || (parseFloat(value) >= 20 && parseFloat(value) <= 250)) {
                        field.onChange(e);
                        handleFieldChange("altura", e.target.value);
                      }
                    }}
                  />
                </FormControl>
                <div className="text-xs text-gray-500">20-250 cm</div>
                <FieldAlert 
                  type="warning" 
                  message={fieldWarnings.altura || ""} 
                  show={!!fieldWarnings.altura} 
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Calculated BMI Display */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-600 mb-2">IMC Calculado</div>
            <div className="text-lg font-semibold text-gray-800">
              {(() => {
                const peso = parseFloat(form.watch("peso")) || 0;
                const altura = parseFloat(form.watch("altura")) || 0;
                if (peso > 0 && altura > 0) {
                  const imc = peso / Math.pow(altura / 100, 2);
                  return `${imc.toFixed(1)} kg/m²`;
                }
                return "-- kg/m²";
              })()}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Calculado automaticamente
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
