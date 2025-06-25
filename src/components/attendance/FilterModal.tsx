
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, X, RotateCcw } from "lucide-react";
import { format } from "date-fns";

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

  const teams = ["Equipe APS 1", "Equipe APS 2", "Equipe APS 3"];
  const professionals = ["Dr. João Silva", "Dra. Maria Santos", "Enf. Ana Costa"];

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked 
      ? [...filters.status, status]
      : filters.status.filter((s: string) => s !== status);
    setFilters({ ...filters, status: newStatus });
  };

  const handleServiceTypeChange = (serviceType: string, checked: boolean) => {
    const newServiceTypes = checked 
      ? [...(filters.serviceType || []), serviceType]
      : (filters.serviceType || []).filter((s: string) => s !== serviceType);
    setFilters({ ...filters, serviceType: newServiceTypes });
  };

  const handleTeamChange = (team: string, checked: boolean) => {
    const newTeams = checked 
      ? [...(filters.team || []), team]
      : (filters.team || []).filter((t: string) => t !== team);
    setFilters({ ...filters, team: newTeams });
  };

  const handleProfessionalChange = (professional: string, checked: boolean) => {
    const newProfessionals = checked 
      ? [...(filters.professional || []), professional]
      : (filters.professional || []).filter((p: string) => p !== professional);
    setFilters({ ...filters, professional: newProfessionals });
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

  const clearServiceTypes = () => {
    setFilters({ ...filters, serviceType: [] });
  };

  const clearTeams = () => {
    setFilters({ ...filters, team: [] });
  };

  const clearProfessionals = () => {
    setFilters({ ...filters, professional: [] });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Filtros</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Status do Atendimento */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Status do atendimento</h3>
            <div className="grid grid-cols-1 gap-3">
              {statusOptions.map((status) => (
                <div key={status.value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <Checkbox
                    checked={filters.status.includes(status.value)}
                    onCheckedChange={(checked) => handleStatusChange(status.value, checked as boolean)}
                  />
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${status.color}`} />
                    <span className="text-sm font-medium">{status.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Período */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Período de atendimento</h3>
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal min-w-[140px]">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.period.start ? format(filters.period.start, "dd/MM/yyyy") : "Data início"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
                  <Button variant="outline" className="justify-start text-left font-normal min-w-[140px]">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.period.end ? format(filters.period.end, "dd/MM/yyyy") : "Data fim"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-lg">Tipo de serviço</h3>
              {filters.serviceType && filters.serviceType.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearServiceTypes} className="text-xs">
                  <X className="h-3 w-3 mr-1" />
                  Limpar ({filters.serviceType.length})
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {serviceTypes.map((service) => (
                <div key={service} className="flex items-center space-x-2 p-1">
                  <Checkbox 
                    checked={filters.serviceType?.includes(service) || false}
                    onCheckedChange={(checked) => handleServiceTypeChange(service, checked as boolean)}
                  />
                  <span className="text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Equipe */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-lg">Equipe</h3>
              {filters.team && filters.team.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearTeams} className="text-xs">
                  <X className="h-3 w-3 mr-1" />
                  Limpar ({filters.team.length})
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {teams.map((team) => (
                <div key={team} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <Checkbox 
                    checked={filters.team?.includes(team) || false}
                    onCheckedChange={(checked) => handleTeamChange(team, checked as boolean)}
                  />
                  <span className="text-sm font-medium">{team}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Profissional */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-lg">Profissional</h3>
              {filters.professional && filters.professional.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearProfessionals} className="text-xs">
                  <X className="h-3 w-3 mr-1" />
                  Limpar ({filters.professional.length})
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {professionals.map((professional) => (
                <div key={professional} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <Checkbox 
                    checked={filters.professional?.includes(professional) || false}
                    onCheckedChange={(checked) => handleProfessionalChange(professional, checked as boolean)}
                  />
                  <span className="text-sm font-medium">{professional}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ver somente atendimentos não finalizados */}
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Checkbox
              checked={filters.onlyUnfinished}
              onCheckedChange={(checked) => setFilters({ ...filters, onlyUnfinished: checked })}
            />
            <span className="text-sm font-medium text-blue-900">Ver somente os atendimentos não finalizados</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="outline" onClick={resetToDefault} className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Resetar filtros
          </Button>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={() => onOpenChange(false)} className="bg-blue-600 hover:bg-blue-700">
              Aplicar filtros
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
