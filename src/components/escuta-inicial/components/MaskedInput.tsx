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
    
    switch (inputType) {
      case 'peso':
        // Permitir até 3 casas decimais
        if (cleaned.includes(',')) {
          const [intPart, decPart] = cleaned.split(',');
          return intPart + (decPart ? ',' + decPart.slice(0, 3) : ',');
        }
        return cleaned;
        
      case 'altura':
        // Permitir até 1 casa decimal
        if (cleaned.includes(',')) {
          const [intPart, decPart] = cleaned.split(',');
          return intPart + (decPart ? ',' + decPart.slice(0, 1) : ',');
        }
        return cleaned;
        
      case 'temperatura':
        // Permitir até 1 casa decimal
        if (cleaned.includes(',')) {
          const [intPart, decPart] = cleaned.split(',');
          return intPart + (decPart ? ',' + decPart.slice(0, 1) : ',');
        }
        return cleaned;
        
      default:
        // Para campos inteiros, remover vírgula
        return cleaned.replace(',', '');
    }
  };

  const interpretValue = (input: string, inputType: string): number => {
    if (!input) return 0;
    
    // Remove espaços e caracteres especiais
    let cleaned = input.replace(/[^\d,]/g, '');
    
    switch (inputType) {
      case 'peso':
        if (cleaned.includes(',')) {
          const [intPart, decPart] = cleaned.split(',');
          const intValue = parseInt(intPart) || 0;
          const decValue = parseFloat('0.' + (decPart || '0'));
          return intValue + decValue;
        } else {
          // Se não tem vírgula, interpretar como kg
          return parseInt(cleaned) || 0;
        }
        
      case 'altura':
      case 'temperatura':
        if (cleaned.includes(',')) {
          return parseFloat(cleaned.replace(',', '.')) || 0;
        }
        return parseInt(cleaned) || 0;
        
      default:
        return parseInt(cleaned) || 0;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Bloquear letras e caracteres especiais (exceto vírgula)
    if (/[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|<>\?]/.test(input)) {
      return;
    }
    
    const formatted = formatValue(input, type);
    setDisplayValue(formatted);
    
    const interpretedValue = interpretValue(formatted, type);
    onChange(interpretedValue.toString());
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
        className={`flex h-10 w-full rounded-lg border-2 border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 
          placeholder:text-muted-foreground/70 placeholder:font-normal
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