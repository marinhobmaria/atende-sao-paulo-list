import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  Stethoscope, 
  Syringe, 
  Activity, 
  Pill, 
  AlertTriangle,
  FileText,
  Heart,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TimelineEvent {
  id: string;
  type: 'consultation' | 'measurement' | 'vaccination' | 'prescription' | 'allergy' | 'hospitalization' | 'exam';
  title: string;
  description: string;
  date: Date;
  priority: 'high' | 'medium' | 'low';
  professional?: string;
  unit?: string;
  details?: Record<string, any>;
}

interface ClinicalTimelineProps {
  patientId: string;
  isFloating?: boolean;
  onEventClick?: (event: TimelineEvent) => void;
}

export const ClinicalTimeline = ({ patientId, isFloating = false, onEventClick }: ClinicalTimelineProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Mock data - em produção seria obtido via API
  const mockEvents: TimelineEvent[] = [
    {
      id: '1',
      type: 'consultation',
      title: 'Consulta especialidade Oftalmologia',
      description: 'Consulta especializada',
      date: new Date('2024-06-19T14:30:00'),
      priority: 'medium',
      professional: 'Dr. Especialista',
      unit: 'Hospital Central'
    },
    {
      id: '2',
      type: 'vaccination',
      title: 'Vacina campanha COVID-19',
      description: '4ª dose - Reforço',
      date: new Date('2024-06-19T10:00:00'),
      priority: 'medium',
      professional: 'Enfermeira Ana',
      unit: 'UBS Central'
    },
    {
      id: '3',
      type: 'exam',
      title: 'Procedimento',
      description: 'Exame laboratorial de rotina',
      date: new Date('2024-06-15T08:00:00'),
      priority: 'medium',
      professional: 'Lab. Central',
      unit: 'Lab. Central'
    },
    {
      id: '4',
      type: 'consultation',
      title: 'Escuta inicial',
      description: 'Atendimento de enfermagem',
      date: new Date('2024-06-12T09:30:00'),
      priority: 'medium',
      professional: 'Enf. Maria',
      unit: 'UBS Central'
    },
    {
      id: '5',
      type: 'measurement',
      title: 'Medições de Rotina',
      description: 'PA: 120/80 mmHg, Peso: 70kg',
      date: new Date('2024-06-10T08:30:00'),
      priority: 'medium',
      professional: 'Tec. Carlos',
      unit: 'UBS Central'
    },
    {
      id: '6',
      type: 'prescription',
      title: 'Prescrição',
      description: 'Renovação de medicamentos',
      date: new Date('2024-06-08T15:00:00'),
      priority: 'medium',
      professional: 'Dr. Silva',
      unit: 'UBS Central'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return <Stethoscope className="h-4 w-4" />;
      case 'measurement':
        return <Activity className="h-4 w-4" />;
      case 'vaccination':
        return <Syringe className="h-4 w-4" />;
      case 'prescription':
        return <Pill className="h-4 w-4" />;
      case 'allergy':
        return <AlertTriangle className="h-4 w-4" />;
      case 'hospitalization':
        return <Heart className="h-4 w-4" />;
      case 'exam':
        return <FileText className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string, priority: string) => {
    if (priority === 'high') return 'border-red-500 bg-red-50';
    
    switch (type) {
      case 'consultation':
        return 'border-blue-500 bg-blue-50';
      case 'measurement':
        return 'border-green-500 bg-green-50';
      case 'vaccination':
        return 'border-purple-500 bg-purple-50';
      case 'prescription':
        return 'border-orange-500 bg-orange-50';
      case 'allergy':
        return 'border-red-500 bg-red-50';
      case 'hospitalization':
        return 'border-pink-500 bg-pink-50';
      case 'exam':
        return 'border-gray-500 bg-gray-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">Urgente</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-xs">Normal</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-xs">Baixa</Badge>;
      default:
        return null;
    }
  };

  const filteredEvents = mockEvents.filter(event => {
    if (selectedFilter === 'all') return true;
    return event.type === selectedFilter;
  });

  const sortedEvents = filteredEvents.sort((a, b) => b.date.getTime() - a.date.getTime());

  const today = new Date();
  const getDaysAgo = (date: Date) => {
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'hoje';
    if (diffDays === 1) return '1 dia atrás';
    if (diffDays <= 30) return `${diffDays} dias atrás`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} meses atrás`;
    return `${Math.floor(diffDays / 365)} anos atrás`;
  };

  const getEventBadgeText = (type: string) => {
    switch (type) {
      case 'consultation': return 'Consulta';
      case 'exam': return 'Procedimento';
      case 'vaccination': return 'Vacina';
      default: return type;
    }
  };

  const timelineContent = (
    <div className="space-y-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Timeline
          </CardTitle>
          {isFloating && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
        </div>
        {!isCollapsed && !isFloating && (
          <p className="text-sm text-muted-foreground mt-2">
            Histórico de eventos do paciente
          </p>
        )}
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="pt-0">
          <ScrollArea className={`${isFloating ? 'h-[400px]' : 'h-[600px]'} pr-4`}>
            <div className="space-y-4">
              {sortedEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  onClick={() => onEventClick?.(event)}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {index < sortedEvents.length - 1 && (
                      <div className="w-px h-16 bg-border mt-2"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {getDaysAgo(event.date)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getEventBadgeText(event.type)}
                      </Badge>
                    </div>
                    
                    <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                    
                    {event.description && (
                      <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      )}
    </div>
  );

  if (isFloating) {
    return (
      <div className="fixed right-4 top-20 w-80 z-40 max-h-[calc(100vh-100px)]">
        <Card className="shadow-lg border-2">
          {timelineContent}
        </Card>
      </div>
    );
  }

  return (
    <Card className="w-full">
      {timelineContent}
    </Card>
  );
};