
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StatusCounters } from "./StatusCounters";
import { CitizenSearch } from "./CitizenSearch";

interface AddCitizenProps {
  queueCount: number;
  waitingCount: number;
  statusCounts: {
    waiting: number;
    'in-service': number;
    'initial-listening': number;
    vaccination: number;
  };
  filters: any;
  setFilters: (filters: any) => void;
}

export const AddCitizen = ({ queueCount, waitingCount, statusCounts, filters, setFilters }: AddCitizenProps) => {
  const [showCitizenSearch, setShowCitizenSearch] = useState(false);

  const handleAddCitizen = () => {
    setShowCitizenSearch(true);
  };

  const handleCloseCitizenSearch = () => {
    setShowCitizenSearch(false);
  };

  const handleCitizenSelected = (citizen: any) => {
    console.log("Citizen selected:", citizen);
    // Aqui você pode adicionar a lógica para adicionar o cidadão à fila
    setShowCitizenSearch(false);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 mb-3">
                Filtros de Status
              </CardTitle>
              <StatusCounters 
                statusCounts={statusCounts}
                filters={filters}
                setFilters={setFilters}
                queueCount={queueCount}
              />
            </div>
            <Button 
              onClick={handleAddCitizen}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Munícipe
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Modal de busca de cidadão */}
      {showCitizenSearch && (
        <CitizenSearch
          isOpen={showCitizenSearch}
          onClose={handleCloseCitizenSearch}
          onCitizenSelected={handleCitizenSelected}
        />
      )}
    </>
  );
};
