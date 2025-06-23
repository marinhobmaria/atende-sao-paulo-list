
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: any;
  setFilters: (filters: any) => void;
}

export const FilterModal = ({ open, onOpenChange, filters, setFilters }: FilterModalProps) => {
  const statusOptions = [
    { value: "waiting", label: "Aguardando atendimento", color: "bg-green-500" },
    { value: "in-service", label: "Em atendimento", color: "bg-purple-500" },
    { value: "initial-listening", label: "Em escuta inicial", color: "bg-pink-500" },
    { value: "completed", label: "Atendimento realizado", color: "bg-blue-500" },
    { value: "did-not-wait", label: "Não aguardou", color: "bg-gray-500" }
  ];

  const serviceTypes = [
    "ADM. MEDICAMENTO",
    "ESCUTA INICIAL", 
    "ODONTOLOGIA",
    "CURATIVO",
    "EXAMES",
    "PROCEDIMENTOS",
    "DEMANDA ESPONTÂNEA",
    "NEBULIZAÇÃO",
    "VACINA"
  ];

  const teams = ["Equipe A", "Equipe B", "Equipe C"];
  const professionals = ["Dr. João Silva", "Dra. Maria Santos", "Enf. Ana Costa"];

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked 
      ? [...filters.status, status]
      : filters.status.filter((s: string) => s !== status);
    setFilters({ ...filters, status: newStatus });
  };

  const resetToDefault = () => {
    setFilters({
      status: ["waiting", "in-service", "initial-listening"],
      period: { start: new Date(), end: new Date() },
      serviceType: [],
      team: [],
      professional: [],
      onlyUnfinished: false
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status do Atendimento */}
          <div>
            <h3 className="font-medium mb-3">Status do atendimento</h3>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <div key={status.value} className="flex items-center space-x-3">
                  <Checkbox
                    checked={filters.status.includes(status.value)}
                    onCheckedChange={(checked) => handleStatusChange(status.value, checked as boolean)}
                  />
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${status.color}`} />
                    <span className="text-sm">{status.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Período */}
          <div>
            <h3 className="font-medium mb-3">Período</h3>
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.period.start ? format(filters.period.start, "dd/MM/yyyy") : "Data início"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.period.start}
                    onSelect={(date) => setFilters({ ...filters, period: { ...filters.period, start: date } })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.period.end ? format(filters.period.end, "dd/MM/yyyy") : "Data fim"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.period.end}
                    onSelect={(date) => setFilters({ ...filters, period: { ...filters.period, end: date } })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Tipo de Serviço */}
          <div>
            <h3 className="font-medium mb-3">Tipo de serviço</h3>
            <div className="grid grid-cols-2 gap-2">
              {serviceTypes.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox />
                  <span className="text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ver somente atendimentos não finalizados */}
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={filters.onlyUnfinished}
              onCheckedChange={(checked) => setFilters({ ...filters, onlyUnfinished: checked })}
            />
            <span className="text-sm">Ver somente os atendimentos não finalizados</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button variant="outline" onClick={resetToDefault}>
            Voltar para padrão
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Filtrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
