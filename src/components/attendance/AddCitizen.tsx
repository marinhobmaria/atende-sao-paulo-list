
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { StatusCounters } from "./StatusCounters";
import { CitizenSearch } from "./CitizenSearch";
import { AddCitizenForm } from "./AddCitizenForm";
import { CitizenRandom } from "@/data/mockCitizensRandom";

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
  const [searchValue, setSearchValue] = useState("");
  const [selectedCitizen, setSelectedCitizen] = useState<CitizenRandom | null>(null);

  const handleAddCitizen = () => {
    setShowCitizenSearch(true);
  };

  const handleCloseCitizenSearch = () => {
    setShowCitizenSearch(false);
    setSearchValue("");
    setSelectedCitizen(null);
  };

  const handleCitizenSelected = (citizen: CitizenRandom) => {
    console.log("Citizen selected:", citizen);
    setSelectedCitizen(citizen);
    setSearchValue("");
  };

  const handleNewCitizen = () => {
    console.log("New citizen requested");
    setShowCitizenSearch(false);
    setSearchValue("");
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setShowCitizenSearch(false);
    setSelectedCitizen(null);
    setSearchValue("");
  };

  const handleBackToCitizenSearch = () => {
    setSelectedCitizen(null);
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

      <Dialog open={showCitizenSearch} onOpenChange={setShowCitizenSearch}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedCitizen ? "Adicionar Munícipe à Fila" : "Adicionar Munícipe à Fila"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            {!selectedCitizen ? (
              <CitizenSearch
                value={searchValue}
                onChange={setSearchValue}
                onCitizenSelect={handleCitizenSelected}
                onNewCitizen={handleNewCitizen}
              />
            ) : (
              <AddCitizenForm
                selectedCitizen={selectedCitizen}
                onClose={handleCloseCitizenSearch}
                onSubmit={handleFormSubmit}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
