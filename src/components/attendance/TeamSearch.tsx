
import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users } from "lucide-react";

export interface Team {
  id: string;
  name: string;
  ine: string;
}

const mockTeams: Team[] = [
  {
    id: "team_1",
    name: "Equipe APS 1",
    ine: "INE001"
  },
  {
    id: "team_2", 
    name: "Equipe APS 2",
    ine: "INE002"
  },
  {
    id: "team_3",
    name: "Equipe APS 3", 
    ine: "INE003"
  },
  {
    id: "team_4",
    name: "Equipe Saúde da Família Centro",
    ine: "INE004"
  },
  {
    id: "team_5",
    name: "Equipe Saúde da Família Bairro Norte",
    ine: "INE005"
  }
];

interface TeamSearchProps {
  value: string;
  onChange: (value: string) => void;
  onTeamSelect?: (team: Team) => void;
}

export const TeamSearch = ({ 
  value, 
  onChange, 
  onTeamSelect
}: TeamSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredTeams = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase().trim();
    return mockTeams.filter(team => 
      team.name.toLowerCase().includes(term) ||
      team.ine.toLowerCase().includes(term)
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
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleTeamSelect = (team: Team) => {
    onChange(team.name);
    setSearchTerm(team.name);
    setIsOpen(false);
    onTeamSelect?.(team);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Nome da equipe"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10"
        />
      </div>

      {isOpen && filteredTeams.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2 space-y-2">
            {filteredTeams.map((team) => (
              <Card 
                key={team.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleTeamSelect(team)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {team.name}
                      </h4>
                      
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs px-2 py-0.5">
                          INE: {team.ine}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
