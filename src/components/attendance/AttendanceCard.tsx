
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, FileText, Stethoscope, Syringe, MoreHorizontal, Volume2 } from "lucide-react";
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
      birthDate?: string;
      motherName?: string;
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
    addedBy?: string;
  };
  onCallPatient?: (patientId: string, patientName: string) => void;
}

export const AttendanceCard = ({ attendance, onCallPatient }: AttendanceCardProps) => {
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

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case "waiting": return "border-l-green-500";
      case "in-service": return "border-l-purple-500";
      case "initial-listening": return "border-l-pink-500";
      case "vaccination": return "border-l-purple-500";
      case "completed": return "border-l-blue-500";
      case "did-not-wait": return "border-l-gray-500";
      default: return "border-l-gray-500";
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

  const calculateDetailedAge = (birthDate?: string) => {
    if (!birthDate) return `${attendance.citizen.age} anos`;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return `${years}a ${months}m ${days}d`;
  };

  const calculateWaitTime = (arrivalTime: string) => {
    const [hours, minutes] = arrivalTime.split(':').map(Number);
    const arrival = new Date();
    arrival.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    const diffMs = now.getTime() - arrival.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins}min`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours}h ${mins}min`;
    }
  };

  const professionalInfo = formatProfessionalInfo(attendance.professional);
  const detailedAge = calculateDetailedAge(attendance.citizen.birthDate);
  const waitTime = calculateWaitTime(attendance.arrivalTime);

  const handleStatusChange = (newStatus: string) => {
    console.log(`Status changed to: ${newStatus}`);
  };

  const handleCallPatient = () => {
    onCallPatient?.(attendance.id, attendance.citizen.name);
  };

  // Create a mock attendance object that matches AttendanceQueueItem structure
  const mockAttendanceForActions = {
    id: attendance.id,
    citizen: {
      id: attendance.id,
      name: attendance.citizen.name,
      age: attendance.citizen.age,
      cpf: attendance.citizen.cpf,
      cns: attendance.citizen.cns,
      prontuario: "123456", // Mock data
      birthDate: attendance.citizen.birthDate || "10/02/2004", // Mock data
      photo: attendance.citizen.photo
    },
    arrivalTime: attendance.arrivalTime,
    status: attendance.status as any,
    serviceTypes: attendance.serviceTypes,
    professional: attendance.professional,
    team: attendance.team,
    vulnerability: attendance.vulnerability,
    hasInitialListening: attendance.hasInitialListening,
    hasPreService: attendance.hasPreService,
    isCompleted: attendance.isCompleted,
    addedBy: attendance.addedBy || "Sistema"
  };

  // Determine if should show vaccination button (when service type is VACINA)
  const showVaccinationButton = attendance.serviceTypes.includes("VACINA") || attendance.serviceTypes.includes("VACINAÇÃO");
  
  return (
    <Card className={`hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer border-l-4 ${getStatusBorderColor(attendance.status)}`}>
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
              
              {/* Data de nascimento, idade, horário e tempo de espera */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                {attendance.citizen.birthDate && (
                  <span>
                    <span className="font-medium">Nascimento:</span> {new Date(attendance.citizen.birthDate).toLocaleDateString('pt-BR')} ({detailedAge})
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Inclusão: {attendance.arrivalTime}</span>
                </div>
              </div>

              {/* Nome da mãe */}
              {attendance.citizen.motherName && (
                <div className="text-sm text-gray-700 mb-2">
                  <span className="font-medium text-gray-800">Mãe:</span> {attendance.citizen.motherName}
                </div>
              )}

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
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-800">Serviços:</span>
                  <div className="flex gap-1">
                    {attendance.serviceTypes.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {attendance.status === "waiting" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleCallPatient}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      <Volume2 className="h-4 w-4" />
                      Chamar paciente
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Aguardando: {waitTime}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <AttendanceActions 
              attendance={mockAttendanceForActions} 
              onStatusChange={handleStatusChange}
              showVaccinationButton={showVaccinationButton}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
