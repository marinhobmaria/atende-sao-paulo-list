import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MaskedInput } from "./components/MaskedInput";
import { useFieldValidation } from "./hooks/useFieldValidation";
import { useState } from "react";

interface SinaisVitaisSectionProps {
  form: any;
  onValuesChange: (fieldName: string, value: string) => void;
  fieldWarnings: Record<string, string>;
}

export const SinaisVitaisSection = ({ form, onValuesChange, fieldWarnings }: SinaisVitaisSectionProps) => {
  const { validateField, validateNumericOnly, getErrorMessage } = useFieldValidation();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [numericErrors, setNumericErrors] = useState<Record<string, string>>({});

  const handleValueChange = (fieldName: string, value: string) => {
    // Validar se contém apenas números
    if (!validateNumericOnly(value) && value !== '') {
      setNumericErrors(prev => ({ ...prev, [fieldName]: getErrorMessage(false) }));
      return;
    } else {
      setNumericErrors(prev => ({ ...prev, [fieldName]: '' }));
    }

    // Validar limites
    const fieldError = validateField(fieldName, value);
    setValidationErrors(prev => ({ ...prev, [fieldName]: fieldError }));

    // Se não há erros, atualizar o form
    if (!fieldError && validateNumericOnly(value)) {
      onValuesChange(fieldName, value);
    }
  };

  const handleBlur = (fieldName: string) => {
    const currentValue = form.getValues()[fieldName];
    if (currentValue) {
      const fieldError = validateField(fieldName, currentValue);
      setValidationErrors(prev => ({ ...prev, [fieldName]: fieldError }));
    }
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardTitle className="text-lg font-semibold text-green-800 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Sinais Vitais
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Pressão Arterial */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            Pressão Arterial
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="pressaoSistolica"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">PA Sistólica</FormLabel>
                  <FormControl>
                    <MaskedInput
                      value={field.value || ''}
                      onChange={(value) => {
                        field.onChange(value);
                        handleValueChange("pressaoSistolica", value);
                      }}
                      onBlur={() => handleBlur("pressaoSistolica")}
                      placeholder="000"
                      className="w-full max-w-[120px]"
                      type="pressao"
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">70-250 mmHg</div>
                  {numericErrors.pressaoSistolica && (
                    <div className="text-xs text-red-600 mt-1">{numericErrors.pressaoSistolica}</div>
                  )}
                  {validationErrors.pressaoSistolica && (
                    <div className="text-xs text-red-600 mt-1">{validationErrors.pressaoSistolica}</div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pressaoDiastolica"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">PA Diastólica</FormLabel>
                  <FormControl>
                    <MaskedInput
                      value={field.value || ''}
                      onChange={(value) => {
                        field.onChange(value);
                        handleValueChange("pressaoDiastolica", value);
                      }}
                      onBlur={() => handleBlur("pressaoDiastolica")}
                      placeholder="000"
                      className="w-full max-w-[120px]"
                      type="pressao"
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">40-150 mmHg</div>
                  {numericErrors.pressaoDiastolica && (
                    <div className="text-xs text-red-600 mt-1">{numericErrors.pressaoDiastolica}</div>
                  )}
                  {validationErrors.pressaoDiastolica && (
                    <div className="text-xs text-red-600 mt-1">{validationErrors.pressaoDiastolica}</div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Frequências */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            Frequências
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="frequenciaCardiaca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">FC</FormLabel>
                  <FormControl>
                    <MaskedInput
                      value={field.value || ''}
                      onChange={(value) => {
                        field.onChange(value);
                        handleValueChange("frequenciaCardiaca", value);
                      }}
                      onBlur={() => handleBlur("frequenciaCardiaca")}
                      placeholder="000"
                      className="w-full max-w-[120px]"
                      type="frequencia"
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">30-220 bpm</div>
                  {numericErrors.frequenciaCardiaca && (
                    <div className="text-xs text-red-600 mt-1">{numericErrors.frequenciaCardiaca}</div>
                  )}
                  {validationErrors.frequenciaCardiaca && (
                    <div className="text-xs text-red-600 mt-1">{validationErrors.frequenciaCardiaca}</div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="frequenciaRespiratoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">FR</FormLabel>
                  <FormControl>
                    <MaskedInput
                      value={field.value || ''}
                      onChange={(value) => {
                        field.onChange(value);
                        handleValueChange("frequenciaRespiratoria", value);
                      }}
                      onBlur={() => handleBlur("frequenciaRespiratoria")}
                      placeholder="000"
                      className="w-full max-w-[120px]"
                      type="frequencia"
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">8-80 rpm</div>
                  {numericErrors.frequenciaRespiratoria && (
                    <div className="text-xs text-red-600 mt-1">{numericErrors.frequenciaRespiratoria}</div>
                  )}
                  {validationErrors.frequenciaRespiratoria && (
                    <div className="text-xs text-red-600 mt-1">{validationErrors.frequenciaRespiratoria}</div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Temperatura e Saturação */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            Temperatura e Saturação
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="temperatura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Temperatura</FormLabel>
                  <FormControl>
                    <MaskedInput
                      value={field.value || ''}
                      onChange={(value) => {
                        field.onChange(value);
                        handleValueChange("temperatura", value);
                      }}
                      onBlur={() => handleBlur("temperatura")}
                      placeholder="00,0"
                      className="w-full max-w-[120px]"
                      type="temperatura"
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">32-42°C</div>
                  {numericErrors.temperatura && (
                    <div className="text-xs text-red-600 mt-1">{numericErrors.temperatura}</div>
                  )}
                  {validationErrors.temperatura && (
                    <div className="text-xs text-red-600 mt-1">{validationErrors.temperatura}</div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saturacaoOxigenio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">SpO₂</FormLabel>
                  <FormControl>
                    <MaskedInput
                      value={field.value || ''}
                      onChange={(value) => {
                        field.onChange(value);
                        handleValueChange("saturacaoOxigenio", value);
                      }}
                      onBlur={() => handleBlur("saturacaoOxigenio")}
                      placeholder="000"
                      className="w-full max-w-[120px]"
                      type="saturacao"
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">70-100%</div>
                  {numericErrors.saturacaoOxigenio && (
                    <div className="text-xs text-red-600 mt-1">{numericErrors.saturacaoOxigenio}</div>
                  )}
                  {validationErrors.saturacaoOxigenio && (
                    <div className="text-xs text-red-600 mt-1">{validationErrors.saturacaoOxigenio}</div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};