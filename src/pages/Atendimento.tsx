
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, FileText, Syringe, Clock, Calendar } from "lucide-react";
import { SOAPContainer } from "@/components/atendimento/SOAPContainer";
import { CitizenCompactInfo } from "@/components/escuta-inicial/CitizenCompactInfo";
import { FinalizacaoAtendimentoModal } from "@/components/finalizacao/FinalizacaoAtendimentoModal";
import { toast } from "@/hooks/use-toast";

const Atendimento = () => {
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
    status: "Atendimento em andamento",
    healthConditions: ["Hipertenso", "Diabético", "Gestante"],
    allergies: ["Dipirona", "Leite", "Mofo"],
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
              <BreadcrumbPage>Atendimento</BreadcrumbPage>
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
            <Tabs defaultValue="soap" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="folha-rosto">Folha Rosto</TabsTrigger>
                <TabsTrigger value="soap">SOAP</TabsTrigger>
                <TabsTrigger value="vacinacao">Vacinação</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
                <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
              </TabsList>

              <TabsContent value="folha-rosto" className="mt-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Aqui serão exibidas as informações principais do atendimento, 
                    dados vitais, anamnese e exame físico.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Dados Vitais</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Peso: --</p>
                        <p>Altura: --</p>
                        <p>PA: --</p>
                        <p>FC: --</p>
                        <p>Temperatura: --</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Queixa Principal</h4>
                      <p className="text-sm text-muted-foreground">--</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="soap" className="mt-6">
                <SOAPContainer onFinalizarAtendimento={() => setShowFinalizacao(true)} />
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

        {/* Modal de Finalização */}
        <FinalizacaoAtendimentoModal
          isOpen={showFinalizacao}
          onClose={() => setShowFinalizacao(false)}
          onSave={handleFinalizarAtendimento}
          isLoading={isFinalizando}
        />
      </div>
    </div>
  );
};

export default Atendimento;
