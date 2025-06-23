
import { Search, Filter, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
      {/* Search and Controls */}
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

        {/* Sort By */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="arrival">Ordem de chegada (crescente)</SelectItem>
            <SelectItem value="arrival-desc">Ordem de chegada (decrescente)</SelectItem>
            <SelectItem value="risk">Classificação de risco</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter Button */}
        <Button
          variant="outline"
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
        </Button>

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={resetFilters}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Voltar para padrão
        </Button>
      </div>

      {/* Filter Summary */}
      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
        <span>Status: {filters.status.join(", ")}</span>
        <span>•</span>
        <span>Período: {filters.period.start.toLocaleDateString()} - {filters.period.end.toLocaleDateString()}</span>
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
