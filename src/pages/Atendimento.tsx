
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ArrowLeft, User, FileText, Syringe, Clock, Calendar, Edit, CheckCircle } from "lucide-react";
import { SOAPContainer } from "@/components/atendimento/SOAPContainer";
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
    birthDate: "10/02/2004",
    age: "20a 8m e 2d",
    sex: "Feminino",
    motherName: "Llian Cristina de Souza Guimarães",
    status: "Escuta inicial realizada",
    healthConditions: ["Hipertenso", "Diabético", "Gestante"],
    allergies: ["Dipirona", "Leite", "Mofo"]
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
    <div className="min-h-screen bg-gray-50 p-6">
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

        {/* Header com informações do cidadão */}
        <Card className="shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 w-full">
                {/* Avatar */}
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  <User className="h-8 w-8" />
                </div>
                
                {/* Informações principais */}
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Coluna 1 */}
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className="text-xl font-semibold text-gray-900">{cidadao.name}</h1>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Nome social</p>
                        <p className="text-sm text-gray-800">({cidadao.socialName})</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">CPF</p>
                          <p className="text-sm text-gray-900">{cidadao.cpf}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Nome da mãe</p>
                          <p className="text-sm text-gray-900">{cidadao.motherName}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Data de nascimento</p>
                          <p className="text-sm text-gray-900">{cidadao.birthDate} {cidadao.age}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Escuta inicial realizada</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600">Sexo</p>
                        <p className="text-sm text-gray-900">{cidadao.sex}</p>
                      </div>
                    </div>

                    {/* Coluna 2 - Condições de Saúde */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Condições e situações de saúde</p>
                        <div className="flex flex-wrap gap-2">
                          {cidadao.healthConditions.map((condition, index) => (
                            <Badge 
                              key={index} 
                              className={`text-white text-xs px-2 py-1 ${
                                condition === "Hipertenso" ? "bg-green-600" : 
                                condition === "Diabético" ? "bg-green-600" : 
                                condition === "Gestante" ? "bg-blue-500" : "bg-gray-500"
                              }`}
                            >
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Coluna 3 - Alergias */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Alergias/Reações adversas</p>
                        <div className="flex flex-wrap gap-2">
                          {cidadao.allergies.map((allergy, index) => (
                            <Badge 
                              key={index} 
                              className="bg-red-500 text-white text-xs px-2 py-1"
                            >
                              ⚠ {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <Button
                  onClick={() => setShowFinalizacao(true)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4" />
                  Finalizar Atendimento
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs defaultValue="folha-rosto" className="w-full">
              <div className="border-b bg-gray-50 p-4">
                <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
                  <TabsTrigger value="folha-rosto" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Folha Rosto</span>
                  </TabsTrigger>
                  <TabsTrigger value="soap" className="flex items-center gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">SOAP</span>
                  </TabsTrigger>
                  <TabsTrigger value="vacinacao" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    <Syringe className="h-4 w-4" />
                    <span className="hidden sm:inline">Vacinação</span>
                  </TabsTrigger>
                  <TabsTrigger value="historico" className="flex items-center gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                    <Clock className="h-4 w-4" />
                    <span className="hidden sm:inline">Histórico</span>
                  </TabsTrigger>
                  <TabsTrigger value="agendamentos" className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Agendamentos</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="folha-rosto" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Folha de Rosto
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="soap" className="mt-0">
                  <SOAPContainer />
                </TabsContent>

                <TabsContent value="vacinacao" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vacinação</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="historico" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Histórico de Atendimentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Histórico completo de atendimentos anteriores do cidadão.
                        </p>
                        <div className="space-y-2">
                          <h4 className="font-medium">Atendimentos Recentes</h4>
                          <p className="text-sm text-muted-foreground">Nenhum atendimento anterior registrado.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="agendamentos" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Agendamentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Consultas e procedimentos agendados para o cidadão.
                        </p>
                        <div className="space-y-2">
                          <h4 className="font-medium">Próximos Agendamentos</h4>
                          <p className="text-sm text-muted-foreground">Nenhum agendamento futuro encontrado.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
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
