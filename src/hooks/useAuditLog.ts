import { useState, useEffect } from 'react';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  details: any;
  patientId?: string;
  patientName?: string;
  module: 'escuta-inicial' | 'atendimento' | 'vacinacao' | 'sistema';
  severity: 'info' | 'warning' | 'error' | 'success';
}

export const useAuditLog = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  // Load logs from localStorage
  useEffect(() => {
    const savedLogs = localStorage.getItem('audit_logs');
    if (savedLogs) {
      try {
        const parsed = JSON.parse(savedLogs);
        setLogs(parsed);
      } catch (error) {
        console.error('Erro ao carregar logs de auditoria:', error);
      }
    }
  }, []);

  // Save logs to localStorage
  const saveLogs = (newLogs: AuditLogEntry[]) => {
    try {
      // Keep only last 1000 entries to prevent localStorage overflow
      const limitedLogs = newLogs.slice(-1000);
      localStorage.setItem('audit_logs', JSON.stringify(limitedLogs));
    } catch (error) {
      console.error('Erro ao salvar logs:', error);
    }
  };

  const logAction = (
    action: string,
    details: any,
    module: AuditLogEntry['module'],
    severity: AuditLogEntry['severity'] = 'info',
    patientId?: string,
    patientName?: string,
    userId: string = 'current_user',
    userName: string = 'Usuário Atual'
  ) => {
    const newLog: AuditLogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      userId,
      userName,
      action,
      details,
      patientId,
      patientName,
      module,
      severity
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    saveLogs(updatedLogs);

    // Also log to console for development
    console.log(`[AUDIT ${severity.toUpperCase()}] ${action}:`, details);
  };

  const getLogsByPatient = (patientId: string) => {
    return logs.filter(log => log.patientId === patientId);
  };

  const getLogsByModule = (module: AuditLogEntry['module']) => {
    return logs.filter(log => log.module === module);
  };

  const getLogsByTimeRange = (startDate: Date, endDate: Date) => {
    return logs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= startDate && logDate <= endDate;
    });
  };

  const clearLogs = () => {
    setLogs([]);
    localStorage.removeItem('audit_logs');
    logAction('Logs de auditoria limpos', {}, 'sistema', 'warning');
  };

  return {
    logs,
    logAction,
    getLogsByPatient,
    getLogsByModule,
    getLogsByTimeRange,
    clearLogs
  };
};
