
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { CitizenOnlySearch } from "./CitizenOnlySearch";
import { ProfessionalSearch } from "./ProfessionalSearch";
import { TeamSearch } from "./TeamSearch";
import { ServiceTypeSearch } from "./ServiceTypeSearch";

interface AddCitizenProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

// Mock scheduled appointments
const scheduledAppointments = {
  "Maria Santos Silva": {
    professional: "Dr. João Silva",
    specialty: "Médico Clínico",
    team: "Equipe APS 1",
    date: "26/06/2025",
    time: "14:30"
  },
  "Carlos Pereira Lima": {
    professional: "Dra. Ana Costa",
    specialty: "Enfermeiro",
    team: "Equipe APS 2",
    date: "26/06/2025",
    time: "15:00"
  }
};

export const AddCitizen = ({ open, onOpenChange, queueCount, waitingCount, statusCounts, filters, setFilters }: AddCitizenProps) => {
  const [selectedCitizen, setSelectedCitizen] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [useScheduledAppointment, setUseScheduledAppointment] = useState(false);
  const [scheduledInfo, setScheduledInfo] = useState<any>(null);

  const handleAddCitizen = () => {
    if (selectedCitizen && selectedServiceTypes.length > 0 && (selectedProfessional || selectedTeam)) {
      console.log("Adding citizen to queue:", {
        citizen: selectedCitizen,
        professional: selectedProfessional,
        team: selectedTeam,
        serviceTypes: selectedServiceTypes,
        useScheduledAppointment
      });
      
      // Reset form
      setSelectedCitizen("");
      setSelectedProfessional("");
      setSelectedTeam("");
      setSelectedServiceTypes([]);
      setUseScheduledAppointment(false);
      setScheduledInfo(null);
      onOpenChange(false);
    }
  };

  const clearField = (field: string) => {
    switch (field) {
      case 'citizen':
        setSelectedCitizen("");
        setUseScheduledAppointment(false);
        setScheduledInfo(null);
        break;
      case 'professional':
        setSelectedProfessional("");
        break;
      case 'team':
        setSelectedTeam("");
        break;
      case 'serviceTypes':
        setSelectedServiceTypes([]);
        break;
    }
  };

  const handleCitizenSelect = (citizen: any) => {
    setSelectedCitizen(citizen.name);
    const appointment = scheduledAppointments[citizen.name as keyof typeof scheduledAppointments];
    if (appointment) {
      setScheduledInfo(appointment);
    } else {
      setScheduledInfo(null);
      setUseScheduledAppointment(false);
    }
  };

  const handleUseScheduledAppointment = (checked: boolean) => {
    setUseScheduledAppointment(checked);
    if (checked && scheduledInfo) {
      setSelectedProfessional(scheduledInfo.professional);
      setSelectedTeam(scheduledInfo.team);
    } else {
      setSelectedProfessional("");
      setSelectedTeam("");
    }
  };

  const isFormValid = selectedCitizen && selectedServiceTypes.length > 0 && (selectedProfessional || selectedTeam);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Munícipe à Fila</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
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
                  onCitizenSelect={handleCitizenSelect}
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

            {/* Tipo de Serviço Field */}
            <div className="space-y-2">
              <Label htmlFor="serviceTypes" className="text-sm font-medium">
                Tipo de Serviço *
              </Label>
              <div className="relative">
                <ServiceTypeSearch
                  value={selectedServiceTypes}
                  onChange={setSelectedServiceTypes}
                />
                {selectedServiceTypes.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 z-10"
                    onClick={() => clearField('serviceTypes')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Scheduled Appointment Section */}
          {scheduledInfo && (
            <div className="p-4 bg-blue-50 rounded-lg border">
              <div className="flex items-center space-x-2 mb-3">
                <Checkbox
                  id="useScheduled"
                  checked={useScheduledAppointment}
                  onCheckedChange={handleUseScheduledAppointment}
                />
                <Label htmlFor="useScheduled" className="text-sm font-medium">
                  Usar próximo agendamento
                </Label>
              </div>
              <div className="text-sm text-gray-600">
                <p><span className="font-medium">Profissional:</span> {scheduledInfo.professional}</p>
                <p><span className="font-medium">Especialidade:</span> {scheduledInfo.specialty}</p>
                <p><span className="font-medium">Equipe:</span> {scheduledInfo.team}</p>
                <p><span className="font-medium">Data/Hora:</span> {scheduledInfo.date} às {scheduledInfo.time}</p>
              </div>
              {useScheduledAppointment && (
                <div className="mt-2 text-sm text-blue-600 font-medium">
                  ✓ Profissional e equipe preenchidos automaticamente
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  disabled={useScheduledAppointment}
                />
                {selectedProfessional && !useScheduledAppointment && (
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
                  disabled={useScheduledAppointment}
                />
                {selectedTeam && !useScheduledAppointment && (
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
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCitizen("");
                setSelectedProfessional("");
                setSelectedTeam("");
                setSelectedServiceTypes([]);
                setUseScheduledAppointment(false);
                setScheduledInfo(null);
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
