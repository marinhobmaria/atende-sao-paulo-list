import { AttendanceCard } from "./AttendanceCard";

interface AttendanceListProps {
  searchTerm: string;
  showMyAttendances: boolean;
  sortBy: string;
  filters: any;
}

// Mock data with 50 records with different types and statuses
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
    team: "Equipe APS 2",
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
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
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
    isCompleted: false
  },
  {
    id: "5",
    citizen: {
      name: "Fernanda Alves",
      age: 35,
      cpf: "321.654.987-00",
      cns: "321654987012345",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "11:00",
    status: "waiting",
    serviceTypes: ["PRÉ-CONSULTA"],
    professional: "CARLA MENDES - MÉDICO CLÍNICO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "6",
    citizen: {
      name: "Roberto Santos",
      age: 55,
      cpf: "654.321.789-00",
      cns: "654321789012345",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "11:15",
    status: "in-service",
    serviceTypes: ["DEMANDA ESPONTÂNEA", "EXAMES"],
    professional: "LUCAS FERREIRA - MÉDICO CLÍNICO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "ALTA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "7",
    citizen: {
      name: "Patrícia Lima",
      age: 29,
      cpf: "147.258.369-00",
      cns: "147258369012345",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "11:30",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL"],
    professional: "MARINA COSTA - PSICÓLOGA - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "8",
    citizen: {
      name: "Eduardo Mendes",
      age: 42,
      cpf: "258.369.147-00",
      cns: "258369147012345",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "12:00",
    status: "vaccination",
    serviceTypes: ["VACINA"],
    professional: "JULIANA SANTOS - ENFERMEIRO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: null,
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "9",
    citizen: {
      name: "Cristina Rocha",
      age: 38,
      cpf: "369.147.258-00",
      cns: "369147258012345",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "12:15",
    status: "waiting",
    serviceTypes: ["PROCEDIMENTOS"],
    professional: "RICARDO OLIVEIRA - TÉCNICO EM ENFERMAGEM - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "BAIXA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "10",
    citizen: {
      name: "Gabriel Ferreira",
      age: 31,
      cpf: "741.852.963-00",
      cns: "741852963012345",
      photo: "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "12:30",
    status: "in-service",
    serviceTypes: ["CONSULTA"],
    professional: "AMANDA SILVA - MÉDICO CLÍNICO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: true,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "11",
    citizen: {
      name: "Helena Martins",
      age: 67,
      cpf: "852.963.741-00",
      cns: "852963741012345",
      photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "13:00",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL", "PRÉ-CONSULTA"],
    professional: "FELIPE COSTA - PSICÓLOGO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "ALTA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "12",
    citizen: {
      name: "Marcos Oliveira",
      age: 26,
      cpf: "963.741.852-00",
      cns: "963741852012345",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "13:15",
    status: "vaccination",
    serviceTypes: ["VACINA", "ADMINISTRAÇÃO DE MEDICAMENTO"],
    professional: "RENATA LIMA - ENFERMEIRO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: null,
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "13",
    citizen: {
      name: "Bruna Santos",
      age: 24,
      cpf: "159.357.486-00",
      cns: "159357486012345",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "13:30",
    status: "waiting",
    serviceTypes: ["DEMANDA ESPONTÂNEA"],
    professional: "DIEGO PEREIRA - MÉDICO CLÍNICO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "14",
    citizen: {
      name: "Thiago Costa",
      age: 39,
      cpf: "357.486.159-00",
      cns: "357486159012345",
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "13:45",
    status: "in-service",
    serviceTypes: ["EXAMES", "PROCEDIMENTOS"],
    professional: "LARISSA ALVES - ENFERMEIRO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "BAIXA",
    hasInitialListening: true,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "15",
    citizen: {
      name: "Juliana Rodrigues",
      age: 41,
      cpf: "486.159.357-00",
      cns: "486159357012345",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "14:00",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL"],
    professional: "BRUNO MARTINS - PSICÓLOGO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "16",
    citizen: {
      name: "Leonardo Silva",
      age: 33,
      cpf: "789.456.123-00",
      cns: "789456123012345",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "14:15",
    status: "vaccination",
    serviceTypes: ["VACINA"],
    professional: "CAMILA FERREIRA - TÉCNICO EM ENFERMAGEM - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: "BAIXA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "17",
    citizen: {
      name: "Mariana Gomes",
      age: 28,
      cpf: "456.123.789-00",
      cns: "456123789012345",
      photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "14:30",
    status: "waiting",
    serviceTypes: ["PRÉ-CONSULTA", "EXAMES"],
    professional: "RAFAEL SANTOS - MÉDICO CLÍNICO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "18",
    citizen: {
      name: "André Barbosa",
      age: 52,
      cpf: "123.789.456-00",
      cns: "123789456012345",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "14:45",
    status: "in-service",
    serviceTypes: ["DEMANDA ESPONTÂNEA", "CONSULTA"],
    professional: "ISABELA LIMA - MÉDICO CLÍNICO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "ALTA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "19",
    citizen: {
      name: "Vanessa Souza",
      age: 36,
      cpf: "987.321.654-00",
      cns: "987321654012345",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "15:00",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL", "PROCEDIMENTOS"],
    professional: "GUSTAVO ROCHA - PSICÓLOGO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "20",
    citizen: {
      name: "Paulo Henrique",
      age: 44,
      cpf: "321.654.987-00",
      cns: "321654987012345",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "15:15",
    status: "vaccination",
    serviceTypes: ["VACINA", "ADMINISTRAÇÃO DE MEDICAMENTO"],
    professional: "NATÁLIA COSTA - ENFERMEIRO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: null,
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "21",
    citizen: {
      name: "Raquel Mendes",
      age: 47,
      cpf: "654.987.321-00",
      cns: "654987321012345",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "15:30",
    status: "waiting",
    serviceTypes: ["CONSULTA"],
    professional: "VINÍCIUS ALVES - MÉDICO CLÍNICO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "BAIXA",
    hasInitialListening: false,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "22",
    citizen: {
      name: "Felipe Aragão",
      age: 29,
      cpf: "159.753.486-00",
      cns: "159753486012345",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "15:45",
    status: "in-service",
    serviceTypes: ["DEMANDA ESPONTÂNEA"],
    professional: "CAROLINA SILVA - ENFERMEIRO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "23",
    citizen: {
      name: "Tatiana Freitas",
      age: 32,
      cpf: "753.486.159-00",
      cns: "753486159012345",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "16:00",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL", "PRÉ-CONSULTA"],
    professional: "EDUARDO SANTOS - PSICÓLOGO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "ALTA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "24",
    citizen: {
      name: "Daniel Moreira",
      age: 38,
      cpf: "486.159.753-00",
      cns: "486159753012345",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "16:15",
    status: "vaccination",
    serviceTypes: ["VACINA"],
    professional: "ADRIANA LIMA - TÉCNICO EM ENFERMAGEM - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "MÉDIA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "25",
    citizen: {
      name: "Luciana Cardoso",
      age: 43,
      cpf: "357.951.486-00",
      cns: "357951486012345",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "16:30",
    status: "waiting",
    serviceTypes: ["PROCEDIMENTOS", "EXAMES"],
    professional: "MARCELO FERREIRA - MÉDICO CLÍNICO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "26",
    citizen: {
      name: "Rodrigo Teixeira",
      age: 35,
      cpf: "951.486.357-00",
      cns: "951486357012345",
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "16:45",
    status: "in-service",
    serviceTypes: ["CONSULTA", "ADMINISTRAÇÃO DE MEDICAMENTO"],
    professional: "PATRICIA ROCHA - ENFERMEIRO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "BAIXA",
    hasInitialListening: true,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "27",
    citizen: {
      name: "Silvia Nascimento",
      age: 51,
      cpf: "486.357.951-00",
      cns: "486357951012345",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "17:00",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL"],
    professional: "ANDRE COSTA - PSICÓLOGO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "ALTA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "28",
    citizen: {
      name: "César Oliveira",
      age: 29,
      cpf: "741.963.852-00",
      cns: "741963852012345",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "17:15",
    status: "vaccination",
    serviceTypes: ["VACINA", "PROCEDIMENTOS"],
    professional: "MONICA SILVA - ENFERMEIRO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "29",
    citizen: {
      name: "Roberta Dias",
      age: 37,
      cpf: "963.852.741-00",
      cns: "963852741012345",
      photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "17:30",
    status: "waiting",
    serviceTypes: ["DEMANDA ESPONTÂNEA", "PRÉ-CONSULTA"],
    professional: "FERNANDO SANTOS - MÉDICO CLÍNICO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "30",
    citizen: {
      name: "Alexandre Lima",
      age: 46,
      cpf: "852.741.963-00",
      cns: "852741963012345",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "17:45",
    status: "in-service",
    serviceTypes: ["CONSULTA"],
    professional: "HELENA MARTINS - MÉDICO CLÍNICO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "ALTA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "31",
    citizen: {
      name: "Camila Barbosa",
      age: 25,
      cpf: "147.369.258-00",
      cns: "147369258012345",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "18:00",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL", "PROCEDIMENTOS"],
    professional: "JULIO CESAR - PSICÓLOGO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "32",
    citizen: {
      name: "Victor Hugo",
      age: 41,
      cpf: "369.258.147-00",
      cns: "369258147012345",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "18:15",
    status: "vaccination",
    serviceTypes: ["VACINA"],
    professional: "CLAUDIA PEREIRA - TÉCNICO EM ENFERMAGEM - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "BAIXA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "33",
    citizen: {
      name: "Bianca Santos",
      age: 30,
      cpf: "258.147.369-00",
      cns: "258147369012345",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "18:30",
    status: "waiting",
    serviceTypes: ["EXAMES"],
    professional: "RICARDO MOURA - MÉDICO CLÍNICO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "34",
    citizen: {
      name: "Renato Cardoso",
      age: 53,
      cpf: "159.486.753-00",
      cns: "159486753012345",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "18:45",
    status: "in-service",
    serviceTypes: ["DEMANDA ESPONTÂNEA", "ADMINISTRAÇÃO DE MEDICAMENTO"],
    professional: "VANESSA LIMA - ENFERMEIRO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: "ALTA",
    hasInitialListening: true,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "35",
    citizen: {
      name: "Luana Ferreira",
      age: 27,
      cpf: "486.753.159-00",
      cns: "486753159012345",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "19:00",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL"],
    professional: "ALESSANDRO ROCHA - PSICÓLOGO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "36",
    citizen: {
      name: "Igor Mendes",
      age: 34,
      cpf: "753.159.486-00",
      cns: "753159486012345",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "19:15",
    status: "vaccination",
    serviceTypes: ["VACINA", "PROCEDIMENTOS"],
    professional: "PRISCILA SANTOS - ENFERMEIRO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "BAIXA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "37",
    citizen: {
      name: "Amanda Souza",
      age: 39,
      cpf: "951.357.486-00",
      cns: "951357486012345",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "19:30",
    status: "waiting",
    serviceTypes: ["PRÉ-CONSULTA", "CONSULTA"],
    professional: "LEONARDO COSTA - MÉDICO CLÍNICO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "38",
    citizen: {
      name: "Fábio Rodrigues",
      age: 48,
      cpf: "357.486.951-00",
      cns: "357486951012345",
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "19:45",
    status: "in-service",
    serviceTypes: ["DEMANDA ESPONTÂNEA", "EXAMES"],
    professional: "BARBARA LIMA - ENFERMEIRO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "ALTA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "39",
    citizen: {
      name: "Jéssica Alves",
      age: 26,
      cpf: "486.951.357-00",
      cns: "486951357012345",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "20:00",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL", "PRÉ-CONSULTA"],
    professional: "GABRIEL MARTINS - PSICÓLOGO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "40",
    citizen: {
      name: "Henrique Silva",
      age: 31,
      cpf: "789.159.357-00",
      cns: "789159357012345",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "20:15",
    status: "vaccination",
    serviceTypes: ["VACINA"],
    professional: "SIMONE FERREIRA - TÉCNICO EM ENFERMAGEM - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: "BAIXA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "41",
    citizen: {
      name: "Carla Nascimento",
      age: 42,
      cpf: "159.357.789-00",
      cns: "159357789012345",
      photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "20:30",
    status: "waiting",
    serviceTypes: ["PROCEDIMENTOS"],
    professional: "OTAVIO SANTOS - MÉDICO CLÍNICO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "42",
    citizen: {
      name: "Bruno Teixeira",
      age: 36,
      cpf: "357.789.159-00",
      cns: "357789159012345",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "20:45",
    status: "in-service",
    serviceTypes: ["CONSULTA", "ADMINISTRAÇÃO DE MEDICAMENTO"],
    professional: "ELAINE COSTA - ENFERMEIRO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "ALTA",
    hasInitialListening: true,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "43",
    citizen: {
      name: "Larissa Moreira",
      age: 23,
      cpf: "789.159.357-00",
      cns: "789159357012345",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "21:00",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL"],
    professional: "THALES OLIVEIRA - PSICÓLOGO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "44",
    citizen: {
      name: "Diego Freitas",
      age: 40,
      cpf: "951.753.486-00",
      cns: "951753486012345",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "21:15",
    status: "vaccination",
    serviceTypes: ["VACINA", "PROCEDIMENTOS"],
    professional: "TATIANE LIMA - ENFERMEIRO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "BAIXA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "45",
    citizen: {
      name: "Priscila Dias",
      age: 33,
      cpf: "753.486.951-00",
      cns: "753486951012345",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "21:30",
    status: "waiting",
    serviceTypes: ["DEMANDA ESPONTÂNEA"],
    professional: "CLAYTON SANTOS - MÉDICO CLÍNICO - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "46",
    citizen: {
      name: "Mateus Aragão",
      age: 28,
      cpf: "486.951.753-00",
      cns: "486951753012345",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "21:45",
    status: "in-service",
    serviceTypes: ["CONSULTA", "EXAMES"],
    professional: "MICHELE FERREIRA - ENFERMEIRO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: "ALTA",
    hasInitialListening: true,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "47",
    citizen: {
      name: "Sabrina Costa",
      age: 35,
      cpf: "147.258.963-00",
      cns: "147258963012345",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "22:00",
    status: "initial-listening",
    serviceTypes: ["ESCUTA INICIAL", "PRÉ-CONSULTA"],
    professional: "WESLEY ROCHA - PSICÓLOGO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "48",
    citizen: {
      name: "Leandro Barbosa",
      age: 37,
      cpf: "258.963.147-00",
      cns: "258963147012345",
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "22:15",
    status: "vaccination",
    serviceTypes: ["VACINA"],
    professional: "KARINA SILVA - TÉCNICO EM ENFERMAGEM - EQUIPE APS 3",
    team: "Equipe APS 3",
    vulnerability: "BAIXA",
    hasInitialListening: true,
    hasPreService: false,
    isCompleted: false
  },
  {
    id: "49",
    citizen: {
      name: "Natália Gomes",
      age: 29,
      cpf: "963.147.258-00",
      cns: "963147258012345",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "22:30",
    status: "waiting",
    serviceTypes: ["PRÉ-CONSULTA", "PROCEDIMENTOS"],
    professional: "RODRIGO MARTINS - MÉDICO CLÍNICO - EQUIPE APS 1",
    team: "Equipe APS 1",
    vulnerability: "MÉDIA",
    hasInitialListening: false,
    hasPreService: true,
    isCompleted: false
  },
  {
    id: "50",
    citizen: {
      name: "Guilherme Oliveira",
      age: 32,
      cpf: "741.852.369-00",
      cns: "741852369012345",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face"
    },
    arrivalTime: "22:45",
    status: "in-service",
    serviceTypes: ["DEMANDA ESPONTÂNEA", "ADMINISTRAÇÃO DE MEDICAMENTO"],
    professional: "LIVIA COSTA - ENFERMEIRO - EQUIPE APS 2",
    team: "Equipe APS 2",
    vulnerability: "ALTA",
    hasInitialListening: true,
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

// Helper function to get status counts
export const getStatusCounts = () => {
  const statusCounts = {
    waiting: mockAttendances.filter(a => a.status === 'waiting').length,
    'in-service': mockAttendances.filter(a => a.status === 'in-service').length,
    'initial-listening': mockAttendances.filter(a => a.status === 'initial-listening').length,
    vaccination: mockAttendances.filter(a => a.status === 'vaccination').length,
  };
  
  return statusCounts;
};
