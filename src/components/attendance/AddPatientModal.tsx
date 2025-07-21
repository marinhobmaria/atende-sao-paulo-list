import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, CheckCircle, User, Calendar, FileText, Shield, Search, UserPlus, Users, MapPin, Phone, CreditCard, Heart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AddPatientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPatientAdded?: () => void;
  skipSearch?: boolean;
  initialName?: string;
}

interface PatientFormData {
  // 1. Identificação
  fullName: string;
  socialName: string;
  gender: string;
  birthDate: string;
  maritalStatus: string;
  raceEthnicity: string;
  nationality: string;
  birthCity: string;
  birthState: string;

  // 2. Documentação
  cpf: string;
  cns: string;
  rg: string;
  rgIssuingBody: string;
  rgIssueDate: string;
  otherDocument: string;
  otherDocumentNumber: string;

  // 3. Filiação
  motherName: string;
  fatherName: string;
  legalGuardian: string;

  // 4. Contato
  primaryPhone: string;
  secondaryPhone: string;
  email: string;

  // 5. Endereço
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  referencePoint: string;

  // 6. Informações Adicionais
  observations: string;
  disability: string;
  disabilityCid: string;
  specialHealthCondition: string;
  homelessSituation: boolean;
  profession: string;
  education: string;
  familyIncome: string;
  nisPisPasep: string;

  // Campos específicos do atendimento
  serviceType: string;
  reason: string;
  isMinor: boolean;
  isPriority: boolean;
  priorityReason: string;
}

interface ExistingPatient {
  id: string;
  name: string;
  birthDate: string;
  document: string;
  motherName?: string;
  lastVisit?: string;
}

// Mock de pacientes existentes
const existingPatients: ExistingPatient[] = [
  { 
    id: "1", 
    name: "João Santos", 
    document: "123.456.789-00", 
    birthDate: "1961-10-26",
    motherName: "Carmen Santos",
    lastVisit: "2025-07-15"
  },
  { 
    id: "2", 
    name: "Ana Costa", 
    document: "987.654.321-00", 
    birthDate: "1995-03-14",
    motherName: "Maria Costa",
    lastVisit: "2025-07-10"
  },
  { 
    id: "3", 
    name: "Ana Beatriz Santos", 
    document: "", 
    birthDate: "2024-10-17",
    motherName: "Carla Santos",
    lastVisit: "2025-07-20"
  },
];

const todayQueue = [
  { name: "João Santos", document: "123.456.789-00" },
  { name: "Ana Costa", document: "987.654.321-00" },
];

const serviceTypes = [
  { value: "consulta", label: "Consulta Médica", priority: false, requiresDocument: false },
  { value: "escuta", label: "Escuta Inicial", priority: false, requiresDocument: false },
  { value: "vacinacao", label: "Vacinação", priority: false, requiresDocument: true },
  { value: "emergencia", label: "Emergência", priority: true, requiresDocument: false },
  { value: "preferencial", label: "Atendimento Preferencial", priority: true, requiresDocument: false },
];

const genderOptions = [
  { value: "M", label: "Masculino" },
  { value: "F", label: "Feminino" },
  { value: "O", label: "Outro" },
];

const maritalStatusOptions = [
  { value: "solteiro", label: "Solteiro(a)" },
  { value: "casado", label: "Casado(a)" },
  { value: "divorciado", label: "Divorciado(a)" },
  { value: "viuvo", label: "Viúvo(a)" },
  { value: "uniao_estavel", label: "União Estável" },
];

const raceEthnicityOptions = [
  { value: "branca", label: "Branca" },
  { value: "preta", label: "Preta" },
  { value: "parda", label: "Parda" },
  { value: "amarela", label: "Amarela" },
  { value: "indigena", label: "Indígena" },
];

const educationOptions = [
  { value: "analfabeto", label: "Analfabeto" },
  { value: "fundamental_incompleto", label: "Ensino Fundamental Incompleto" },
  { value: "fundamental_completo", label: "Ensino Fundamental Completo" },
  { value: "medio_incompleto", label: "Ensino Médio Incompleto" },
  { value: "medio_completo", label: "Ensino Médio Completo" },
  { value: "superior_incompleto", label: "Ensino Superior Incompleto" },
  { value: "superior_completo", label: "Ensino Superior Completo" },
  { value: "pos_graduacao", label: "Pós-graduação" },
];

