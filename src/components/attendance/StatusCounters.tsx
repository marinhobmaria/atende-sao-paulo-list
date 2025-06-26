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
      color: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300',
      activeColor: 'bg-blue-100 text-blue-700 border border-blue-300'
    },
    {
      key: 'waiting',
      label: 'Aguardando',
      count: statusCounts.waiting,
      color: 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200',
      activeColor: 'bg-green-100 text-green-700 border border-green-300'
    },
    {
      key: 'in-service',
      label: 'Em atendimento',
      count: statusCounts['in-service'],
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200',
      activeColor: 'bg-purple-100 text-purple-700 border border-purple-300'
    },
    {
      key: 'initial-listening',
      label: 'Em escuta inicial',
      count: statusCounts['initial-listening'],
      color: 'bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200',
      activeColor: 'bg-pink-100 text-pink-700 border border-pink-300'
    },
    {
      key: 'vaccination',
      label: 'Em vacinação',
      count: statusCounts.vaccination,
      color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200',
      activeColor: 'bg-indigo-100 text-indigo-700 border border-indigo-300'
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

  const isActive = (status: string) => {
    if (status === 'all') {
      return filters.status.length === 4;
    }
    return filters.status.length === 1 && filters.status.includes(status);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {statusConfig.map((config) => (
        <button
          key={config.key}
          onClick={() => handleStatusFilter(config.key)}
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            transition-all duration-200 cursor-pointer
            ${isActive(config.key) ? config.activeColor : config.color}
          `}
        >
          {config.label} {config.count}
        </button>
      ))}
    </div>
  );
};
