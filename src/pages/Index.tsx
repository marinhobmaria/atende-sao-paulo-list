
import { useState } from "react";
import { AttendanceHeader } from "@/components/attendance/AttendanceHeader";
import { AttendanceActions } from "@/components/attendance/AttendanceActions";
import { AttendanceList } from "@/components/attendance/AttendanceList";
import { FilterModal } from "@/components/attendance/FilterModal";
import { TodayAppointmentsList } from "@/components/attendance/TodayAppointmentsList";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMyAttendances, setShowMyAttendances] = useState(false);
  const [sortBy, setSortBy] = useState("risk");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: ["waiting", "in-service", "initial-listening", "vaccination"],
    period: { start: new Date(), end: new Date() },
    serviceType: [] as string[],
    team: [] as string[],
    professional: [] as string[],
    onlyUnfinished: false,
  });

  const handleCallPatient = (patientId: string, patientName: string) => {
    toast({
      title: "Chamando paciente",
      description: `${patientName} foi chamado para atendimento`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <AttendanceHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna principal - Lista de atendimentos */}
          <div className="lg:col-span-2 space-y-6">
            <AttendanceActions />
            
            <AttendanceList
              searchTerm={searchTerm}
              showMyAttendances={showMyAttendances}
              sortBy={sortBy}
              filters={filters}
              onCallPatient={handleCallPatient}
            />
          </div>

          {/* Coluna lateral - Agendamentos de hoje */}
          <div className="space-y-6">
            <TodayAppointmentsList />
          </div>
        </div>

        <FilterModal
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
    </div>
  );
};

export default Index;
