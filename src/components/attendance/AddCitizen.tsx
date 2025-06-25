
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CitizenSearch } from "./CitizenSearch";
import { Citizen, DayAppointment } from "@/data/mockCitizens";

interface AddCitizenProps {
  showAddCitizen: boolean;
  setShowAddCitizen: (show: boolean) => void;
}

export const AddCitizen = ({ showAddCitizen, setShowAddCitizen }: AddCitizenProps) => {
  const [citizen, setCitizen] = useState("");
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [professional, setProfessional] = useState("");
  const [team, setTeam] = useState("");
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [isFromAppointment, setIsFromAppointment] = useState(false);
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

  const professionals = [
    { name: "Dr. João Silva", cpf: "123.456.789-00", cbo: "225125 - Médico clínico", ine: "INE123" },
    { name: "Dra. Maria Santos", cpf: "987.654.321-00", cbo: "223505 - Enfermeiro", ine: "INE456" },
    { name: "Enf. Ana Costa", cpf: "456.789.123-00", cbo: "225142 - Médico generalista", ine: "INE789" }
  ];

  const teams = ["Equipe APS 1", "Equipe APS 2", "Equipe APS 3"];

  const clearFields = () => {
    setCitizen("");
    setSelectedCitizen(null);
    setProfessional("");
    setTeam("");
    setServiceTypes([]);
    setIsFromAppointment(false);
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
  };

  const handleAppointmentSelect = (appointment: DayAppointment, citizenData: Citizen) => {
    setSelectedCitizen(citizenData);
    setCitizen(citizenData.name);
    setProfessional(appointment.professional);
    setTeam(appointment.team);
    setServiceTypes(appointment.serviceType);
    setIsFromAppointment(true);
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

    toast({
      title: "✅ Munícipe foi adicionado com sucesso",
      description: `${citizen} foi adicionado à fila de atendimento`
    });

    clearFields();
    setShowAddCitizen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-end p-3">
        <Button
          onClick={() => setShowAddCitizen(!showAddCitizen)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          variant={showAddCitizen ? "outline" : "default"}
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
          {/* Munícipe com busca */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Munícipe <span className="text-red-500">*</span>
            </label>
            <CitizenSearch
              value={citizen}
              onChange={setCitizen}
              onCitizenSelect={handleCitizenSelect}
              onAppointmentSelect={handleAppointmentSelect}
              onNewCitizen={handleNewCitizen}
            />
            {!citizen.trim() && (
              <p className="text-xs text-red-500 mt-1">Campo obrigatório</p>
            )}
          </div>

          {/* Don't show citizen info if selected from appointment */}
          {selectedCitizen && !isFromAppointment && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Informações do Munícipe</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="font-medium">CPF:</span> {selectedCitizen.cpf}</div>
                <div><span className="font-medium">CNS:</span> {selectedCitizen.cns}</div>
                <div><span className="font-medium">Prontuário:</span> {selectedCitizen.prontuario}</div>
                <div><span className="font-medium">Nascimento:</span> {selectedCitizen.birthDate}</div>
                <div><span className="font-medium">Idade:</span> {selectedCitizen.age} anos</div>
              </div>
            </div>
          )}

          {/* Profissional e Equipe em linha */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Profissional</label>
              <Select value={professional} onValueChange={setProfessional}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {professionals.map((prof) => (
                    <SelectItem key={prof.name} value={prof.name}>
                      <div>
                        <div className="font-medium">{prof.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {prof.cbo}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Equipe</label>
              <Select value={team} onValueChange={setTeam}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((teamName) => (
                    <SelectItem key={teamName} value={teamName}>
                      {teamName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tipo de Serviço */}
          <div>
            <label className="text-sm font-medium mb-1 block">Tipo de serviço</label>
            <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto border rounded p-2">
              {serviceTypeOptions.map((serviceType) => (
                <div key={serviceType} className="flex items-center space-x-2">
                  <Checkbox
                    checked={serviceTypes.includes(serviceType)}
                    onCheckedChange={(checked) => handleServiceTypeChange(serviceType, checked as boolean)}
                  />
                  <span className="text-xs">{serviceType}</span>
                </div>
              ))}
            </div>
          </div>

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
