
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Stethoscope, Heart, Activity, Thermometer, Pill, Syringe, AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { PatientDetails } from "./PatientDetails";
import { MeasurementCharts } from "./charts/MeasurementCharts";
import { ClinicalTimeline } from "./timeline/ClinicalTimeline";

interface FolhaRostoTabProps {
  cidadao: {
    id: string;
    name: string;
    socialName?: string;
    cpf: string;
    cns: string;
    birthDate: string;
    age: string;
    sex: string;
    motherName: string;
    healthConditions: string[];
    allergies: string[];
    photo?: string;
  };
}

export const FolhaRostoTab = ({ cidadao }: FolhaRostoTabProps) => {
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState(null);

  const handleTimelineEventClick = (event: any) => {
    setSelectedTimelineEvent(event);
    // Scroll para a seção correspondente ou abrir modal
    console.log('Timeline event clicked:', event);
  };

  return (
    <div className="relative">
      {/* Timeline Flutuante */}
      <ClinicalTimeline 
        patientId={cidadao.id}
        isFloating={true}
        onEventClick={handleTimelineEventClick}
      />

      <div className="space-y-6">
        {/* Dados Pessoais Detalhados */}
        <PatientDetails cidadao={cidadao} />

        {/* Gráficos de Medições */}
        <MeasurementCharts patientId={cidadao.id} />

        {/* Grid com resumo clínico */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Escuta Inicial */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-primary" />
                  Escuta inicial
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    Risco intermediário
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Motivo da Consulta:</p>
                  <p className="text-sm text-muted-foreground">FEBRE – A03 (CIAP2)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Intervenções e/ou procedimentos clínicos:</p>
                  <div className="bg-muted p-2 rounded text-sm text-muted-foreground max-h-20 overflow-y-auto">
                    Verificação de sinais vitais<br />
                    Avaliação inicial de sintomas<br />
                    Orientações sobre hidratação
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Realizado hoje às 20:15 por: Consultoria Prontuário | Enfermeiro
                </p>
              </CardContent>
            </Card>

            {/* Últimos Contatos */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Últimos contatos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <p className="text-sm font-medium">Consulta médica | 15/06/2024 - 14:30</p>
                    <p className="text-xs text-muted-foreground">Dor de cabeça – N01 (CIAP2)</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    Urgência
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <p className="text-sm font-medium">Escuta inicial | 10/06/2024 - 09:45</p>
                    <p className="text-xs text-muted-foreground">Febre – A03 (CIAP2)</p>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">
                    Risco intermediário
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Lista de problemas/condições */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Lista de problemas/condições</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Hipertensão arterial (K86)</p>
                      <p className="text-xs text-muted-foreground">Início: 15/01/2023 | Há 520 dias</p>
                      <p className="text-xs text-muted-foreground">Última atualização: 10/06/2024</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Diabetes mellitus (T90)</p>
                      <p className="text-xs text-muted-foreground">Início: 20/03/2022 | Há 826 dias</p>
                      <p className="text-xs text-muted-foreground">Última atualização: 05/06/2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medicamentos */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Pill className="h-4 w-4 text-green-600" />
                  MEDICAMENTOS
                  <span className="text-sm font-normal text-muted-foreground">Em uso:</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Atenolol 50 mg</p>
                  <p className="text-xs text-muted-foreground">1 dose, a cada 12 horas</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Metformina 850 mg</p>
                  <p className="text-xs text-muted-foreground">1 dose, a cada 8 horas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
