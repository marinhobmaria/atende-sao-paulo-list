
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Save, RefreshCw } from "lucide-react";
import { MotivoConsultaSection } from "./MotivoConsultaSection";
import { AntropometriaSection } from "./AntropometriaSection";
import { SinaisVitaisGlicemiaSection } from "./SinaisVitaisGlicemiaSection";
import { ProcedimentosSection } from "./ProcedimentosSection";
import { ClassificacaoRiscoSection } from "./ClassificacaoRiscoSection";
import { DesfechoSection } from "./DesfechoSection";
import { FormActions } from "./FormActions";
import { useProcedimentosAutomaticos } from "./hooks/useProcedimentosAutomaticos";
import { validateEscutaInicialForm } from "./utils/FormValidation";
import { getFormDefaultValues } from "./utils/FormDefaults";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useAuditLog } from "@/hooks/useAuditLog";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { toast } from "@/hooks/use-toast";

interface EscutaInicialFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
  patientId: string;
  patientName: string;
}

export const EscutaInicialForm = ({ 
  onSubmit, 
  onCancel, 
  isLoading, 
  patientId, 
  patientName 
}: EscutaInicialFormProps) => {
  const { procedimentosAutomaticos, updateProcedimentosAutomaticos } = useProcedimentosAutomaticos();
  const { logAction } = useAuditLog();
  const { currentUser, canStartInitialListening } = useUserPermissions();
  
  const [showDraftAlert, setShowDraftAlert] = useState(false);
  const [formInitialized, setFormInitialized] = useState(false);

  const form = useForm({
    defaultValues: getFormDefaultValues()
  });

  const formData = form.watch();
  
  // Auto-save configuration
  const autoSave = useAutoSave(formData, {
    key: `escuta_inicial_${patientId}`,
    interval: 30000, // 30 seconds
    enabled: true
  });

  // Check for saved draft on mount
  useEffect(() => {
    if (formInitialized) return;

    const savedData = autoSave.loadSavedData();
    if (savedData && Object.keys(savedData).length > 2) { // More than just metadata
      setShowDraftAlert(true);
    }
    
    setFormInitialized(true);
    
    // Log form initialization
    logAction(
      'Formulário de Escuta Inicial inicializado',
      { patientId, hasDraft: !!savedData },
      'escuta-inicial',
      'info',
      patientId,
      patientName,
      currentUser?.id,
      currentUser?.name
    );
  }, [formInitialized, autoSave, logAction, patientId, patientName, currentUser]);

  // Restore draft data
  const restoreDraft = () => {
    const savedData = autoSave.loadSavedData();
    if (savedData) {
      form.reset(savedData);
      setShowDraftAlert(false);
      
      toast({
        title: "Rascunho restaurado",
        description: "Os dados salvos anteriormente foram carregados.",
      });

      logAction(
        'Rascunho restaurado',
        { patientId },
        'escuta-inicial',
        'info',
        patientId,
        patientName,
        currentUser?.id,
        currentUser?.name
      );
    }
  };

  // Discard draft
  const discardDraft = () => {
    autoSave.clearSavedData();
    setShowDraftAlert(false);
    
    toast({
      title: "Rascunho descartado",
      description: "O rascunho foi removido.",
    });

    logAction(
      'Rascunho descartado',
      { patientId },
      'escuta-inicial',
      'warning',
      patientId,
      patientName,
      currentUser?.id,
      currentUser?.name
    );
  };

  const handleFormSubmit = (data: any) => {
    // Check permissions
    if (!canStartInitialListening()) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para realizar escuta inicial.",
        variant: "destructive"
      });
      return;
    }

    // Validate form data
    const isValid = validateEscutaInicialForm(data, form.setError);
    if (!isValid) {
      logAction(
        'Erro de validação no formulário',
        { errors: form.formState.errors },
        'escuta-inicial',
        'error',
        patientId,
        patientName,
        currentUser?.id,
        currentUser?.name
      );
      return;
    }

    // Include automatic procedures and timestamps
    const dadosCompletos = {
      ...data,
      procedimentosAutomaticos,
      dataHoraInicio: new Date().toISOString(),
      dataHoraFim: new Date().toISOString(),
      profissionalId: currentUser?.id,
      profissionalNome: currentUser?.name,
      profissionalCbo: currentUser?.cbo
    };

    // Log successful submission
    logAction(
      'Escuta inicial finalizada',
      { 
        patientId,
        desfecho: data.desfecho,
        classificacaoRisco: data.classificacaoRisco,
        ciap2: data.ciap2
      },
      'escuta-inicial',
      'success',
      patientId,
      patientName,
      currentUser?.id,
      currentUser?.name
    );

    // Clear auto-save after successful submission
    autoSave.clearSavedData();

    onSubmit(dadosCompletos);
  };

  // Check if user has permission to access this form
  if (!canStartInitialListening()) {
    return (
      <Alert className="max-w-4xl mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Você não tem permissão para realizar escuta inicial. Entre em contato com o administrador.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Draft Alert */}
      {showDraftAlert && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="flex items-center justify-between">
            <span>Existe um rascunho salvo. Deseja restaurá-lo?</span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={restoreDraft}
                className="h-7 text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Restaurar
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={discardDraft}
                className="h-7 text-xs"
              >
                Descartar
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Permission and Status Info */}
      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{currentUser?.name}</Badge>
          <span className="text-sm text-muted-foreground">•</span>
          <Badge variant="outline">{currentUser?.profile}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Status: Escuta Inicial</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Motivo da Consulta */}
          <MotivoConsultaSection form={form} />

          <Separator className="my-6" />

          {/* Antropometria, Sinais Vitais e Glicemia */}
          <AntropometriaSection 
            form={form} 
            onValuesChange={updateProcedimentosAutomaticos}
          />

          <Separator className="my-6" />

          {/* Procedimentos */}
          <ProcedimentosSection 
            form={form}
            procedimentosAutomaticos={procedimentosAutomaticos}
          />

          <Separator className="my-6" />

          {/* Classificação de Risco */}
          <ClassificacaoRiscoSection form={form} />

          <Separator className="my-6" />

          {/* Desfecho */}
          <DesfechoSection form={form} />

          {/* Botões de ação */}
          <div className="pt-4">
            <FormActions onCancel={onCancel} isLoading={isLoading} />
          </div>
          
          {/* Rodapé com informações de salvamento automático */}
          <div className="pt-4 border-t mt-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                {autoSave.isSaving && (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Salvando rascunho...</span>
                  </>
                )}
                {!autoSave.isSaving && autoSave.lastSaved && (
                  <>
                    <Save className="h-3 w-3" />
                    <span>Rascunho salvo às {autoSave.getLastSavedFormatted()}</span>
                  </>
                )}
                {!autoSave.lastSaved && !autoSave.isSaving && (
                  <span>Salvamento automático ativo</span>
                )}
              </div>
              {autoSave.hasUnsavedChanges && (
                <Badge variant="secondary" className="text-xs">
                  Alterações pendentes
                </Badge>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
