
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AttendanceHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showAddCitizenButton?: boolean;
  onAddCitizenClick?: () => void;
}

export const AttendanceHeader = ({
  searchTerm,
  setSearchTerm,
  showAddCitizenButton = false,
  onAddCitizenClick
}: AttendanceHeaderProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4">
        {/* Search and Add Citizen Button */}
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

          {/* Add Citizen Button */}
          {showAddCitizenButton && (
            <Button
              onClick={onAddCitizenClick}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar munícipe
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
