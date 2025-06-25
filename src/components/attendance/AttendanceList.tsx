
import { AttendanceCard } from "./AttendanceCard";

interface AttendanceListProps {
  searchTerm: string;
  showMyAttendances: boolean;
  sortBy: string;
  filters: any;
}

// Mock data para demonstração com fotos
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
    team: "Equipe A",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
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
    team: "Equipe B",
    vulnerability: "ALTA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
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
    team: "Equipe A",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
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
      <h2 className="text-lg font-semibold">
        Lista de Atendimento ({filteredAttendances.length})
      </h2>
      
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
