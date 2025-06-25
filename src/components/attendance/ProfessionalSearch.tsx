
import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, User } from "lucide-react";

export interface Professional {
  id: string;
  name: string;
  cpf: string;
  specialty: string;
  team: string;
  ine: string;
}

const mockProfessionals: Professional[] = [
  {
    id: "prof_1",
    name: "Dr. João Silva",
    cpf: "123.456.789-00",
    specialty: "Médico clínico",
    team: "Equipe APS 1",
    ine: "INE123"
  },
  {
    id: "prof_2",
    name: "Dra. Maria Santos",
    cpf: "987.654.321-00",
    specialty: "Enfermeiro",
    team: "Equipe APS 2",
    ine: "INE456"
  },
  {
    id: "prof_3",
    name: "Enf. Ana Costa",
    cpf: "456.789.123-00",
    specialty: "Médico generalista",
    team: "Equipe APS 3",
    ine: "INE789"
  },
  {
    id: "prof_4",
    name: "Dr. Carlos Oliveira",
    cpf: "111.222.333-44",
    specialty: "Médico clínico",
    team: "Equipe APS 1",
    ine: "INE124"
  },
  {
    id: "prof_5",
    name: "Dra. Fernanda Lima",
    cpf: "555.666.777-88",
    specialty: "Enfermeiro",
    team: "Equipe APS 4",
    ine: "INE457"
  }
];

interface ProfessionalSearchProps {
  value: string;
  onChange: (value: string) => void;
  onProfessionalSelect?: (professional: Professional) => void;
  disabled?: boolean;
}

export const ProfessionalSearch = ({ 
  value, 
  onChange, 
  onProfessionalSelect,
  disabled = false
}: ProfessionalSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredProfessionals = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase().trim();
    return mockProfessionals.filter(professional => 
      professional.name.toLowerCase().includes(term) ||
      professional.cpf.includes(term) ||
      professional.specialty.toLowerCase().includes(term) ||
      professional.team.toLowerCase().includes(term)
    );
  }, [searchTerm]);

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
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleProfessionalSelect = (professional: Professional) => {
    onChange(professional.name);
    setSearchTerm(professional.name);
    setIsOpen(false);
    onProfessionalSelect?.(professional);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={disabled ? "Preenchido automaticamente" : "Nome, CPF, especialidade ou equipe"}
          value={disabled ? value : searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => !disabled && setIsOpen(true)}
          className="pl-10"
          disabled={disabled}
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredProfessionals.length > 0 ? (
            <div className="p-2 space-y-2">
              {filteredProfessionals.map((professional) => (
                <Card 
                  key={professional.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleProfessionalSelect(professional)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {professional.name}
                        </h4>
                        
                        <div className="mt-1 flex flex-wrap gap-1 text-xs">
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            CPF: {professional.cpf}
                          </Badge>
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            {professional.specialty}
                          </Badge>
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            {professional.team}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchTerm.trim() && (
            <div className="p-4 text-center">
              <p className="text-gray-500">Nenhum profissional encontrado</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
