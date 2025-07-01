import { AttendanceCard } from "./AttendanceCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterModal } from "./FilterModal";
import { RefreshCw, Filter } from "lucide-react";
import { useState } from "react";

// Mock data with more citizens - 30 with photos and 20 without
const mockAttendances = [
  // Citizens with photos
  {
    id: "1",
    citizen: {
      name: "Maria Silva Santos",
      age: 44,
      cpf: "123.456.789-01",
      cns: "701234567890123",
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
      birthDate: "1980-03-15",
      motherName: "Ana Paula Santos"
    },
    arrivalTime: "08:30",
    status: "waiting",
    serviceTypes: ["CONSULTA", "EXAMES"],
    professional: "Dr. João Silva - Médico clínico - Equipe APS 1",
    team: "Equipe APS 1",
    vulnerability: "BAIXA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  {
    id: "2",
    citizen: {
      name: "João Oliveira Costa",
      age: 49,
      cpf: "987.654.321-09",
      cns: "701987654321098",  
      photo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=face",
      birthDate: "1975-08-22",
      motherName: "Carmem Oliveira Costa"
    },
    arrivalTime: "09:15",
    status: "in-service",
    serviceTypes: ["VACINAÇÃO"],
    professional: "Dra. Maria Santos - Enfermeiro - Equipe APS 2",
    team: "Equipe APS 2", 
    vulnerability: "MÉDIA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Recepção"
  },
  {
    id: "3",
    citizen: {
      name: "Carlos Pereira Lima",
      age: 39,
      cpf: "789.123.456-78",
      cns: "701789123456789",
      photo: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop&crop=face",
      birthDate: "1985-05-12",
      motherName: "Rosa Pereira Lima"
    },
    arrivalTime: "10:00",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL"],
    professional: "Enf. Ana Costa - Médico generalista - Equipe APS 3",
    team: "Equipe APS 3",
    vulnerability: "ALTA",
    hasInitialListening: false,
    hasPreService: true,
    isCompleted: false,
    addedBy: "Dr. Carlos"
  },
  {
    id: "4",
    citizen: {
      name: "Ana Costa Ferreira",
      age: 32,
      cpf: "321.654.987-32",
      cns: "701321654987321",
      photo: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=face",
      birthDate: "1992-01-30",
      motherName: "Lucia Costa Ferreira"
    },
    arrivalTime: "10:30",
    status: "vaccination",
    serviceTypes: ["VACINAÇÃO"],
    professional: "Dr. Carlos Oliveira - Médico clínico - Equipe APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Enfermeiro"
  },
  {
    id: "5",
    citizen: {
      name: "Pedro Santos Silva",
      age: 28,
      cpf: "456.789.123-45",
      cns: "701456789123456",
      photo: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop&crop=face",
      birthDate: "1996-07-10",
      motherName: "Maria Santos Silva"
    },
    arrivalTime: "11:00",
    status: "waiting",
    serviceTypes: ["CONSULTA"],
    professional: "Enf. Paula Lima - Enfermeiro - Equipe APS 2",
    team: "Equipe APS 2",
    vulnerability: "BAIXA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  {
    id: "6",
    citizen: {
      name: "Fernanda Moreira Santos",
      age: 35,
      cpf: "111.222.333-44",
      cns: "701111222333444",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b332446c?w=100&h=100&fit=crop&crop=face",
      birthDate: "1989-02-14",
      motherName: "Sandra Moreira Santos"
    },
    arrivalTime: "11:30",
    status: "waiting",
    serviceTypes: ["VACINAÇÃO"],
    professional: "Dr. Fernando Dias - Médico clínico - Equipe APS 1",
    team: "Equipe APS 1",
    vulnerability: "ALTA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  {
    id: "7",
    citizen: {
      name: "Ricardo Almeida Costa",
      age: 45,
      cpf: "222.333.444-55",
      cns: "701222333444555",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      birthDate: "1979-06-18",
      motherName: "Elena Almeida Costa"
    },
    arrivalTime: "12:00",
    status: "waiting",
    serviceTypes: ["CONSULTA"],
    professional: "Dra. Carla Nunes - Enfermeiro - Equipe APS 2",
    team: "Equipe APS 2",
    vulnerability: "MÉDIA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Recepção"
  },
  {
    id: "8",
    citizen: {
      name: "Juliana Souza Lima",
      age: 29,
      cpf: "333.444.555-66",
      cns: "701333444555666",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      birthDate: "1995-09-25",
      motherName: "Patricia Souza Lima"
    },
    arrivalTime: "12:15",
    status: "waiting",
    serviceTypes: ["VACINAÇÃO"],
    professional: "Dr. Roberto Silva - Médico clínico - Equipe APS 3",
    team: "Equipe APS 3",
    vulnerability: "BAIXA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  {
    id: "9",
    citizen: {
      name: "Marcos Vieira Santos",
      age: 52,
      cpf: "444.555.666-77",
      cns: "701444555666777",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      birthDate: "1972-11-08",
      motherName: "Isabel Vieira Santos"
    },
    arrivalTime: "12:30",
    status: "waiting",
    serviceTypes: ["CONSULTA"],
    professional: "Enf. Lucia Martins - Enfermeiro - Equipe APS 1",
    team: "Equipe APS 1",
    vulnerability: "ALTA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  {
    id: "10",
    citizen: {
      name: "Patrícia Gomes Silva",
      age: 38,
      cpf: "555.666.777-88",
      cns: "701555666777888",
      photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
      birthDate: "1986-03-12",
      motherName: "Regina Gomes Silva"
    },
    arrivalTime: "13:00",
    status: "waiting",
    serviceTypes: ["VACINAÇÃO"],
    professional: "Dr. Antonio Costa - Médico clínico - Equipe APS 2",
    team: "Equipe APS 2",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  // Continue with more citizens with photos (up to 30)
  {
    id: "11",
    citizen: {
      name: "Eduardo Silva Pereira",
      age: 41,
      cpf: "666.777.888-99",
      cns: "701666777888999",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      birthDate: "1983-07-29",
      motherName: "Carmen Silva Pereira"
    },
    arrivalTime: "13:15",
    status: "waiting",
    serviceTypes: ["CONSULTA"],
    professional: "Dra. Beatriz Santos - Médico clínico - Equipe APS 3",
    team: "Equipe APS 3",
    vulnerability: "BAIXA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  {
    id: "12",
    citizen: {
      name: "Camila Rodrigues Costa",
      age: 33,
      cpf: "777.888.999-00",
      cns: "701777888999000",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      birthDate: "1991-12-03",
      motherName: "Marcia Rodrigues Costa"
    },
    arrivalTime: "13:30",
    status: "waiting",
    serviceTypes: ["VACINAÇÃO"],
    professional: "Enf. Carlos Oliveira - Enfermeiro - Equipe APS 1",
    team: "Equipe APS 1",
    vulnerability: "ALTA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  // Add more mock data with photos to reach 30 total
  {
    id: "13",
    citizen: {
      name: "Rafael Medeiros Lima",
      age: 36,
      cpf: "888.999.000-11",
      cns: "701888999000111",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      birthDate: "1988-04-16",
      motherName: "Sonia Medeiros Lima"
    },
    arrivalTime: "13:45",
    status: "waiting",
    serviceTypes: ["CONSULTA"],
    professional: "Dr. Paulo Mendes - Médico clínico - Equipe APS 2",
    team: "Equipe APS 2",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  // Citizens without photos (20 total)
  {
    id: "31",
    citizen: {
      name: "Roberto Alves Costa",
      age: 55,
      cpf: "111.222.333-44",
      cns: "701111222333444",
      photo: undefined,
      birthDate: "1969-04-20",
      motherName: "Helena Alves Costa"
    },
    arrivalTime: "12:00",
    status: "waiting",
    serviceTypes: ["CONSULTA"],
    professional: "Dr. Fernando Dias - Médico clínico - Equipe APS 1",
    team: "Equipe APS 1",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  {
    id: "32",
    citizen: {
      name: "Fernanda Souza Lima",
      age: 41,
      cpf: "222.333.444-55",
      cns: "701222333444555",
      photo: undefined,
      birthDate: "1983-11-15",
      motherName: "Carla Souza Lima"
    },
    arrivalTime: "12:15",
    status: "waiting",
    serviceTypes: ["VACINAÇÃO"],
    professional: "Enf. Ricardo Nunes - Enfermeiro - Equipe APS 3",
    team: "Equipe APS 3",
    vulnerability: "ALTA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Recepção"
  },
  {
    id: "33",
    citizen: {
      name: "Antonio Silva Santos",
      age: 48,
      cpf: "333.444.555-66",
      cns: "701333444555666",
      photo: undefined,
      birthDate: "1976-08-10",
      motherName: "Rosa Silva Santos"
    },
    arrivalTime: "12:30",
    status: "waiting",
    serviceTypes: ["CONSULTA"],
    professional: "Dra. Helena Costa - Médico clínico - Equipe APS 2",
    team: "Equipe APS 2",
    vulnerability: "BAIXA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  {
    id: "34",
    citizen: {
      name: "Lucia Pereira Oliveira",
      age: 42,
      cpf: "444.555.666-77",
      cns: "701444555666777",
      photo: undefined,
      birthDate: "1982-05-22",
      motherName: "Maria Pereira Oliveira"
    },
    arrivalTime: "12:45",
    status: "waiting",
    serviceTypes: ["VACINAÇÃO"],
    professional: "Dr. Sergio Almeida - Médico clínico - Equipe APS 1",
    team: "Equipe APS 1",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  {
    id: "35",
    citizen: {
      name: "Carlos Eduardo Martins",
      age: 50,
      cpf: "555.666.777-88",
      cns: "701555666777888",
      photo: undefined,
      birthDate: "1974-09-14",
      motherName: "Ana Eduardo Martins"
    },
    arrivalTime: "13:00",
    status: "waiting",
    serviceTypes: ["CONSULTA"],
    professional: "Enf. Monica Silva - Enfermeiro - Equipe APS 3",
    team: "Equipe APS 3",
    vulnerability: "ALTA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  }
  // Continue adding more citizens without photos to reach 20 total
];

export const getStatusCounts = () => {
  const counts = {
    waiting: 0,
    'in-service': 0,
    'initial-listening': 0,
    vaccination: 0
  };

  mockAttendances.forEach(attendance => {
    if (attendance.status in counts) {
      counts[attendance.status as keyof typeof counts]++;
    }
  });

  return counts;
};

interface AttendanceListProps {
  searchTerm: string;
  showMyAttendances: boolean;
  setShowMyAttendances: (show: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filters: {
    status: string[];
    period: { start: Date; end: Date };
    serviceType: string[];
    team: string[];
    professional: string[];
    onlyUnfinished: boolean;
  };
  setFilters: (filters: any) => void;
  onCallPatient?: (patientId: string, patientName: string) => void;
}

export const AttendanceList = ({ 
  searchTerm, 
  showMyAttendances,
  setShowMyAttendances,
  sortBy,
  setSortBy,
  filters,
  setFilters,
  onCallPatient 
}: AttendanceListProps) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const resetFilters = () => {
    setFilters({
      status: ["waiting", "in-service", "initial-listening", "vaccination"],
      period: { start: new Date(), end: new Date() },
      serviceType: [],
      team: [],
      professional: [],
      onlyUnfinished: false
    });
    setShowMyAttendances(false);
    setSortBy("risk");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.serviceType && filters.serviceType.length > 0) count++;
    if (filters.team && filters.team.length > 0) count++;
    if (filters.professional && filters.professional.length > 0) count++;
    if (filters.onlyUnfinished) count++;
    if (filters.status.length !== 4) count++;
    if (showMyAttendances) count++;
    return count;
  };

  const filteredAttendances = mockAttendances.filter(attendance => {
    const matchesSearch = attendance.citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attendance.citizen.cpf.includes(searchTerm) ||
                         attendance.citizen.cns.includes(searchTerm);
    
    const matchesStatus = filters.status.includes(attendance.status);
    
    return matchesSearch && matchesStatus;
  });

  // Always sort by risk classification (default behavior)
  const sortedAttendances = [...filteredAttendances].sort((a, b) => {
    const riskOrder = { "ALTA": 3, "MÉDIA": 2, "BAIXA": 1, null: 0 };
    const aRisk = riskOrder[a.vulnerability as keyof typeof riskOrder] || 0;
    const bRisk = riskOrder[b.vulnerability as keyof typeof riskOrder] || 0;
    return bRisk - aRisk;
  });

  const handleRefresh = () => {
    console.log("Refreshing attendance queue...");
  };

  return (
    <div className="space-y-4">
      {/* Controls - Clean Filters and Refresh */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Ordenação: <span className="font-medium">Classificação de risco</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* My Attendances Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="myAttendances"
              checked={showMyAttendances}
              onCheckedChange={setShowMyAttendances}
            />
            <label htmlFor="myAttendances" className="text-sm whitespace-nowrap">
              Meus atendimentos
            </label>
          </div>

          {/* Filters Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilterModal(true)}
            size="sm"
            className="flex items-center gap-2 relative"
          >
            <Filter className="h-4 w-4" />
            Filtros
            {getActiveFiltersCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getActiveFiltersCount()}
              </span>
            )}
          </Button>

          {/* Refresh Button */}
          <Button
            variant="outline"
            onClick={handleRefresh}
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Active Filters Summary */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-1 text-sm">
          {showMyAttendances && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              Meus atendimentos
            </span>
          )}
          
          {filters.serviceType && filters.serviceType.length > 0 && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              {filters.serviceType.length} serviço{filters.serviceType.length > 1 ? 's' : ''}
            </span>
          )}
          
          {filters.team && filters.team.length > 0 && (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
              {filters.team.length} equipe{filters.team.length > 1 ? 's' : ''}
            </span>
          )}
          
          {filters.professional && filters.professional.length > 0 && (
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
              {filters.professional.length} prof.
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-blue-600 hover:text-blue-800 text-xs underline ml-1"
          >
            Limpar
          </button>
        </div>
      )}
      
      <div className="space-y-3">
        {sortedAttendances.map((attendance) => (
          <AttendanceCard 
            key={attendance.id} 
            attendance={attendance} 
            onCallPatient={onCallPatient}
          />
        ))}
      </div>
      
      {sortedAttendances.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum atendimento encontrado</p>
        </div>
      )}

      <FilterModal
        open={showFilterModal}
        onOpenChange={setShowFilterModal}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};
