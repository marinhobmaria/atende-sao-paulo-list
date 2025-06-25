
import { Search, Filter, RotateCcw, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterModal } from "./FilterModal";
import { useState } from "react";

interface AttendanceHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showMyAttendances: boolean;
  setShowMyAttendances: (show: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filters: any;
  setFilters: (filters: any) => void;
}

export const AttendanceHeader = ({
  searchTerm,
  setSearchTerm,
  showMyAttendances,
  setShowMyAttendances,
  sortBy,
  setSortBy,
  filters,
  setFilters
}: AttendanceHeaderProps) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleRefresh = () => {
    // Simulate refresh action
    console.log("Refreshing attendance queue...");
    // In a real application, this would trigger a data refetch
  };

  const resetFilters = () => {
    setFilters({
      status: ["waiting", "in-service", "initial-listening"],
      period: { start: new Date(), end: new Date() },
      serviceType: [],
      team: [],
      professional: [],
      onlyUnfinished: false
    });
    setSearchTerm("");
    setShowMyAttendances(false);
    setSortBy("arrival");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.serviceType && filters.serviceType.length > 0) count++;
    if (filters.team && filters.team.length > 0) count++;
    if (filters.professional && filters.professional.length > 0) count++;
    if (filters.onlyUnfinished) count++;
    if (filters.status.length !== 3) count++; // Default has 3 status
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
      {/* Search and Main Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Pesquisa por Nome, CPF, CNS ou data de nascimento"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* My Attendances */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="myAttendances"
            checked={showMyAttendances}
            onCheckedChange={setShowMyAttendances}
          />
          <label htmlFor="myAttendances" className="text-sm font-medium">
            Ver somente os meus atendimentos
          </label>
        </div>

        {/* Refresh Button */}
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
        >
          <RefreshCw className="h-4 w-4" />
          Atualizar fila
        </Button>

        {/* Filter Button with count indicator */}
        <Button
          variant="outline"
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-2 relative"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {getActiveFiltersCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getActiveFiltersCount()}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Summary - More compact and harmonious */}
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Status:</span>
          <div className="flex gap-1">
            {filters.status.map((status: string, index: number) => (
              <span key={status} className="text-muted-foreground">
                {index > 0 && ", "}
                {status === "waiting" ? "Aguardando" : 
                 status === "in-service" ? "Em atendimento" :
                 status === "initial-listening" ? "Escuta inicial" :
                 status === "completed" ? "Realizados" :
                 status === "did-not-wait" ? "Não aguardou" : status}
              </span>
            ))}
          </div>
        </div>
        
        {showMyAttendances && (
          <>
            <span className="text-muted-foreground">•</span>
            <span className="text-blue-600 font-medium">Meus atendimentos</span>
          </>
        )}
        
        {getActiveFiltersCount() > 0 && (
          <>
            <span className="text-muted-foreground">•</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800 hover:bg-transparent"
            >
              Limpar filtros
            </Button>
          </>
        )}
      </div>

      <FilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};
