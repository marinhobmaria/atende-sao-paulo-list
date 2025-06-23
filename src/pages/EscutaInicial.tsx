
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ArrowLeft, User, Edit } from "lucide-react";
import { EscutaInicialForm } from "@/components/escuta-inicial/EscutaInicialForm";
import { toast } from "@/hooks/use-toast";

const EscutaInicial = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cidadaoId = searchParams.get("cidadao");
  const [isLoading, setIsLoading] = useState(false);

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

        {/* Header com informações do cidadão */}
        <Card className="shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
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
