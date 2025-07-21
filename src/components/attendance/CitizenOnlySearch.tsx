
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, User, Calendar, Search, UserPlus } from "lucide-react";
import { AddPatientModal } from "./AddPatientModal";

// Mock citizen data with birth dates for age calculation and mother names
const mockCitizens = [
  {
    name: "Maria Silva Santos",
    cpf: "123.456.789-01",
    cns: "701234567890123",
    birthDate: "1980-03-15",
    motherName: "Ana Paula Santos",
    hasScheduledAppointment: false
  },
  {
    name: "João Oliveira Costa",
    cpf: "987.654.321-09",
    cns: "701987654321098",
    birthDate: "1975-08-22",
    motherName: "Carmem Oliveira Costa",
    hasScheduledAppointment: false
  },
  {
    name: "Maria Santos Silva",
    cpf: "456.789.123-45",
    cns: "701456789123456",
    birthDate: "1990-11-08",
    motherName: "José Silva Santos",
    hasScheduledAppointment: true
  },
  {
    name: "Carlos Pereira Lima",
    cpf: "789.123.456-78",
    cns: "701789123456789",
    birthDate: "1985-05-12",
    motherName: "Rosa Pereira Lima",
    hasScheduledAppointment: true
  },
  {
    name: "Ana Costa Ferreira",
    cpf: "321.654.987-32",
    cns: "701321654987321",
    birthDate: "1992-01-30",
    motherName: "Lucia Costa Ferreira",
    hasScheduledAppointment: false
  }
];

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

interface CitizenOnlySearchProps {
  value: string;
  onChange: (value: string) => void;
  onCitizenSelect?: (citizen: any) => void;
  citizensInQueue?: string[];
}

export const CitizenOnlySearch = ({ 
  value, 
  onChange, 
  onCitizenSelect,
  citizensInQueue = []
}: CitizenOnlySearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCitizens = mockCitizens.filter(citizen => {
    const searchLower = searchTerm.toLowerCase();
    return (
      citizen.name.toLowerCase().includes(searchLower) ||
      citizen.cpf.includes(searchTerm) ||
      citizen.cns.includes(searchTerm) ||
      citizen.birthDate.includes(searchTerm)
    );
  });

  const handleCitizenSelect = (citizen: any) => {
    onChange(citizen.name);
    onCitizenSelect?.(citizen);
    setIsOpen(false);
    setSearchTerm("");
  };

  const isCitizenInQueue = (citizenName: string) => {
    return citizensInQueue.includes(citizenName);
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
            <span className={value ? "text-foreground" : "text-muted-foreground"}>
              {value || "Pesquise ou selecione um munícipe"}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0" align="start">
        <div className="p-3 border-b">
          <Input
            placeholder="Pesquise ou selecione por nome, CPF, CNS ou data de nascimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm"
          />
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {filteredCitizens.map((citizen) => {
            const isInQueue = isCitizenInQueue(citizen.name);
            const age = calculateAge(citizen.birthDate);
            
            return (
              <div
                key={citizen.cpf}
                className={`p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 ${
                  isInQueue ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => !isInQueue && handleCitizenSelect(citizen)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-sm">{citizen.name}</span>
                      {citizen.hasScheduledAppointment && (
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          Agendamento hoje
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>CNS: {citizen.cns}</div>
                      <div>CPF: {citizen.cpf}</div>
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
              </div>
            );
          })}
        </div>
        
        {filteredCitizens.length === 0 && searchTerm.trim() && (
          <div className="p-4 text-center space-y-3">
            <p className="text-sm text-gray-500 mb-3">Nenhum munícipe encontrado</p>
            <Button 
              onClick={() => {
                setShowAddModal(true);
                setIsOpen(false); // Fechar popover
              }}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Cadastrar Munícipe
            </Button>
          </div>
        )}
      </PopoverContent>

      {/* Modal de Cadastro */}
      <AddPatientModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        skipSearch={true}
        initialName={searchTerm}
        onPatientAdded={() => {
          console.log("Paciente cadastrado com sucesso");
        }}
      />
    </Popover>
  );
};
