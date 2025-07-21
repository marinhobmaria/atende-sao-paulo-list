
import { useState } from "react";
import { AttendanceList, getStatusCounts } from "@/components/attendance/AttendanceList";
import { AttendanceHeader } from "@/components/attendance/AttendanceHeader";
import { AddCitizen } from "@/components/attendance/AddCitizen";
import { StatusCounters } from "@/components/attendance/StatusCounters";
import { PasswordCaller } from "@/components/attendance/PasswordCaller";
import { AppSidebar } from "@/components/AppSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Home, User } from "lucide-react";

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

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <SidebarInset className="flex-1">
            {/* Doctor Header */}
            <div className="flex h-12 items-center gap-3 border-b px-6 bg-background">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <span className="font-medium text-sm">Dr OM30</span>
              </div>
            </div>

            {/* Header with Sidebar Trigger */}
            <header className="flex h-14 items-center gap-2 border-b px-6">
              <SidebarTrigger />
              
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
                    <BreadcrumbPage>Fila de atendimento</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>

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
          </SidebarInset>

          {/* Fixed Password Caller */}
          <PasswordCaller />
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default Index;
