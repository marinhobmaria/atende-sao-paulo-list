
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, User, Stethoscope, Syringe, FileText } from "lucide-react";
import { AttendanceActions } from "./AttendanceActions";

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
      case "waiting": return "bg-green-500 text-white border-green-500";
      case "in-service": return "bg-purple-500 text-white border-purple-500";
      case "initial-listening": return "bg-pink-500 text-white border-pink-500";
      case "vaccination": return "bg-purple-500 text-white border-purple-500";
      case "completed": return "bg-blue-500 text-white border-blue-500";
      case "did-not-wait": return "bg-gray-500 text-white border-gray-500";
      default: return "bg-gray-500 text-white border-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting": return "Aguardando";
      case "in-service": return "Em atendimento";
      case "initial-listening": return "Em escuta inicial";
      case "vaccination": return "Em vacinação";
      case "completed": return "Atendimento realizado";
      case "did-not-wait": return "Não aguardou";
      default: return status;
    }
  };

  const getStatusBarColor = (status: string) => {
    switch (status) {
      case "waiting": return "bg-green-500";
      case "in-service": return "bg-purple-500";
      case "initial-listening": return "bg-pink-500";
      case "vaccination": return "bg-purple-500";
      case "completed": return "bg-blue-500";
      case "did-not-wait": return "bg-gray-500";
      default: return "bg-gray-500";
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

  const formatProfessionalInfo = (professional: string) => {
    // Extract parts from "MARIA MARINHO - MÉDICO CLÍNICO - EQUIPE APS 1"
    const parts = professional.split(' - ');
    if (parts.length >= 3) {
      return {
        name: parts[0],
        specialty: parts[1],
        team: parts[2]
      };
    }
    return {
      name: professional,
      specialty: '',
      team: ''
    };
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const calculateDetailedAge = (age: number) => {
    // Mock calculation for demonstration - in real app this would be calculated from birth date
    const years = age;
    const months = Math.floor(Math.random() * 12);
    const days = Math.floor(Math.random() * 30);
    return `${years}a ${months}m ${days}d`;
  };

  const professionalInfo = formatProfessionalInfo(attendance.professional);
  const detailedAge = calculateDetailedAge(attendance.citizen.age);

  const handleStatusChange = (newStatus: string) => {
    // This would update the attendance status in the real application
    console.log(`Status changed to: ${newStatus}`);
  };

  return (
    <Card className="hover:shadow-lg hover:scale-[1.01] hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ease-in-out cursor-pointer relative overflow-hidden">
      {/* Status indicator bar on the left */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusBarColor(attendance.status)}`} />
      
      <CardContent className="p-2 ml-1">
        <div className="flex items-start justify-between gap-2">
          {/* Seção esquerda - Informações compactas */}
          <div className="flex items-start gap-2 flex-1 min-w-0">
            {/* Avatar menor */}
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={attendance.citizen.photo} alt={attendance.citizen.name} />
              <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold text-xs">
                {getInitials(attendance.citizen.name)}
              </AvatarFallback>
            </Avatar>

            {/* Informações organizadas */}
            <div className="flex-1 min-w-0 space-y-0.5">
              {/* Nome do munícipe - maior e destacado */}
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-gray-900 text-base leading-tight">
                  {attendance.citizen.name}
                </h3>
                <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(attendance.status)}`}>
                  {getStatusText(attendance.status)}
                </Badge>
                {attendance.vulnerability && (
                  <Badge className={`text-white text-xs px-2 py-0.5 ${getVulnerabilityColor(attendance.vulnerability)}`}>
                    {attendance.vulnerability}
                  </Badge>
                )}
              </div>
              
              {/* Linha compacta: Idade + Horário */}
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="font-medium">{detailedAge}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Inclusão: {attendance.arrivalTime}</span>
                </div>
              </div>

              {/* Grid de informações profissionais */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs">
                <div className="text-gray-700">
                  <span className="font-medium text-gray-800">Profissional:</span> {professionalInfo.name}
                </div>
                
                <div className="text-gray-700">
                  <span className="font-medium text-gray-800">Equipe:</span> {attendance.team}
                </div>

                {professionalInfo.specialty && (
                  <div className="text-gray-700 col-span-2">
                    <span className="font-medium text-gray-800">Especialidade:</span> {professionalInfo.specialty}
                  </div>
                )}
              </div>

              {/* Tipos de serviço compactos */}
              {attendance.serviceTypes.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-xs font-medium text-gray-800">Serviços:</span>
                  {attendance.serviceTypes.map((type, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                      {type}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Seção direita - Botões de ação */}
          <div className="flex-shrink-0">
            <AttendanceActions 
              attendance={attendance as any} 
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
