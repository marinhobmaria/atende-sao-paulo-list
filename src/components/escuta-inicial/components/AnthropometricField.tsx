
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldAlert } from "../FieldAlert";

interface AnthropometricFieldProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  unit: string;
  min: number;
  max: number;
  step?: string;
  warning?: string;
  onFieldChange: (fieldName: string, value: string) => void;
  className?: string;
}

export const AnthropometricField = ({
  form,
  name,
  label,
  placeholder,
  unit,
  min,
  max,
  step = "0.1",
  warning,
  onFieldChange,
  className = "w-full max-w-[90px]"
}: AnthropometricFieldProps) => {
  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
            <FormControl>
              <Input
                type="number"
                step={step}
                className={className}
                placeholder={placeholder}
                {...field}
                onChange={(e) => {
                  const value = e.target.value;
                  const numValue = parseFloat(value);
                  
                  if (value === '') {
                    field.onChange(e);
                    onFieldChange(name, value);
                  } else if (numValue >= min && numValue <= max) {
                    field.onChange(e);
                    onFieldChange(name, value);
                  } else if (numValue > max) {
                    form.setError(name, {
                      type: 'manual',
                      message: `Permitido até ${max} ${unit}`
                    });
                  } else if (numValue < min) {
                    form.setError(name, {
                      type: 'manual', 
                      message: `Permitido até ${max} ${unit}`
                    });
                  }
                }}
              />
            </FormControl>
            <div className="text-xs text-gray-500">{min}-{max} {unit}</div>
            <FieldAlert 
              type="warning" 
              message={warning || ""} 
              show={!!warning} 
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
