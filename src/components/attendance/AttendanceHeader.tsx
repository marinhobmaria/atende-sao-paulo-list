
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

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
    <div className="flex items-center justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por nome, CPF, CNS..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {showAddCitizenButton && (
        <Button 
          onClick={onAddCitizenClick}
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Incluir na fila
        </Button>
      )}
    </div>
  );
};
