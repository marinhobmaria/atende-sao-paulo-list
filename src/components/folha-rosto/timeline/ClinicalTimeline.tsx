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
      title: 'Consulta Médica',
      description: 'Dor de cabeça - N01 (CIAP2)',
      date: new Date('2024-06-15T14:30:00'),
      priority: 'high',
      professional: 'Dr. João Silva',
      unit: 'UBS Central',
      details: { cid: 'N01', duration: 30 }
    },
    {
      id: '2',
      type: 'measurement',
      title: 'Medições de Rotina',
      description: 'PA: 120/80 mmHg, Peso: 70kg, Altura: 175cm',
      date: new Date('2024-06-15T08:30:00'),
      priority: 'medium',
      professional: 'Enf. Maria Santos',
      unit: 'UBS Central'
    },
    {
      id: '3',
      type: 'vaccination',
      title: 'Vacinação COVID-19',
      description: '3ª dose - Pfizer',
      date: new Date('2024-03-15T10:00:00'),
      priority: 'medium',
      professional: 'Tec. Ana Costa',
      unit: 'UBS Central'
    },
    {
      id: '4',
      type: 'prescription',
      title: 'Prescrição Médica',
      description: 'Atenolol 50mg, Metformina 850mg',
      date: new Date('2024-06-15T14:45:00'),
      priority: 'medium',
      professional: 'Dr. João Silva',
      unit: 'UBS Central'
    },
    {
      id: '5',
      type: 'allergy',
      title: 'Alergia Registrada',
      description: 'Dipirona - Urticária (Moderada)',
      date: new Date('2024-01-20T09:00:00'),
      priority: 'high',
      professional: 'Dr. Carlos Lima',
      unit: 'Hospital Municipal'
    },
    {
      id: '6',
      type: 'exam',
      title: 'Exames Laboratoriais',
      description: 'Hemograma completo, Glicemia de jejum',
      date: new Date('2024-05-10T07:00:00'),
      priority: 'medium',
      professional: 'Lab. Central',
      unit: 'Lab. Central'
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
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isRecent = (date: Date) => {
    const daysDiff = (today.getTime() - date.getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 7;
  };

  const timelineContent = (
    <div className="space-y-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Timeline Clínica
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
        {!isCollapsed && (
          <div className="flex flex-wrap gap-1 mt-2">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
            >
              Todos
            </Button>
            <Button
              variant={selectedFilter === 'consultation' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('consultation')}
            >
              Consultas
            </Button>
            <Button
              variant={selectedFilter === 'measurement' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('measurement')}
            >
              Medições
            </Button>
            <Button
              variant={selectedFilter === 'vaccination' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('vaccination')}
            >
              Vacinas
            </Button>
          </div>
        )}
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="pt-0">
          <ScrollArea className={`${isFloating ? 'h-[400px]' : 'h-[600px]'} pr-4`}>
            <div className="space-y-3">
              {sortedEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`
                    relative border-l-4 pl-4 pb-4 cursor-pointer transition-all hover:shadow-md rounded-r-lg p-3
                    ${getEventColor(event.type, event.priority)}
                    ${isToday(event.date) ? 'ring-2 ring-primary ring-opacity-50' : ''}
                    ${isRecent(event.date) ? 'shadow-sm' : 'opacity-80'}
                  `}
                  onClick={() => onEventClick?.(event)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getEventIcon(event.type)}
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      {getPriorityBadge(event.priority)}
                      {isToday(event.date) && (
                        <Badge variant="default" className="text-xs bg-primary">Hoje</Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(event.date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </div>
                    {event.professional && (
                      <div>
                        <strong>Profissional:</strong> {event.professional}
                      </div>
                    )}
                    {event.unit && (
                      <div>
                        <strong>Unidade:</strong> {event.unit}
                      </div>
                    )}
                  </div>

                  {/* Connecting line to next event */}
                  {index < sortedEvents.length - 1 && (
                    <div className="absolute left-0 top-full w-0.5 h-3 bg-border"></div>
                  )}
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