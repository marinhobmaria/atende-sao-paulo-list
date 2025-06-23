
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, User, Eye, ClipboardList, Calendar } from "lucide-react";
import { SOAPAntecedentes } from "./SOAPAntecedentes";
import { SOAPSubjetivo } from "./SOAPSubjetivo";
import { SOAPObjetivo } from "./SOAPObjetivo";
import { SOAPAvaliacao } from "./SOAPAvaliacao";
import { SOAPPlano } from "./SOAPPlano";

export const SOAPContainer = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-emerald-900">SOAP</h2>
            <p className="text-emerald-700">Método de documentação clínica estruturada</p>
          </div>
        </div>
        <p className="text-sm text-emerald-600 mt-2">
          Registre informações seguindo a metodologia SOAP: Subjetivo, Objetivo, Avaliação e Plano
        </p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-0">
          <Tabs defaultValue="antecedentes" className="w-full">
            <div className="border-b bg-gray-50 p-4">
              <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
                <TabsTrigger 
                  value="antecedentes" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Antecedentes</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="subjetivo"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Subjetivo</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="objetivo"
                  className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Objetivo</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="avaliacao"
                  className="flex items-center gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                >
                  <ClipboardList className="h-4 w-4" />
                  <span className="hidden sm:inline">Avaliação</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="plano"
                  className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Plano</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="antecedentes" className="mt-0">
                <SOAPAntecedentes />
              </TabsContent>

              <TabsContent value="subjetivo" className="mt-0">
                <SOAPSubjetivo />
              </TabsContent>

              <TabsContent value="objetivo" className="mt-0">
                <SOAPObjetivo />
              </TabsContent>

              <TabsContent value="avaliacao" className="mt-0">
                <SOAPAvaliacao />
              </TabsContent>

              <TabsContent value="plano" className="mt-0">
                <SOAPPlano />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
