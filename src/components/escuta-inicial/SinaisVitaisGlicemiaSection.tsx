
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FieldAlert } from "./FieldAlert";
import { MaskedInput } from "./components/MaskedInput";
import { useSinaisVitaisValidation } from "./hooks/useSinaisVitaisValidation";

interface SinaisVitaisGlicemiaSectionProps {
  form: any;
  onValuesChange: (values: any) => void;
}

export const SinaisVitaisGlicemiaSection = ({ form, onValuesChange }: SinaisVitaisGlicemiaSectionProps) => {
  const { fieldWarnings, handleFieldChange } = useSinaisVitaisValidation();

  const handleFieldChangeWrapper = (fieldName: string, value: string) => {
    const currentValues = form.getValues();
    const newValues = { ...currentValues, [fieldName]: value };
    onValuesChange(newValues);
    handleFieldChange(fieldName, value);
  };

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
    <Card className="shadow-sm border">
      <CardHeader className="pb-4 bg-muted/30">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          Sinais vitais e glicemia capilar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Pressão Arterial */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            Pressão arterial
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="pressaoSistolica"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">PA Sistólica</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-full max-w-[120px]"
                      placeholder="120"
                      {...field}
                      onKeyDown={preventInvalidInput("pressaoSistolica", 70, 250)}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 70 && parseFloat(value) <= 250)) {
                          field.onChange(e);
                          handleFieldChangeWrapper("pressaoSistolica", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">70-250 mmHg</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.pressaoSistolica || ""} 
                    show={!!fieldWarnings.pressaoSistolica} 
                  />
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
                          handleFieldChangeWrapper("pressaoDiastolica", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">40-150 mmHg</div>
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
        </div>

        <Separator className="my-6" />

        {/* Frequências */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
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
                          handleFieldChangeWrapper("frequenciaCardiaca", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">30-220 bpm</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.frequenciaCardiaca || ""} 
                    show={!!fieldWarnings.frequenciaCardiaca} 
                  />
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
                          handleFieldChangeWrapper("frequenciaRespiratoria", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">8-80 rpm</div>
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

        <Separator className="my-6" />

        {/* Temperatura e Saturação */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            Temperatura e saturação
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
                          handleFieldChangeWrapper("temperatura", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">32-42°C</div>
                  <FieldAlert 
                    type="warning" 
                    message={fieldWarnings.temperatura || ""} 
                    show={!!fieldWarnings.temperatura} 
                  />
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
                    <Input
                      type="number"
                      className="w-full max-w-[120px]"
                      placeholder="98"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseFloat(value) >= 70 && parseFloat(value) <= 100)) {
                          field.onChange(e);
                          handleFieldChangeWrapper("saturacaoOxigenio", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">70-100%</div>
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

        <Separator className="my-6" />

        {/* Glicemia Capilar */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            Glicemia capilar
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="glicemiaCapilar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Glicemia Capilar</FormLabel>
                  <FormControl>
                    <MaskedInput
                      value={field.value || ''}
                      onChange={(value) => {
                        field.onChange(value);
                        handleFieldChangeWrapper("glicemiaCapilar", value);
                      }}
                      onBlur={() => {
                        const currentValue = form.getValues().glicemiaCapilar;
                        if (currentValue) {
                          handleFieldChangeWrapper("glicemiaCapilar", currentValue);
                        }
                      }}
                      placeholder="000"
                      className="w-full max-w-[140px]"
                      type="glicemia"
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">20-600 mg/dL</div>
                  {fieldWarnings.glicemiaCapilar && (
                    <div className="text-xs text-red-600 mt-1">{fieldWarnings.glicemiaCapilar}</div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="momentoColeta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Momento da Coleta
                    {form.watch("glicemiaCapilar") && (
                      <span className="text-red-600 ml-1">*</span>
                    )}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="max-w-[200px]">
                        <SelectValue placeholder="Selecione o momento" />
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
    </Card>
  );
};
