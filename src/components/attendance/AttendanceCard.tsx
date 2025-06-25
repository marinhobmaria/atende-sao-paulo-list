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

  const calculateDetailedAge = (age: number) => {
    // Simular cálculo mais detalhado da idade
    // Em um sistema real, isso viria do banco de dados baseado na data de nascimento
    const years = age;
    const months = Math.floor(Math.random() * 12);
    const days = Math.floor(Math.random() * 30);
    
    const parts = [];
    if (years > 0) parts.push(`${years} ano${years !== 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} mês${months !== 1 ? 'es' : ''}`);
    if (days > 0) parts.push(`${days} dia${days !== 1 ? 's' : ''}`);
    
    return parts.join(', ') || '0 dias';
  };

  const handleEscutaInicial = () => {
    navigate(`/escuta-inicial?cidadao=${attendance.id}`);
  };

  const handleAtender = () => {
    navigate(`/atendimento?cidadao=${attendance.id}`);
  };

  const handleVacinar = () => {
    console.log("Vacinar cidadão:", attendance.citizen.name);
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
    <Card className="hover:shadow-lg hover:scale-[1.02] hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 ease-in-out cursor-pointer relative overflow-hidden">
      {/* Status indicator bar on the left */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusBarColor(attendance.status)}`} />
      
      <CardContent className="p-3 ml-2">
        <div className="flex items-center justify-between">
          {/* Seção esquerda - Foto e informações principais */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            {/* Avatar */}
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={attendance.citizen.photo} alt={attendance.citizen.name} />
              <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold text-sm">
                {getInitials(attendance.citizen.name)}
              </AvatarFallback>
            </Avatar>

            {/* Informações principais */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate text-sm">{attendance.citizen.name}</h3>
                <Badge className={`text-xs px-2 py-1 ${getStatusColor(attendance.status)}`}>
                  {getStatusText(attendance.status)}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>{attendance.arrivalTime}</span>
                </div>
                {attendance.vulnerability && (
                  <Badge className={`text-white text-xs px-2 py-1 ${getVulnerabilityColor(attendance.vulnerability)}`}>
                    {attendance.vulnerability}
                  </Badge>
                )}
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                {calculateDetailedAge(attendance.citizen.age)}
              </div>

              {/* Informações do profissional - layout otimizado */}
              <div className="text-xs text-gray-700 space-y-1">
                <div className="font-medium text-gray-900">
                  {professionalInfo.name}
                </div>
                <div className="flex items-center gap-4">
                  <span>{professionalInfo.specialty}</span>
                  <span>{professionalInfo.team}</span>
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
            </div>
          </div>

          {/* Seção direita - Botões de ação */}
          <div className="ml-4">
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
