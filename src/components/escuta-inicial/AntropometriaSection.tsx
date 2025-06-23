
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FieldAlert } from "./FieldAlert";
import { useState, useEffect } from "react";

interface AntropometriaSectionProps {
  form: any;
  onValuesChange: (values: any) => void;
}

export const AntropometriaSection = ({ form, onValuesChange }: AntropometriaSectionProps) => {
  const [fieldWarnings, setFieldWarnings] = useState<Record<string, string>>({});
  const [imcClassification, setImcClassification] = useState("");

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

  const preventInvalidInput = (min: number, max: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const numValue = parseFloat(value);
      
      if (value !== '' && (numValue < min || numValue > max)) {
        e.preventDefault();
        return false;
      }
      return true;
    };
  };

  const getIMCClassification = (imc: number) => {
    if (imc < 18.5) return { text: "Baixo peso", color: "bg-blue-500" };
    if (imc < 25) return { text: "Peso normal", color: "bg-green-500" };
    if (imc < 30) return { text: "Sobrepeso", color: "bg-yellow-500" };
    if (imc < 35) return { text: "Obesidade grau I", color: "bg-orange-500" };
    if (imc < 40) return { text: "Obesidade grau II", color: "bg-red-500" };
    return { text: "Obesidade grau III", color: "bg-red-700" };
  };

  useEffect(() => {
    const peso = parseFloat(form.watch("peso")) || 0;
    const altura = parseFloat(form.watch("altura")) || 0;
    
    if (peso > 0 && altura > 0) {
      const imc = peso / Math.pow(altura / 100, 2);
      const classification = getIMCClassification(imc);
      setImcClassification(classification.text);
    } else {
      setImcClassification("");
    }
  }, [form.watch("peso"), form.watch("altura")]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-teal-700">Antropometria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Linha 1: Peso, Altura e IMC */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div>
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
                      className="w-full max-w-[100px]"
                      placeholder="90"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 0.5 && parseFloat(value) <= 500)) {
                          field.onChange(e);
                          handleFieldChange("peso", value);
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

          <div>
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
                      className="w-full max-w-[100px]"
                      placeholder="170"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 20 && parseFloat(value) <= 250)) {
                          field.onChange(e);
                          handleFieldChange("altura", value);
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

          <div className="lg:col-span-2">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-600">IMC</div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-50 p-3 rounded-lg min-w-[80px] text-center">
                  <div className="text-lg font-semibold text-gray-800">
                    {(() => {
                      const peso = parseFloat(form.watch("peso")) || 0;
                      const altura = parseFloat(form.watch("altura")) || 0;
                      if (peso > 0 && altura > 0) {
                        const imc = peso / Math.pow(altura / 100, 2);
                        return imc.toFixed(1);
                      }
                      return "48";
                    })()}
                  </div>
                </div>
                {imcClassification && (
                  <Badge className={`${(() => {
                    const peso = parseFloat(form.watch("peso")) || 0;
                    const altura = parseFloat(form.watch("altura")) || 0;
                    if (peso > 0 && altura > 0) {
                      const imc = peso / Math.pow(altura / 100, 2);
                      return getIMCClassification(imc).color;
                    }
                    return "bg-yellow-500";
                  })()} text-white text-xs px-2 py-1`}>
                    {imcClassification || "Sobrepeso"}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Linha 2: Circunferência Abdominal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div>
            <FormField
              control={form.control}
              name="circunferenciaAbdominal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Circunferência abdominal (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      className="w-full max-w-[100px]"
                      placeholder="120"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || parseFloat(value) <= 200) {
                          field.onChange(e);
                          handleFieldChange("circunferenciaAbdominal", value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">0-200 cm</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.circunferenciaAbdominal || ""} 
                    show={!!fieldWarnings.circunferenciaAbdominal} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="lg:col-span-3">
            {(() => {
              const circunferencia = parseFloat(form.watch("circunferenciaAbdominal")) || 0;
              if (circunferencia > 102) {
                return (
                  <div className="flex items-center mt-6">
                    <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                      Risco cardiovascular alto
                    </Badge>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>

        {/* Linha 3: Perímetros */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div>
            <FormField
              control={form.control}
              name="perimetroCefalico"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Perímetro cefálico (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      className="w-full max-w-[100px]"
                      placeholder="Informe"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 30 && parseFloat(value) <= 70)) {
                          field.onChange(e);
                          handleFieldChange("perimetroCefalico", value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">30-70 cm</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.perimetroCefalico || ""} 
                    show={!!fieldWarnings.perimetroCefalico} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="perimetroPanturrilha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Perímetro da panturrilha (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      className="w-full max-w-[100px]"
                      placeholder="Informe"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 15 && parseFloat(value) <= 60)) {
                          field.onChange(e);
                          handleFieldChange("perimetroPanturrilha", value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">15-60 cm</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.perimetroPanturrilha || ""} 
                    show={!!fieldWarnings.perimetroPanturrilha} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="lg:col-span-2">
            {(() => {
              const panturrilha = parseFloat(form.watch("perimetroPanturrilha")) || 0;
              if (panturrilha > 0 && panturrilha < 31) {
                return (
                  <div className="flex items-center mt-6">
                    <Badge className="bg-yellow-500 text-white text-xs px-2 py-1">
                      Atenção
                    </Badge>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
