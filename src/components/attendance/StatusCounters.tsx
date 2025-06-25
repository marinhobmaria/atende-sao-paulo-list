import { Badge } from "@/components/ui/badge";

interface StatusCountersProps {
  statusCounts: {
    waiting: number;
    'in-service': number;
    'initial-listening': number;
    vaccination: number;
  };
  filters: any;
  setFilters: (filters: any) => void;
}

export const StatusCounters = ({ statusCounts, filters, setFilters }: StatusCountersProps) => {
  const statusConfig = [
    {
      key: 'waiting',
      label: 'Aguardando',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      key: 'in-service',
      label: 'Em atendimento',
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    },
    {
      key: 'initial-listening',
      label: 'Em escuta inicial',
      color: 'bg-pink-500 hover:bg-pink-600',
      textColor: 'text-white'
    },
    {
      key: 'vaccination',
      label: 'Em vacinação',
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    }
  ];

  const handleStatusFilter = (status: string) => {
    // If status is already selected alone, show all statuses
    if (filters.status.length === 1 && filters.status.includes(status)) {
      setFilters({
        ...filters,
        status: ['waiting', 'in-service', 'initial-listening', 'vaccination']
      });
    } else {
      // Otherwise, filter to show only this status
      setFilters({
        ...filters,
        status: [status]
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {statusConfig.map((config) => (
        <button
          key={config.key}
          onClick={() => handleStatusFilter(config.key)}
          className={`
            ${config.color} ${config.textColor}
            px-3 py-2 rounded-lg font-medium text-sm
            transition-all duration-200 cursor-pointer
            border-2 border-transparent
            ${filters.status.length === 1 && filters.status.includes(config.key) 
              ? 'ring-2 ring-blue-300 border-blue-200' 
              : ''
            }
          `}
        >
          {config.label}: {statusCounts[config.key as keyof typeof statusCounts]}
        </button>
      ))}
    </div>
  );
};
