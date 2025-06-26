
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Stethoscope, Heart, Activity, Thermometer, Pill, Syringe, AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FolhaRostoTabProps {
  cidadao: {
    name: string;
    age: string;
    photo?: string;
  };
}

export const FolhaRostoTab = ({ cidadao }: FolhaRostoTabProps) => {
  const [isAntecedentesOpen, setIsAntecedentesOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-4">
        {/* Escuta Inicial */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-pink-600" />
              Escuta inicial
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                Risco intermediário
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Motivo da Consulta:</p>
              <p className="text-sm text-gray-600">FEBRE – A03 (CIAP2)</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Intervenções e/ou procedimentos clínicos:</p>
              <div className="bg-gray-50 p-2 rounded text-sm text-gray-600 max-h-20 overflow-y-auto">
                Verificação de sinais vitais<br />
                Avaliação inicial de sintomas<br />
                Orientações sobre hidratação
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
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
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium">Consulta médica | 15/06/2024 - 14:30</p>
                <p className="text-xs text-gray-600">Dor de cabeça – N01 (CIAP2)</p>
              </div>
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 text-xs">
                Urgência
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium">Escuta inicial | 10/06/2024 - 09:45</p>
                <p className="text-xs text-gray-600">Febre – A03 (CIAP2)</p>
              </div>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">
                Risco intermediário
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Antecedentes */}
        <Collapsible open={isAntecedentesOpen} onOpenChange={setIsAntecedentesOpen}>
          <CollapsibleTrigger asChild>
            <Card className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  Antecedentes
                  <ChevronDown className={`h-4 w-4 transition-transform ${isAntecedentesOpen ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-2">
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600">Nenhum antecedente registrado</p>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        {/* Medições */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              Medições
              <span className="text-sm font-normal text-gray-600">De hoje:</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Peso
              </span>
              <span>70 kg - 08:30</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Altura
              </span>
              <span>175 cm - 08:30</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                IMC
              </span>
              <span>22.9 kg/m² (Adequado) - 08:30</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Heart className="w-3 h-3 text-red-500" />
                Pressão arterial
              </span>
              <span>120/80 mmHg - 08:35</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Thermometer className="w-3 h-3 text-orange-500" />
                Temperatura
              </span>
              <span>36.5°C - 08:35</span>
            </div>
          </CardContent>
        </Card>

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
            </div>
          </CardContent>
        </Card>

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
                  <p className="text-xs text-gray-600">Início: 15/01/2023 | Há 520 dias</p>
                  <p className="text-xs text-gray-600">Última atualização: 10/06/2024</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Diabetes mellitus (T90)</p>
                  <p className="text-xs text-gray-600">Início: 20/03/2022 | Há 826 dias</p>
                  <p className="text-xs text-gray-600">Última atualização: 05/06/2024</p>
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
              <span className="text-sm font-normal text-gray-600">Em uso:</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium">Atenolol 50 mg</p>
              <p className="text-xs text-gray-600">1 dose, a cada 12 horas</p>
            </div>
            <div>
              <p className="text-sm font-medium">Metformina 850 mg</p>
              <p className="text-xs text-gray-600">1 dose, a cada 8 horas</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
