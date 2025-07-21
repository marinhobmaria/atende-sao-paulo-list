
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { SOAPContainer } from "@/components/atendimento/SOAPContainer";
import { CitizenCompactInfo } from "@/components/escuta-inicial/CitizenCompactInfo";
import { FinalizacaoAtendimentoModal } from "@/components/finalizacao/FinalizacaoAtendimentoModal";
import { FolhaRostoTab } from "@/components/folha-rosto/FolhaRostoTab";
import { PageLayout } from "@/components/layout/PageLayout";
import { usePatientStatus } from "@/hooks/usePatientStatus";
import { useAuditLog } from "@/hooks/useAuditLog";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { toast } from "@/hooks/use-toast";

const Atendimento = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cidadaoId = searchParams.get("cidadao");
  const [showFinalizacao, setShowFinalizacao] = useState(false);
  const [showConfirmFinalizacao, setShowConfirmFinalizacao] = useState(false);
  const [isFinalizando, setIsFinalizando] = useState(false);
  
  const { logAction } = useAuditLog();
  const { currentUser, canStartAttendance, canFinalizeAttendance } = useUserPermissions();
  const patientStatus = usePatientStatus(cidadaoId || "1", "in-service");

  // Mock data do cidadão baseado na imagem de referência
  const cidadao = {
    id: cidadaoId || "1",
    name: "Maria Antonieta Albuquerque Soares",
    socialName: "Mário Henrique da Silva Oliveira Gomes dos Santos Albuquerque Soares",
    cpf: "094.556.799-80",
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

  // Initialize patient status when component mounts
  useEffect(() => {
    if (canStartAttendance()) {
      patientStatus.transitionTo(
        'in-service', 
        'Atendimento iniciado',
        currentUser?.id,
        currentUser?.name
      );
      
      logAction(
        'Atendimento iniciado',
        { patientId: cidadao.id },
        'atendimento',
        'info',
        cidadao.id,
        cidadao.name,
        currentUser?.id,
        currentUser?.name
      );
    }
  }, []);

  const handleFinalizarAtendimento = async (data: any) => {
    if (!canFinalizeAttendance()) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para finalizar atendimentos.",
        variant: "destructive"
      });
      return;
    }

    setIsFinalizando(true);
    try {
      console.log("Dados da finalização:", data);
      
      // Transition patient status to completed
      await patientStatus.transitionTo(
        'completed', 
        'Atendimento finalizado',
        currentUser?.id,
        currentUser?.name
      );
      
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Log successful completion
      logAction(
        'Atendimento finalizado com sucesso',
        { 
          patientId: cidadao.id,
          finalizationData: data,
          duration: 'calculated_duration'
        },
        'atendimento',
        'success',
        cidadao.id,
        cidadao.name,
        currentUser?.id,
        currentUser?.name
      );
      
      toast({
        title: "Atendimento finalizado com sucesso",
        description: "Todos os dados foram salvos e o atendimento foi encerrado.",
      });

      setShowFinalizacao(false);
      setShowConfirmFinalizacao(false);
      navigate("/");
    } catch (error) {
      logAction(
        'Erro ao finalizar atendimento',
        { error: error.message, patientId: cidadao.id },
        'atendimento',
        'error',
        cidadao.id,
        cidadao.name,
        currentUser?.id,
        currentUser?.name
      );
      
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

  // Check if user has permission to access attendance
  if (!canStartAttendance()) {
    return (
      <PageLayout breadcrumbItems={[
        { title: "Lista de Atendimento", href: "/" }, 
        { title: "Atendimento" }
      ]}>
        <div className="p-4">
          <Alert className="max-w-4xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Você não tem permissão para realizar atendimentos. Entre em contato com o administrador.
            </AlertDescription>
          </Alert>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout breadcrumbItems={[
      { title: "Lista de Atendimento", href: "/" }, 
      { title: "Atendimento" }
    ]}>
      <div className="p-4">
        <div className="w-full space-y-4">
          {/* Status and Permission Info */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{currentUser?.name}</Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <Badge variant="outline">{currentUser?.profile}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-600">
                {patientStatus.currentStatusLabel}
              </Badge>
            </div>
          </div>

          {/* Informações compactas do cidadão */}
          <CitizenCompactInfo 
            cidadao={cidadao}
            onBack={() => navigate("/")}
          />

          {/* Tabs Container with Timeline Layout */}
          <div className="flex gap-6 h-full">
            {/* Main Content - Left Side */}
            <div className="flex-1">
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
                      <SOAPContainer 
                        onFinalizarAtendimento={() => setShowConfirmFinalizacao(true)}
                        patientId={cidadao.id}
                        patientName={cidadao.name}
                      />
                    </TabsContent>

                    <TabsContent value="vacinacao" className="mt-6">
                      <div className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-xl">Registro de Vacinação</CardTitle>
                            <p className="text-muted-foreground">
                              Registro de vacinas aplicadas e cartão de vacinação.
                            </p>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="font-medium text-lg">Vacinas Pendentes</h4>
                              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="font-medium text-orange-800">Vacinas em atraso detectadas</p>
                                    <p className="text-sm text-orange-700 mt-1">
                                      Verifique o cartão de vacinação do cidadão e atualize os registros necessários.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <h4 className="font-medium text-lg">Histórico de Vacinação</h4>
                              <div className="grid gap-3">
                                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <div>
                                      <p className="font-medium">COVID-19 - 3ª DOSE</p>
                                      <p className="text-sm text-muted-foreground">Pfizer</p>
                                    </div>
                                  </div>
                                  <span className="text-sm text-muted-foreground">15/03/2024</span>
                                </div>
                                
                                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <div>
                                      <p className="font-medium">Influenza - DOSE ÚNICA</p>
                                      <p className="text-sm text-muted-foreground">Campanha 2024</p>
                                    </div>
                                  </div>
                                  <span className="text-sm text-muted-foreground">01/04/2024</span>
                                </div>
                                
                                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <div>
                                      <p className="font-medium">Dupla adulto - 2ª dose</p>
                                      <p className="text-sm text-muted-foreground">Tétano e Difteria</p>
                                    </div>
                                  </div>
                                  <span className="text-sm text-muted-foreground">00/00/0000</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="historico" className="mt-6">
                      <div className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-xl">Histórico de Atendimentos</CardTitle>
                            <p className="text-muted-foreground">
                              Histórico completo de atendimentos anteriores do cidadão.
                            </p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <h4 className="font-medium text-lg">Atendimentos Recentes</h4>
                              <div className="space-y-3">
                                <div className="p-4 border rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium">Consulta Médica</h5>
                                    <Badge variant="outline">15/06/2024</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Dor de cabeça - N01 (CIAP2) | Dr. João Silva
                                  </p>
                                </div>
                                
                                <div className="p-4 border rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium">Escuta Inicial</h5>
                                    <Badge variant="outline">10/06/2024</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Febre - A03 (CIAP2) | Enf. Maria Santos
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="agendamentos" className="mt-6">
                      <div className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-xl">Agendamentos</CardTitle>
                            <p className="text-muted-foreground">
                              Consultas e procedimentos agendados para o cidadão.
                            </p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <h4 className="font-medium text-lg">Próximos Agendamentos</h4>
                              <div className="text-center py-8">
                                <p className="text-muted-foreground">Nenhum agendamento futuro encontrado.</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Timeline - Right Side - Fixed for all tabs */}
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-4">
                <Card className="shadow-lg border-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Timeline
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Histórico de eventos do paciente
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {[
                        { title: 'Consulta especialidade Oftalmologia', time: '2 dias atrás', type: 'Consulta' },
                        { title: 'Vacina campanha COVID-19', time: '2 dias atrás', type: 'Vacina' },
                        { title: 'Procedimento', time: '6h atrás', type: 'Procedimento' },
                        { title: 'Escuta inicial', time: '4 dias atrás', type: 'Escuta' }
                      ].map((event, index) => (
                        <div key={index} className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {index < 3 && <div className="w-px h-16 bg-border mt-2"></div>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className="text-xs">{event.time}</Badge>
                              <Badge variant="outline" className="text-xs">{event.type}</Badge>
                            </div>
                            <h4 className="font-medium text-sm">{event.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

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
