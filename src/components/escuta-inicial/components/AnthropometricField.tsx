
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldAlert } from "../FieldAlert";
import { MaskedInput } from "./MaskedInput";
import { useFieldValidation } from "../hooks/useFieldValidation";
import { useState } from "react";

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
  type: 'peso' | 'altura' | 'temperatura' | 'pressao' | 'frequencia' | 'saturacao' | 'glicemia';
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
  className = "w-full min-w-[120px]",
  type
}: AnthropometricFieldProps) => {
  const { validateField, validateNumericOnly, getErrorMessage } = useFieldValidation();
  const [validationError, setValidationError] = useState<string>('');
  const [numericError, setNumericError] = useState<string>('');

  const handleValueChange = (value: string) => {
    // Validar se contém apenas números
    if (!validateNumericOnly(value) && value !== '') {
      setNumericError(getErrorMessage(false));
      return;
    }
    setNumericError('');

    // Validar limites
    const fieldError = validateField(name, value);
    setValidationError(fieldError);

    // Se não há erros, atualizar o form
    if (!fieldError && validateNumericOnly(value)) {
      onFieldChange(name, value);
    }
  };

  const handleBlur = () => {
    const currentValue = form.getValues()[name];
    if (currentValue) {
      const fieldError = validateField(name, currentValue);
      setValidationError(fieldError);
    }
  };

  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
            <FormControl>
              <MaskedInput
                value={field.value || ''}
                onChange={(value) => {
                  field.onChange(value);
                  handleValueChange(value);
                }}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={className}
                type={type}
              />
            </FormControl>
            
            {numericError && (
              <div className="text-xs text-red-600 mt-1">{numericError}</div>
            )}
            
            {validationError && (
              <div className="text-xs text-red-600 mt-1">{validationError}</div>
            )}
            
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
