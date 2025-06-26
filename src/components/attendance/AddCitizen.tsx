
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronUp, X } from "lucide-react";
import { StatusCounters } from "./StatusCounters";
import { CitizenOnlySearch } from "./CitizenOnlySearch";
import { ProfessionalSearch } from "./ProfessionalSearch";
import { TeamSearch } from "./TeamSearch";
import { ServiceTypeSearch } from "./ServiceTypeSearch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddCitizenProps {
  queueCount: number;
  waitingCount: number;
  statusCounts: {
    waiting: number;
    'in-service': number;
    'initial-listening': number;
    vaccination: number;
  };
  filters: any;
  setFilters: (filters: any) => void;
}

// Mock data for citizens already in queue
const citizensInQueue = [
  "João Silva Santos",
  "Maria Oliveira",
  "Ana Costa Lima"
];

export const AddCitizen = ({ queueCount, waitingCount, statusCounts, filters, setFilters }: AddCitizenProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCitizen, setSelectedCitizen] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("");

  const handleAddCitizen = () => {
    if (selectedCitizen && selectedServiceType && (selectedProfessional || selectedTeam)) {
      console.log("Adding citizen to queue:", {
        citizen: selectedCitizen,
        professional: selectedProfessional,
        team: selectedTeam,
        serviceType: selectedServiceType
      });
      
      // Reset form
      setSelectedCitizen("");
      setSelectedProfessional("");
      setSelectedTeam("");
      setSelectedServiceType("");
      setIsExpanded(false);
    }
  };

  const clearField = (field: string) => {
    switch (field) {
      case 'citizen':
        setSelectedCitizen("");
        break;
      case 'professional':
        setSelectedProfessional("");
        break;
      case 'team':
        setSelectedTeam("");
        break;
      case 'serviceType':
        setSelectedServiceType("");
        break;
    }
  };

  const isFormValid = selectedCitizen && selectedServiceType && (selectedProfessional || selectedTeam);

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-3">
              Status da Fila
            </CardTitle>
            <StatusCounters 
              statusCounts={statusCounts}
              filters={filters}
              setFilters={setFilters}
              queueCount={queueCount}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline"
              className="w-full flex items-center justify-between p-4 h-auto"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span className="font-medium">Adicionar Munícipe</span>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Munícipe Field */}
              <div className="space-y-2">
                <Label htmlFor="citizen" className="text-sm font-medium">
                  Munícipe *
                </Label>
                <div className="relative">
                  <CitizenOnlySearch
                    value={selectedCitizen}
                    onChange={setSelectedCitizen}
                    onCitizenSelect={(citizen) => {
                      if (citizensInQueue.includes(citizen.name)) {
                        alert("Já inserido na fila");
                        return;
                      }
                      setSelectedCitizen(citizen.name);
                    }}
                    citizensInQueue={citizensInQueue}
                  />
                  {selectedCitizen && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => clearField('citizen')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Profissional Field */}
              <div className="space-y-2">
                <Label htmlFor="professional" className="text-sm font-medium">
                  Profissional
                </Label>
                <div className="relative">
                  <ProfessionalSearch
                    value={selectedProfessional}
                    onChange={setSelectedProfessional}
                    onProfessionalSelect={(professional) => {
                      setSelectedProfessional(professional.name);
                      setSelectedTeam(""); // Clear team when professional is selected
                    }}
                  />
                  {selectedProfessional && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 z-10"
                      onClick={() => clearField('professional')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Equipe Field */}
              <div className="space-y-2">
                <Label htmlFor="team" className="text-sm font-medium">
                  Equipe
                </Label>
                <div className="relative">
                  <TeamSearch
                    value={selectedTeam}
                    onChange={setSelectedTeam}
                    onTeamSelect={(team) => {
                      setSelectedTeam(team.name);
                      setSelectedProfessional(""); // Clear professional when team is selected
                    }}
                  />
                  {selectedTeam && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 z-10"
                      onClick={() => clearField('team')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Tipo de Serviço Field */}
              <div className="space-y-2">
                <Label htmlFor="serviceType" className="text-sm font-medium">
                  Tipo de Serviço *
                </Label>
                <div className="relative">
                  <ServiceTypeSearch
                    value={selectedServiceType}
                    onChange={setSelectedServiceType}
                    onServiceTypeSelect={(serviceType) => {
                      setSelectedServiceType(serviceType.name);
                    }}
                  />
                  {selectedServiceType && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 z-10"
                      onClick={() => clearField('serviceType')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCitizen("");
                  setSelectedProfessional("");
                  setSelectedTeam("");
                  setSelectedServiceType("");
                }}
              >
                Limpar
              </Button>
              <Button 
                onClick={handleAddCitizen}
                disabled={!isFormValid}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Adicionar à Fila
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
