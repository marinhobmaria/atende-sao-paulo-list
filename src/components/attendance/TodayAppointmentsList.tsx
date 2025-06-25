
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { mockCitizens, DayAppointment, Citizen } from "@/data/mockCitizens";

interface TodayAppointmentsListProps {
  onAppointmentSelect?: (appointment: DayAppointment, citizen: Citizen) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const TodayAppointmentsList = ({ 
  onAppointmentSelect,
  isOpen,
  onClose
}: TodayAppointmentsListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  // Get citizens with today's appointments (15 citizens)
  const citizensWithAppointments = mockCitizens
    .filter(citizen => citizen.todayAppointments && citizen.todayAppointments.length > 0)
    .slice(0, 15);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleAppointmentSelect = (appointment: DayAppointment, citizen: Citizen) => {
    setSelectedAppointmentId(appointment.id);
    onAppointmentSelect?.(appointment, citizen);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-80 overflow-auto"
    >
      <div className="p-2 space-y-2">
        <p className="text-xs font-medium text-blue-600 mb-2 px-2 border-b pb-2">
          Próximos agendamentos do dia ({citizensWithAppointments.length})
        </p>
        {citizensWithAppointments.map((citizen) => (
          <div key={citizen.id}>
            {citizen.todayAppointments?.map((appointment) => (
              <Card 
                key={appointment.id} 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedAppointmentId === appointment.id 
                    ? "bg-blue-600 border-blue-700 shadow-lg scale-[1.02]" 
                    : "hover:bg-blue-50 transition-colors border-blue-200"
                }`}
                onClick={() => handleAppointmentSelect(appointment, citizen)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedAppointmentId === appointment.id 
                            ? "bg-white" 
                            : "bg-blue-100"
                        }`}>
                          <Clock className={`w-4 h-4 ${
                            selectedAppointmentId === appointment.id 
                              ? "text-blue-600" 
                              : "text-blue-600"
                          }`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${
                            selectedAppointmentId === appointment.id 
                              ? "text-white" 
                              : "text-blue-900"
                          }`}>
                            {appointment.time}
                          </span>
                          <span className={`text-sm ${
                            selectedAppointmentId === appointment.id 
                              ? "text-blue-100" 
                              : "text-gray-700"
                          }`}>
                            - {citizen.name}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              selectedAppointmentId === appointment.id 
                                ? "text-white bg-blue-500 border-blue-300" 
                                : "text-blue-700 bg-blue-50"
                            }`}
                          >
                            Agendamento do dia
                          </Badge>
                        </div>
                        <div className={`text-xs ${
                          selectedAppointmentId === appointment.id 
                            ? "text-blue-100" 
                            : "text-gray-600"
                        }`}>
                          {appointment.professional} - {appointment.team}
                        </div>
                        <div className={`text-xs ${
                          selectedAppointmentId === appointment.id 
                            ? "text-blue-200" 
                            : "text-gray-500"
                        }`}>
                          {appointment.serviceType.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
