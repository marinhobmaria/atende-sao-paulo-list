
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FileText, User, Eye, ClipboardList, Calendar, ChevronDown, CheckCircle } from "lucide-react";
import { SOAPAntecedentes } from "./SOAPAntecedentes";
import { SOAPSubjetivo } from "./SOAPSubjetivo";
import { SOAPObjetivo } from "./SOAPObjetivo";
import { SOAPAvaliacao } from "./SOAPAvaliacao";
import { SOAPPlano } from "./SOAPPlano";

interface SOAPContainerProps {
  onFinalizarAtendimento?: () => void;
}

export const SOAPContainer = ({ onFinalizarAtendimento }: SOAPContainerProps) => {
  const [openSections, setOpenSections] = useState<string[]>(["antecedentes"]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const sections = [
    {
      id: "antecedentes",
      title: "Antecedentes",
      icon: User,
      color: "blue",
      component: SOAPAntecedentes
    },
    {
      id: "subjetivo", 
      title: "Subjetivo",
      icon: FileText,
      color: "blue",
      component: SOAPSubjetivo
    },
    {
      id: "objetivo",
      title: "Objetivo", 
      icon: Eye,
      color: "green",
      component: SOAPObjetivo
    },
    {
      id: "avaliacao",
      title: "Avaliação",
      icon: ClipboardList,
      color: "orange", 
      component: SOAPAvaliacao
    },
    {
      id: "plano",
      title: "Plano",
      icon: Calendar,
      color: "purple",
      component: SOAPPlano
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold text-emerald-900">SOAP</CardTitle>
              </div>
            </div>
            {onFinalizarAtendimento && (
              <Button
                onClick={onFinalizarAtendimento}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4" />
                Finalizar Atendimento
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {sections.map((section) => {
            const IconComponent = section.icon;
            const ContentComponent = section.component;
            const isOpen = openSections.includes(section.id);
            
            return (
              <Collapsible
                key={section.id}
                open={isOpen}
                onOpenChange={() => toggleSection(section.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between p-4 h-auto hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        section.color === "blue" ? "bg-blue-600" :
                        section.color === "green" ? "bg-green-600" :
                        section.color === "orange" ? "bg-orange-600" :
                        section.color === "purple" ? "bg-purple-600" : "bg-gray-600"
                      }`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold text-lg">{section.title}</span>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`} 
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <Card>
                    <CardContent className="p-6">
                      <ContentComponent />
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
