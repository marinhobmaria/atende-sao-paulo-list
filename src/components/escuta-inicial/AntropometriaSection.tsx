
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { IMCDisplay } from "./components/IMCDisplay";
import { AnthropometricField } from "./components/AnthropometricField";
import { useAntropometriaValidation } from "./hooks/useAntropometriaValidation";
import { useSinaisVitaisValidation } from "./hooks/useSinaisVitaisValidation";

interface AntropometriaSectionProps {
  form: any;
  onValuesChange: (values: any) => void;
}

export const AntropometriaSection = ({ form, onValuesChange }: AntropometriaSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { fieldWarnings: antropometriaWarnings, handleFieldChange: handleAntropometriaChange } = useAntropometriaValidation();
  const { fieldWarnings: sinaisWarnings, handleFieldChange: handleSinaisChange } = useSinaisVitaisValidation();
  
  const fieldWarnings = { ...antropometriaWarnings, ...sinaisWarnings };

  const handleFieldChangeWrapper = (fieldName: string, value: string) => {
    const currentValues = form.getValues();
    const newValues = { ...currentValues, [fieldName]: value };
    onValuesChange(newValues);
    
    // Use the appropriate validation hook
    if (['peso', 'altura', 'circunferenciaAbdominal', 'perimetroCefalico', 'perimetroPanturrilha'].includes(fieldName)) {
      handleAntropometriaChange(fieldName, value);
    } else {
      handleSinaisChange(fieldName, value);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="shadow-sm border">
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Antropometria, sinais vitais e glicemia capilar
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4 p-4">
        {/* Primeira linha: Peso, Altura, IMC, Perímetro cefálico */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnthropometricField
            form={form}
            name="peso"
            label="Peso"
            placeholder="0,5-500 kg"
            unit="kg"
            min={0.5}
            max={500}
            step="0.001"
            warning={fieldWarnings.peso}
            onFieldChange={handleFieldChangeWrapper}
            type="peso"
          />

          <AnthropometricField
            form={form}
            name="altura"
            label="Altura"
            placeholder="20-250 cm"
            unit="cm"
            min={20}
            max={250}
            warning={fieldWarnings.altura}
            onFieldChange={handleFieldChangeWrapper}
            type="altura"
          />

          <IMCDisplay 
            peso={form.watch("peso")} 
            altura={form.watch("altura")} 
          />

          <AnthropometricField
            form={form}
            name="perimetroCefalico"
            label="Perímetro cefálico"
            placeholder="10-200 cm"
            unit="cm"
            min={10}
            max={200}
            warning={fieldWarnings.perimetroCefalico}
            onFieldChange={handleFieldChangeWrapper}
            type="altura"
          />
        </div>

        {/* Segunda linha: Circunferência abdominal, Perímetro panturrilha, PA Sistólica, PA Diastólica */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnthropometricField
            form={form}
            name="circunferenciaAbdominal"
            label="Circunferência abdominal"
            placeholder="0-200 cm"
            unit="cm"
            min={0}
            max={200}
            warning={fieldWarnings.circunferenciaAbdominal}
            onFieldChange={handleFieldChangeWrapper}
            type="altura"
          />

          <AnthropometricField
            form={form}
            name="perimetroPanturrilha"
            label="Perímetro da panturrilha"
            placeholder="15-60 cm"
            unit="cm"
            min={15}
            max={60}
            warning={fieldWarnings.perimetroPanturrilha}
            onFieldChange={handleFieldChangeWrapper}
            type="altura"
          />

          <AnthropometricField
            form={form}
            name="pressaoSistolica"
            label="Pressão arterial"
            placeholder="70-250 mmHg"
            unit="mmHg"
            min={70}
            max={250}
            warning={fieldWarnings.pressaoSistolica}
            onFieldChange={handleFieldChangeWrapper}
            type="pressao"
          />

          <AnthropometricField
            form={form}
            name="pressaoDiastolica"
            label="/"
            placeholder="40-150"
            unit=""
            min={40}
            max={150}
            warning={fieldWarnings.pressaoDiastolica}
            onFieldChange={handleFieldChangeWrapper}
            type="pressao"
          />
        </div>

        {/* Terceira linha: Frequência respiratória, Frequência cardíaca, Temperatura, Saturação O2 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnthropometricField
            form={form}
            name="frequenciaRespiratoria"
            label="Frequência respiratória"
            placeholder="8-80 mpm"
            unit="mpm"
            min={8}
            max={80}
            warning={fieldWarnings.frequenciaRespiratoria}
            onFieldChange={handleFieldChangeWrapper}
            type="frequencia"
          />

          <AnthropometricField
            form={form}
            name="frequenciaCardiaca"
            label="Frequência cardíaca"
            placeholder="30-220 bpm"
            unit="bpm"
            min={30}
            max={220}
            warning={fieldWarnings.frequenciaCardiaca}
            onFieldChange={handleFieldChangeWrapper}
            type="frequencia"
          />

          <AnthropometricField
            form={form}
            name="temperatura"
            label="Temperatura"
            placeholder="32-42 °C"
            unit="°C"
            min={32}
            max={42}
            warning={fieldWarnings.temperatura}
            onFieldChange={handleFieldChangeWrapper}
            type="temperatura"
          />

          <AnthropometricField
            form={form}
            name="saturacaoOxigenio"
            label="Saturação de O2"
            placeholder="70-100 %"
            unit="%"
            min={70}
            max={100}
            warning={fieldWarnings.saturacaoOxigenio}
            onFieldChange={handleFieldChangeWrapper}
            type="saturacao"
          />
        </div>

        {/* Quarta linha: Glicemia capilar e Momento da coleta */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <AnthropometricField
            form={form}
            name="glicemiaCapilar"
            label="Glicemia capilar"
            placeholder="20-600 mg/dL"
            unit="mg/dL"
            min={20}
            max={600}
            warning={fieldWarnings.glicemiaCapilar}
            onFieldChange={handleFieldChangeWrapper}
            type="glicemia"
          />

          <div>
            <FormField
              control={form.control}
              name="momentoColeta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Momento da coleta
                    {form.watch("glicemiaCapilar") && <span className="text-red-600 ml-1">*</span>}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nao_especificado">Momento da coleta não especificado</SelectItem>
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
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
