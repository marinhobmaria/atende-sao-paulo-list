
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, FileText, Stethoscope, Syringe, MoreHorizontal } from "lucide-react";
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
    addedBy?: string; // Add this property to fix the build error
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
    const years = age;
    const months = Math.floor(Math.random() * 12);
    const days = Math.floor(Math.random() * 30);
    return `${years}a ${months}m ${days}d`;
  };

  const professionalInfo = formatProfessionalInfo(attendance.professional);
  const detailedAge = calculateDetailedAge(attendance.citizen.age);

  const handleStatusChange = (newStatus: string) => {
    console.log(`Status changed to: ${newStatus}`);
  };

  // Create attendance object with addedBy property for AttendanceActions
  const attendanceWithAddedBy = {
    ...attendance,
    addedBy: attendance.addedBy || "Sistema"
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          {/* Left side - Avatar and basic info */}
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarImage src={attendance.citizen.photo} alt={attendance.citizen.name} />
              <AvatarFallback className="bg-teal-100 text-teal-700 font-semibold text-sm">
                {getInitials(attendance.citizen.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              {/* Nome e status */}
              <div className="flex items-center gap-2 mb-1">
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
              
              {/* Idade e horário */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span className="font-medium">{calculateDetailedAge(attendance.citizen.age)}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Inclusão: {attendance.arrivalTime}</span>
                </div>
              </div>

              {/* Informações profissionais em linha */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <div>
                  <span className="font-medium text-gray-800">Profissional:</span> {formatProfessionalInfo(attendance.professional).name}
                </div>
                <div>
                  <span className="font-medium text-gray-800">Especialidade:</span> {formatProfessionalInfo(attendance.professional).specialty || attendance.team}
                </div>
                <div>
                  <span className="font-medium text-gray-800">Equipe:</span> {attendance.team}
                </div>
                <div>
                  <span className="font-medium text-gray-800">Serviços:</span> {attendance.serviceTypes.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <AttendanceActions 
              attendance={attendanceWithAddedBy} 
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
