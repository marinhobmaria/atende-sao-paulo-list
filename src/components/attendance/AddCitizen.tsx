
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StatusCounters } from "./StatusCounters";

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
  return (
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
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Munícipe
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
