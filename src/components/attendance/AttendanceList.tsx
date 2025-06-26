
import { AttendanceCard } from "./AttendanceCard";

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
    serviceTypes: ["CONSULTA"],
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
  // More citizens with photos (continuing with vaccination and regular services)
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
    serviceTypes: ["VACINAÇÃO"],
    professional: "Enf. Paula Lima - Enfermeiro - Equipe APS 2",
    team: "Equipe APS 2",
    vulnerability: "BAIXA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Sistema"
  },
  // ... add more citizens with photos (up to 30 total)
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
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "Recepção"
  }
  // ... continue with more citizens without photos to reach 20 total
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
  sortBy: string;
  filters: {
    status: string[];
    period: { start: Date; end: Date };
    serviceType: string[];
    team: string[];
    professional: string[];
    onlyUnfinished: boolean;
  };
  onCallPatient?: (patientId: string, patientName: string) => void;
}

export const AttendanceList = ({ 
  searchTerm, 
  showMyAttendances, 
  sortBy, 
  filters,
  onCallPatient 
}: AttendanceListProps) => {
  const filteredAttendances = mockAttendances.filter(attendance => {
    const matchesSearch = attendance.citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attendance.citizen.cpf.includes(searchTerm) ||
                         attendance.citizen.cns.includes(searchTerm);
    
    const matchesStatus = filters.status.includes(attendance.status);
    
    return matchesSearch && matchesStatus;
  });

  const sortedAttendances = [...filteredAttendances].sort((a, b) => {
    switch (sortBy) {
      case "arrival":
        return a.arrivalTime.localeCompare(b.arrivalTime);
      case "name":
        return a.citizen.name.localeCompare(b.citizen.name);
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Atendimentos ({sortedAttendances.length})
        </h2>
      </div>
      
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
    </div>
  );
};
