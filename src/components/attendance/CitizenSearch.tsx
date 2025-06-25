import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, User, Plus, Clock } from "lucide-react";
import { mockCitizens, mockDayAppointments, Citizen, DayAppointment } from "@/data/mockCitizens";

interface CitizenSearchProps {
  value: string;
  onChange: (value: string) => void;
  onCitizenSelect?: (citizen: Citizen) => void;
  onAppointmentSelect?: (appointment: DayAppointment, citizen: Citizen) => void;
  onNewCitizen?: () => void;
}

export const CitizenSearch = ({ 
  value, 
  onChange, 
  onCitizenSelect,
  onAppointmentSelect,
  onNewCitizen 
}: CitizenSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredCitizens = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase().trim();
    return mockCitizens.filter(citizen => 
      citizen.name.toLowerCase().includes(term) ||
      citizen.cpf.includes(term) ||
      citizen.cns.includes(term) ||
      citizen.prontuario.includes(term) ||
      citizen.birthDate.includes(term)
    );
  }, [searchTerm]);

  const citizenAppointments = useMemo(() => {
    return filteredCitizens.map(citizen => {
      const appointments = mockDayAppointments.filter(apt => apt.citizenId === citizen.id);
      return { citizen, appointments };
    });
  }, [filteredCitizens]);

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
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleCitizenSelect = (citizen: Citizen) => {
    onChange(citizen.name);
    setSearchTerm(citizen.name);
    setIsOpen(false);
    onCitizenSelect?.(citizen);
  };

  const handleAppointmentSelect = (appointment: DayAppointment, citizen: Citizen) => {
    onChange(citizen.name);
    setSearchTerm(citizen.name);
    setIsOpen(false);
    onAppointmentSelect?.(appointment, citizen);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Nome, CPF, CNS, Número do prontuário ou data de nascimento"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10"
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-80 overflow-auto">
          {citizenAppointments.length > 0 ? (
            <div className="p-2 space-y-2">
              {citizenAppointments.map(({ citizen, appointments }) => (
                <div key={citizen.id}>
                  {/* Show appointments first if available */}
                  {appointments.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-gray-600 mb-1 px-2">
                        Próximos agendamentos do dia
                      </p>
                      {appointments.map((appointment) => (
                        <Card 
                          key={appointment.id} 
                          className="cursor-pointer hover:bg-blue-50 transition-colors border-blue-200"
                          onClick={() => handleAppointmentSelect(appointment, citizen)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-blue-900">{appointment.time}</span>
                                    <span className="text-sm text-gray-700">- {citizen.name}</span>
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {appointment.professional}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {/* Regular citizen card */}
                  <Card 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleCitizenSelect(citizen)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {citizen.name}
                          </h4>
                          
                          <div className="mt-1 flex flex-wrap gap-1 text-xs">
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              CPF: {citizen.cpf}
                            </Badge>
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              CNS: {citizen.cns}
                            </Badge>
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              Prontuário: {citizen.prontuario}
                            </Badge>
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              Nasc: {citizen.birthDate}
                            </Badge>
                            <Badge variant="outline" className="text-xs px-2 py-0.5">
                              {citizen.age} anos
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : searchTerm.trim() && (
            <div className="p-4 text-center">
              <p className="text-gray-500 mb-3">Nenhum registro encontrado</p>
              <Button 
                onClick={onNewCitizen}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Novo munícipe (adicionar)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
