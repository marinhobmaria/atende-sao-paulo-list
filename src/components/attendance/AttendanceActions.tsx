import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FileText, Stethoscope, Syringe, MoreHorizontal, Eye, Calendar, Edit, Trash2, UserX, RotateCcw } from "lucide-react";
import { AttendanceQueueItem, mockCurrentUser } from "@/data/mockCitizens";
import { DeclaracaoComparecimento } from "@/components/atendimento/atestado/DeclaracaoComparecimento";
import { useToast } from "@/hooks/use-toast";

interface AttendanceActionsProps {
  attendance: AttendanceQueueItem;
  onStatusChange?: (newStatus: AttendanceQueueItem['status']) => void;
}

export const AttendanceActions = ({ attendance, onStatusChange }: AttendanceActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDeclaracaoModal, setShowDeclaracaoModal] = useState(false);
  const [showProntuarioModal, setShowProntuarioModal] = useState(false);
  const [showAtendimentosModal, setShowAtendimentosModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const currentUserProfile = mockCurrentUser.profile;
  const isAddedByCurrentUser = attendance.addedBy === mockCurrentUser.id;
  const canStartService = attendance.status === "waiting";

  // Determinar se é agendamento
  const isScheduledAppointment = !!attendance.scheduledAppointment;

  // Regras dos botões baseado nas novas especificações
  const getButtonsForAttendance = () => {
    const buttons = [];

    // Botão Escuta Inicial / Pré-Consulta
    if (isScheduledAppointment) {
      // Para agendamentos: Pré-Consulta
      buttons.push({
        key: 'pre-consulta',
        label: 'Pré-Consulta',
        shortLabel: 'Pré',
        icon: FileText,
        action: () => navigate(`/pre-atendimento?cidadao=${attendance.id}`),
        disabled: attendance.hasPreService,
        tooltip: attendance.hasPreService ? "Pré-consulta já realizada" : "Realizar pré-consulta"
      });
    } else {
      // Para demanda espontânea: Escuta Inicial
      buttons.push({
        key: 'escuta-inicial',
        label: 'Escuta Inicial',
        shortLabel: 'Escuta',
        icon: FileText,
        action: () => navigate(`/escuta-inicial?cidadao=${attendance.id}`),
        disabled: attendance.hasInitialListening,
        tooltip: attendance.hasInitialListening ? "Escuta inicial já realizada" : "Realizar escuta inicial"
      });
    }

    // Botão Atender - sempre presente
    const canAttend = isScheduledAppointment ? attendance.hasPreService : attendance.hasInitialListening;
    buttons.push({
      key: 'atender',
      label: 'Atender',
      shortLabel: 'Atender',
      icon: Stethoscope,
      action: () => navigate(`/atendimento?cidadao=${attendance.id}`),
      disabled: false, // Sempre habilitado
      tooltip: attendance.isCompleted ? "Atendimento realizado" : "Realizar atendimento"
    });

    return buttons;
  };

  const buttons = getButtonsForAttendance();

  // Ações dos botões
  const handleEscutaInicial = () => {
    navigate(`/escuta-inicial?cidadao=${attendance.id}`);
  };

  const handlePreAtendimento = () => {
    navigate(`/pre-atendimento?cidadao=${attendance.id}`);
  };

  const handleAtender = () => {
    navigate(`/atendimento?cidadao=${attendance.id}`);
  };

  const handleVacinar = () => {
    navigate(`/vacinacao?cidadao=${attendance.id}`);
  };

  const handleCidadaoNaoAguardou = () => {
    onStatusChange?.("did-not-wait");
    toast({
      title: "Status atualizado",
      description: "Cidadão marcado como 'não aguardou'"
    });
  };

  const handleCidadaoRetornou = () => {
    onStatusChange?.("waiting");
    toast({
      title: "Status atualizado", 
      description: "Cidadão retornou à fila de atendimento"
    });
  };

  const handleExcluir = () => {
    toast({
      title: "Registro excluído",
      description: "O registro foi removido da fila de atendimento"
    });
  };

  // Opções do menu "Mais opções" baseado no status
  const getMoreOptionsItems = () => {
    const items = [];
    
    switch (attendance.status) {
      case "waiting":
        items.push(
          { icon: UserX, label: "Cidadão não aguardou", action: handleCidadaoNaoAguardou },
          { icon: FileText, label: "Gerar declaração de comparecimento", action: () => setShowDeclaracaoModal(true) },
          { icon: Eye, label: "Visualizar prontuário", action: () => setShowProntuarioModal(true) },
          { icon: Edit, label: "Editar", action: () => setShowEditModal(true) }
        );
        if (isAddedByCurrentUser) {
          items.push({ icon: Trash2, label: "Excluir", action: handleExcluir, requiresConfirmation: true });
        }
        break;
        
      case "in-service":
        items.push(
          { icon: FileText, label: "Gerar declaração de comparecimento", action: () => setShowDeclaracaoModal(true) },
          { icon: Eye, label: "Visualizar prontuário", action: () => setShowProntuarioModal(true) }
        );
        break;
        
      case "completed":
        items.push(
          { icon: FileText, label: "Gerar declaração de comparecimento", action: () => setShowDeclaracaoModal(true) },
          { icon: Eye, label: "Visualizar prontuário", action: () => setShowProntuarioModal(true) },
          { icon: Calendar, label: "Visualizar atendimentos do dia", action: () => setShowAtendimentosModal(true) }
        );
        break;
        
      case "did-not-wait":
        items.push(
          { icon: RotateCcw, label: "Cidadão retornou", action: handleCidadaoRetornou },
          { icon: FileText, label: "Gerar declaração de comparecimento", action: () => setShowDeclaracaoModal(true) },
          { icon: Eye, label: "Visualizar prontuário", action: () => setShowProntuarioModal(true) }
        );
        break;
    }
    
    return items;
  };

  return (
    <div className="flex items-center gap-1">
      {/* Botões principais ultra compactos */}
      {buttons.map((button) => (
        <TooltipProvider key={button.key}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={button.action}
                disabled={button.disabled}
                className={`h-7 px-2 text-xs ${
                  button.key === 'escuta-inicial' || button.key === 'pre-consulta' 
                    ? 'hover:bg-blue-50 hover:border-blue-300' 
                    : 'hover:bg-green-50 hover:border-green-300'
                } ${button.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <button.icon className="w-3 h-3 mr-1" />
                <span className="hidden lg:inline">{button.shortLabel}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{button.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      {/* Botão Vacinar ultra compacto */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleVacinar}
              className="h-7 px-2 text-xs hover:bg-purple-50 hover:border-purple-300"
            >
              <Syringe className="w-3 h-3 mr-1" />
              <span className="hidden lg:inline">Vacinar</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Realizar vacinação</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Menu Mais Opções compacto */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-7 px-2">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border shadow-lg">
          {getMoreOptionsItems().map((item, index) => (
            item.requiresConfirmation ? (
              <AlertDialog key={index}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                      Deseja realmente excluir o registro de atendimento?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={item.action}>Excluir</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <DropdownMenuItem key={index} onClick={item.action}>
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </DropdownMenuItem>
            )
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal Declaração de Comparecimento */}
      {showDeclaracaoModal && (
        <Dialog open={showDeclaracaoModal} onOpenChange={setShowDeclaracaoModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Declaração de Comparecimento</DialogTitle>
            </DialogHeader>
            <DeclaracaoComparecimento />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
