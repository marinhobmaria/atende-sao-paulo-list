
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Plus } from "lucide-react";
import { CitizenSearch } from "./CitizenSearch";
import { ProfessionalSearch } from "./ProfessionalSearch";
import { TeamSearch } from "./TeamSearch";
import { TodayAppointmentsList } from "./TodayAppointmentsList";
import { Citizen, DayAppointment, addCitizenToQueue, mockAttendanceQueue } from "@/data/mockCitizens";
import { useToast } from "@/hooks/use-toast";

interface AddCitizenProps {
  queueCount: number;
  waitingCount: number;
}

export const AddCitizen = ({ queueCount, waitingCount }: AddCitizenProps) => {
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<DayAppointment | null>(null);
  const { toast } = useToast();

  const handleAddToQueue = () => {
    if (!selectedCitizen || !selectedProfessional || !selectedTeam) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione o cidadão, profissional e equipe",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicates
    const isDuplicate = mockAttendanceQueue.some(item => 
      item.citizen.cpf === selectedCitizen.cpf && 
      (item.status === "waiting" || item.status === "in-service" || item.status === "initial-listening" || item.status === "vaccination")
    );

    if (isDuplicate) {
      toast({
        title: "Cidadão já está na fila",
        description: "Este cidadão já possui um atendimento ativo na fila",
        variant: "destructive"
      });
      return;
    }

    try {
      const newQueueItem = addCitizenToQueue(
        selectedCitizen,
        selectedProfessional,
        selectedTeam,
        serviceTypes.length > 0 ? serviceTypes : ["DEMANDA ESPONTÂNEA"],
        selectedAppointment || undefined
      );

      toast({
        title: "Cidadão adicionado à fila",
        description: `${selectedCitizen.name} foi incluído na fila de atendimento`
      });

      // Reset form
      setSelectedCitizen(null);
      setSelectedProfessional("");
      setSelectedTeam("");
      setServiceTypes([]);
      setSelectedAppointment(null);
    } catch (error) {
      toast({
        title: "Erro ao adicionar à fila",
        description: "Ocorreu um erro ao incluir o cidadão na fila",
        variant: "destructive"
      });
    }
  };

  const handleAppointmentSelect = (appointment: DayAppointment, citizen: Citizen) => {
    setSelectedCitizen(citizen);
    setSelectedAppointment(appointment);
    setSelectedProfessional(appointment.professional);
    setSelectedTeam(appointment.team);
    setServiceTypes(appointment.serviceType);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Incluir Cidadão na Fila</span>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="bg-white text-blue-700 border-blue-300">
                <Users className="w-3 h-3 mr-1" />
                Fila: {queueCount}
              </Badge>
              <Badge variant="outline" className="bg-white text-green-700 border-green-300">
                <Clock className="w-3 h-3 mr-1" />
                Aguardando: {waitingCount}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <CitizenSearch
              onCitizenSelect={setSelectedCitizen}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAppointments(!showAppointments)}
              className="mt-2 w-full"
            >
              {showAppointments ? "Ocultar" : "Ver"} Agendamentos
            </Button>
            <TodayAppointmentsList
              onAppointmentSelect={handleAppointmentSelect}
              isOpen={showAppointments}
              onClose={() => setShowAppointments(false)}
            />
          </div>
          
          <ProfessionalSearch
            selectedProfessional={selectedProfessional}
            onProfessionalSelect={(professional) => setSelectedProfessional(professional.name)}
            disabled={!!selectedAppointment}
          />
          
          <TeamSearch
            selectedTeam={selectedTeam}
            onTeamSelect={(team) => setSelectedTeam(team.name)}
            disabled={!!selectedAppointment}
          />
          
          <Button
            onClick={handleAddToQueue}
            disabled={!selectedCitizen || !selectedProfessional || !selectedTeam}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Incluir na Fila
          </Button>
        </div>

        {selectedCitizen && (
          <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <Users className="w-4 h-4" />
              <span className="font-medium">Cidadão selecionado:</span>
              <span>{selectedCitizen.name}</span>
            </div>
          </div>
        )}

        {selectedAppointment && (
          <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Agendamento selecionado:</span>
              <span>{selectedAppointment.time} - {selectedAppointment.serviceType.join(", ")}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
