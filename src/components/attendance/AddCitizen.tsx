
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddCitizenProps {
  showAddCitizen: boolean;
  setShowAddCitizen: (show: boolean) => void;
}

// Mock scheduling data
const mockSchedulings = [
  {
    id: "1",
    time: "09:00",
    citizen: "Maria Silva Santos",
    professional: "Dr. João Silva",
    specialty: "Médico Clínico",
    team: "Equipe APS 1",
    serviceType: "CONSULTA"
  },
  {
    id: "2", 
    time: "14:30",
    citizen: "José Oliveira",
    professional: "Dra. Ana Costa",
    specialty: "Enfermeiro",
    team: "Equipe APS 2",
    serviceType: "PROCEDIMENTOS"
  }
];

export const AddCitizen = ({ showAddCitizen, setShowAddCitizen }: AddCitizenProps) => {
  const [citizen, setCitizen] = useState("");
  const [selectedScheduling, setSelectedScheduling] = useState("");
  const [professional, setProfessional] = useState("");
  const [team, setTeam] = useState("");
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
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
    setSelectedScheduling("");
    setProfessional("");
    setTeam("");
    setServiceTypes([]);
  };

  const handleSchedulingSelect = (schedulingId: string) => {
    const scheduling = mockSchedulings.find(s => s.id === schedulingId);
    if (scheduling) {
      setCitizen(scheduling.citizen);
      setProfessional(scheduling.professional);
      // Find team based on professional
      setTeam(scheduling.team);
      setServiceTypes([scheduling.serviceType]);
    }
  };

  const handleServiceTypeChange = (serviceType: string, checked: boolean) => {
    if (checked) {
      setServiceTypes([...serviceTypes, serviceType]);
    } else {
      setServiceTypes(serviceTypes.filter(type => type !== serviceType));
    }
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
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={() => setShowAddCitizen(!showAddCitizen)}
          className="flex items-center gap-2"
          variant={showAddCitizen ? "outline" : "default"}
        >
          {showAddCitizen ? (
            <>
              <X className="h-4 w-4" />
              Cancelar adição
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
        <div className="space-y-4">
          {/* Agendamento do dia */}
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Agendamento do dia (opcional)
            </label>
            <Select value={selectedScheduling} onValueChange={(value) => {
              setSelectedScheduling(value);
              handleSchedulingSelect(value);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um agendamento" />
              </SelectTrigger>
              <SelectContent>
                {mockSchedulings.map((scheduling) => (
                  <SelectItem key={scheduling.id} value={scheduling.id}>
                    <div>
                      <div className="font-medium">{scheduling.time} - {scheduling.citizen}</div>
                      <div className="text-xs text-muted-foreground">
                        {scheduling.professional} • {scheduling.specialty} • {scheduling.team}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Munícipe */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Munícipe <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Nome, CPF, CNS ou data de nascimento"
              value={citizen}
              onChange={(e) => setCitizen(e.target.value)}
              className={!citizen.trim() ? "border-red-300 focus:border-red-500" : ""}
            />
            {!citizen.trim() && (
              <p className="text-xs text-red-500 mt-1">Campo obrigatório</p>
            )}
          </div>

          {/* Profissional */}
          <div>
            <label className="text-sm font-medium mb-2 block">Profissional (opcional)</label>
            <Select value={professional} onValueChange={setProfessional}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um profissional" />
              </SelectTrigger>
              <SelectContent>
                {professionals.map((prof) => (
                  <SelectItem key={prof.name} value={prof.name}>
                    <div>
                      <div className="font-medium">{prof.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {prof.cpf} • {prof.cbo} • {prof.ine}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Equipe */}
          <div>
            <label className="text-sm font-medium mb-2 block">Equipe (opcional)</label>
            <Select value={team} onValueChange={setTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma equipe" />
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

          {/* Tipo de Serviço */}
          <div>
            <label className="text-sm font-medium mb-2 block">Tipo de serviço (opcional)</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {serviceTypeOptions.map((serviceType) => (
                <div key={serviceType} className="flex items-center space-x-2">
                  <Checkbox
                    checked={serviceTypes.includes(serviceType)}
                    onCheckedChange={(checked) => handleServiceTypeChange(serviceType, checked as boolean)}
                  />
                  <span className="text-sm">{serviceType}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={clearFields}>
              Limpar campos
            </Button>
            <Button onClick={handleAddCitizen}>
              Adicionar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
