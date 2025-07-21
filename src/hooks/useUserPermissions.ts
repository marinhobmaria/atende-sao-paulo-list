import { useState, useEffect } from 'react';

export type UserProfile = 'MEDICO' | 'ENFERMEIRO' | 'CIRURGIAO_DENTISTA' | 'TECNICO_ENFERMAGEM' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  profile: UserProfile;
  cbo: string;
  permissions: Permission[];
}

export interface Permission {
  module: string;
  actions: string[];
}

const DEFAULT_PERMISSIONS: Record<UserProfile, Permission[]> = {
  'MEDICO': [
    { module: 'escuta-inicial', actions: ['view', 'create', 'edit'] },
    { module: 'atendimento', actions: ['view', 'create', 'edit', 'finalize'] },
    { module: 'prescricao', actions: ['view', 'create', 'edit'] },
    { module: 'atestado', actions: ['view', 'create', 'edit'] },
    { module: 'vacinacao', actions: ['view'] }
  ],
  'ENFERMEIRO': [
    { module: 'escuta-inicial', actions: ['view', 'create', 'edit'] },
    { module: 'atendimento', actions: ['view', 'create', 'edit', 'finalize'] },
    { module: 'vacinacao', actions: ['view', 'create', 'edit'] },
    { module: 'procedimentos', actions: ['view', 'create', 'edit'] }
  ],
  'CIRURGIAO_DENTISTA': [
    { module: 'escuta-inicial', actions: ['view'] },
    { module: 'atendimento', actions: ['view', 'create', 'edit', 'finalize'] },
    { module: 'odontologia', actions: ['view', 'create', 'edit'] }
  ],
  'TECNICO_ENFERMAGEM': [
    { module: 'escuta-inicial', actions: ['view'] },
    { module: 'vacinacao', actions: ['view', 'create', 'edit'] },
    { module: 'procedimentos', actions: ['view', 'create'] }
  ],
  'ADMIN': [
    { module: '*', actions: ['*'] }
  ]
};

export const useUserPermissions = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user from localStorage or mock data
  useEffect(() => {
    // In a real app, this would come from authentication context
    const mockUser: User = {
      id: "user_1",
      name: "Dr. João Silva",
      profile: "MEDICO",
      cbo: "225125",
      permissions: DEFAULT_PERMISSIONS['MEDICO']
    };
    
    setCurrentUser(mockUser);
  }, []);

  const hasPermission = (module: string, action: string): boolean => {
    if (!currentUser) return false;

    // Admin has all permissions
    if (currentUser.profile === 'ADMIN') return true;

    const modulePermissions = currentUser.permissions.find(p => 
      p.module === module || p.module === '*'
    );

    if (!modulePermissions) return false;

    return modulePermissions.actions.includes(action) || 
           modulePermissions.actions.includes('*');
  };

  const canStartInitialListening = (): boolean => {
    return hasPermission('escuta-inicial', 'create') && 
           ['MEDICO', 'ENFERMEIRO'].includes(currentUser?.profile || '');
  };

  const canStartAttendance = (): boolean => {
    return hasPermission('atendimento', 'create');
  };

  const canFinalizeAttendance = (): boolean => {
    return hasPermission('atendimento', 'finalize');
  };

  const canPrescribe = (): boolean => {
    return hasPermission('prescricao', 'create') && 
           currentUser?.profile === 'MEDICO';
  };

  const canVaccinate = (): boolean => {
    return hasPermission('vacinacao', 'create') && 
           ['ENFERMEIRO', 'TECNICO_ENFERMAGEM'].includes(currentUser?.profile || '');
  };

  const getProfileLabel = (profile: UserProfile): string => {
    const labels = {
      'MEDICO': 'Médico',
      'ENFERMEIRO': 'Enfermeiro',
      'CIRURGIAO_DENTISTA': 'Cirurgião Dentista',
      'TECNICO_ENFERMAGEM': 'Técnico em Enfermagem',
      'ADMIN': 'Administrador'
    };
    return labels[profile] || profile;
  };

  return {
    currentUser,
    hasPermission,
    canStartInitialListening,
    canStartAttendance,
    canFinalizeAttendance,
    canPrescribe,
    canVaccinate,
    getProfileLabel
  };
};