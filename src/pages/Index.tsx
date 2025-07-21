
import { useState } from "react";
import { AttendanceList, getStatusCounts } from "@/components/attendance/AttendanceList";
import { AttendanceHeader } from "@/components/attendance/AttendanceHeader";
import { AddCitizen } from "@/components/attendance/AddCitizen";
import { StatusCounters } from "@/components/attendance/StatusCounters";
import { PasswordCaller } from "@/components/attendance/PasswordCaller";
import { QueueControls } from "@/components/attendance/QueueControls";
import { PageLayout } from "@/components/layout/PageLayout";

// Mock data for queue counts - in a real app this would come from a store/context
const mockQueueCount = 50;
const mockWaitingCount = getStatusCounts().waiting;

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMyAttendances, setShowMyAttendances] = useState(false);
  const [sortBy, setSortBy] = useState("risk"); // Default to risk classification
  const [showAddCitizen, setShowAddCitizen] = useState(false);
  const [currentCall, setCurrentCall] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: ["waiting", "in-service", "initial-listening", "vaccination"],
    period: { start: new Date(), end: new Date() },
    serviceType: [],
    team: [],
    professional: [],
    onlyUnfinished: false
  });

  const statusCounts = getStatusCounts();

  const handleCallPatient = (patientId: string, patientName: string) => {
    const patientNumber = `A${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
    setCurrentCall(patientNumber);
    console.log(`Chamando paciente: ${patientName} - Senha: ${patientNumber}`);
  };

  const handleCallNext = () => {
    // Lógica para chamar o próximo paciente da fila
    // Em uma implementação real, isso buscaria o próximo paciente da lista
    console.log("Chamando próximo paciente da fila...");
  };

  const handleAddToQueue = () => {
    // Abre o formulário de adicionar paciente
    setShowAddCitizen(true);
  };

  const handleRefreshQueue = () => {
    // Lógica para atualizar a fila
    // Em uma implementação real, isso faria uma nova requisição aos dados
    console.log("Atualizando fila...");
    window.location.reload(); // Temporário para demonstração
  };

  return (
    <PageLayout breadcrumbItems={[{ title: "Fila de atendimento" }]}>
      {/* Main Content */}
      <div className="p-6 space-y-6 mr-[320px]">
        {/* Header with search and add citizen button */}
        <AttendanceHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showAddCitizenButton={true}
          onAddCitizenClick={() => setShowAddCitizen(!showAddCitizen)}
        />

        {/* Status Counters */}
        <div className="flex items-center justify-center">
          <StatusCounters
            statusCounts={statusCounts}
            filters={filters}
            setFilters={setFilters}
            queueCount={mockQueueCount}
          />
        </div>

        {/* Add Citizen Collapsible */}
        {showAddCitizen && (
          <AddCitizen
            open={showAddCitizen}
            onOpenChange={setShowAddCitizen}
            queueCount={mockQueueCount}
            waitingCount={mockWaitingCount}
            statusCounts={statusCounts}
            filters={filters}
            setFilters={setFilters}
            isCollapsible={true}
          />
        )}

        {/* Attendance List */}
        <AttendanceList
          searchTerm={searchTerm}
          showMyAttendances={showMyAttendances}
          setShowMyAttendances={setShowMyAttendances}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filters={filters}
          setFilters={setFilters}
          onCallPatient={handleCallPatient}
        />
      </div>

      {/* Controles da Fila - Painel Lateral Fixo */}
      <QueueControls
        onCallNext={handleCallNext}
        onAddToQueue={handleAddToQueue} 
        onRefreshQueue={handleRefreshQueue}
        waitingCount={statusCounts.waiting}
        averageWaitTime={36}
      />

      {/* Fixed Password Caller */}
      <PasswordCaller />
    </PageLayout>
  );
};

export default Index;
