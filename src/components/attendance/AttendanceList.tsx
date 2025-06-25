
import { AttendanceCard } from "./AttendanceCard";

interface AttendanceListProps {
  searchTerm: string;
  showMyAttendances: boolean;
  sortBy: string;
  filters: any;
}

// Mock data para demonstração com fotos e diferentes status
const mockAttendances = [
  {
    id: "1",
    citizen: {
      name: "Maria Silva Santos",
      age: 45,
      cpf: "123.456.789-00",
      cns: "123456789012345",
      photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "08:30",
    status: "waiting",
    serviceTypes: ["DEMANDA ESPONTÂNEA"],
    professional: "MARIA MARINHO - MÉDICO CLÍNICO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    scheduledAppointment: null
  },
  {
    id: "2", 
    citizen: {
      name: "José Oliveira",
      age: 62,
      cpf: "987.654.321-00",
      cns: "987654321098765",
      photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "09:15",
    status: "in-service",
    serviceTypes: ["CONSULTA", "EXAMES"],
    professional: "JOÃO SILVA - ENFERMEIRO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "ALTA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false,
    scheduledAppointment: { id: "apt_1", time: "09:15" }
  },
  {
    id: "3",
    citizen: {
      name: "Ana Costa Lima",
      age: 33,
      cpf: "456.789.123-00", 
      cns: "456789123456789",
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "10:00",
    status: "initial-listening",
    serviceTypes: ["VACINA"],
    professional: "ANA COSTA - TÉCNICO EM ENFERMAGEM - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    scheduledAppointment: null
  },
  {
    id: "4",
    citizen: {
      name: "Carlos Pereira",
      age: 28,
      cpf: "789.123.456-00", 
      cns: "789123456789123",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "10:30",
    status: "vaccination",
    serviceTypes: ["VACINA", "PROCEDIMENTOS"],
    professional: "PEDRO SANTOS - ENFERMEIRO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "BAIXA",
    hasInitialListening: true,
    hasPreService: true,
    isCompleted: false,
    scheduledAppointment: null
  },
  {
    id: "5",
    citizen: {
      name: "Fernanda Rodrigues",
      age: 55,
      cpf: "321.654.987-00",
      cns: "321654987321654",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b784?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "11:00",
    status: "completed",
    serviceTypes: ["PRÉ-CONSULTA", "CONSULTA"],
    professional: "CARLA MENDES - MÉDICO GENERALISTA - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: true,
    isCompleted: true,
    scheduledAppointment: { id: "apt_2", time: "11:00" }
  },
  {
    id: "6",
    citizen: {
      name: "Roberto Santos",
      age: 41,
      cpf: "654.321.987-00",
      cns: "654321987654321",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "11:30",
    status: "waiting",
    serviceTypes: [],
    professional: "LUCAS FERNANDES - MÉDICO CLÍNICO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    scheduledAppointment: { id: "apt_3", time: "11:30" }
  },
  {
    id: "7",
    citizen: {
      name: "Juliana Alves",
      age: 29,
      cpf: "147.258.369-00",
      cns: "147258369147258",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "12:00",
    status: "did-not-wait",
    serviceTypes: ["DEMANDA ESPONTÂNEA"],
    professional: "PATRICIA LIMA - ENFERMEIRO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "BAIXA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    scheduledAppointment: null
  },
  {
    id: "8",
    citizen: {
      name: "Marcos Oliveira",
      age: 67,
      cpf: "369.258.147-00",
      cns: "369258147369258",
      photo: "https://images.unsplash.com/photo-1556474835-b0f3ac40d4d1?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "13:15",
    status: "in-service",
    serviceTypes: ["CURATIVO", "MEDICAÇÃO"],
    professional: "SANDRA TORRES - TÉCNICO EM ENFERMAGEM - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "ALTA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false,
    scheduledAppointment: null
  },
  {
    id: "9",
    citizen: {
      name: "Beatriz Costa",
      age: 38,
      cpf: "258.147.369-00",
      cns: "258147369258147",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "13:45",
    status: "vaccination",
    serviceTypes: ["VACINA COVID", "VACINA GRIPE"],
    professional: "RAFAEL SILVA - ENFERMEIRO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    scheduledAppointment: null
  },
  {
    id: "10",
    citizen: {
      name: "Diego Martins",
      age: 52,
      cpf: "741.852.963-00",
      cns: "741852963741852",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "14:00",
    status: "initial-listening",
    serviceTypes: ["DEMANDA ESPONTÂNEA"],
    professional: "GABRIELA SANTOS - MÉDICO CLÍNICO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    scheduledAppointment: null
  }
];

export const AttendanceList = ({ searchTerm, showMyAttendances, sortBy, filters }: AttendanceListProps) => {
  let filteredAttendances = mockAttendances;

  // Filter by search term
  if (searchTerm) {
    filteredAttendances = filteredAttendances.filter(attendance =>
      attendance.citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendance.citizen.cpf.includes(searchTerm) ||
      attendance.citizen.cns.includes(searchTerm)
    );
  }

  // Filter by status
  filteredAttendances = filteredAttendances.filter(attendance =>
    filters.status.includes(attendance.status)
  );

  // Sort
  if (sortBy === "arrival-desc") {
    filteredAttendances.sort((a, b) => b.arrivalTime.localeCompare(a.arrivalTime));
  } else if (sortBy === "risk") {
    filteredAttendances.sort((a, b) => {
      const riskOrder = { "ALTA": 3, "MÉDIA": 2, "BAIXA": 1, null: 0 };
      return (riskOrder[b.vulnerability as keyof typeof riskOrder] || 0) - (riskOrder[a.vulnerability as keyof typeof riskOrder] || 0);
    });
  } else {
    filteredAttendances.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime));
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {filteredAttendances.map((attendance) => (
          <AttendanceCard key={attendance.id} attendance={attendance} />
        ))}
      </div>

      {filteredAttendances.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum atendimento encontrado com os filtros aplicados.
        </div>
      )}
    </div>
  );
};
