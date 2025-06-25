export interface Citizen {
  id: string;
  name: string;
  cpf: string;
  cns: string;
  prontuario: string;
  birthDate: string;
  age: number;
  photo?: string;
  vulnerability?: string;
  todayAppointments?: DayAppointment[];
}

export interface DayAppointment {
  id: string;
  citizenId: string;
  time: string;
  professional: string;
  professionalCpf: string;
  professionalCbo: string;
  professionalIne: string;
  team: string;
  serviceType: string[];
}

const firstNames = [
  "Ana", "Carlos", "Maria", "João", "Fernanda", "Pedro", "Juliana", "Roberto", 
  "Camila", "Diego", "Larissa", "Bruno", "Patrícia", "Marcos", "Letícia", 
  "Rafael", "Gabriela", "André", "Beatriz", "Lucas", "Mariana", "Felipe",
  "Carla", "Thiago", "Daniela", "Vinicius", "Amanda", "Gustavo", "Priscila",
  "Leonardo", "Natália", "Ricardo", "Vanessa", "Henrique", "Tatiane", "Rodrigo",
  "Cristina", "Márcio", "Luciana", "Fábio"
];

const lastNames = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves",
  "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho",
  "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha",
  "Dias", "Monteiro", "Cardoso", "Correia", "Teixeira", "Moreira", "Nascimento",
  "Ramos", "Araújo", "Reis", "Castro", "Campos", "Freitas", "Cavalcanti",
  "Machado", "Nunes", "Miranda", "Pinto", "Mendes"
];

const generateCPF = (): string => {
  const random = () => Math.floor(Math.random() * 10);
  const cpf = Array.from({ length: 9 }, random);
  
  // Calculate first digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += cpf[i] * (10 - i);
  }
  const firstDigit = ((sum * 10) % 11) % 10;
  cpf.push(firstDigit);
  
  // Calculate second digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += cpf[i] * (11 - i);
  }
  const secondDigit = ((sum * 10) % 11) % 10;
  cpf.push(secondDigit);
  
  return `${cpf.slice(0, 3).join('')}.${cpf.slice(3, 6).join('')}.${cpf.slice(6, 9).join('')}-${cpf.slice(9).join('')}`;
};

const generateCNS = (): string => {
  const prefix = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
  const numbers = Array.from({ length: 14 }, () => Math.floor(Math.random() * 10));
  return `${prefix}${numbers.join('')}`;
};

const generateProntuario = (): string => {
  return Math.floor(Math.random() * 999999 + 100000).toString();
};

const generateBirthDate = (): { date: string, age: number } => {
  const currentYear = new Date().getFullYear();
  const age = Math.floor(Math.random() * 80) + 1; // 1 to 80 years old
  const birthYear = currentYear - age;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1; // Simple day generation
  
  const birthDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${birthYear}`;
  return { date: birthDate, age };
};

export const generateMockCitizens = (): Citizen[] => {
  const citizens: Citizen[] = [];
  
  for (let i = 0; i < 40; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const secondLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName} ${secondLastName}`;
    
    const { date: birthDate, age } = generateBirthDate();
    
    const vulnerabilities = ["BAIXA", "MÉDIA", "ALTA"];
    const vulnerability = vulnerabilities[Math.floor(Math.random() * vulnerabilities.length)];
    
    citizens.push({
      id: `citizen_${i + 1}`,
      name,
      cpf: generateCPF(),
      cns: generateCNS(),
      prontuario: generateProntuario(),
      birthDate,
      age,
      vulnerability
    });
  }
  
  return citizens;
};

// Generate some appointments for today
export const generateDayAppointments = (): DayAppointment[] => {
  const appointments: DayAppointment[] = [];
  const citizens = generateMockCitizens();
  
  const professionals = [
    { name: "Dr. João Silva", cpf: "123.456.789-00", cbo: "225125 - Médico clínico", ine: "INE123" },
    { name: "Dra. Maria Santos", cpf: "987.654.321-00", cbo: "223505 - Enfermeiro", ine: "INE456" },
    { name: "Enf. Ana Costa", cpf: "456.789.123-00", cbo: "225142 - Médico generalista", ine: "INE789" }
  ];
  
  const teams = ["Equipe APS 1", "Equipe APS 2", "Equipe APS 3"];
  
  const serviceTypes = [
    "CONSULTA MÉDICA",
    "ENFERMAGEM", 
    "ODONTOLOGIA",
    "VACINA",
    "CURATIVO"
  ];
  
  // Generate 5 appointments for today
  for (let i = 0; i < 5; i++) {
    const citizen = citizens[Math.floor(Math.random() * citizens.length)];
    const professional = professionals[Math.floor(Math.random() * professionals.length)];
    const team = teams[Math.floor(Math.random() * teams.length)];
    const serviceType = [serviceTypes[Math.floor(Math.random() * serviceTypes.length)]];
    
    const hour = 13 + i; // Starting from 13:00
    const minutes = Math.floor(Math.random() * 6) * 10; // 00, 10, 20, 30, 40, 50
    
    appointments.push({
      id: `appointment_${i + 1}`,
      citizenId: citizen.id,
      time: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
      professional: professional.name,
      professionalCpf: professional.cpf,
      professionalCbo: professional.cbo,
      professionalIne: professional.ine,
      team,
      serviceType
    });
  }
  
  return appointments;
};

export const mockCitizens = generateMockCitizens();
export const mockDayAppointments = generateDayAppointments();

// Mock data for current user profile
export const mockCurrentUser = {
  id: "user_1",
  name: "Dr. João Silva",
  profile: "MEDICO", // MEDICO, ENFERMEIRO, CIRURGIAO_DENTISTA
  cbo: "225125"
};

// Mock data for attendance queue
export interface AttendanceQueueItem {
  id: string;
  citizen: Citizen;
  arrivalTime: string;
  status: "waiting" | "in-service" | "initial-listening" | "pre-service" | "vaccination" | "completed" | "did-not-wait";
  serviceTypes: string[];
  professional: string;
  team: string;
  vulnerability: string | null;
  hasInitialListening: boolean;
  hasPreService: boolean;
  isCompleted: boolean;
  addedBy: string; // user ID who added the citizen
  currentAttendingProfessional?: string; // who is currently attending
  scheduledAppointment?: DayAppointment;
}

export let mockAttendanceQueue: AttendanceQueueItem[] = [
  {
    id: "queue_1",
    citizen: mockCitizens[0],
    arrivalTime: "08:30",
    status: "waiting",
    serviceTypes: ["DEMANDA ESPONTÂNEA"],
    professional: "Dr. João Silva",
    team: "Equipe APS 1",
    vulnerability: mockCitizens[0].vulnerability || "BAIXA",
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: "user_1"
  }
];

// Function to add citizen to queue
export const addCitizenToQueue = (
  citizen: Citizen,
  professional: string,
  team: string,
  serviceTypes: string[],
  scheduledAppointment?: DayAppointment
): AttendanceQueueItem => {
  const newQueueItem: AttendanceQueueItem = {
    id: `queue_${Date.now()}`,
    citizen,
    arrivalTime: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    status: "waiting",
    serviceTypes,
    professional,
    team,
    vulnerability: citizen.vulnerability || null,
    hasInitialListening: false,
    hasPreService: false,
    isCompleted: false,
    addedBy: mockCurrentUser.id,
    scheduledAppointment
  };

  mockAttendanceQueue.push(newQueueItem);
  return newQueueItem;
};
