
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Clock, MoreVertical, Stethoscope, Syringe, Eye, EyeOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface AttendanceCardProps {
  attendance: {
    id: string;
    citizen: {
      name: string;
      age: number;
      cpf: string;
      cns: string;
    };
    arrivalTime: string;
    status: string; 
    serviceTypes: string[];
    professional: string;
    team: string;
    vulnerability: string | null;
    hasInitialListening: boolean;
    hasPreService: boolean;
    isCompleted: boolean;
  };
}

export const AttendanceCard = ({ attendance }: AttendanceCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting": return "bg-green-500";
      case "in-service": return "bg-purple-500";
      case "initial-listening": return "bg-pink-500";
      case "completed": return "bg-blue-500";
      case "did-not-wait": return "bg-gray-500";
      default: return "bg-gray-300";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "waiting": return "Aguardando atendimento";
      case "in-service": return "Em atendimento";
      case "initial-listening": return "Em escuta inicial";
      case "completed": return "Atendimento realizado";
      case "did-not-wait": return "Não aguardou";
      default: return status;
    }
  };

  const getVulnerabilityColor = (vulnerability: string | null) => {
    switch (vulnerability) {
      case "ALTA": return "bg-red-500";
      case "MÉDIA": return "bg-yellow-500";
      case "BAIXA": return "bg-green-500";
      default: return "bg-gray-300";
    }
  };

  const getInitialListeningTooltip = () => {
    if (attendance.hasInitialListening) return "Visualizar escuta inicial";
    if (attendance.status === "in-service") return "O cidadão ainda não fez escuta inicial";
    if (attendance.isCompleted) return "Cidadão sem escuta inicial";
    return "Realizar escuta inicial";
  };

  const getServiceTooltip = () => {
    if (attendance.isCompleted) return "Atendimento realizado";
    if (attendance.status === "in-service") return "Continuar atendimento";
    return "Realizar atendimento";
  };

  const handleEscutaInicial = () => {
    navigate(`/escuta-inicial?cidadao=${attendance.id}`);
  };

  const handleAtendimento = () => {
    navigate(`/atendimento?cidadao=${attendance.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-start gap-4">
        {/* Status Indicator */}
        <div className={`w-1 h-20 rounded ${getStatusColor(attendance.status)} flex-shrink-0`} />
        
        <div className="flex-1 space-y-2">
          {/* Top Row */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{attendance.arrivalTime}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{getStatusLabel(attendance.status)}</span>
              </div>
              
              <h3 className="font-semibold text-lg">{attendance.citizen.name}</h3>
              <p className="text-sm text-muted-foreground">{attendance.citizen.age} anos</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {attendance.status === "waiting" && (
                  <>
                    <DropdownMenuItem>Cidadão não aguardou</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Excluir</DropdownMenuItem>
                  </>
                )}
                {attendance.status === "did-not-wait" && (
                  <DropdownMenuItem>Cidadão retornou</DropdownMenuItem>
                )}
                <DropdownMenuItem>Gerar declaração de comparecimento</DropdownMenuItem>
                <DropdownMenuItem>Visualizar prontuário</DropdownMenuItem>
                {attendance.isCompleted && (
                  <DropdownMenuItem>Visualizar atendimentos do dia</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {attendance.serviceTypes.map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
            {attendance.vulnerability && (
              <Badge className={`text-white text-xs ${getVulnerabilityColor(attendance.vulnerability)}`}>
                {attendance.vulnerability}
              </Badge>
            )}
          </div>

          {/* Professional */}
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Profissional:</span> {attendance.professional}
            {attendance.team && <span> • {attendance.team}</span>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant={attendance.hasInitialListening ? "outline" : "default"}
                    className="flex items-center gap-2"
                    onClick={handleEscutaInicial}
                  >
                    {attendance.hasInitialListening ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    {attendance.hasInitialListening ? "Ver escuta" : "Escuta inicial"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getInitialListeningTooltip()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant={attendance.isCompleted ? "outline" : "default"}
                    className="flex items-center gap-2"
                    onClick={handleAtendimento}
                  >
                    {attendance.serviceTypes.includes("VACINA") ? (
                      <Syringe className="h-4 w-4" />
                    ) : (
                      <Stethoscope className="h-4 w-4" />
                    )}
                    {attendance.serviceTypes.includes("VACINA") ? "Vacinar" : "Atender"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getServiceTooltip()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
