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
  queueCount: number;
}

export const StatusCounters = ({ statusCounts, filters, setFilters, queueCount }: StatusCountersProps) => {
  const statusConfig = [
    {
      key: 'all',
      label: 'Fila',
      count: queueCount,
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      key: 'waiting',
      label: 'Aguardando',
      count: statusCounts.waiting,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      key: 'in-service',
      label: 'Em atendimento',
      count: statusCounts['in-service'],
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    },
    {
      key: 'initial-listening',
      label: 'Em escuta inicial',
      count: statusCounts['initial-listening'],
      color: 'bg-pink-500 hover:bg-pink-600',
      textColor: 'text-white'
    },
    {
      key: 'vaccination',
      label: 'Em vacinação',
      count: statusCounts.vaccination,
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    }
  ];

  const handleStatusFilter = (status: string) => {
    if (status === 'all') {
      // Show all statuses
      setFilters({
        ...filters,
        status: ['waiting', 'in-service', 'initial-listening', 'vaccination']
      });
    } else {
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
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {statusConfig.map((config) => (
        <button
          key={config.key}
          onClick={() => handleStatusFilter(config.key)}
          className={`
            ${config.color} ${config.textColor}
            px-3 py-1.5 rounded-full font-medium text-sm
            transition-all duration-200 cursor-pointer
            border-2 border-transparent
            ${(config.key === 'all' && filters.status.length === 4) ||
              (config.key !== 'all' && filters.status.length === 1 && filters.status.includes(config.key))
              ? 'ring-2 ring-blue-300 border-blue-200' 
              : ''
            }
          `}
        >
          {config.label}: {config.count}
        </button>
      ))}
    </div>
  );
};
