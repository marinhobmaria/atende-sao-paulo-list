import { useState } from "react";

interface MaskedInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  type: 'peso' | 'altura' | 'temperatura' | 'pressao' | 'frequencia' | 'saturacao' | 'glicemia';
  disabled?: boolean;
}

export const MaskedInput = ({ 
  value, 
  onChange, 
  onBlur, 
  placeholder, 
  className, 
  type,
  disabled = false 
}: MaskedInputProps) => {
  const [displayValue, setDisplayValue] = useState(value || '');

  const formatValue = (input: string, inputType: string): string => {
    // Remove todos os caracteres não numéricos exceto vírgula
    let cleaned = input.replace(/[^\d,]/g, '');
    
    // Permitir apenas uma vírgula
    const commaCount = (cleaned.match(/,/g) || []).length;
    if (commaCount > 1) {
      const firstCommaIndex = cleaned.indexOf(',');
      cleaned = cleaned.substring(0, firstCommaIndex + 1) + cleaned.substring(firstCommaIndex + 1).replace(/,/g, '');
    }
    
    switch (inputType) {
      case 'peso':
        // Permitir até 3 casas decimais para peso
        if (cleaned.includes(',')) {
          const [intPart, decPart] = cleaned.split(',');
          return intPart + ',' + (decPart ? decPart.slice(0, 3) : '');
        }
        return cleaned;
        
      case 'altura':
        // Permitir até 1 casa decimal para altura
        if (cleaned.includes(',')) {
          const [intPart, decPart] = cleaned.split(',');
          return intPart + ',' + (decPart ? decPart.slice(0, 1) : '');
        }
        return cleaned;
        
      case 'temperatura':
        // Permitir até 1 casa decimal para temperatura
        if (cleaned.includes(',')) {
          const [intPart, decPart] = cleaned.split(',');
          return intPart + ',' + (decPart ? decPart.slice(0, 1) : '');
        }
        return cleaned;
        
      default:
        // Para campos inteiros, remover vírgula
        return cleaned.replace(/,/g, '');
    }
  };

  const interpretValue = (input: string): string => {
    if (!input) return '';
    
    // Remove apenas espaços e unidades, mantém números e vírgula
    let cleaned = input.replace(/[^\d,]/g, '');
    
    return cleaned;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Remove a unidade da entrada para processar apenas o valor
    const inputWithoutUnit = input.replace(new RegExp(` ${getUnit()}$`), '');
    
    const formatted = formatValue(inputWithoutUnit, type);
    setDisplayValue(formatted);
    
    // Passar o valor limpo para o onChange
    const cleanValue = interpretValue(formatted);
    onChange(cleanValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir apenas números, vírgula, backspace, delete, tab, enter
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'];
    const isNumber = /\d/.test(e.key);
    const isComma = e.key === ',';
    
    if (!isNumber && !isComma && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
    
    // Verificar se já existe vírgula para campos decimais
    if (isComma && displayValue.includes(',')) {
      e.preventDefault();
    }
    
    // Para campos inteiros, bloquear vírgula
    if (isComma && ['pressao', 'frequencia', 'saturacao', 'glicemia'].includes(type)) {
      e.preventDefault();
    }
  };

  const getUnit = (): string => {
    switch (type) {
      case 'peso': return 'kg';
      case 'altura': return 'cm';
      case 'temperatura': return '°C';
      case 'pressao': return 'mmHg';
      case 'frequencia': return 'bpm';
      case 'saturacao': return '%';
      case 'glicemia': return 'mg/dL';
      default: return '';
    }
  };

  const getPlaceholderMask = (): string => {
    switch (type) {
      case 'peso': return `0,000 ${getUnit()}`;
      case 'altura': return `000,0 ${getUnit()}`;
      case 'temperatura': return `00,0 ${getUnit()}`;
      case 'pressao': return `000 ${getUnit()}`;
      case 'frequencia': return `000 ${getUnit()}`;
      case 'saturacao': return `000 ${getUnit()}`;
      case 'glicemia': return `000 ${getUnit()}`;
      default: return '';
    }
  };

  return (
    <div className="relative group">
      <input
        type="text"
        value={displayValue ? `${displayValue} ${getUnit()}` : ''}
        onChange={(e) => {
          const input = e.target.value.replace(new RegExp(` ${getUnit()}$`), '');
          handleInputChange({ target: { value: input } } as React.ChangeEvent<HTMLInputElement>);
        }}
        onKeyDown={handleKeyPress}
        onBlur={onBlur}
        placeholder={placeholder || getPlaceholderMask()}
        className={`flex h-10 w-full min-w-[140px] rounded-lg border-2 border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 
          placeholder:text-muted-foreground/70 placeholder:font-normal placeholder:text-xs
          focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-accent/5
          hover:border-accent hover:bg-accent/5
          disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30
          group-hover:border-accent/70 ${className}`}
        disabled={disabled}
      />
      <div className={`absolute inset-0 rounded-lg border-2 border-transparent pointer-events-none transition-all duration-200
        ${!disabled ? 'group-hover:border-primary/20 group-hover:shadow-sm' : ''}`} />
    </div>
  );
};