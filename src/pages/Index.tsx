
import { useState } from "react";
import { AttendanceList, getStatusCounts } from "@/components/attendance/AttendanceList";
import { AttendanceHeader } from "@/components/attendance/AttendanceHeader";
import { AddCitizen } from "@/components/attendance/AddCitizen";
import { StatusCounters } from "@/components/attendance/StatusCounters";
import { PasswordCaller } from "@/components/attendance/PasswordCaller";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Home, Plus, RefreshCw } from "lucide-react";

// Mock data for queue counts - in a real app this would come from a store/context
const mockQueueCount = 50;
const mockWaitingCount = getStatusCounts().waiting;

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMyAttendances, setShowMyAttendances] = useState(false);
  const [sortBy, setSortBy] = useState("arrival");
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

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Lista de Atendimento</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Main Title */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Fila de atendimento</h1>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Atualizado há 2 segundos</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Password Caller - Above filters */}
          <div className="flex justify-center">
            <PasswordCaller />
          </div>

          {/* Header */}
          <AttendanceHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showMyAttendances={showMyAttendances}
            setShowMyAttendances={setShowMyAttendances}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filters={filters}
            setFilters={setFilters}
          />

          {/* Status Counters and Add Citizen Button */}
          <div className="flex items-center justify-between gap-4">
            <StatusCounters
              statusCounts={statusCounts}
              filters={filters}
              setFilters={setFilters}
              queueCount={mockQueueCount}
            />
            
            <Button
              onClick={() => setShowAddCitizen(!showAddCitizen)}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar munícipe
            </Button>
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
            sortBy={sortBy}
            filters={filters}
            onCallPatient={handleCallPatient}
          />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Index;
