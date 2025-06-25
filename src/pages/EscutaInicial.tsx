
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { EscutaInicialForm } from "@/components/escuta-inicial/EscutaInicialForm";
import { CitizenCompactInfo } from "@/components/escuta-inicial/CitizenCompactInfo";
import { FinalizacaoAtendimentoModal } from "@/components/finalizacao/FinalizacaoAtendimentoModal";
import { toast } from "@/hooks/use-toast";

const EscutaInicial = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cidadaoId = searchParams.get("cidadao");
  const [isLoading, setIsLoading] = useState(false);
  const [showFinalizacao, setShowFinalizacao] = useState(false);
  const [isFinalizando, setIsFinalizando] = useState(false);
  const [escutaData, setEscutaData] = useState<any>(null);

  // Mock data do cidadão baseado na imagem de referência
  const cidadao = {
    id: cidadaoId || "1",
    name: "Maria Antonieta Albuquerque Soares",
    socialName: "Mário Henrique da Silva Oliveira Gomes dos Santos Albuquerque Soares",
    cpf: "094556799-80",
    birthDate: "10/02/2004",
    age: "20a 8m e 2d",
    sex: "Feminino",
    motherName: "Llian Cristina de Souza Guimarães",
    status: "Escuta inicial realizada",
    healthConditions: ["Hipertenso", "Diabético", "Gestante"],
    allergies: ["Dipirona", "Leite", "Mofo"],
    photo: "https://images.unsplash.com/photo-1494790108755-2616b812e672?w=150&h=150&fit=crop&crop=face"
  };

  const handleFinalizarEscuta = async (data: any) => {
    setIsLoading(true);
    try {
      console.log("Dados da escuta inicial:", data);
      setEscutaData(data);
      
      toast({
        title: "Escuta inicial registrada",
        description: "Os dados foram salvos. Agora finalize o atendimento.",
      });

      setShowFinalizacao(true);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível registrar a escuta inicial.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalizarAtendimento = async (data: any) => {
    setIsFinalizando(true);
    try {
      console.log("Dados da finalização:", data);
      console.log("Dados da escuta inicial:", escutaData);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Atendimento finalizado com sucesso",
        description: "Escuta inicial e finalização foram registradas.",
      });

      setShowFinalizacao(false);

      if (escutaData?.desfecho === "liberar") {
        navigate("/");
      } else if (escutaData?.desfecho === "adicionar_lista") {
        navigate("/");
      } else if (escutaData?.desfecho === "agendar") {
        navigate("/");
      } else {
        navigate("/");
      }
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

  const handleCancelar = () => {
    if (confirm("Deseja cancelar a Escuta Inicial? As alterações realizadas serão perdidas.")) {
      navigate("/");
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
              <BreadcrumbPage>Escuta Inicial</BreadcrumbPage>
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
            <Tabs defaultValue="escuta-inicial" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="folha-rosto">Folha Rosto</TabsTrigger>
                <TabsTrigger value="escuta-inicial">Escuta Inicial</TabsTrigger>
                <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
              </TabsList>

              <TabsContent value="folha-rosto" className="mt-6">
                <div className="text-center py-8 text-gray-500">
                  <p>Conteúdo da Folha Rosto será implementado aqui</p>
                </div>
              </TabsContent>

              <TabsContent value="escuta-inicial" className="mt-6">
                <EscutaInicialForm
                  onSubmit={handleFinalizarEscuta}
                  onCancel={handleCancelar}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="agendamentos" className="mt-6">
                <div className="text-center py-8 text-gray-500">
                  <p>Conteúdo dos Agendamentos será implementado aqui</p>
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

export default EscutaInicial;
