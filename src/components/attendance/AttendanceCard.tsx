
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, User, Stethoscope, Syringe, FileText } from "lucide-react";

interface AttendanceCardProps {
  attendance: {
    id: string;
    citizen: {
      name: string;
      age: number;
      cpf: string;
      cns: string;
      photo?: string;
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
      case "waiting": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in-service": return "bg-green-100 text-green-800 border-green-200";
      case "initial-listening": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting": return "Aguardando";
      case "in-service": return "Em atendimento";
      case "initial-listening": return "Escuta inicial";
      default: return status;
    }
  };

  const getVulnerabilityColor = (vulnerability: string | null) => {
    if (!vulnerability) return null;
    switch (vulnerability) {
      case "ALTA": return "bg-red-500";
      case "MÉDIA": return "bg-yellow-500";
      case "BAIXA": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const handleEscutaInicial = () => {
    navigate(`/escuta-inicial?cidadao=${attendance.id}`);
  };

  const handleAtender = () => {
    navigate(`/atendimento?cidadao=${attendance.id}`);
  };

  const handleVacinar = () => {
    // Implementar navegação para vacinação
    console.log("Vacinar cidadão:", attendance.citizen.name);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          {/* Seção esquerda - Foto e informações principais */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            {/* Avatar */}
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarImage src={attendance.citizen.photo} alt={attendance.citizen.name} />
              <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold">
                {getInitials(attendance.citizen.name)}
              </AvatarFallback>
            </Avatar>

            {/* Informações principais */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{attendance.citizen.name}</h3>
                <Badge className={`text-xs px-2 py-1 ${getStatusColor(attendance.status)}`}>
                  {getStatusText(attendance.status)}
                </Badge>
                {attendance.vulnerability && (
                  <Badge className={`text-white text-xs px-2 py-1 ${getVulnerabilityColor(attendance.vulnerability)}`}>
                    {attendance.vulnerability}
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Idade:</span> {attendance.citizen.age} anos
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{attendance.arrivalTime}</span>
                </div>
                <div>
                  <span className="font-medium">CPF:</span> {attendance.citizen.cpf}
                </div>
                <div>
                  <span className="font-medium">CNS:</span> {attendance.citizen.cns}
                </div>
              </div>

              {/* Tipos de serviço */}
              <div className="flex flex-wrap gap-1 mt-2">
                {attendance.serviceTypes.map((type, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>

              {/* Profissional */}
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Profissional:</span> {attendance.professional}
              </div>
            </div>
          </div>

          {/* Seção direita - Botões de ação */}
          <div className="flex items-center space-x-2 ml-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEscutaInicial}
                    className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Escuta Inicial</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Realizar escuta inicial</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAtender}
                    className="flex items-center gap-1 hover:bg-green-50 hover:border-green-300"
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span className="hidden sm:inline">Atender</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Realizar atendimento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleVacinar}
                    className="flex items-center gap-1 hover:bg-purple-50 hover:border-purple-300"
                  >
                    <Syringe className="w-4 h-4" />
                    <span className="hidden sm:inline">Vacinar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Realizar vacinação</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
