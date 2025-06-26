
import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Stethoscope } from "lucide-react";

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  category: string;
}

const mockServiceTypes: ServiceType[] = [
  {
    id: "service_1",
    name: "Consulta Médica",
    description: "Consulta médica geral",
    category: "Médica"
  },
  {
    id: "service_2",
    name: "Consulta de Enfermagem",
    description: "Consulta de enfermagem",
    category: "Enfermagem"
  },
  {
    id: "service_3",
    name: "Escuta Inicial",
    description: "Acolhimento e escuta inicial",
    category: "Acolhimento"
  },
  {
    id: "service_4",
    name: "Vacinação",
    description: "Aplicação de vacinas",
    category: "Imunização"
  },
  {
    id: "service_5",
    name: "Curativo",
    description: "Realização de curativos",
    category: "Procedimento"
  },
  {
    id: "service_6",
    name: "Consulta Odontológica",
    description: "Consulta odontológica",
    category: "Odontologia"
  }
];

interface ServiceTypeSearchProps {
  value: string;
  onChange: (value: string) => void;
  onServiceTypeSelect?: (serviceType: ServiceType) => void;
  disabled?: boolean;
}

export const ServiceTypeSearch = ({ 
  value, 
  onChange, 
  onServiceTypeSelect,
  disabled = false
}: ServiceTypeSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredServiceTypes = useMemo(() => {
    if (!value.trim()) return [];
    
    const term = value.toLowerCase().trim();
    return mockServiceTypes.filter(serviceType => 
      serviceType.name.toLowerCase().includes(term) ||
      serviceType.description.toLowerCase().includes(term) ||
      serviceType.category.toLowerCase().includes(term)
    );
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (newValue: string) => {
    if (disabled) return;
    onChange(newValue);
    setIsOpen(true);
  };

  const handleServiceTypeSelect = (serviceType: ServiceType) => {
    onChange(serviceType.name);
    setIsOpen(false);
    onServiceTypeSelect?.(serviceType);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={disabled ? "Preenchido automaticamente" : "Nome do serviço ou categoria"}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => !disabled && setIsOpen(true)}
          className="pl-10 pr-8"
          disabled={disabled}
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredServiceTypes.length > 0 ? (
            <div className="p-2 space-y-2">
              {filteredServiceTypes.map((serviceType) => (
                <Card 
                  key={serviceType.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleServiceTypeSelect(serviceType)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {serviceType.name}
                        </h4>
                        
                        <div className="mt-1 flex flex-wrap gap-1 text-xs">
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            {serviceType.category}
                          </Badge>
                          <span className="text-gray-500">{serviceType.description}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : value.trim() && (
            <div className="p-4 text-center">
              <p className="text-gray-500">Nenhum tipo de serviço encontrado</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
