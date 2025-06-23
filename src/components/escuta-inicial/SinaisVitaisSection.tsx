
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SinaisVitaisSectionProps {
  form: any;
  onValuesChange: (values: any) => void;
}

export const SinaisVitaisSection = ({ form, onValuesChange }: SinaisVitaisSectionProps) => {
  const handleFieldChange = (fieldName: string, value: string) => {
    const currentValues = form.getValues();
    const newValues = { ...currentValues, [fieldName]: value };
    onValuesChange(newValues);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sinais Vitais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pressão Arterial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pressaoSistolica"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pressão Arterial Sistólica (mmHg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="70"
                    max="250"
                    placeholder="000"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("pressaoSistolica", e.target.value);
                    }}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  Entre 70 mmHg e 250 mmHg
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pressaoDiastolica"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pressão Arterial Diastólica (mmHg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="40"
                    max="150"
                    placeholder="000"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("pressaoDiastolica", e.target.value);
                    }}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  Entre 40 mmHg e 150 mmHg
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Frequências */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="frequenciaCardiaca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequência Cardíaca (bpm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="30"
                    max="220"
                    placeholder="000"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("frequenciaCardiaca", e.target.value);
                    }}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  Entre 30 bpm e 220 bpm
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="frequenciaRespiratoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequência Respiratória (rpm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="8"
                    max="80"
                    placeholder="00"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("frequenciaRespiratoria", e.target.value);
                    }}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  Entre 8 rpm e 80 rpm
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Temperatura e Saturação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="temperatura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperatura Corporal (°C)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    min="32"
                    max="42"
                    placeholder="00,0"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("temperatura", e.target.value);
                    }}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  Entre 32°C e 42°C
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="saturacaoOxigenio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Saturação de Oxigênio (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="70"
                    max="100"
                    placeholder="000"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("saturacaoOxigenio", e.target.value);
                    }}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  Entre 70% e 100%
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Glicemia Capilar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="glicemiaCapilar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Glicemia Capilar (mg/dL)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="20"
                    max="600"
                    placeholder="000"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("glicemiaCapilar", e.target.value);
                    }}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  Entre 20 mg/dL e 600 mg/dL
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="momentoColeta"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Momento da Coleta</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
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
      </CardContent>
    </Card>
  );
};
