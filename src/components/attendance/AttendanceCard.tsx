
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

  const professionalInfo = formatProfessionalInfo(attendance.professional);

  const handleStatusChange = (newStatus: string) => {
    // This would update the attendance status in the real application
    console.log(`Status changed to: ${newStatus}`);
  };

  return (
    <Card className="hover:shadow-lg hover:scale-[1.01] hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ease-in-out cursor-pointer relative overflow-hidden">
      {/* Status indicator bar on the left */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusBarColor(attendance.status)}`} />
      
      <CardContent className="p-2 ml-1">
        <div className="flex items-center justify-between gap-2">
          {/* Seção esquerda - Informações ultra compactas */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Avatar mini */}
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={attendance.citizen.photo} alt={attendance.citizen.name} />
              <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold text-xs">
                {getInitials(attendance.citizen.name)}
              </AvatarFallback>
            </Avatar>

            {/* Informações principais compactas */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <h3 className="font-semibold text-gray-900 truncate text-xs max-w-[120px]">
                  {attendance.citizen.name}
                </h3>
                <span className="text-xs text-gray-500">{attendance.citizen.age}a</span>
                <Badge className={`text-xs px-1 py-0 ${getStatusColor(attendance.status)}`}>
                  {getStatusText(attendance.status)}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{attendance.arrivalTime}</span>
                </div>
                {attendance.vulnerability && (
                  <Badge className={`text-white text-xs px-1 py-0 ${getVulnerabilityColor(attendance.vulnerability)}`}>
                    {attendance.vulnerability}
                  </Badge>
                )}
              </div>
              
              {/* Profissional e serviços em linha única */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="truncate max-w-[100px]">{professionalInfo.name}</span>
                <span className="text-gray-400">•</span>
                <div className="flex gap-1">
                  {attendance.serviceTypes.slice(0, 2).map((type, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                      {type.length > 8 ? type.substring(0, 8) + '...' : type}
                    </Badge>
                  ))}
                  {attendance.serviceTypes.length > 2 && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      +{attendance.serviceTypes.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Seção direita - Botões de ação compactos */}
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
