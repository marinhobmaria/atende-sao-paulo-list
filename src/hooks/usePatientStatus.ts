import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export type PatientStatus = 
  | 'waiting' 
  | 'initial-listening' 
  | 'in-service' 
  | 'pre-service' 
  | 'vaccination' 
  | 'completed' 
  | 'cancelled' 
  | 'did-not-wait';

export interface StatusTransition {
  from: PatientStatus;
  to: PatientStatus;
  timestamp: string;
  userId: string;
  userName: string;
  reason?: string;
}

export interface PatientStatusData {
  patientId: string;
  currentStatus: PatientStatus;
  transitions: StatusTransition[];
  canTransitionTo: PatientStatus[];
}

const VALID_TRANSITIONS: Record<PatientStatus, PatientStatus[]> = {
  'waiting': ['initial-listening', 'in-service', 'vaccination', 'cancelled', 'did-not-wait'],
  'initial-listening': ['in-service', 'vaccination', 'completed', 'cancelled'],
  'in-service': ['completed', 'cancelled'],
  'pre-service': ['in-service', 'vaccination', 'cancelled'],
  'vaccination': ['completed', 'cancelled'],
  'completed': [],
  'cancelled': [],
  'did-not-wait': []
};

export const usePatientStatus = (patientId: string, initialStatus: PatientStatus = 'waiting') => {
  const [statusData, setStatusData] = useState<PatientStatusData>({
    patientId,
    currentStatus: initialStatus,
    transitions: [],
    canTransitionTo: VALID_TRANSITIONS[initialStatus]
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load status history from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`patient_status_${patientId}`);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setStatusData(parsed);
      } catch (error) {
        console.error('Erro ao carregar histórico de status:', error);
      }
    }
  }, [patientId]);

  // Save status data to localStorage
  const saveStatusData = (data: PatientStatusData) => {
    try {
      localStorage.setItem(`patient_status_${patientId}`, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar status:', error);
    }
  };

  const transitionTo = async (
    newStatus: PatientStatus, 
    reason?: string,
    userId: string = 'current_user',
    userName: string = 'Usuário Atual'
  ): Promise<boolean> => {
    if (isTransitioning) return false;

    const currentStatus = statusData.currentStatus;
    
    // Validate transition
    if (!VALID_TRANSITIONS[currentStatus].includes(newStatus)) {
      toast({
        title: "Transição inválida",
        description: `Não é possível alterar de "${currentStatus}" para "${newStatus}"`,
        variant: "destructive"
      });
      return false;
    }

    setIsTransitioning(true);

    try {
      const transition: StatusTransition = {
        from: currentStatus,
        to: newStatus,
        timestamp: new Date().toISOString(),
        userId,
        userName,
        reason
      };

      const newStatusData: PatientStatusData = {
        ...statusData,
        currentStatus: newStatus,
        transitions: [...statusData.transitions, transition],
        canTransitionTo: VALID_TRANSITIONS[newStatus]
      };

      setStatusData(newStatusData);
      saveStatusData(newStatusData);

      // Log audit
      console.log('Status transition:', transition);

      toast({
        title: "Status alterado",
        description: `Paciente agora está em: ${getStatusLabel(newStatus)}`,
      });

      return true;
    } catch (error) {
      console.error('Erro na transição de status:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status do paciente",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsTransitioning(false);
    }
  };

  const getStatusLabel = (status: PatientStatus): string => {
    const labels = {
      'waiting': 'Aguardando',
      'initial-listening': 'Escuta Inicial',
      'in-service': 'Em Atendimento',
      'pre-service': 'Pré-Atendimento',
      'vaccination': 'Vacinação',
      'completed': 'Finalizado',
      'cancelled': 'Cancelado',
      'did-not-wait': 'Não Aguardou'
    };
    return labels[status] || status;
  };

  const canStartInitialListening = (): boolean => {
    return statusData.currentStatus === 'waiting' && 
           statusData.canTransitionTo.includes('initial-listening');
  };

  const canStartAttendance = (): boolean => {
    return ['waiting', 'initial-listening'].includes(statusData.currentStatus) &&
           statusData.canTransitionTo.includes('in-service');
  };

  const getStatusHistory = () => {
    return statusData.transitions.map(t => ({
      ...t,
      fromLabel: getStatusLabel(t.from),
      toLabel: getStatusLabel(t.to)
    }));
  };

  return {
    currentStatus: statusData.currentStatus,
    currentStatusLabel: getStatusLabel(statusData.currentStatus),
    canTransitionTo: statusData.canTransitionTo,
    transitions: statusData.transitions,
    isTransitioning,
    transitionTo,
    getStatusLabel,
    canStartInitialListening,
    canStartAttendance,
    getStatusHistory
  };
};