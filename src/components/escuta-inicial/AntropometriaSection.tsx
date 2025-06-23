
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AntropometriaSectionProps {
  form: any;
  onValuesChange: (values: any) => void;
}

export const AntropometriaSection = ({ form, onValuesChange }: AntropometriaSectionProps) => {
  const handleFieldChange = (fieldName: string, value: string) => {
    const currentValues = form.getValues();
    const newValues = { ...currentValues, [fieldName]: value };
    onValuesChange(newValues);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Antropometria</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="peso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.001"
                  min="0.5"
                  max="500"
                  placeholder="0,000"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange("peso", e.target.value);
                  }}
                />
              </FormControl>
              <div className="text-xs text-muted-foreground">
                Entre 0,5 kg e 500 kg
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="altura"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Altura (cm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  min="20"
                  max="250"
                  placeholder="000,0"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange("altura", e.target.value);
                  }}
                />
              </FormControl>
              <div className="text-xs text-muted-foreground">
                Entre 20 cm e 250 cm
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
