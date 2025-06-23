
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ArrowLeft } from "lucide-react";
import { EscutaInicialForm } from "@/components/escuta-inicial/EscutaInicialForm";
import { toast } from "@/hooks/use-toast";

const EscutaInicial = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cidadaoId = searchParams.get("cidadao");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data do cidadão
  const cidadao = {
    id: cidadaoId || "1",
    name: "Maria Silva Santos",
    age: 45,
    birthDate: "12/03/1979",
    cpf: "123.456.789-00",
    cns: "123456789012345"
  };

  const handleFinalizarEscuta = async (data: any) => {
    setIsLoading(true);
    try {
      // Aqui seria a chamada para salvar os dados
      console.log("Dados da escuta inicial:", data);
      
      toast({
        title: "Escuta inicial finalizada",
        description: "Os dados foram salvos com sucesso.",
      });

      // Redirecionar baseado no desfecho
      if (data.desfecho === "liberar") {
        navigate("/");
      } else if (data.desfecho === "adicionar_lista") {
        navigate("/");
      } else if (data.desfecho === "agendar") {
        // Redirecionaria para agendamento
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível finalizar a escuta inicial.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelar = () => {
    if (confirm("Deseja cancelar a Escuta Inicial? As alterações realizadas serão perdidas.")) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
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

        {/* Header com informações do cidadão */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-primary">Escuta Inicial</CardTitle>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p><span className="font-medium">Nome:</span> {cidadao.name}</p>
                  <p><span className="font-medium">Data de Nascimento:</span> {cidadao.birthDate} ({cidadao.age} anos)</p>
                  <p><span className="font-medium">CPF:</span> {cidadao.cpf}</p>
                  <p><span className="font-medium">CNS:</span> {cidadao.cns}</p>
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
            <EscutaInicialForm
              onSubmit={handleFinalizarEscuta}
              onCancel={handleCancelar}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EscutaInicial;
