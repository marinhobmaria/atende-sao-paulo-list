
import { useState } from "react";
import { AttendanceList } from "@/components/attendance/AttendanceList";
import { AttendanceHeader } from "@/components/attendance/AttendanceHeader";
import { AddCitizen } from "@/components/attendance/AddCitizen";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const Index = () => {
  const [showAddCitizen, setShowAddCitizen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMyAttendances, setShowMyAttendances] = useState(false);
  const [sortBy, setSortBy] = useState("arrival");
  const [filters, setFilters] = useState({
    status: ["waiting", "in-service", "initial-listening"],
    period: { start: new Date(), end: new Date() },
    serviceType: [],
    team: [],
    professional: [],
    onlyUnfinished: false
  });

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
          showAddCitizen={showAddCitizen}
          setShowAddCitizen={setShowAddCitizen}
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
