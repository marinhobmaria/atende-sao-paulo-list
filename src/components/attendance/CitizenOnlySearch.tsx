
import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, User, Plus, AlertCircle } from "lucide-react";
import { mockCitizens, Citizen } from "@/data/mockCitizens";

interface CitizenOnlySearchProps {
  value: string;
  onChange: (value: string) => void;
  onCitizenSelect?: (citizen: Citizen) => void;
  onNewCitizen?: () => void;
  citizensInQueue?: string[];
}

const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate.split('/').reverse().join('-'));
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
  
  return `${years} anos, ${months} meses, ${days} dias`;
};

export const CitizenOnlySearch = ({ 
  value, 
  onChange, 
  onCitizenSelect,
  onNewCitizen,
  citizensInQueue = []
}: CitizenOnlySearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredCitizens = useMemo(() => {
    if (!value.trim()) return [];
    
    const term = value.toLowerCase().trim();
    return mockCitizens.filter(citizen => 
      citizen.name.toLowerCase().includes(term) ||
      citizen.cpf.includes(term) ||
      citizen.cns.includes(term) ||
      citizen.prontuario.includes(term) ||
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
    onChange(newValue);
    setIsOpen(true);
  };

  const handleCitizenSelect = (citizen: Citizen) => {
    const isInQueue = citizensInQueue.includes(citizen.name);
    
    if (isInQueue) {
      return; // Block selection
    }
    
    onChange(citizen.name);
    setIsOpen(false);
    onCitizenSelect?.(citizen);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Nome, CPF, CNS, Número do prontuário ou data de nascimento"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-8"
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-80 overflow-auto">
          {filteredCitizens.length > 0 ? (
            <div className="p-2 space-y-2">
              <p className="text-xs font-medium text-gray-600 mb-2 px-2 border-b pb-2">
                Resultados da busca
              </p>
              {filteredCitizens.map((citizen) => {
                const isInQueue = citizensInQueue.includes(citizen.name);
                
                return (
                  <Card 
                    key={citizen.id}
                    className={`cursor-pointer transition-colors ${
                      isInQueue 
                        ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleCitizenSelect(citizen)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isInQueue ? 'bg-gray-200' : 'bg-blue-100'
                          }`}>
                            {isInQueue ? (
                              <AlertCircle className="w-5 h-5 text-gray-500" />
                            ) : (
                              <User className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className={`font-medium truncate ${
                              isInQueue ? 'text-gray-500' : 'text-gray-900'
                            }`}>
                              {citizen.name}
                            </h4>
                            {isInQueue && (
                              <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                                Já inserido na fila
                              </Badge>
                            )}
                          </div>
                          
                          <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex justify-between">
                              <span>CNS: {citizen.cns}</span>
                              <span>CPF: {citizen.cpf}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Nasc: {citizen.birthDate}</span>
                              <span className="text-blue-600 font-medium">
                                ({calculateAge(citizen.birthDate)})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : value.trim() && (
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
