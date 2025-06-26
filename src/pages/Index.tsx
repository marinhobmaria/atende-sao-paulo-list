
import { useState } from "react";
import { AttendanceList, getStatusCounts } from "@/components/attendance/AttendanceList";
import { AttendanceHeader } from "@/components/attendance/AttendanceHeader";
import { AddCitizen } from "@/components/attendance/AddCitizen";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Home, Plus } from "lucide-react";

// Mock data for queue counts - in a real app this would come from a store/context
const mockQueueCount = 50;
const mockWaitingCount = getStatusCounts().waiting;

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMyAttendances, setShowMyAttendances] = useState(false);
  const [sortBy, setSortBy] = useState("arrival");
  const [showAddCitizen, setShowAddCitizen] = useState(false);
  const [filters, setFilters] = useState({
    status: ["waiting", "in-service", "initial-listening", "vaccination"],
    period: { start: new Date(), end: new Date() },
    serviceType: [],
    team: [],
    professional: [],
    onlyUnfinished: false
  });

  const statusCounts = getStatusCounts();

  return (
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
          <Button
            onClick={() => setShowAddCitizen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Adicionar munícipe
          </Button>
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

        {/* Attendance List */}
        <AttendanceList
          searchTerm={searchTerm}
          showMyAttendances={showMyAttendances}
          sortBy={sortBy}
          filters={filters}
        />

        {/* Add Citizen Modal */}
        <AddCitizen
          open={showAddCitizen}
          onOpenChange={setShowAddCitizen}
          queueCount={mockQueueCount}
          waitingCount={mockWaitingCount}
          statusCounts={statusCounts}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
};

export default Index;
