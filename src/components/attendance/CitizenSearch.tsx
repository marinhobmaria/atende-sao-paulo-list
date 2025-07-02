import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, User, Calendar, Plus } from "lucide-react";

// Mock citizen data with birth dates for age calculation and mother names
const mockCitizens = [
  {
    id: "1",
    name: "Maria Silva Santos",
    cpf: "123.456.789-01",
    cns: "701234567890123",
    birthDate: "1980-03-15",
    motherName: "Ana Paula Santos",
    hasScheduledAppointment: false
  },
  {
    id: "2", 
    name: "João Oliveira Costa",
    cpf: "987.654.321-09",
    cns: "701987654321098",
    birthDate: "1975-08-22",
    motherName: "Carmem Oliveira Costa",
    hasScheduledAppointment: false
  },
  {
    id: "3",
    name: "Maria Santos Silva",
    cpf: "456.789.123-45",
    cns: "701456789123456",
    birthDate: "1990-11-08",
    motherName: "José Silva Santos",
    hasScheduledAppointment: true,
    scheduledInfo: {
      professional: "Dr. João Silva",
      specialty: "Médico Clínico",
      team: "Equipe APS 1",
      time: "14:30"
    }
  },
  {
    id: "4",
    name: "Carlos Pereira Lima",
    cpf: "789.123.456-78",
    cns: "701789123456789",
    birthDate: "1985-05-12",
    motherName: "Rosa Pereira Lima",
    hasScheduledAppointment: true,
    scheduledInfo: {
      professional: "Dra. Ana Costa",
      specialty: "Enfermeiro",
      team: "Equipe APS 2",
      time: "15:00"
    }
  },
  {
    id: "5",
    name: "Ana Costa Ferreira",
    cpf: "321.654.987-32",
    cns: "701321654987321",
    birthDate: "1992-01-30",
    motherName: "Lucia Costa Ferreira",
    hasScheduledAppointment: false
  }
];

export interface Citizen {
  id: string;
  name: string;
  cpf: string;
  cns: string;
  birthDate: string;
  motherName: string;
  hasScheduledAppointment: boolean;
  scheduledInfo?: {
    professional: string;
    specialty: string;
    team: string;
    time: string;
  };
}

interface CitizenSearchProps {
  value: string;
  onChange: (value: string) => void;
  onCitizenSelect?: (citizen: Citizen) => void;
  onNewCitizenClick?: () => void;
  citizensInQueue?: string[];
  disabled?: boolean;
}

const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const today = new Date();
  
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  
  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return `${years}a ${months}m ${days}d`;
};

export const CitizenSearch = ({ 
  value, 
  onChange, 
  onCitizenSelect,
  onNewCitizenClick,
  citizensInQueue = [],
  disabled = false
}: CitizenSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredCitizens = useMemo(() => {
    if (!value.trim()) return [];
    
    const term = value.toLowerCase().trim();
    return mockCitizens.filter(citizen => 
      citizen.name.toLowerCase().includes(term) ||
      citizen.cpf.includes(term) ||
      citizen.cns.includes(term) ||
      citizen.birthDate.includes(term)
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

  const handleCitizenSelect = (citizen: Citizen) => {
    onChange(citizen.name);
    setIsOpen(false);
    onCitizenSelect?.(citizen);
  };

  const isCitizenInQueue = (citizenName: string) => {
    return citizensInQueue.includes(citizenName);
  };

  const showNewCitizenButton = value.trim() && filteredCitizens.length === 0;

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={disabled ? "Preenchido automaticamente" : "Nome, CPF, CNS ou data de nascimento"}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => !disabled && setIsOpen(true)}
          className="pl-10 pr-8"
          disabled={disabled}
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredCitizens.length > 0 ? (
            <div className="p-2 space-y-2">
              {filteredCitizens.map((citizen) => {
                const isInQueue = isCitizenInQueue(citizen.name);
                const age = calculateAge(citizen.birthDate);
                
                return (
                  <Card 
                    key={citizen.id}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      isInQueue ? 'opacity-50 cursor-not-allowed' : ''
                    } ${citizen.hasScheduledAppointment ? 'border-blue-200 bg-blue-50' : ''}`}
                    onClick={() => !isInQueue && handleCitizenSelect(citizen)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 truncate">
                              {citizen.name}
                            </h4>
                            {citizen.hasScheduledAppointment && (
                              <Badge variant="outline" className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border-green-200">
                                <Calendar className="h-3 w-3 mr-1" />
                                Agendamento hoje
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                            <div>CPF: {citizen.cpf}</div>
                            <div>CNS: {citizen.cns}</div>
                            <div>
                              Nascimento: {new Date(citizen.birthDate).toLocaleDateString('pt-BR')} ({age})
                            </div>
                            <div>Mãe: {citizen.motherName}</div>
                          </div>

                          {isInQueue && (
                            <div className="text-xs text-red-600 font-medium mt-1">
                              Já inserido na fila
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : showNewCitizenButton ? (
            <div className="p-4 text-center space-y-3">
              <p className="text-gray-500">Nenhum munícipe encontrado</p>
              <Button 
                onClick={() => {
                  setIsOpen(false);
                  onNewCitizenClick?.();
                }}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Novo munícipe
              </Button>
            </div>
          ) : value.trim() && (
            <div className="p-4 text-center">
              <p className="text-gray-500">Digite para buscar munícipes</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
