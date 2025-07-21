import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, CheckCircle, User, Calendar, FileText, Shield, Search, UserPlus, Users } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AddPatientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPatientAdded?: () => void;
  skipSearch?: boolean; // Nova prop para pular busca
  initialName?: string; // Nome inicial se vier da busca
}

interface PatientFormData {
  fullName: string;
  birthDate: string;
  gender: string;
  serviceType: string;
  documentType: string;
  documentNumber: string;
  motherName: string;
  address: string;
  phone: string;
  email: string;
  reason: string;
  isMinor: boolean;
  guardianName: string;
  guardianDocument: string;
  isPriority: boolean;
  priorityReason: string;
  observations: string;
}

interface ExistingPatient {
  id: string;
  name: string;
  birthDate: string;
  document: string;
  motherName?: string;
  lastVisit?: string;
}

// Mock de pacientes existentes (em produção viria do backend)
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

// Mock de pacientes já na fila hoje
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

const documentTypes = [
  { value: "cpf", label: "CPF" },
  { value: "cns", label: "CNS - Cartão Nacional de Saúde" },
  { value: "rg", label: "RG" },
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
    fullName: initialName,
    birthDate: "",
    gender: "",
    serviceType: "",
    documentType: "",
    documentNumber: "",
    motherName: "",
    address: "",
    phone: "",
    email: "",
    reason: "",
    isMinor: false,
    guardianName: "",
    guardianDocument: "",
    isPriority: false,
    priorityReason: "",
    observations: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Simular verificação de permissão (em produção viria do contexto de auth)
  const hasPermission = true; // Mock - sempre tem permissão para demo

  // Função para buscar pacientes existentes
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

  // Verificar duplicidade
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

    // Validação de permissão
    if (!hasPermission) {
      newErrors.permission = "Você não tem permissão para adicionar pacientes à fila.";
      setErrors(newErrors);
      return false;
    }

    // Campos obrigatórios do cadastro rápido
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
      
      // Verificar se é menor de idade
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

    if (!formData.motherName.trim()) {
      newErrors.motherName = "Nome da mãe é obrigatório";
    } else if (formData.motherName.trim().length < 3) {
      newErrors.motherName = "Nome da mãe deve ter pelo menos 3 caracteres";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Endereço é obrigatório";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Formato: (11) 99999-9999";
    }

    // Validação de e-mail se informado
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de e-mail inválido";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Tipo de serviço é obrigatório";
    } else {
      // Verificar se serviço exige documentação específica
      const service = serviceTypes.find(s => s.value === formData.serviceType);
      if (service?.requiresDocument && !formData.documentNumber.trim()) {
        newErrors.documentNumber = `${service.label} exige documento de identificação`;
      }
    }

    // Validações para menor de idade
    if (formData.isMinor) {
      if (!formData.guardianName.trim()) {
        newErrors.guardianName = "Nome do responsável é obrigatório para menores de idade";
      }
      if (!formData.guardianDocument.trim()) {
        newErrors.guardianDocument = "Documento do responsável é obrigatório para menores de idade";
      }
    }

    // Validação de prioridade
    if (formData.isPriority && !formData.priorityReason.trim()) {
      newErrors.priorityReason = "Motivo da prioridade é obrigatório";
    }

    // Verificar se já está na fila hoje
    const isInQueue = todayQueue.some(
      p => p.name.toLowerCase() === formData.fullName.toLowerCase() && 
           p.document === formData.documentNumber
    );

    if (isInQueue) {
      newErrors.duplicate = "Paciente já está na fila hoje";
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
      // Simular criação do paciente + adição à fila
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Determinar posição na fila
      const selectedService = serviceTypes.find(s => s.value === formData.serviceType);
      const position = selectedService?.priority || formData.isPriority ? "início" : "final";

      // Log de auditoria completo
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

      // Feedback de sucesso
      toast({
        title: "Paciente cadastrado e adicionado!",
        description: `${formData.fullName} foi cadastrado e adicionado${position === "início" ? " no início" : " ao final"} da fila.`,
      });

      // Reset e fechar
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

      // Verificar se já está na fila
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
      fullName: initialName,
      birthDate: "",
      gender: "",
      serviceType: "",
      documentType: "",
      documentNumber: "",
      motherName: "",
      address: "",
      phone: "",
      email: "",
      reason: "",
      isMinor: false,
      guardianName: "",
      guardianDocument: "",
      isPriority: false,
      priorityReason: "",
      observations: "",
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof PatientFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo ao editar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }

    // Verificar duplicidade em tempo real para nome e data
    if (field === "fullName" || field === "birthDate" || field === "documentNumber") {
      const updatedData = { ...formData, [field]: value };
      if (updatedData.fullName && updatedData.birthDate) {
        checkForDuplicates(updatedData.fullName, updatedData.birthDate, updatedData.documentNumber);
      }
    }

    // Auto-detectar se serviço é prioritário
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

  // Função para avançar para cadastro após busca
  const handleSearchAndRegister = () => {
    if (searchTerm.trim()) {
      setFormData(prev => ({
        ...prev,
        fullName: searchTerm.trim()
      }));
    }
    setCurrentStep("register");
  };

  // Renderizar etapa de busca
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

      {/* Resultados da busca */}
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
            /* Nenhum resultado encontrado */
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

      {/* Opção para cadastrar novo */}
      <div className="text-center pt-4 border-t">
        <p className="text-sm text-muted-foreground mb-4">
          Não encontrou o paciente? Vamos fazer um cadastro rápido.
        </p>
        <Button onClick={handleSearchAndRegister} variant="outline" className="w-full">
          <UserPlus className="h-4 w-4 mr-2" />
          Cadastrar Novo Paciente
        </Button>
      </div>
    </div>
  );

  // Renderizar formulário de cadastro
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

      {errors.duplicate && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{errors.duplicate}</AlertDescription>
        </Alert>
      )}

      {/* Dados Pessoais */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <User className="h-4 w-4" />
          Cadastro Rápido
        </h3>
        
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div>
          <Label htmlFor="address">Endereço *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className={errors.address ? "border-destructive" : ""}
            placeholder="Rua, número, bairro, cidade, UF"
          />
          {errors.address && (
            <p className="text-sm text-destructive mt-1">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
              placeholder="(11) 99999-9999"
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone}</p>
            )}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="documentType">Tipo de Documento</Label>
            <Select value={formData.documentType} onValueChange={(value) => handleInputChange("documentType", value)}>
              <SelectTrigger className={errors.documentType ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((doc) => (
                  <SelectItem key={doc.value} value={doc.value}>
                    {doc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.documentType && (
              <p className="text-sm text-destructive mt-1">{errors.documentType}</p>
            )}
          </div>

          <div>
            <Label htmlFor="documentNumber">Número do Documento</Label>
            <Input
              id="documentNumber"
              value={formData.documentNumber}
              onChange={(e) => handleInputChange("documentNumber", e.target.value)}
              className={errors.documentNumber ? "border-destructive" : ""}
              placeholder="Digite o número (se disponível)"
            />
            {errors.documentNumber && (
              <p className="text-sm text-destructive mt-1">{errors.documentNumber}</p>
            )}
          </div>
        </div>
      </div>

      {/* Menor de Idade */}
      {formData.isMinor && (
        <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isMinor"
              checked={formData.isMinor}
              onCheckedChange={(checked) => handleInputChange("isMinor", !!checked)}
            />
            <Label htmlFor="isMinor" className="text-yellow-800 font-medium">
              Paciente menor de idade (requer responsável legal)
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guardianName">Nome do Responsável *</Label>
              <Input
                id="guardianName"
                value={formData.guardianName}
                onChange={(e) => handleInputChange("guardianName", e.target.value)}
                className={errors.guardianName ? "border-destructive" : ""}
                placeholder="Nome do responsável legal"
              />
              {errors.guardianName && (
                <p className="text-sm text-destructive mt-1">{errors.guardianName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="guardianDocument">Documento do Responsável *</Label>
              <Input
                id="guardianDocument"
                value={formData.guardianDocument}
                onChange={(e) => handleInputChange("guardianDocument", e.target.value)}
                className={errors.guardianDocument ? "border-destructive" : ""}
                placeholder="CPF ou RG do responsável"
              />
              {errors.guardianDocument && (
                <p className="text-sm text-destructive mt-1">{errors.guardianDocument}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Atendimento */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Tipo de Atendimento
        </h3>

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

      {/* Botões */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep("search")}
          className="flex-1"
        >
          Voltar
        </Button>
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
              Cadastrar e Adicionar
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                Cadastrar Novo Paciente
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {currentStep === "search" ? renderSearchStep() : renderRegisterStep()}
      </DialogContent>
    </Dialog>
  );
}