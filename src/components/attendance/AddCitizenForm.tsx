
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { CitizenRandom } from "@/data/mockCitizensRandom";
import { TeamSearch, Team } from "./TeamSearch";
import { ProfessionalSearch, Professional } from "./ProfessionalSearch";
import { TodayAppointmentsList } from "./TodayAppointmentsList";
import { mockCitizens, DayAppointment, Citizen } from "@/data/mockCitizens";

interface AddCitizenFormProps {
  selectedCitizen: CitizenRandom;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const serviceTypes = [
  { id: 'admin_medicamento', label: 'ADMINISTRAÇÃO DE MEDICAMENTO' },
  { id: 'demanda_espontanea', label: 'DEMANDA ESPONTÂNEA' },
  { id: 'exames', label: 'EXAMES' },
  { id: 'odontologia', label: 'ODONTOLOGIA' },
  { id: 'vacina', label: 'VACINA' },
  { id: 'curativo', label: 'CURATIVO' },
  { id: 'escuta_inicial', label: 'ESCUTA INICIAL' },
  { id: 'nebulizacao', label: 'NEBULIZAÇÃO' },
  { id: 'procedimentos', label: 'PROCEDIMENTOS' }
];

export const AddCitizenForm = ({
  selectedCitizen,
  onClose,
  onSubmit
}: AddCitizenFormProps) => {
  const [showTodayAppointments, setShowTodayAppointments] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<DayAppointment | null>(null);
  const [professionalValue, setProfessionalValue] = useState("");
  const [teamValue, setTeamValue] = useState("");
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Check if citizen has appointments today
  const citizenWithAppointments = mockCitizens.find(c => c.id === selectedCitizen.id);
  const hasAppointments = citizenWithAppointments?.todayAppointments && citizenWithAppointments.todayAppointments.length > 0;

  const handleAppointmentSelect = (appointment: DayAppointment, citizen: Citizen) => {
    setSelectedAppointment(appointment);
    setProfessionalValue(appointment.professional);
    setTeamValue(appointment.team);
    // Preenche automaticamente o tipo de serviço para demandas agendadas
    setSelectedServiceTypes(appointment.serviceType);
    setShowTodayAppointments(false);
  };

  const handleProfessionalSelect = (professional: Professional) => {
    setSelectedProfessional(professional);
    setProfessionalValue(professional.name);
    setTeamValue(professional.team);
    setSelectedTeam({
      id: professional.id,
      name: professional.team,
      ine: professional.ine
    });
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setTeamValue(team.name);
  };

  const handleServiceTypeChange = (serviceId: string, checked: boolean) => {
    setSelectedServiceTypes(prev => 
      checked 
        ? [...prev, serviceId]
        : prev.filter(id => id !== serviceId)
    );
  };

  const handleSubmit = () => {
    const formData = {
      citizen: selectedCitizen,
      appointment: selectedAppointment,
      professional: selectedProfessional,
      team: selectedTeam,
      serviceTypes: selectedServiceTypes
    };
    onSubmit(formData);
  };

  const handleClear = () => {
    setProfessionalValue("");
    setTeamValue("");
    setSelectedServiceTypes([]);
    setSelectedProfessional(null);
    setSelectedTeam(null);
    setSelectedAppointment(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Munícipe *</Label>
          <div className="mt-1 p-3 bg-gray-50 rounded-md border">
            <span className="font-medium text-gray-900">{selectedCitizen.name}</span>
          </div>
        </div>

        {hasAppointments && (
          <div>
            <Label className="text-sm font-medium">Próximo agendamento do dia</Label>
            <div className="mt-1 relative">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => setShowTodayAppointments(!showTodayAppointments)}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  {selectedAppointment ? (
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{selectedAppointment.time}</span>
                        <span className="text-sm text-gray-600">- {selectedAppointment.professional}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {selectedAppointment.team} • {selectedAppointment.serviceType.join(", ")}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500">Selecionar agendamento</span>
                  )}
                </div>
              </Button>
              <TodayAppointmentsList
                onAppointmentSelect={handleAppointmentSelect}
                isOpen={showTodayAppointments}
                onClose={() => setShowTodayAppointments(false)}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Profissional</Label>
            <div className="mt-1">
              <ProfessionalSearch
                value={professionalValue}
                onChange={setProfessionalValue}
                onProfessionalSelect={handleProfessionalSelect}
                disabled={!!selectedAppointment}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Equipe</Label>
            <div className="mt-1">
              <TeamSearch
                value={teamValue}
                onChange={setTeamValue}
                onTeamSelect={handleTeamSelect}
                disabled={!!selectedAppointment}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium">Tipo de serviço</Label>
            <Badge variant="outline" className="text-xs">
              Ocultar ({serviceTypes.length - selectedServiceTypes.length})
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {serviceTypes.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={service.id}
                  checked={selectedServiceTypes.includes(service.id)}
                  onCheckedChange={(checked) => 
                    handleServiceTypeChange(service.id, checked as boolean)
                  }
                  disabled={!!selectedAppointment}
                />
                <Label
                  htmlFor={service.id}
                  className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {service.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={!!selectedAppointment}
        >
          Limpar
        </Button>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};
