
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import { SOAPContainer } from "@/components/atendimento/SOAPContainer";
import { CitizenCompactInfo } from "@/components/escuta-inicial/CitizenCompactInfo";
import { FinalizacaoAtendimentoModal } from "@/components/finalizacao/FinalizacaoAtendimentoModal";
import { FolhaRostoTab } from "@/components/folha-rosto/FolhaRostoTab";
import { PageLayout } from "@/components/layout/PageLayout";
import { toast } from "@/hooks/use-toast";

const Atendimento = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cidadaoId = searchParams.get("cidadao");
  const [showFinalizacao, setShowFinalizacao] = useState(false);
  const [showConfirmFinalizacao, setShowConfirmFinalizacao] = useState(false);
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
    status: "in-service",
    healthConditions: ["Hipertenso", "Diabético", "Gestante"],
    allergies: ["Dipirona", "Leite", "Mofo"],
    serviceTypes: ["Consulta Médica", "Exames"],
    photo: "https://images.unsplash.com/photo-1494790108755-2616b812e672?w=150&h=150&fit=crop&crop=face"
  };

  const handleFinalizarAtendimento = async (data: any) => {
    setIsFinalizando(true);
    try {
      console.log("Dados da finalização:", data);
      
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Atendimento finalizado com sucesso",
        description: "Todos os dados foram salvos e o atendimento foi encerrado.",
      });

      setShowFinalizacao(false);
      setShowConfirmFinalizacao(false);
      navigate("/");
    } catch (error) {
      toast({
        title: "Erro ao finalizar",
        description: "Não foi possível finalizar o atendimento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsFinalizando(false);
    }
  };

  const handleConfirmarFinalizacao = () => {
    setShowConfirmFinalizacao(false);
    setShowFinalizacao(true);
  };

  return (
    <PageLayout breadcrumbItems={[
      { title: "Lista de Atendimento", href: "/" }, 
      { title: "Atendimento" }
    ]}>
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Informações compactas do cidadão */}
          <CitizenCompactInfo 
            cidadao={cidadao}
            onBack={() => navigate("/")}
          />

          {/* Tabs Container */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <Tabs defaultValue="soap" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="folha-rosto">Folha Rosto</TabsTrigger>
                  <TabsTrigger value="soap">SOAP</TabsTrigger>
                  <TabsTrigger value="vacinacao">Vacinação</TabsTrigger>
                  <TabsTrigger value="historico">Histórico</TabsTrigger>
                  <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
                </TabsList>

                <TabsContent value="folha-rosto" className="mt-6">
                  <FolhaRostoTab cidadao={cidadao} />
                </TabsContent>

                <TabsContent value="soap" className="mt-6">
                  <SOAPContainer onFinalizarAtendimento={() => setShowConfirmFinalizacao(true)} />
                </TabsContent>

                <TabsContent value="vacinacao" className="mt-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Registro de vacinas aplicadas e cartão de vacinação.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium">Vacinas Pendentes</h4>
                      <p className="text-sm text-muted-foreground">Nenhuma vacina pendente encontrada.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Histórico de Vacinação</h4>
                      <p className="text-sm text-muted-foreground">Histórico de vacinas aplicadas anteriormente.</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="historico" className="mt-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Histórico completo de atendimentos anteriores do cidadão.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium">Atendimentos Recentes</h4>
                      <p className="text-sm text-muted-foreground">Nenhum atendimento anterior registrado.</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="agendamentos" className="mt-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Consultas e procedimentos agendados para o cidadão.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium">Próximos Agendamentos</h4>
                      <p className="text-sm text-muted-foreground">Nenhum agendamento futuro encontrado.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Modal de Confirmação de Finalização */}
          {showConfirmFinalizacao && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                  <h3 className="text-lg font-semibold">Confirmar Finalização</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Tem certeza que deseja finalizar este atendimento? Esta ação não poderá ser desfeita.
                </p>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowConfirmFinalizacao(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleConfirmarFinalizacao} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Sim, finalizar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Finalização */}
          <FinalizacaoAtendimentoModal
            isOpen={showFinalizacao}
            onClose={() => setShowFinalizacao(false)}
            onSave={handleFinalizarAtendimento}
            isLoading={isFinalizando}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Atendimento;
