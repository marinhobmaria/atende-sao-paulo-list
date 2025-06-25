
import { useState } from "react";
import { AttendanceList } from "@/components/attendance/AttendanceList";
import { AttendanceHeader } from "@/components/attendance/AttendanceHeader";
import { AddCitizen } from "@/components/attendance/AddCitizen";
import { StatusCounters } from "@/components/attendance/StatusCounters";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

// Mock data for queue counts - in a real app this would come from a store/context
const mockQueueCount = 25;
const mockWaitingCount = 8;

// Mock status counters
const mockStatusCounters = {
  waiting: 8,
  inService: 4,
  initialListening: 3,
  vaccination: 2,
  completed: 6,
  didNotWait: 2,
  total: 25
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMyAttendances, setShowMyAttendances] = useState(false);
  const [sortBy, setSortBy] = useState("arrival");
  const [filters, setFilters] = useState({
    status: ["waiting", "in-service", "initial-listening", "vaccination"],
    period: { start: new Date(), end: new Date() },
    serviceType: [],
    team: [],
    professional: [],
    onlyUnfinished: false
  });

  const handleStatusToggle = (status: string) => {
    if (status === "select-all") {
      setFilters(prev => ({
        ...prev,
        status: ["waiting", "in-service", "initial-listening", "vaccination", "completed", "did-not-wait"]
      }));
    } else if (status === "clear-all") {
      setFilters(prev => ({
        ...prev,
        status: []
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        status: prev.status.includes(status)
          ? prev.status.filter(s => s !== status)
          : [...prev.status, status]
      }));
    }
  };

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

        {/* Add Citizen Section */}
        <AddCitizen
          queueCount={mockQueueCount}
          waitingCount={mockWaitingCount}
        />

        {/* Status Counters */}
        <StatusCounters
          counters={mockStatusCounters}
          selectedStatuses={filters.status}
          onStatusToggle={handleStatusToggle}
        />

        {/* Attendance List */}
        <AttendanceList
          searchTerm={searchTerm}
          showMyAttendances={showMyAttendances}
          sortBy={sortBy}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default Index;
