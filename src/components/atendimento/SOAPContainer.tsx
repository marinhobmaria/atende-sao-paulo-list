import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SOAPSubjetivo } from './SOAPSubjetivo';
import { SOAPObjetivo } from './SOAPObjetivo';
import { SOAPAvaliacao } from './SOAPAvaliacao';
import { SOAPPlano } from './SOAPPlano';
import { SOAPAntecedentes } from './SOAPAntecedentes';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useAuditLog } from '@/hooks/useAuditLog';
import { useUserPermissions } from '@/hooks/useUserPermissions';
import { CheckCircle, AlertTriangle, Save, History, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SOAPData {
  antecedentes?: any;
  subjetivo?: {
    queixaPrincipal: string;
    historiaDoencaAtual: string;
    sintomas: string[];
    ciap2: any[];
  };
  objetivo?: {
    sinaisVitais: any;
    exameFisico: string;
    achados: string[];
  };
  avaliacao?: {
    diagnosticoPrincipal: any;
    diagnosticosDiferenciais: any[];
    cid10: string;
    observacoes: string;
  };
  plano?: {
    conduta: string;
    medicamentos: any[];
    exames: any[];
    orientacoes: string;
    retorno: any;
    observacao: boolean;
  };
}

interface SOAPContainerProps {
  onFinalizarAtendimento?: () => void;
  patientId?: string;
  patientName?: string;
}

export const SOAPContainer = ({ 
  onFinalizarAtendimento, 
  patientId = "1", 
  patientName = "Paciente" 
}: SOAPContainerProps) => {
  const [activeSection, setActiveSection] = useState<string>("antecedentes");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [soapData, setSoapData] = useState<SOAPData>({});
  const [isValidForFinalization, setIsValidForFinalization] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const { logAction } = useAuditLog();
  const { currentUser, canFinalizeAttendance } = useUserPermissions();
  const form = useForm({
    defaultValues: {}
  });

  // Auto-save functionality
  const autoSave = useAutoSave(soapData, {
    key: `soap_${patientId}`,
    interval: 30000,
    enabled: true
  });

  // Load saved data on mount
  useEffect(() => {
    const savedData = autoSave.loadSavedData();
    if (savedData && Object.keys(savedData).length > 2) {
      setSoapData(savedData);
      toast({
        title: "Rascunho carregado",
        description: "Dados salvos anteriormente foram restaurados.",
      });
    }
  }, []);

  // Validate sections and overall form
  useEffect(() => {
    const validation = validateSOAPData(soapData);
    setCompletedSections(validation.completedSections);
    setIsValidForFinalization(validation.isValid);
  }, [soapData]);

  const validateSOAPData = (data: SOAPData) => {
    const completed: string[] = [];
    let isValid = false;

    // Check Antecedentes
    if (data.antecedentes && Object.keys(data.antecedentes).length > 0) {
      completed.push("antecedentes");
    }

    // Check Subjetivo (required)
    if (data.subjetivo?.queixaPrincipal?.trim()) {
      completed.push("subjetivo");
    }

    // Check Objetivo (required)
    if (data.objetivo?.exameFisico?.trim() || 
        (data.objetivo?.sinaisVitais && Object.keys(data.objetivo.sinaisVitais).length > 0)) {
      completed.push("objetivo");
    }

    // Check Avaliação (required)
    if (data.avaliacao?.diagnosticoPrincipal) {
      completed.push("avaliacao");
    }

    // Check Plano (required)
    if (data.plano?.conduta?.trim()) {
      completed.push("plano");
    }

    // Form is valid if required sections are completed
    isValid = ["subjetivo", "objetivo", "avaliacao", "plano"].every(section => 
      completed.includes(section)
    );

    return { completedSections: completed, isValid };
  };

  const handleSectionUpdate = (section: string, data: any) => {
    setSoapData(prev => ({
      ...prev,
      [section]: data
    }));

    logAction(
      `SOAP ${section} atualizado`,
      { section, hasData: !!data },
      'atendimento',
      'info',
      patientId,
      patientName,
      currentUser?.id,
      currentUser?.name
    );
  };

  const handleSaveDraft = async () => {
    await autoSave.saveData();
    
    logAction(
      'Rascunho SOAP salvo manualmente',
      { sectionsCompleted: completedSections.length },
      'atendimento',
      'info',
      patientId,
      patientName,
      currentUser?.id,
      currentUser?.name
    );

    toast({
      title: "Rascunho salvo",
      description: "Dados salvos com sucesso.",
    });
  };

  const handleFinalizarAtendimento = () => {
    if (!isValidForFinalization) {
      toast({
        title: "Campos obrigatórios pendentes",
        description: "Complete todos os campos obrigatórios antes de finalizar.",
        variant: "destructive"
      });
      return;
    }

    if (!canFinalizeAttendance()) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para finalizar atendimentos.",
        variant: "destructive"
      });
      return;
    }

    logAction(
      'SOAP finalizado',
      { 
        sectionsCompleted: completedSections,
        soapData: {
          ...soapData,
          _finalizadoPor: currentUser?.name,
          _dataFinalizacao: new Date().toISOString()
        }
      },
      'atendimento',
      'success',
      patientId,
      patientName,
      currentUser?.id,
      currentUser?.name
    );

    // Clear auto-save after finalization
    autoSave.clearSavedData();

    onFinalizarAtendimento?.();
  };

  const sections = [
    {
      id: "antecedentes",
      title: "Antecedentes",
      component: SOAPAntecedentes,
      required: false,
      description: "Histórico médico e dados prévios"
    },
    {
      id: "subjetivo", 
      title: "Subjetivo",
      component: SOAPSubjetivo,
      required: true,
      description: "Queixa principal e história atual"
    },
    {
      id: "objetivo",
      title: "Objetivo", 
      component: SOAPObjetivo,
      required: true,
      description: "Sinais vitais e exame físico"
    },
    {
      id: "avaliacao",
      title: "Avaliação",
      component: SOAPAvaliacao,
      required: true,
      description: "Diagnóstico e hipóteses"
    },
    {
      id: "plano",
      title: "Plano",
      component: SOAPPlano,
      required: true,
      description: "Conduta e prescrições"
    }
  ];

  const getSectionStatus = (sectionId: string, required: boolean) => {
    const isCompleted = completedSections.includes(sectionId);
    const isActive = activeSection === sectionId;
    
    if (isCompleted) return "completed";
    if (isActive) return "active";
    if (required) return "required";
    return "optional";
  };

  const getSectionColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-300";
      case "active": return "bg-blue-100 text-blue-800 border-blue-300";
      case "required": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || SOAPAntecedentes;

  return (
    <div className="space-y-4">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold text-emerald-900">
                  SOAP - Evolução Clínica
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {patientName} • {currentUser?.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2"
              >
                <History className="h-4 w-4" />
                Histórico
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveDraft}
                disabled={autoSave.isSaving}
                className="flex items-center gap-2"
              >
                {autoSave.isSaving ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Salvar
              </Button>
            </div>
          </div>

          {/* Progress and Status */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Progresso: {completedSections.length}/5 seções</span>
              {autoSave.lastSaved && (
                <>
                  <span>•</span>
                  <span>Salvo às {autoSave.getLastSavedFormatted()}</span>
                </>
              )}
            </div>

            {!isValidForFinalization && (
              <Alert className="border-amber-200 bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  Complete todos os campos obrigatórios (Subjetivo, Objetivo, Avaliação, Plano) para finalizar o atendimento.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Section Navigation */}
          <div className="grid grid-cols-5 gap-2">
            {sections.map((section) => {
              const status = getSectionStatus(section.id, section.required);
              return (
                <Button
                  key={section.id}
                  variant="outline"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex flex-col items-center p-3 h-auto ${getSectionColor(status)}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{section.title}</span>
                    {section.required && status !== "completed" && (
                      <span className="text-red-500">*</span>
                    )}
                    {status === "completed" && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <span className="text-xs text-center">{section.description}</span>
                </Button>
              );
            })}
          </div>

          <Separator />

          {/* Active Section Content */}
          <div className="min-h-96">
            <ActiveComponent />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {autoSave.hasUnsavedChanges && (
                <Badge variant="secondary">Alterações não salvas</Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={autoSave.isSaving}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Salvar Rascunho
              </Button>
              
              {onFinalizarAtendimento && (
                <Button
                  onClick={handleFinalizarAtendimento}
                  disabled={!isValidForFinalization}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <CheckCircle className="h-5 w-5" />
                  Finalizar Atendimento
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Panel */}
      {showHistory && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Histórico de Evoluções</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Histórico de evoluções anteriores será exibido aqui...
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};