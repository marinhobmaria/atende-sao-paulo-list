
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

  // Regras para exibição dos botões baseado no perfil
  const canSeeInitialListening = ["MEDICO", "ENFERMEIRO"].includes(currentUserProfile);
  const canSeePreService = ["MEDICO", "ENFERMEIRO"].includes(currentUserProfile);

  // Tooltips baseados no status
  const getInitialListeningTooltip = () => {
    if (attendance.hasInitialListening) return "visualizar escuta inicial";
    if (attendance.status === "in-service") return "o cidadão ainda não fez escuta inicial";
    if (attendance.status === "completed") return "cidadão sem escuta inicial";
    return "Realizar escuta inicial";
  };

  const getPreServiceTooltip = () => {
    if (attendance.hasPreService) return "visualizar pré-atendimento";
    if (attendance.status === "in-service") return "cidadão sem pré-atendimento";
    if (attendance.status === "completed") return "cidadão sem pré-atendimento";
    return "Realizar pré-atendimento";
  };

  const getAttendanceTooltip = () => {
    if (attendance.isCompleted) return "atendimento realizado";
    return "continuar atendimento";
  };

  const getVaccinationTooltip = () => {
    if (attendance.status === "completed") return "atendimento de vacinação realizado";
    if (attendance.status === "vaccination" && attendance.currentAttendingProfessional === mockCurrentUser.id) {
      return "continuar vacinação";
    }
    if (attendance.status === "vaccination" && attendance.currentAttendingProfessional !== mockCurrentUser.id) {
      return "cidadão está em atendimento de vacinação";
    }
    return "Realizar vacinação";
  };

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
    <div className="flex items-center space-x-2">
      {/* Botão Escuta Inicial */}
      {canSeeInitialListening && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleEscutaInicial}
                className="flex items-center gap-1 hover:bg-blue-50 hover:border-blue-300"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Escuta Inicial</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{getInitialListeningTooltip()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Botão Pré-Atendimento - só para demanda agendada */}
      {canSeePreService && attendance.scheduledAppointment && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreAtendimento}
                className="flex items-center gap-1 hover:bg-orange-50 hover:border-orange-300"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Pré-Atendimento</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{getPreServiceTooltip()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Botão Atender */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAtender}
              className="flex items-center gap-1 hover:bg-green-50 hover:border-green-300"
            >
              <Stethoscope className="w-4 h-4" />
              <span className="hidden sm:inline">Atender</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getAttendanceTooltip()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Botão Vacinar */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleVacinar}
              className="flex items-center gap-1 hover:bg-purple-50 hover:border-purple-300"
            >
              <Syringe className="w-4 h-4" />
              <span className="hidden sm:inline">Vacinar</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getVaccinationTooltip()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Menu Mais Opções */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
