import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DashboardFiltersProps {
  onFiltersChange: (filters: {
    period: string;
    professional: string;
    serviceType: string;
    customDate?: Date;
  }) => void;
}

export function DashboardFilters({ onFiltersChange }: DashboardFiltersProps) {
  const [period, setPeriod] = useState("today");
  const [professional, setProfessional] = useState("all");
  const [serviceType, setServiceType] = useState("all");
  const [customDate, setCustomDate] = useState<Date>();

  const handleFilterChange = () => {
    onFiltersChange({
      period,
      professional,
      serviceType,
      customDate,
    });
  };

  const handleReset = () => {
    setPeriod("today");
    setProfessional("all");
    setServiceType("all");
    setCustomDate(undefined);
    onFiltersChange({
      period: "today",
      professional: "all",
      serviceType: "all",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Período</label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {period === "custom" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Data específica</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !customDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {customDate ? format(customDate, "PPP", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={customDate}
                    onSelect={setCustomDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Profissional</label>
            <Select value={professional} onValueChange={setProfessional}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os profissionais" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="dr-silva">Dr. Silva</SelectItem>
                <SelectItem value="dra-santos">Dra. Santos</SelectItem>
                <SelectItem value="dr-oliveira">Dr. Oliveira</SelectItem>
                <SelectItem value="dra-costa">Dra. Costa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Serviço</label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os serviços" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="consulta">Consulta</SelectItem>
                <SelectItem value="escuta-inicial">Escuta Inicial</SelectItem>
                <SelectItem value="vacinacao">Vacinação</SelectItem>
                <SelectItem value="curativo">Curativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={handleFilterChange} size="sm">
            Aplicar Filtros
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}