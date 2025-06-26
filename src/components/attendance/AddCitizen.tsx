import { useState } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CitizenSearch } from "./CitizenSearch";

interface AddCitizenProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  queueCount: number;
  waitingCount: number;
  statusCounts: {
    waiting: number;
    "in-service": number;
    "initial-listening": number;
    vaccination: number;
  };
  filters: any;
  setFilters: any;
  isCollapsible?: boolean;
}

export const AddCitizen = ({ 
  open, 
  onOpenChange, 
  queueCount, 
  waitingCount, 
  statusCounts, 
  filters, 
  setFilters, 
  isCollapsible = false 
}: AddCitizenProps) => {
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [schedulingDate, setSchedulingDate] = useState<Date | undefined>(undefined);
  const [schedulingTime, setSchedulingTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleCitizenSelect = (citizen: any) => {
    setSelectedCitizen(citizen);
  };

  const handleAddCitizen = () => {
    // Implement logic to add citizen to the queue
    console.log("Adding citizen:", {
      citizen: selectedCitizen,
      serviceType,
      team: selectedTeam,
      schedulingDate,
      schedulingTime,
      notes,
    });

    // Update status counts and filters as needed
    setFilters({
      ...filters,
      status: [...filters.status, "waiting"],
    });

    // Close the dialog
    onOpenChange(false);
  };

  const content = (
    <div className="space-y-6">
      {/* Citizen Search */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-semibold">Buscar munícipe</h3>
        </div>
        
        <CitizenSearch
          selectedCitizen={selectedCitizen}
          onCitizenSelect={handleCitizenSelect}
          placeholder="Digite o nome, CPF ou CNS do munícipe..."
          className="w-full"
        />
      </div>

      {/* Selected Citizen Info */}
      {selectedCitizen && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="text-md font-semibold text-blue-800">
            {selectedCitizen.name}
          </h4>
          <p className="text-sm text-blue-600">
            CPF: {selectedCitizen.cpf} | CNS: {selectedCitizen.cns}
          </p>
        </div>
      )}

      {/* Service Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Service Type */}
        <div className="space-y-2">
          <Label htmlFor="serviceType" className="text-sm font-medium text-gray-700">
            Tipo de serviço
          </Label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o serviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CONSULTA">Consulta</SelectItem>
              <SelectItem value="EXAMES">Exames</SelectItem>
              <SelectItem value="VACINA">Vacinação</SelectItem>
              <SelectItem value="PROCEDIMENTO">Procedimento</SelectItem>
              <SelectItem value="ESCUTA_INICIAL">Escuta Inicial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Team */}
        <div className="space-y-2">
          <Label htmlFor="team" className="text-sm font-medium text-gray-700">
            Equipe
          </Label>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a equipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EQUIPE_APS_1">Equipe APS 1</SelectItem>
              <SelectItem value="EQUIPE_APS_2">Equipe APS 2</SelectItem>
              <SelectItem value="EQUIPE_APS_3">Equipe APS 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Scheduling Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Agendamento</h3>
        <p className="text-sm text-gray-500">
          Opcional: Agende um horário específico para este atendimento.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Picker */}
          <div>
            <Label htmlFor="schedulingDate" className="text-sm font-medium text-gray-700">
              Data
            </Label>
            <Input
              type="date"
              id="schedulingDate"
              value={schedulingDate ? schedulingDate.toISOString().split('T')[0] : ""}
              onChange={(e) => setSchedulingDate(new Date(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Time Picker */}
          <div>
            <Label htmlFor="schedulingTime" className="text-sm font-medium text-gray-700">
              Horário
            </Label>
            <Input
              type="time"
              id="schedulingTime"
              value={schedulingTime}
              onChange={(e) => setSchedulingTime(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
          Observações
        </Label>
        <Input
          type="text"
          id="notes"
          placeholder="Adicione alguma observação sobre o atendimento..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          Cancelar
        </Button>
        <Button onClick={handleAddCitizen}>
          Adicionar à fila
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild={!isCollapsible}>
        <Button variant="secondary" className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          Adicionar munícipe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar novo munícipe à fila</DialogTitle>
          <DialogDescription>
            Configure o atendimento e adicione o munícipe à fila.
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
