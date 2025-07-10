
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Search } from "lucide-react";

const serviceTypes = [
  "ADMINISTRAÇÃO DE MEDICAMENTO",
  "CURATIVO",
  "DEMANDA ESPONTÂNEA",
  "ESCUTA INICIAL",
  "EXAMES",
  "NEBULIZAÇÃO",
  "ODONTOLOGIA",
  "PROCEDIMENTOS",
  "VACINA"
];

interface ServiceTypeSearchProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const ServiceTypeSearch = ({ value, onChange }: ServiceTypeSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleServiceTypeToggle = (serviceType: string) => {
    const newValue = value.includes(serviceType)
      ? value.filter(item => item !== serviceType)
      : [...value, serviceType];
    onChange(newValue);
  };

  const clearAll = () => {
    onChange([]);
  };

  const selectAll = () => {
    onChange(serviceTypes);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-left font-normal h-11 px-4"
        >
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {value.length === 0 ? (
                <span className="text-muted-foreground">Pesquise ou selecione os serviços</span>
              ) : value.length <= 2 ? (
                value.map((service) => (
                  <Badge key={service} variant="secondary" className="text-xs">
                    {service}
                  </Badge>
                ))
              ) : (
                <>
                  <Badge variant="secondary" className="text-xs">
                    {value[0]}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    +{value.length - 1} mais
                  </Badge>
                </>
              )}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-3 border-b">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm">Tipos de Serviço</span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={selectAll}
                className="text-xs h-6"
              >
                Todos
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-xs h-6"
              >
                Limpar
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-h-60 overflow-y-auto">
          {serviceTypes.map((serviceType) => (
            <div
              key={serviceType}
              className="flex items-center space-x-2 p-3 hover:bg-muted cursor-pointer"
              onClick={() => handleServiceTypeToggle(serviceType)}
            >
              <Checkbox
                checked={value.includes(serviceType)}
                onCheckedChange={() => handleServiceTypeToggle(serviceType)}
              />
              <label className="text-sm cursor-pointer flex-1">
                {serviceType}
              </label>
            </div>
          ))}
        </div>
        
        {value.length > 0 && (
          <div className="p-3 border-t bg-muted">
            <div className="text-xs text-muted-foreground">
              {value.length} serviço{value.length !== 1 ? 's' : ''} selecionado{value.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
