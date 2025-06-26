import { Search, Filter, RefreshCw } from "lucide-react";
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
    if (filters.status.length !== 3) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4">
        {/* Search and Main Controls */}
        <div className="flex gap-3 items-center">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Nome, CPF ou CNS"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="myAttendances"
                checked={showMyAttendances}
                onCheckedChange={setShowMyAttendances}
              />
              <label htmlFor="myAttendances" className="text-sm whitespace-nowrap">
                Meus atendimentos
              </label>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilterModal(true)}
              size="sm"
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
        </div>

        {/* Active Filters Summary - Made more compact */}
        {(getActiveFiltersCount() > 0 || showMyAttendances) && (
          <div className="flex flex-wrap gap-1 text-sm pt-3 border-t mt-3">
            {showMyAttendances && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                Meus atendimentos
              </span>
            )}
            
            {filters.serviceType && filters.serviceType.length > 0 && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                {filters.serviceType.length} serviço{filters.serviceType.length > 1 ? 's' : ''}
              </span>
            )}
            
            {filters.team && filters.team.length > 0 && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                {filters.team.length} equipe{filters.team.length > 1 ? 's' : ''}
              </span>
            )}
            
            {filters.professional && filters.professional.length > 0 && (
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                {filters.professional.length} prof.
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800 text-xs underline ml-1"
            >
              Limpar
            </button>
          </div>
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
