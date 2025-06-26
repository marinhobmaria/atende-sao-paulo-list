
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Syringe, Calendar, Clock } from "lucide-react";
import { CitizenCompactInfo } from "@/components/escuta-inicial/CitizenCompactInfo";
import { FinalizacaoAtendimentoModal } from "@/components/finalizacao/FinalizacaoAtendimentoModal";
import { FolhaRostoTab } from "@/components/folha-rosto/FolhaRostoTab";
import { toast } from "@/hooks/use-toast";

const Vacinacao = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cidadaoId = searchParams.get("cidadao");
  const [showFinalizacao, setShowFinalizacao] = useState(false);
  const [isFinalizando, setIsFinalizando] = useState(false);

  // Mock data do cidadão baseado na imagem de referência
  const cidadao = {
    id: cidadaoId || "1",
    name: "Maria Antonieta Albuquerque Soares",
    socialName: "Mário Henrique da Silva Oliveira Gomes dos Santos Albuquerque Soares",
    cpf: "094556799-80",
    cns: "123456789012345",
    birthDate: "10/02/2004",
    age: "20a 8m e 2d",
    sex: "Feminino",
    motherName: "Llian Cristina de Souza Guimarães",
    status: "Vacinação em andamento",
    healthConditions: ["Hipertenso", "Diabético", "Gestante"],
    allergies: ["Dipirona", "Leite", "Mofo"],
    photo: "https://images.unsplash.com/photo-1494790108755-2616b812e672?w=150&h=150&fit=crop&crop=face"
  };

  const handleFinalizarVacinacao = async (data: any) => {
    setIsFinalizando(true);
    try {
      console.log("Dados da vacinação:", data);
      
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Vacinação finalizada com sucesso",
        description: "Todas as vacinas foram registradas no sistema.",
      });

      setShowFinalizacao(false);
      navigate("/");
    } catch (error) {
      toast({
        title: "Erro ao finalizar",
        description: "Não foi possível finalizar a vacinação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsFinalizando(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Lista de Atendimento</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Vacinação</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Informações compactas do cidadão */}
        <CitizenCompactInfo 
          cidadao={cidadao}
          onBack={() => navigate("/")}
        />

        {/* Tabs Container */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Tabs defaultValue="vacinacao" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="folha-rosto">Folha Rosto</TabsTrigger>
                <TabsTrigger value="vacinacao">Vacinação</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
                <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
              </TabsList>

              <TabsContent value="folha-rosto" className="mt-6">
                <FolhaRostoTab cidadao={cidadao} />
              </TabsContent>

              <TabsContent value="vacinacao" className="mt-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Syringe className="h-5 w-5 text-purple-600" />
                      Aplicação de Vacinas
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Vacinas Disponíveis</h4>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-lg">
                            <p className="font-medium">COVID-19 (Pfizer)</p>
                            <p className="text-sm text-muted-foreground">Dose de reforço disponível</p>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <p className="font-medium">Influenza (H1N1)</p>
                            <p className="text-sm text-muted-foreground">Campanha 2024</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Cartão de Vacinação</h4>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-lg bg-green-50">
                            <p className="font-medium text-green-800">COVID-19 - 1ª Dose</p>
                            <p className="text-sm text-green-600">Aplicada em 15/03/2024</p>
                          </div>
                          <div className="p-3 border rounded-lg bg-green-50">
                            <p className="font-medium text-green-800">COVID-19 - 2ª Dose</p>
                            <p className="text-sm text-green-600">Aplicada em 15/04/2024</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="historico" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Histórico de Vacinação
                  </h3>
                  <p className="text-muted-foreground">
                    Histórico completo de vacinas aplicadas anteriormente.
                  </p>
                  <div className="space-y-2">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Vacina contra COVID-19</p>
                          <p className="text-sm text-muted-foreground">Pfizer - Lote: ABC123</p>
                        </div>
                        <p className="text-sm text-muted-foreground">15/04/2024</p>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Vacina contra Influenza</p>
                          <p className="text-sm text-muted-foreground">Sanofi - Lote: DEF456</p>
                        </div>
                        <p className="text-sm text-muted-foreground">01/04/2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="agendamentos" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Agendamentos de Vacinação
                  </h3>
                  <p className="text-muted-foreground">
                    Próximas doses e vacinas agendadas para o cidadão.
                  </p>
                  <div className="space-y-2">
                    <div className="p-4 border rounded-lg bg-blue-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-blue-800">COVID-19 - Dose de Reforço</p>
                          <p className="text-sm text-blue-600">Agendada para aplicação</p>
                        </div>
                        <p className="text-sm text-blue-600">Hoje</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Modal de Finalização */}
        <FinalizacaoAtendimentoModal
          isOpen={showFinalizacao}
          onClose={() => setShowFinalizacao(false)}
          onSave={handleFinalizarVacinacao}
          isLoading={isFinalizando}
        />
      </div>
    </div>
  );
};

export default Vacinacao;
