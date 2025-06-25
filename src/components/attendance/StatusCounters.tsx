
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StatusCountersProps {
  counters: {
    waiting: number;
    inService: number;
    initialListening: number;
    vaccination: number;
    completed: number;
    didNotWait: number;
    total: number;
  };
  selectedStatuses: string[];
  onStatusToggle: (status: string) => void;
}

export const StatusCounters = ({ counters, selectedStatuses, onStatusToggle }: StatusCountersProps) => {
  const statusItems = [
    { key: "waiting", label: "Aguardando", count: counters.waiting, color: "bg-green-500" },
    { key: "in-service", label: "Em atendimento", count: counters.inService, color: "bg-purple-500" },
    { key: "initial-listening", label: "Em escuta inicial", count: counters.initialListening, color: "bg-pink-500" },
    { key: "vaccination", label: "Em vacinação", count: counters.vaccination, color: "bg-purple-500" },
    { key: "completed", label: "Atendimento realizado", count: counters.completed, color: "bg-blue-500" },
    { key: "did-not-wait", label: "Não aguardou", count: counters.didNotWait, color: "bg-gray-500" },
  ];

  const allSelected = selectedStatuses.length === statusItems.length;

  const handleToggleAll = () => {
    if (allSelected) {
      onStatusToggle("clear-all");
    } else {
      onStatusToggle("select-all");
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button
        variant={allSelected ? "default" : "outline"}
        size="sm"
        onClick={handleToggleAll}
        className="h-8"
      >
        Fila ({counters.total})
      </Button>
      
      {statusItems.map((item) => (
        <Button
          key={item.key}
          variant={selectedStatuses.includes(item.key) ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusToggle(item.key)}
          className={`h-8 ${selectedStatuses.includes(item.key) ? item.color + " text-white border-transparent hover:opacity-90" : "hover:bg-gray-50"}`}
        >
          {item.label} ({item.count})
        </Button>
      ))}
    </div>
  );
};