const stateOptions = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

type ModalStep = "search" | "register" | "confirm";

export function AddPatientModal({ open, onOpenChange, onPatientAdded, skipSearch = false, initialName = "" }: AddPatientModalProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<ModalStep>(skipSearch ? "register" : "search");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialName);
  const [searchResults, setSearchResults] = useState<ExistingPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<ExistingPatient | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<ExistingPatient[]>([]);
  const [formData, setFormData] = useState<PatientFormData>({
    // 1. Identificação
    fullName: initialName,
    socialName: "",
    gender: "",
    birthDate: "",
    maritalStatus: "",
    raceEthnicity: "",
    nationality: "Brasileira",
    birthCity: "",
    birthState: "",

    // 2. Documentação
    cpf: "",
    cns: "",
    rg: "",
    rgIssuingBody: "",
    rgIssueDate: "",
    otherDocument: "",
    otherDocumentNumber: "",

    // 3. Filiação
    motherName: "",
    fatherName: "",
    legalGuardian: "",

    // 4. Contato
    primaryPhone: "",
    secondaryPhone: "",
    email: "",

    // 5. Endereço
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    referencePoint: "",

    // 6. Informações Adicionais
    observations: "",
    disability: "",
    disabilityCid: "",
    specialHealthCondition: "",
    homelessSituation: false,
    profession: "",
    education: "",
    familyIncome: "",
    nisPisPasep: "",

    // Campos específicos do atendimento
    serviceType: "",
    reason: "",
    isMinor: false,
    isPriority: false,
    priorityReason: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const hasPermission = true;

  const searchPatients = (term: string) => {
    if (term.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = existingPatients.filter(patient => 
      patient.name.toLowerCase().includes(term.toLowerCase()) ||
      patient.document.includes(term) ||
      (patient.motherName && patient.motherName.toLowerCase().includes(term.toLowerCase()))
    );

    setSearchResults(results);
  };

  const checkForDuplicates = (name: string, birthDate: string, document: string) => {
    const duplicates = existingPatients.filter(patient => {
      const nameMatch = patient.name.toLowerCase().trim() === name.toLowerCase().trim();
      const birthMatch = patient.birthDate === birthDate;
      const docMatch = document && patient.document && patient.document === document;
      
      return (nameMatch && birthMatch) || (nameMatch && docMatch) || (birthMatch && docMatch);
    });

    setDuplicateWarning(duplicates);
    return duplicates.length > 0;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!hasPermission) {
      newErrors.permission = "Você não tem permissão para adicionar pacientes à fila.";
      setErrors(newErrors);
      return false;
    }

    // 1. Identificação - Campos obrigatórios
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Nome deve ter pelo menos 3 caracteres";
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Nome não pode conter números ou caracteres especiais";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Data de nascimento é obrigatória";
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      
      if (birthDate > today) {
        newErrors.birthDate = "Data de nascimento não pode ser futura";
      }
      
      // Auto-detectar menor de idade
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const isActuallyMinor = age < 18 || (age === 18 && monthDiff < 0);
      
      if (isActuallyMinor && !formData.isMinor) {
        setFormData(prev => ({ ...prev, isMinor: true }));
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Sexo é obrigatório";
    }

    // 3. Filiação
    if (!formData.motherName.trim()) {
      newErrors.motherName = "Nome da mãe é obrigatório";
    } else if (formData.motherName.trim().length < 3) {
      newErrors.motherName = "Nome da mãe deve ter pelo menos 3 caracteres";
    }

    if (formData.isMinor && !formData.legalGuardian.trim()) {
      newErrors.legalGuardian = "Responsável legal é obrigatório para menores de idade";
    }

    // 5. Endereço - Campos obrigatórios
    if (!formData.street.trim()) {
      newErrors.street = "Logradouro é obrigatório";
    }

    if (!formData.number.trim()) {
      newErrors.number = "Número é obrigatório";
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = "Bairro é obrigatório";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Cidade é obrigatória";
    }

    if (!formData.state) {
      newErrors.state = "UF (Estado) é obrigatório";
    }

    // 4. Contato - Validações
    if (formData.primaryPhone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.primaryPhone)) {
      newErrors.primaryPhone = "Formato: (11) 99999-9999";
    }

    if (formData.secondaryPhone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.secondaryPhone)) {
      newErrors.secondaryPhone = "Formato: (11) 99999-9999";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de e-mail inválido";
    }

    // Validações de documentos
    if (formData.cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      newErrors.cpf = "Formato: 123.456.789-00";
    }

    if (formData.cns && !/^\d{15}$/.test(formData.cns.replace(/\s/g, ''))) {
      newErrors.cns = "CNS deve ter 15 dígitos";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Tipo de serviço é obrigatório";
    } else {
      const service = serviceTypes.find(s => s.value === formData.serviceType);
      if (service?.requiresDocument && !formData.cpf.trim() && !formData.cns.trim()) {
        newErrors.cpf = `${service.label} exige documento de identificação (CPF ou CNS)`;
      }
    }

    if (formData.isPriority && !formData.priorityReason.trim()) {
      newErrors.priorityReason = "Motivo da prioridade é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro na validação",
        description: "Por favor, corrija os campos destacados em vermelho.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const selectedService = serviceTypes.find(s => s.value === formData.serviceType);
      const position = selectedService?.priority || formData.isPriority ? "início" : "final";

      console.log("AUDITORIA - Novo paciente criado e adicionado:", {
        action: "create_patient_and_add_to_queue",
        patient: formData,
        addedBy: "Usuario Mock",
        timestamp: new Date().toISOString(),
        position,
        ip: "127.0.0.1",
        isNewPatient: !selectedPatient,
        duplicateWarnings: duplicateWarning.length > 0 ? duplicateWarning : null,
      });

      toast({
        title: "Paciente cadastrado e adicionado!",
        description: `${formData.fullName} foi cadastrado e adicionado${position === "início" ? " no início" : " ao final"} da fila.`,
      });

      resetForm();
      onPatientAdded?.();
      onOpenChange(false);

    } catch (error) {
      toast({
        title: "Erro ao cadastrar paciente",
        description: "Tente novamente ou contate o suporte técnico.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddExistingPatient = async (patient: ExistingPatient) => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const isInQueue = todayQueue.some(p => p.document === patient.document);
      if (isInQueue) {
        toast({
          title: "Paciente já na fila",
          description: `${patient.name} já está na fila de atendimento hoje.`,
          variant: "destructive",
        });
        return;
      }

      console.log("AUDITORIA - Paciente existente adicionado:", {
        action: "add_existing_patient_to_queue",
        patientId: patient.id,
        addedBy: "Usuario Mock",
        timestamp: new Date().toISOString(),
      });

      toast({
        title: "Paciente adicionado!",
        description: `${patient.name} foi adicionado à fila.`,
      });

      resetForm();
      onPatientAdded?.();
      onOpenChange(false);

    } catch (error) {
      toast({
        title: "Erro ao adicionar paciente",
        description: "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(skipSearch ? "register" : "search");
    setSearchTerm(initialName);
    setSearchResults([]);
    setSelectedPatient(null);
    setDuplicateWarning([]);
    setFormData({
      // 1. Identificação
      fullName: initialName,
      socialName: "",
      gender: "",
      birthDate: "",
      maritalStatus: "",
      raceEthnicity: "",
      nationality: "Brasileira",
      birthCity: "",
      birthState: "",

      // 2. Documentação
      cpf: "",
      cns: "",
      rg: "",
      rgIssuingBody: "",
      rgIssueDate: "",
      otherDocument: "",
      otherDocumentNumber: "",

      // 3. Filiação
      motherName: "",
      fatherName: "",
      legalGuardian: "",

      // 4. Contato
      primaryPhone: "",
      secondaryPhone: "",
      email: "",

      // 5. Endereço
      zipCode: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      referencePoint: "",

      // 6. Informações Adicionais
      observations: "",
      disability: "",
      disabilityCid: "",
      specialHealthCondition: "",
      homelessSituation: false,
      profession: "",
      education: "",
      familyIncome: "",
      nisPisPasep: "",

      // Campos específicos do atendimento
      serviceType: "",
      reason: "",
      isMinor: false,
      isPriority: false,
      priorityReason: "",
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof PatientFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }

    if (field === "fullName" || field === "birthDate" || field === "cpf") {
      const updatedData = { ...formData, [field]: value };
      if (updatedData.fullName && updatedData.birthDate) {
        checkForDuplicates(updatedData.fullName, updatedData.birthDate, updatedData.cpf);
      }
    }

    if (field === "serviceType") {
      const service = serviceTypes.find(s => s.value === value);
      if (service?.priority) {
        setFormData(prev => ({
          ...prev,
          isPriority: true,
          priorityReason: `Serviço prioritário: ${service.label}`
        }));
      }
    }
  };

  const handleSearchAndRegister = () => {
    if (searchTerm.trim()) {
      setFormData(prev => ({
        ...prev,
        fullName: searchTerm.trim()
      }));
    }
    setCurrentStep("register");
  };

  const renderSearchStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Buscar Paciente</h3>
        <p className="text-muted-foreground">
          Primeiro, vamos verificar se o paciente já está cadastrado no sistema.
        </p>
      </div>

      <div>
        <Label htmlFor="search">Nome, CPF ou Nome da Mãe</Label>
        <Input
          id="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchPatients(e.target.value);
          }}
          placeholder="Digite o nome do paciente, CPF ou nome da mãe..."
          className="text-base"
        />
      </div>

      {searchTerm.length >= 2 && (
        <>
          {searchResults.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Pacientes Encontrados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {searchResults.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleAddExistingPatient(patient)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Nascimento: {new Date(patient.birthDate).toLocaleDateString('pt-BR')}
                        </p>
                        {patient.motherName && (
                          <p className="text-sm text-muted-foreground">
                            Mãe: {patient.motherName}
                          </p>
                        )}
                        {patient.lastVisit && (
                          <p className="text-xs text-muted-foreground">
                            Última visita: {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}
                          </p>
                        )}
                      </div>
                      <Button size="sm" disabled={isLoading}>
                        {isLoading ? "Adicionando..." : "Adicionar à Fila"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-2 border-muted-foreground/25">
              <CardContent className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Nenhum munícipe encontrado
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Não encontramos nenhum munícipe com "{searchTerm}" em nossos registros.
                </p>
                <Button 
                  onClick={handleSearchAndRegister} 
                  className="w-full max-w-sm bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Cadastrar Munícipe
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <div className="text-center pt-4 border-t">
        <p className="text-sm text-muted-foreground mb-4">
          Não encontrou o paciente? Vamos fazer um cadastro completo.
        </p>
        <Button onClick={handleSearchAndRegister} variant="outline" className="w-full">
          <UserPlus className="h-4 w-4 mr-2" />
          Cadastrar Novo Paciente
        </Button>
      </div>
    </div>
  );

  const renderRegisterStep = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Alertas de duplicidade */}
      {duplicateWarning.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Possível duplicidade encontrada:</strong>
            {duplicateWarning.map((dup, index) => (
              <div key={index} className="mt-2">
                • {dup.name} - {new Date(dup.birthDate).toLocaleDateString('pt-BR')}
                {dup.document && ` - ${dup.document}`}
              </div>
            ))}
            <p className="mt-2">Deseja continuar mesmo assim?</p>
          </AlertDescription>
        </Alert>
      )}

      <Accordion type="multiple" defaultValue={["identificacao", "atendimento"]} className="w-full">
        {/* 1. Identificação */}
        <AccordionItem value="identificacao">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              1. Identificação
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nome Completo *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={errors.fullName ? "border-destructive" : ""}
                  placeholder="Digite o nome completo"
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="socialName">Nome Social</Label>
                <Input
                  id="socialName"
                  value={formData.socialName}
                  onChange={(e) => handleInputChange("socialName", e.target.value)}
                  placeholder="Nome social (opcional)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="gender">Sexo *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-destructive mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
                <Label htmlFor="birthDate">Data de Nascimento *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className={errors.birthDate ? "border-destructive" : ""}
                />
                {errors.birthDate && (
                  <p className="text-sm text-destructive mt-1">{errors.birthDate}</p>
                )}
              </div>

              <div>
                <Label htmlFor="maritalStatus">Estado Civil</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {maritalStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="raceEthnicity">Raça/Cor</Label>
                <Select value={formData.raceEthnicity} onValueChange={(value) => handleInputChange("raceEthnicity", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {raceEthnicityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="nationality">Nacionalidade</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  placeholder="Brasileira"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthCity">Naturalidade (Cidade)</Label>
                <Input
                  id="birthCity"
                  value={formData.birthCity}
                  onChange={(e) => handleInputChange("birthCity", e.target.value)}
                  placeholder="Cidade de nascimento"
                />
              </div>

              <div>
                <Label htmlFor="birthState">UF de Nascimento</Label>
                <Select value={formData.birthState} onValueChange={(value) => handleInputChange("birthState", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 2. Documentação */}
        <AccordionItem value="documentacao">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              2. Documentação
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange("cpf", e.target.value)}
                  className={errors.cpf ? "border-destructive" : ""}
                  placeholder="123.456.789-00"
                />
                {errors.cpf && (
                  <p className="text-sm text-destructive mt-1">{errors.cpf}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cns">CNS (Cartão SUS)</Label>
                <Input
                  id="cns"
                  value={formData.cns}
                  onChange={(e) => handleInputChange("cns", e.target.value)}
                  className={errors.cns ? "border-destructive" : ""}
                  placeholder="15 dígitos"
                />
                {errors.cns && (
                  <p className="text-sm text-destructive mt-1">{errors.cns}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rg">RG</Label>
                <Input
                  id="rg"
                  value={formData.rg}
                  onChange={(e) => handleInputChange("rg", e.target.value)}
                  placeholder="Número do RG"
                />
              </div>

              <div>
                <Label htmlFor="rgIssuingBody">Órgão Emissor</Label>
                <Input
                  id="rgIssuingBody"
                  value={formData.rgIssuingBody}
                  onChange={(e) => handleInputChange("rgIssuingBody", e.target.value)}
                  placeholder="SSP, DETRAN, etc."
                />
              </div>

              <div>
                <Label htmlFor="rgIssueDate">Data de Emissão</Label>
                <Input
                  id="rgIssueDate"
                  type="date"
                  value={formData.rgIssueDate}
                  onChange={(e) => handleInputChange("rgIssueDate", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="otherDocument">Outro Documento</Label>
                <Input
                  id="otherDocument"
                  value={formData.otherDocument}
                  onChange={(e) => handleInputChange("otherDocument", e.target.value)}
                  placeholder="Tipo do documento"
                />
              </div>

              <div>
                <Label htmlFor="otherDocumentNumber">Número do Documento</Label>
                <Input
                  id="otherDocumentNumber"
                  value={formData.otherDocumentNumber}
                  onChange={(e) => handleInputChange("otherDocumentNumber", e.target.value)}
                  placeholder="Número"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 3. Filiação */}
        <AccordionItem value="filiacao">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              3. Filiação
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div>
              <Label htmlFor="motherName">Nome da Mãe *</Label>
              <Input
                id="motherName"
                value={formData.motherName}
                onChange={(e) => handleInputChange("motherName", e.target.value)}
                className={errors.motherName ? "border-destructive" : ""}
                placeholder="Digite o nome da mãe"
              />
              {errors.motherName && (
                <p className="text-sm text-destructive mt-1">{errors.motherName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="fatherName">Nome do Pai</Label>
              <Input
                id="fatherName"
                value={formData.fatherName}
                onChange={(e) => handleInputChange("fatherName", e.target.value)}
                placeholder="Digite o nome do pai (opcional)"
              />
            </div>

            {formData.isMinor && (
              <div>
                <Label htmlFor="legalGuardian">Responsável Legal *</Label>
                <Input
                  id="legalGuardian"
                  value={formData.legalGuardian}
                  onChange={(e) => handleInputChange("legalGuardian", e.target.value)}
                  className={errors.legalGuardian ? "border-destructive" : ""}
                  placeholder="Nome do responsável legal"
                />
                {errors.legalGuardian && (
                  <p className="text-sm text-destructive mt-1">{errors.legalGuardian}</p>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* 4. Contato */}
        <AccordionItem value="contato">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              4. Contato
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primaryPhone">Telefone Principal</Label>
                <Input
                  id="primaryPhone"
                  value={formData.primaryPhone}
                  onChange={(e) => handleInputChange("primaryPhone", e.target.value)}
                  className={errors.primaryPhone ? "border-destructive" : ""}
                  placeholder="(11) 99999-9999"
                />
                {errors.primaryPhone && (
                  <p className="text-sm text-destructive mt-1">{errors.primaryPhone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="secondaryPhone">Telefone Secundário</Label>
                <Input
                  id="secondaryPhone"
                  value={formData.secondaryPhone}
                  onChange={(e) => handleInputChange("secondaryPhone", e.target.value)}
                  className={errors.secondaryPhone ? "border-destructive" : ""}
                  placeholder="(11) 99999-9999"
                />
                {errors.secondaryPhone && (
                  <p className="text-sm text-destructive mt-1">{errors.secondaryPhone}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
                placeholder="email@exemplo.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 5. Endereço */}
        <AccordionItem value="endereco">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              5. Endereço
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  placeholder="00000-000"
                />
              </div>

              <div>
                <Label htmlFor="street">Logradouro *</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  className={errors.street ? "border-destructive" : ""}
                  placeholder="Rua, Avenida, etc."
                />
                {errors.street && (
                  <p className="text-sm text-destructive mt-1">{errors.street}</p>
                )}
              </div>

              <div>
                <Label htmlFor="number">Número *</Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => handleInputChange("number", e.target.value)}
                  className={errors.number ? "border-destructive" : ""}
                  placeholder="123"
                />
                {errors.number && (
                  <p className="text-sm text-destructive mt-1">{errors.number}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  value={formData.complement}
                  onChange={(e) => handleInputChange("complement", e.target.value)}
                  placeholder="Apartamento, casa, etc."
                />
              </div>

              <div>
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  value={formData.neighborhood}
                  onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                  className={errors.neighborhood ? "border-destructive" : ""}
                  placeholder="Nome do bairro"
                />
                {errors.neighborhood && (
                  <p className="text-sm text-destructive mt-1">{errors.neighborhood}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={errors.city ? "border-destructive" : ""}
                  placeholder="Nome da cidade"
                />
                {errors.city && (
                  <p className="text-sm text-destructive mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <Label htmlFor="state">UF (Estado) *</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger className={errors.state ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-sm text-destructive mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="referencePoint">Ponto de Referência</Label>
              <Input
                id="referencePoint"
                value={formData.referencePoint}
                onChange={(e) => handleInputChange("referencePoint", e.target.value)}
                placeholder="Próximo ao mercado, escola, etc."
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 6. Informações Adicionais */}
        <AccordionItem value="informacoes">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              6. Informações Adicionais
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="profession">Profissão/Ocupação</Label>
                <Input
                  id="profession"
                  value={formData.profession}
                  onChange={(e) => handleInputChange("profession", e.target.value)}
                  placeholder="Profissão ou ocupação"
                />
              </div>

              <div>
                <Label htmlFor="education">Escolaridade</Label>
                <Select value={formData.education} onValueChange={(value) => handleInputChange("education", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="familyIncome">Renda Familiar</Label>
                <Input
                  id="familyIncome"
                  value={formData.familyIncome}
                  onChange={(e) => handleInputChange("familyIncome", e.target.value)}
                  placeholder="Em salários mínimos"
                />
              </div>

              <div>
                <Label htmlFor="nisPisPasep">NIS/PIS/PASEP</Label>
                <Input
                  id="nisPisPasep"
                  value={formData.nisPisPasep}
                  onChange={(e) => handleInputChange("nisPisPasep", e.target.value)}
                  placeholder="Número"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="disability">Deficiência</Label>
                <Input
                  id="disability"
                  value={formData.disability}
                  onChange={(e) => handleInputChange("disability", e.target.value)}
                  placeholder="Tipo de deficiência"
                />
              </div>

              <div>
                <Label htmlFor="disabilityCid">CID da Deficiência</Label>
                <Input
                  id="disabilityCid"
                  value={formData.disabilityCid}
                  onChange={(e) => handleInputChange("disabilityCid", e.target.value)}
                  placeholder="Código CID"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specialHealthCondition">Condição de Saúde Especial</Label>
              <Textarea
                id="specialHealthCondition"
                value={formData.specialHealthCondition}
                onChange={(e) => handleInputChange("specialHealthCondition", e.target.value)}
                placeholder="Descreva condições especiais de saúde"
                rows={2}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="homelessSituation"
                checked={formData.homelessSituation}
                onCheckedChange={(checked) => handleInputChange("homelessSituation", !!checked)}
              />
              <Label htmlFor="homelessSituation">Situação de Rua</Label>
            </div>

            <div>
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                value={formData.observations}
                onChange={(e) => handleInputChange("observations", e.target.value)}
                placeholder="Observações adicionais (até 500 caracteres)"
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.observations.length}/500 caracteres
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 7. Tipo de Atendimento */}
        <AccordionItem value="atendimento">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              7. Tipo de Atendimento
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div>
              <Label htmlFor="serviceType">Tipo de Serviço *</Label>
              <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                <SelectTrigger className={errors.serviceType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecione o tipo de atendimento" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      <div className="flex items-center gap-2">
                        {service.label}
                        {service.priority && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                            Prioritário
                          </span>
                        )}
                        {service.requiresDocument && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            Requer Doc
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <p className="text-sm text-destructive mt-1">{errors.serviceType}</p>
              )}
            </div>

            <div>
              <Label htmlFor="reason">Motivo da Consulta</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                placeholder="Descreva o motivo da consulta (opcional)"
                rows={3}
              />
            </div>

            {/* Prioridade */}
            {formData.isPriority && (
              <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPriority"
                    checked={formData.isPriority}
                    onCheckedChange={(checked) => handleInputChange("isPriority", !!checked)}
                  />
                  <Label htmlFor="isPriority" className="text-red-800 font-medium">
                    Atendimento Prioritário
                  </Label>
                </div>

                <div>
                  <Label htmlFor="priorityReason">Motivo da Prioridade *</Label>
                  <Input
                    id="priorityReason"
                    value={formData.priorityReason}
                    onChange={(e) => handleInputChange("priorityReason", e.target.value)}
                    className={errors.priorityReason ? "border-destructive" : ""}
                    placeholder="Justifique a prioridade"
                  />
                  {errors.priorityReason && (
                    <p className="text-sm text-destructive mt-1">{errors.priorityReason}</p>
                  )}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Botões */}
      <div className="flex gap-3 pt-6">
        {!skipSearch && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep("search")}
            className="flex-1"
          >
            Voltar à Busca
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? (
            "Cadastrando..."
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Cadastrar e Adicionar à Fila
            </>
          )}
        </Button>
      </div>
    </form>
  );

  if (!hasPermission) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Shield className="h-5 w-5" />
              Acesso Negado
            </DialogTitle>
          </DialogHeader>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Você não tem permissão para adicionar pacientes à fila. 
              Entre em contato com o administrador do sistema.
            </AlertDescription>
          </Alert>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetForm();
      onOpenChange(open);
    }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {currentStep === "search" ? (
              <>
                <Search className="h-5 w-5" />
                Buscar ou Cadastrar Paciente
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
                Cadastro Completo de Munícipe
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {currentStep === "search" ? renderSearchStep() : renderRegisterStep()}
      </DialogContent>
    </Dialog>
  );
}