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
      case 'peso': return '0,000';
      case 'altura': return '000,0';
      case 'temperatura': return '00,0';
      case 'pressao': return '000';
      case 'frequencia': return '000';
      case 'saturacao': return '000';
      case 'glicemia': return '000';
      default: return '';
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        onBlur={onBlur}
        placeholder={placeholder || getPlaceholderMask()}
        className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-12 ${className}`}
        disabled={disabled}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground pointer-events-none font-medium">
        {getUnit()}
      </span>
    </div>
  );
};