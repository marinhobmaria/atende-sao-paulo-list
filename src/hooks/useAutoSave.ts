import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface AutoSaveConfig {
  key: string;
  interval?: number; // milliseconds, default 30000 (30s)
  enabled?: boolean;
}

export const useAutoSave = <T extends Record<string, any>>(
  data: T,
  config: AutoSaveConfig
) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { key, interval = 30000, enabled = true } = config;

  // Load saved data on mount
  const loadSavedData = useCallback((): T | null => {
    if (!enabled) return null;
    
    try {
      const saved = localStorage.getItem(`autosave_${key}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('Dados carregados do rascunho:', key);
        return parsed;
      }
    } catch (error) {
      console.error('Erro ao carregar rascunho:', error);
    }
    return null;
  }, [key, enabled]);

  // Save data to localStorage
  const saveData = useCallback(async () => {
    if (!enabled || isSaving) return;

    setIsSaving(true);
    
    try {
      const dataToSave = {
        ...data,
        _autoSaveTimestamp: new Date().toISOString(),
        _autoSaveVersion: '1.0'
      };

      localStorage.setItem(`autosave_${key}`, JSON.stringify(dataToSave));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      
      console.log('Rascunho salvo automaticamente:', key);
    } catch (error) {
      console.error('Erro ao salvar rascunho:', error);
      toast({
        title: "Erro no salvamento automático",
        description: "Não foi possível salvar o rascunho. Verifique o espaço de armazenamento.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  }, [data, key, enabled, isSaving]);

  // Clear saved data
  const clearSavedData = useCallback(() => {
    try {
      localStorage.removeItem(`autosave_${key}`);
      setLastSaved(null);
      setHasUnsavedChanges(false);
      console.log('Rascunho removido:', key);
    } catch (error) {
      console.error('Erro ao limpar rascunho:', error);
    }
  }, [key]);

  // Check if there are changes to save
  useEffect(() => {
    if (!enabled) return;

    const hasChanges = Object.keys(data).some(key => 
      data[key] !== undefined && data[key] !== null && data[key] !== ''
    );
    
    setHasUnsavedChanges(hasChanges);
  }, [data, enabled]);

  // Auto-save interval
  useEffect(() => {
    if (!enabled || !hasUnsavedChanges) return;

    const intervalId = setInterval(() => {
      saveData();
    }, interval);

    return () => clearInterval(intervalId);
  }, [saveData, interval, enabled, hasUnsavedChanges]);

  // Manual save
  const forceSave = useCallback(() => {
    return saveData();
  }, [saveData]);

  // Get formatted last saved time
  const getLastSavedFormatted = (): string => {
    if (!lastSaved) return 'Nunca';
    
    return lastSaved.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if saved data exists
  const hasSavedData = (): boolean => {
    try {
      const saved = localStorage.getItem(`autosave_${key}`);
      return !!saved;
    } catch {
      return false;
    }
  };

  return {
    lastSaved,
    isSaving,
    hasUnsavedChanges,
    loadSavedData,
    saveData: forceSave,
    clearSavedData,
    getLastSavedFormatted,
    hasSavedData
  };
};