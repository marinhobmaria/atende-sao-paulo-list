import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CitizenOnlySearch } from "./CitizenOnlySearch";
import { ProfessionalSearch, Professional } from "./ProfessionalSearch";
import { TeamSearch, Team } from "./TeamSearch";
import { Citizen, DayAppointment, addCitizenToQueue, attendanceQueue } from "@/data/mockCitizens";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface AddCitizenProps {
  showAddCitizen: boolean;
  setShowAddCitizen: (show: boolean) => void;
}

export const AddCitizen = ({ showAddCitizen, setShowAddCitizen }: AddCitizenProps) => {
  const [citizen, setCitizen] = useState("");
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [professional, setProfessional] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [team, setTeam] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [isFromAppointment, setIsFromAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<DayAppointment | null>(null);
  const [showServiceTypes, setShowServiceTypes] = useState(false);
  const { toast } = useToast();

  const serviceTypeOptions = [
    "ADMINISTRAÇÃO DE MEDICAMENTO",
    "CURATIVO",
    "DEMANDA ESPONTÂNEA", 
    "ESCUTA INICIAL",
    "EXAMES",
    "NEBULIZAÇÃO",
    "ODONTOLOGIA",
    "PROCEDIMENTOS",
    "VACINA"
  ];

  const clearFields = () => {
    setCitizen("");
    setSelectedCitizen(null);
    setProfessional("");
    setSelectedProfessional(null);
    setTeam("");
    setSelectedTeam(null);
    setServiceTypes([]);
    setIsFromAppointment(false);
    setSelectedAppointment(null);
    setShowServiceTypes(false);
  };

  const clearCitizen = () => {
    setCitizen("");
    setSelectedCitizen(null);
    setSelectedAppointment(null);
    setIsFromAppointment(false);
    setProfessional("");
    setSelectedProfessional(null);
    setTeam("");
    setSelectedTeam(null);
    setServiceTypes([]);
  };

  const clearProfessional = () => {
    setProfessional("");
    setSelectedProfessional(null);
  };

  const clearTeam = () => {
    setTeam("");
    setSelectedTeam(null);
  };

  const clearAppointment = () => {
    setSelectedAppointment(null);
    setIsFromAppointment(false);
    setProfessional("");
    setSelectedProfessional(null);
    setTeam("");
    setSelectedTeam(null);
    setServiceTypes([]);
  };

  const handleServiceTypeChange = (serviceType: string, checked: boolean) => {
    if (checked) {
      setServiceTypes([...serviceTypes, serviceType]);
    } else {
      setServiceTypes(serviceTypes.filter(type => type !== serviceType));
    }
  };

  const handleCitizenSelect = (citizenData: Citizen) => {
    setSelectedCitizen(citizenData);
    setCitizen(citizenData.name);
    setIsFromAppointment(false);
    setSelectedAppointment(null);
    
    // Clear professional and team fields to allow manual input
    setProfessional("");
    setSelectedProfessional(null);
    setTeam("");
    setSelectedTeam(null);
    setServiceTypes([]);
  };

  const handleSpecificAppointmentSelect = (appointmentId: string) => {
    if (selectedCitizen && selectedCitizen.todayAppointments) {
      const appointment = selectedCitizen.todayAppointments.find(apt => apt.id === appointmentId);
      if (appointment) {
        setSelectedAppointment(appointment);
        setProfessional(appointment.professional);
        setTeam(appointment.team);
        setServiceTypes(appointment.serviceType);
        setIsFromAppointment(true);
      }
    }
  };

  const handleProfessionalSelect = (professionalData: Professional) => {
    setSelectedProfessional(professionalData);
    setProfessional(professionalData.name);
    // Auto-select the team if professional has one
    if (professionalData.team) {
      setTeam(professionalData.team);
      const teamData = {
        id: professionalData.ine,
        name: professionalData.team,
        ine: professionalData.ine
      };
      setSelectedTeam(teamData);
    }
  };

  const handleTeamSelect = (teamData: Team) => {
    setSelectedTeam(teamData);
    setTeam(teamData.name);
  };

  const handleNewCitizen = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Cadastro de novo munícipe será implementado em breve",
    });
  };

  const handleAddCitizen = () => {
    if (!citizen.trim()) {
      toast({
        title: "Erro",
        description: "O campo Munícipe é obrigatório",
        variant: "destructive"
      });
      return;
    }

    if (selectedCitizen) {
      const queueItem = addCitizenToQueue(
        selectedCitizen,
        professional || "Não informado",
        team || "Não informado",
        serviceTypes.length > 0 ? serviceTypes : ["DEMANDA ESPONTÂNEA"],
        selectedAppointment || undefined
      );

      toast({
        title: "✅ Munícipe foi adicionado com sucesso",
        description: `${citizen} foi adicionado à fila de atendimento`
      });

      clearFields();
      setShowAddCitizen(false);
    }
  };

  const queueCount = attendanceQueue.length;
  const waitingCount = attendanceQueue.filter(item => item.status === "waiting").length;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            Fila: {queueCount}
          </Badge>
          <Badge variant="outline" className="text-green-600 border-green-200">
            Aguardando: {waitingCount}
          </Badge>
        </div>
        <Button
          onClick={() => setShowAddCitizen(!showAddCitizen)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          variant={showAddCitizen ? "outline" : "default"}
          size="sm"
        >
          {showAddCitizen ? (
            <>
              <X className="h-4 w-4" />
              Cancelar
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Adicionar Munícipe
            </>
          )}
        </Button>
      </div>

      {showAddCitizen && (
        <div className="px-3 pb-3 space-y-3">
          {/* Munícipe Search */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Munícipe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <CitizenOnlySearch
                value={citizen}
                onChange={setCitizen}
                onCitizenSelect={handleCitizenSelect}
                onNewCitizen={handleNewCitizen}
              />
              {citizen.trim() && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearCitizen}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Show appointment field only if citizen has appointments */}
          {selectedCitizen && selectedCitizen.todayAppointments && selectedCitizen.todayAppointments.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-1 block">Próximo agendamento do dia</label>
              
              {selectedCitizen.todayAppointments.length === 1 ? (
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-left font-normal h-9"
                    onClick={() => {
                      if (selectedAppointment) {
                        clearAppointment();
                      } else {
                        const appointment = selectedCitizen.todayAppointments![0];
                        setSelectedAppointment(appointment);
                        setProfessional(appointment.professional);
                        setTeam(appointment.team);
                        setServiceTypes(appointment.serviceType);
                        setIsFromAppointment(true);
                      }
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedAppointment 
                      ? `${selectedAppointment.time} - ${selectedAppointment.professional}`
                      : `${selectedCitizen.todayAppointments[0].time} - ${selectedCitizen.todayAppointments[0].professional}`
                    }
                  </Button>
                  {selectedAppointment && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearAppointment}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <Select onValueChange={handleSpecificAppointmentSelect} value={selectedAppointment?.id || ""}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Selecione um agendamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCitizen.todayAppointments.map((appointment) => (
                        <SelectItem key={appointment.id} value={appointment.id}>
                          {appointment.time} - {appointment.professional}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedAppointment && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearAppointment}
                      className="absolute right-8 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 z-10"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Show other fields only when citizen is selected */}
          {selectedCitizen && (
            <>
              {/* Profissional e Equipe */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">Profissional</label>
                  <div className="relative">
                    <ProfessionalSearch
                      value={professional}
                      onChange={setProfessional}
                      onProfessionalSelect={handleProfessionalSelect}
                      disabled={isFromAppointment}
                    />
                    {professional.trim() && !isFromAppointment && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearProfessional}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Equipe</label>
                  <div className="relative">
                    <TeamSearch
                      value={team}
                      onChange={setTeam}
                      onTeamSelect={handleTeamSelect}
                      disabled={isFromAppointment}
                    />
                    {team.trim() && !isFromAppointment && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearTeam}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Tipo de Serviço - Compacto */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium">Tipo de serviço</label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowServiceTypes(!showServiceTypes)}
                    className="h-6 text-xs"
                  >
                    {showServiceTypes ? "Ocultar" : "Mostrar"} ({serviceTypes.length})
                  </Button>
                </div>
                
                {serviceTypes.length > 0 && !showServiceTypes && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {serviceTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                )}

                {showServiceTypes && (
                  <div className="grid grid-cols-2 gap-1 max-h-24 overflow-y-auto border rounded p-2">
                    {serviceTypeOptions.map((serviceType) => (
                      <div key={serviceType} className="flex items-center space-x-2">
                        <Checkbox
                          checked={serviceTypes.includes(serviceType)}
                          onCheckedChange={(checked) => handleServiceTypeChange(serviceType, checked as boolean)}
                          disabled={isFromAppointment}
                        />
                        <span className="text-xs">{serviceType}</span>
                      </div>
                    ))}
                  </div>
                )}
                {isFromAppointment && (
                  <p className="text-xs text-blue-600 mt-1">
                    Preenchido automaticamente pelo agendamento
                  </p>
                )}
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={clearFields} size="sm">
              Limpar
            </Button>
            <Button onClick={handleAddCitizen} size="sm" className="bg-blue-600 hover:bg-blue-700">
              Adicionar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
