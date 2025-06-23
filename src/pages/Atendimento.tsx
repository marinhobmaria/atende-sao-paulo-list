import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ArrowLeft, User, FileText, Syringe, Clock, Calendar } from "lucide-react";
import { SOAPSubjetivo } from "@/components/atendimento/SOAPSubjetivo";
import { SOAPAntecedentes } from "@/components/atendimento/SOAPAntecedentes";
import { SOAPObjetivo } from "@/components/atendimento/SOAPObjetivo";
import { SOAPAvaliacao } from "@/components/atendimento/SOAPAvaliacao";
import { SOAPPlano } from "@/components/atendimento/SOAPPlano";
import { SOAPContainer } from "@/components/atendimento/SOAPContainer";

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
          <CardHeader className="pb-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Atendimento - {cidadao.name}
                </CardTitle>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-100">
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
                className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 border-blue-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
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
      </div>
    </div>
  );
};

export default Atendimento;
