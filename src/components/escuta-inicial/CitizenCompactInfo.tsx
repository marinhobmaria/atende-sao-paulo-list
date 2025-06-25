
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { User, Edit, ArrowLeft } from "lucide-react";

interface CitizenCompactInfoProps {
  cidadao: {
    id: string;
    name: string;
    socialName: string;
    cpf: string;
    cns: string;
    birthDate: string;
    age: string;
    sex: string;
    motherName: string;
    status: string;
    healthConditions: string[];
    allergies: string[];
    photo?: string;
  };
  onBack: () => void;
}

export const CitizenCompactInfo = ({ cidadao, onBack }: CitizenCompactInfoProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getHealthConditionColor = (condition: string) => {
    // Green for diagnosed conditions, blue for self-reported
    if (condition === "Hipertenso" || condition === "Diabético") {
      return "bg-green-600";
    }
    if (condition === "Gestante") {
      return "bg-blue-500";
    }
    return "bg-gray-500";
  };

  const getAllergyColor = (allergy: string) => {
    // Blue for diagnosed, yellow for self-reported
    if (allergy === "Dipirona") {
      return "bg-blue-500";
    }
    return "bg-yellow-500";
  };

  return (
    <TooltipProvider>
      <Card className="shadow-lg mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <Avatar className="w-16 h-16 flex-shrink-0">
                <AvatarImage src={cidadao.photo} alt={cidadao.name} />
                <AvatarFallback className="bg-teal-600 text-white font-bold text-xl">
                  {cidadao.photo ? null : <User className="h-8 w-8" />}
                  {!cidadao.photo && getInitials(cidadao.name)}
                </AvatarFallback>
              </Avatar>
              
              {/* Informações compactas em linha */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-lg font-semibold text-gray-900">{cidadao.name}</h1>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <span className="text-sm text-gray-600">({cidadao.socialName})</span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">CPF:</span> {cidadao.cpf}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">CNS:</span> {cidadao.cns}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Data de nascimento:</span> {cidadao.birthDate} ({cidadao.age})
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-4">
                  {/* Condições de Saúde */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Condições:</span>
                    <div className="flex flex-wrap gap-1">
                      {cidadao.healthConditions.map((condition, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger>
                            <Badge 
                              className={`text-white text-xs px-2 py-1 ${getHealthConditionColor(condition)}`}
                            >
                              {condition}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{getHealthConditionColor(condition).includes('green') ? 'Diagnosticado' : 'Auto-referido'}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  {/* Alergias */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Alergias:</span>
                    <div className="flex flex-wrap gap-1">
                      {cidadao.allergies.map((allergy, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger>
                            <Badge 
                              className={`text-white text-xs px-2 py-1 ${getAllergyColor(allergy)}`}
                            >
                              ⚠ {allergy}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{getAllergyColor(allergy).includes('blue') ? 'Diagnosticado' : 'Auto-referido'}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
