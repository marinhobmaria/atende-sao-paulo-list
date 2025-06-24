
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtestadoSection } from "./atestado/AtestadoSection";
import { DeclaracaoComparecimento } from "./atestado/DeclaracaoComparecimento";
import { FileText, ClipboardCheck } from "lucide-react";

export const SOAPPlano = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Plano</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Plano terapêutico, condutas a serem tomadas, prescrições e orientações ao paciente.
          </p>
          
          <Tabs defaultValue="atestados" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="atestados" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Atestados
              </TabsTrigger>
              <TabsTrigger value="declaracao" className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />
                Declaração de Comparecimento
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="atestados" className="mt-6">
              <AtestadoSection />
            </TabsContent>
            
            <TabsContent value="declaracao" className="mt-6">
              <DeclaracaoComparecimento />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
