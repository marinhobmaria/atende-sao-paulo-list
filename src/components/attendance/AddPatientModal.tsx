import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, CheckCircle, User, Calendar, FileText, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AddPatientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPatientAdded?: () => void;
}

interface PatientFormData {
  fullName: string;
  birthDate: string;
  serviceType: string;
  documentType: string;
  documentNumber: string;
  reason: string;
  isMinor: boolean;
  guardianName: string;
  guardianDocument: string;
  isPriority: boolean;
  priorityReason: string;
}

// Mock de pacientes existentes (em produção viria do backend)
const existingPatients = [
  { name: "João Santos", document: "123.456.789-00", date: "2025-07-21" },
  { name: "Ana Costa", document: "987.654.321-00", date: "2025-07-21" },
];

const serviceTypes = [
  { value: "consulta", label: "Consulta Médica", priority: false },
  { value: "escuta", label: "Escuta Inicial", priority: false },
  { value: "vacinacao", label: "Vacinação", priority: false },
  { value: "emergencia", label: "Emergência", priority: true },
  { value: "preferencial", label: "Atendimento Preferencial", priority: true },
];

const documentTypes = [
  { value: "cpf", label: "CPF" },
  { value: "cns", label: "CNS - Cartão Nacional de Saúde" },
  { value: "rg", label: "RG" },
];

export function AddPatientModal({ open, onOpenChange, onPatientAdded }: AddPatientModalProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PatientFormData>({
    fullName: "",
    birthDate: "",
    serviceType: "",
    documentType: "",
    documentNumber: "",
    reason: "",
    isMinor: false,
    guardianName: "",
    guardianDocument: "",
    isPriority: false,
    priorityReason: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Simular verificação de permissão (em produção viria do contexto de auth)
  const hasPermission = true; // Mock - sempre tem permissão para demo

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validação de permissão
    if (!hasPermission) {
      newErrors.permission = "Você não tem permissão para adicionar pacientes à fila.";
      setErrors(newErrors);
      return false;
    }

    // Campos obrigatórios
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Nome deve ter pelo menos 3 caracteres";
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

    if (!formData.serviceType) {
      newErrors.serviceType = "Tipo de serviço é obrigatório";
    }

    if (!formData.documentType) {
      newErrors.documentType = "Tipo de documento é obrigatório";
    }

    if (!formData.documentNumber.trim()) {
      newErrors.documentNumber = "Número do documento é obrigatório";
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

    // Verificar duplicidade (mock)
    const today = new Date().toISOString().split('T')[0];
    const isDuplicate = existingPatients.some(
      p => p.name.toLowerCase() === formData.fullName.toLowerCase() && 
           p.document === formData.documentNumber && 
           p.date === today
    );

    if (isDuplicate) {
      newErrors.duplicate = "Paciente já está na fila hoje ou em atendimento";
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
      // Simular chamada para API (em produção seria uma requisição real)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Determinar posição na fila
      const selectedService = serviceTypes.find(s => s.value === formData.serviceType);
      const position = selectedService?.priority || formData.isPriority ? "início" : "final";

      // Log de auditoria (em produção seria enviado para backend)
      console.log("AUDITORIA - Paciente adicionado:", {
        patient: formData,
        addedBy: "Usuario Mock", // viria do contexto de auth
        timestamp: new Date().toISOString(),
        position,
        ip: "127.0.0.1", // mock
      });

      // Feedback de sucesso
      toast({
        title: "Paciente adicionado com sucesso!",
        description: `${formData.fullName} foi adicionado${position === "início" ? " no início" : " ao final"} da fila.`,
      });

      // Resetar formulário
      setFormData({
        fullName: "",
        birthDate: "",
        serviceType: "",
        documentType: "",
        documentNumber: "",
        reason: "",
        isMinor: false,
        guardianName: "",
        guardianDocument: "",
        isPriority: false,
        priorityReason: "",
      });

      // Chamar callback para atualizar lista
      onPatientAdded?.();
      onOpenChange(false);

    } catch (error) {
      toast({
        title: "Erro ao adicionar paciente",
        description: "Tente novamente ou contate o suporte técnico.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Adicionar Paciente à Fila
          </DialogTitle>
        </DialogHeader>

        {errors.duplicate && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{errors.duplicate}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Dados Pessoais
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
                <Label htmlFor="documentType">Tipo de Documento *</Label>
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
                <Label htmlFor="documentNumber">Número do Documento *</Label>
                <Input
                  id="documentNumber"
                  value={formData.documentNumber}
                  onChange={(e) => handleInputChange("documentNumber", e.target.value)}
                  className={errors.documentNumber ? "border-destructive" : ""}
                  placeholder="Digite o número"
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
              Atendimento
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
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                "Adicionando..."
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Adicionar à Fila
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}