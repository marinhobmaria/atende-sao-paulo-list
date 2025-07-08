
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldAlert } from "./FieldAlert";
import { useState } from "react";

interface SinaisVitaisSectionProps {
  form: any;
  onValuesChange: (fieldName: string, value: string) => void;
  fieldWarnings: Record<string, string>;
}

export const SinaisVitaisSection = ({ form, onValuesChange, fieldWarnings }: SinaisVitaisSectionProps) => {

  const preventInvalidInput = (fieldName: string, min: number, max: number) => {
    return (e: React.KeyboardEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value + e.key;
      const numValue = parseFloat(value);
      
      if (e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'Enter') {
        if (numValue < min || numValue > max) {
          e.preventDefault();
        }
      }
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-teal-700">Sinais Vitais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {/* Pressão Arterial - Linha 1 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-1">
            <FormField
              control={form.control}
              name="pressaoSistolica"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">PA Sistólica</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-full max-w-[100px]"
                      placeholder="120"
                      {...field}
                      onKeyDown={preventInvalidInput("pressaoSistolica", 70, 250)}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numValue = parseFloat(value);
                        if (value === '' || (numValue >= 70 && numValue <= 250)) {
                          field.onChange(e);
                          onValuesChange("pressaoSistolica", e.target.value);
                        } else if (numValue > 250) {
                          form.setError("pressaoSistolica", {
                            type: 'manual',
                            message: 'Permitido até 250 mmHg'
                          });
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">70-250 mmHg</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.pressaoSistolica || ""} 
                    show={!!fieldWarnings.pressaoSistolica} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="lg:col-span-1">
            <FormField
              control={form.control}
              name="pressaoDiastolica"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">PA Diastólica</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-full max-w-[120px]"
                      placeholder="80"
                      {...field}
                      onKeyDown={preventInvalidInput("pressaoDiastolica", 40, 150)}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 40 && parseFloat(value) <= 150)) {
                          field.onChange(e);
                          onValuesChange("pressaoDiastolica", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">40-150 mmHg</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.pressaoDiastolica || ""} 
                    show={!!fieldWarnings.pressaoDiastolica} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="lg:col-span-1">
            <FormField
              control={form.control}
              name="frequenciaCardiaca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">FC</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-full max-w-[120px]"
                      placeholder="72"
                      {...field}
                      onKeyDown={preventInvalidInput("frequenciaCardiaca", 30, 220)}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 30 && parseFloat(value) <= 220)) {
                          field.onChange(e);
                          onValuesChange("frequenciaCardiaca", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">30-220 bpm</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.frequenciaCardiaca || ""} 
                    show={!!fieldWarnings.frequenciaCardiaca} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="lg:col-span-1">
            <FormField
              control={form.control}
              name="frequenciaRespiratoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">FR</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-full max-w-[120px]"
                      placeholder="16"
                      {...field}
                      onKeyDown={preventInvalidInput("frequenciaRespiratoria", 8, 80)}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 8 && parseFloat(value) <= 80)) {
                          field.onChange(e);
                          onValuesChange("frequenciaRespiratoria", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">8-80 rpm</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.frequenciaRespiratoria || ""} 
                    show={!!fieldWarnings.frequenciaRespiratoria} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Temperatura e Saturação - Linha 2 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-1">
            <FormField
              control={form.control}
              name="temperatura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Temperatura</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      className="w-full max-w-[120px]"
                      placeholder="36.5"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 32 && parseFloat(value) <= 42)) {
                          field.onChange(e);
                          onValuesChange("temperatura", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">32-42°C</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.temperatura || ""} 
                    show={!!fieldWarnings.temperatura} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="lg:col-span-1">
            <FormField
              control={form.control}
              name="saturacaoOxigenio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">SpO₂</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-full max-w-[120px]"
                      placeholder="98"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 70 && parseFloat(value) <= 100)) {
                          field.onChange(e);
                          onValuesChange("saturacaoOxigenio", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">70-100%</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.saturacaoOxigenio || ""} 
                    show={!!fieldWarnings.saturacaoOxigenio} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Glicemia Capilar - Linha 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-1">
            <FormField
              control={form.control}
              name="glicemiaCapilar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Glicemia Capilar</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-full max-w-[140px]"
                      placeholder="90"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 20 && parseFloat(value) <= 600)) {
                          field.onChange(e);
                          onValuesChange("glicemiaCapilar", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-gray-500">20-600 mg/dL</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.glicemiaCapilar || ""} 
                    show={!!fieldWarnings.glicemiaCapilar} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="lg:col-span-2">
            <FormField
              control={form.control}
              name="momentoColeta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Momento da Coleta</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="max-w-[200px]">
                        <SelectValue placeholder="Selecione o momento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nao_especificado">Não especificado</SelectItem>
                      <SelectItem value="jejum">Jejum</SelectItem>
                      <SelectItem value="pre_prandial">Pré-prandial</SelectItem>
                      <SelectItem value="pos_prandial">Pós-prandial</SelectItem>
                    </SelectContent>
                  </Select>
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
