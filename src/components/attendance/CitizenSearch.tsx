
import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, User, Plus, Calendar } from "lucide-react";
import { mockRandomCitizens, CitizenRandom } from "@/data/mockCitizensRandom";
import { mockCitizens } from "@/data/mockCitizens";

interface CitizenSearchProps {
  value: string;
  onChange: (value: string) => void;
  onCitizenSelect?: (citizen: CitizenRandom) => void;
  onNewCitizen?: () => void;
}

export const CitizenSearch = ({ 
  value, 
  onChange, 
  onCitizenSelect,
  onNewCitizen 
}: CitizenSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Get citizens with today's appointments (15 citizens)
  const citizensWithAppointments = useMemo(() => {
    return mockCitizens
      .filter(citizen => citizen.todayAppointments && citizen.todayAppointments.length > 0)
      .slice(0, 15)
      .map(citizen => {
        // Map to CitizenRandom format
        const randomCitizen = mockRandomCitizens.find(rc => rc.id === citizen.id);
        return randomCitizen || {
          id: citizen.id,
          name: citizen.name,
          cpf: citizen.cpf,
          cns: citizen.cns || "000000000000000",
          prontuario: citizen.prontuario,
          birthDate: citizen.birthDate,
          age: typeof citizen.age === 'string' ? citizen.age : `${citizen.age} anos`
        } as CitizenRandom;
      });
  }, []);

  const filteredCitizens = useMemo(() => {
    if (!searchTerm.trim()) {
      // Show citizens with appointments first, then regular citizens
      const remainingCitizens = mockRandomCitizens.filter(
        citizen => !citizensWithAppointments.find(c => c.id === citizen.id)
      );
      return [...citizensWithAppointments, ...remainingCitizens];
    }
    
    const term = searchTerm.toLowerCase().trim();
    return mockRandomCitizens.filter(citizen => 
      citizen.name.toLowerCase().includes(term) ||
      citizen.cpf.includes(term) ||
      citizen.cns.includes(term) ||
      citizen.prontuario.toLowerCase().includes(term) ||
      citizen.birthDate.includes(term)
    );
  }, [searchTerm, citizensWithAppointments]);

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

  const handleCitizenSelect = (citizen: CitizenRandom) => {
    onChange(citizen.name);
    setSearchTerm(citizen.name);
    setIsOpen(false);
    onCitizenSelect?.(citizen);
  };

  const hasAppointment = (citizenId: string) => {
    return citizensWithAppointments.find(c => c.id === citizenId);
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
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-96 overflow-auto">
          {filteredCitizens.length > 0 ? (
            <div className="p-2 space-y-2">
              {!searchTerm.trim() && citizensWithAppointments.length > 0 && (
                <>
                  <p className="text-xs font-medium text-blue-600 mb-2 px-2 border-b pb-2">
                    Próximos agendamentos do dia ({citizensWithAppointments.length})
                  </p>
                  {citizensWithAppointments.map((citizen) => (
                    <Card 
                      key={citizen.id}
                      className="cursor-pointer hover:bg-blue-50 transition-colors border-blue-200"
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
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-gray-900 truncate">
                                {citizen.name}
                              </h4>
                              <Badge variant="outline" className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border-green-200">
                                <Calendar className="w-3 h-3 mr-1" />
                                Agendamento do dia
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                              <div>CPF: {citizen.cpf}</div>
                              <div>CNS: {citizen.cns}</div>
                              <div>Prontuário: {citizen.prontuario}</div>
                              <div>Nasc: {citizen.birthDate}</div>
                            </div>
                            
                            <div className="mt-1">
                              <span className="text-xs text-gray-500">{citizen.age}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <p className="text-xs font-medium text-gray-600 mb-2 px-2 border-b pb-2 mt-4">
                    Outros munícipes
                  </p>
                </>
              )}
              
              {searchTerm.trim() && (
                <p className="text-xs font-medium text-gray-600 mb-2 px-2 border-b pb-2">
                  Resultados da busca
                </p>
              )}
              
              {filteredCitizens
                .filter(citizen => searchTerm.trim() || !hasAppointment(citizen.id))
                .map((citizen) => (
                <Card 
                  key={citizen.id}
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
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900 truncate">
                            {citizen.name}
                          </h4>
                          {hasAppointment(citizen.id) && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border-green-200">
                              <Calendar className="w-3 h-3 mr-1" />
                              Agendamento do dia
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                          <div>CPF: {citizen.cpf}</div>
                          <div>CNS: {citizen.cns}</div>
                          <div>Prontuário: {citizen.prontuario}</div>
                          <div>Nasc: {citizen.birthDate}</div>
                        </div>
                        
                        <div className="mt-1">
                          <span className="text-xs text-gray-500">{citizen.age}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-gray-500 mb-3">Nenhum registro encontrado</p>
              <Button 
                onClick={onNewCitizen}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Novo munícipe
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
