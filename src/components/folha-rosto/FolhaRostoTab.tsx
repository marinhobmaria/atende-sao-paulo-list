
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
    <div className="flex gap-6 h-full">
      {/* Main Content - Left Side */}
      <div className="flex-1 space-y-6 pr-4">
        {/* Dados Pessoais Detalhados */}
        <PatientDetails cidadao={cidadao} />

        {/* Gráficos de Medições */}
        <MeasurementCharts patientId={cidadao.id} />

        {/* Grid com resumo clínico */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Vacinação */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Syringe className="h-4 w-4 text-purple-600" />
                  Vacinação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Syringe className="w-3 h-3 text-purple-600" />
                    COVID-19 - 3ª DOSE
                  </span>
                  <span>15/03/2024</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Syringe className="w-3 h-3 text-purple-600" />
                    Influenza - DOSE ÚNICA
                  </span>
                  <span>01/04/2024</span>
                </div>
                <div className="bg-orange-50 border border-orange-200 p-2 rounded mt-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-orange-800">
                      Existem vacinas atrasadas ou não registradas! Confira o cartão de vacinação do cidadão.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alergias/Reações adversas */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Alergias/Reações adversas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-2 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm font-medium text-red-800">Dipirona</p>
                    <p className="text-xs text-red-600">Medicamento - Urticária (Moderada)</p>
                  </div>
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm font-medium text-yellow-800">Leite</p>
                    <p className="text-xs text-yellow-600">Alimento - Intolerância (Leve)</p>
                  </div>
                  <div className="p-2 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm font-medium text-red-800">Mofo</p>
                    <p className="text-xs text-red-600">Ambiental - Alergia respiratória (Leve)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Antecedentes */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Antecedentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Remoção do apêndice</p>
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
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Hipertensão sem complicações (K87)</p>
                      <p className="text-xs text-muted-foreground">Início: 10/10/2010 | Há mais de 10 anos</p>
                      <p className="text-xs text-muted-foreground">Última atualização: 10/10/2020</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Diabético não insulino-dependente (D-19)</p>
                      <p className="text-xs text-muted-foreground">Início: 10/10/2010 | Há mais de 10 anos</p>
                      <p className="text-xs text-muted-foreground">Última atualização: 10/10/2020</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resultado de exames */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Resultado de exames</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Hemoglobina glicada</p>
                  <p className="text-xs text-muted-foreground">Realizado em 10/10/2022</p>
                  <p className="text-sm">5,6%</p>
                </div>
                <div>
                  <p className="text-sm font-medium">HDL</p>
                  <p className="text-xs text-muted-foreground">Realizado em 10/10/2022</p>
                  <p className="text-sm">50 mg/dL</p>
                </div>
              </CardContent>
            </Card>

            {/* Lembretes */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Lembretes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Sem lembretes</p>
              </CardContent>
            </Card>

            {/* Medicamentos */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Medicamentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Prednisolona 3mg/mL</p>
                  <p className="text-xs text-muted-foreground">7 ampolas, dose única</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Gatifloxacino 10 mg/mL</p>
                  <p className="text-xs text-muted-foreground">7 ampolas, dose única</p>
                </div>
              </CardContent>
            </Card>

            {/* Escuta inicial */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Escuta inicial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Não foi realizada Escuta inicial.</p>
              </CardContent>
            </Card>

            {/* Pré-natal */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Pré-natal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">IG Cronológica: 25 semanas e 1 dia</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Timeline - Right Side - Fixed */}
      <div className="w-80 flex-shrink-0">
        <div className="sticky top-4">
          <ClinicalTimeline 
            patientId={cidadao.id}
            isFloating={false}
            onEventClick={handleTimelineEventClick}
          />
        </div>
      </div>
    </div>
  );
};
