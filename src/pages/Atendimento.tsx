
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ArrowLeft, User, FileText, Syringe, Clock, Calendar } from "lucide-react";

const Atendimento = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cidadaoId = searchParams.get("cidadao");

  // Mock data do cidadão
  const cidadao = {
    id: cidadaoId || "1",
    name: "Maria Silva Santos",
    age: 45,
    birthDate: "12/03/1979",
    cpf: "123.456.789-00",
    cns: "123456789012345",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123 - Vila Esperança - São Paulo/SP"
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

        {/* Header com informações do cidadão */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Atendimento - {cidadao.name}
                </CardTitle>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <p><span className="font-medium">Data de Nascimento:</span> {cidadao.birthDate} ({cidadao.age} anos)</p>
                  <p><span className="font-medium">CPF:</span> {cidadao.cpf}</p>
                  <p><span className="font-medium">CNS:</span> {cidadao.cns}</p>
                  <p><span className="font-medium">Telefone:</span> {cidadao.phone}</p>
                  <div className="md:col-span-2">
                    <p><span className="font-medium">Endereço:</span> {cidadao.address}</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="folha-rosto" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="folha-rosto" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Folha Rosto
                </TabsTrigger>
                <TabsTrigger value="soap" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  SOAP
                </TabsTrigger>
                <TabsTrigger value="vacinacao" className="flex items-center gap-2">
                  <Syringe className="h-4 w-4" />
                  Vacinação
                </TabsTrigger>
                <TabsTrigger value="historico" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Histórico
                </TabsTrigger>
                <TabsTrigger value="agendamentos" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Agendamentos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="folha-rosto" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Folha de Rosto</CardTitle>
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

              <TabsContent value="soap" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SOAP (Subjetivo, Objetivo, Avaliação, Plano)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Registro estruturado do atendimento seguindo a metodologia SOAP.
                      </p>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">S - Subjetivo</h4>
                          <p className="text-sm text-muted-foreground">Relato do paciente sobre sintomas e queixas.</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">O - Objetivo</h4>
                          <p className="text-sm text-muted-foreground">Dados objetivos coletados durante exame físico.</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">A - Avaliação</h4>
                          <p className="text-sm text-muted-foreground">Análise e diagnóstico clínico.</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">P - Plano</h4>
                          <p className="text-sm text-muted-foreground">Plano terapêutico e condutas.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vacinacao" className="mt-6">
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

              <TabsContent value="historico" className="mt-6">
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

              <TabsContent value="agendamentos" className="mt-6">
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
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Atendimento;
