
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddCitizenProps {
  showAddCitizen: boolean;
  setShowAddCitizen: (show: boolean) => void;
}

export const AddCitizen = ({ showAddCitizen, setShowAddCitizen }: AddCitizenProps) => {
  const [citizen, setCitizen] = useState("");
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
    setProfessional("");
    setTeam("");
    setServiceTypes([]);
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
          {/* Munícipe */}
          <div>
            <label className="text-sm font-medium mb-1 block">
              Munícipe <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Nome, CPF, CNS"
              value={citizen}
              onChange={(e) => setCitizen(e.target.value)}
              className={!citizen.trim() ? "border-red-300 focus:border-red-500" : ""}
            />
            {!citizen.trim() && (
              <p className="text-xs text-red-500 mt-1">Campo obrigatório</p>
            )}
          </div>

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
