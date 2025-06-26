
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Syringe, FileText, Printer, Calendar, Edit, Trash2 } from "lucide-react";
import { VaccineDoseCard } from "./VaccineDoseCard";
import { DeclaracaoComparecimentoModal } from "./DeclaracaoComparecimentoModal";
import { FinalizacaoVacinacaoModal } from "./FinalizacaoVacinacaoModal";
import { toast } from "@/hooks/use-toast";

interface VacinacaoFormProps {
  onFinalizarVacinacao: () => void;
}

export const VacinacaoForm = ({ onFinalizarVacinacao }: VacinacaoFormProps) => {
  const [showDeclaracaoModal, setShowDeclaracaoModal] = useState(false);
  const [showFinalizacaoModal, setShowFinalizacaoModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [desfecho, setDesfecho] = useState<string>("");
  const [imprimirAoFinalizar, setImprimirAoFinalizar] = useState(false);

  // Mock data das vacinas aplicadas no atendimento atual
  const vacinasAplicadas = [
    {
      id: "1",
      nome: "COVID-19",
      dose: "3ª DOSE",
      estrategia: "Campanha",
      dataAplicacao: new Date(),
      localAplicacao: "Braço direito",
      lote: "ABC123",
      fabricante: "Pfizer",
      dataValidade: "12/2024",
      grupoAtendimento: "Adultos",
      transcricaoCaderneta: false,
      isEditavel: true
    }
  ];

  const handleEditarDose = (doseId: string) => {
    console.log("Editando dose:", doseId);
    // Implementar abertura do modal de edição
    toast({
      title: "Editando dose",
      description: "Modal de edição será implementado"
    });
  };

  const handleExcluirDose = (doseId: string) => {
    console.log("Excluindo dose:", doseId);
    // Implementar confirmação e exclusão
    toast({
      title: "Dose excluída",
      description: "A dose foi removida do registro"
    });
  };

  const handleCancelarAtendimento = () => {
    setShowCancelModal(true);
  };

  const handleImprimirCaderneta = () => {
    console.log("Imprimindo caderneta de vacinação");
    toast({
      title: "Caderneta de vacinação",
      description: "Gerando documento para impressão..."
    });
  };

  const handleFinalizarAtendimento = () => {
    if (!desfecho) {
      toast({
        title: "Desfecho obrigatório",
        description: "Por favor, selecione o desfecho do atendimento",
        variant: "destructive"
      });
      return;
    }
    setShowFinalizacaoModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Bloco de Vacinação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Syringe className="h-5 w-5 text-purple-600" />
            Aplicação de Vacinas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {vacinasAplicadas.length > 0 ? (
            <div className="space-y-3">
              {vacinasAplicadas.map((dose) => (
                <VaccineDoseCard
                  key={dose.id}
                  dose={dose}
                  onEdit={handleEditarDose}
                  onDelete={handleExcluirDose}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Nenhuma vacina aplicada neste atendimento
            </p>
          )}
        </CardContent>
      </Card>

      {/* Bloco de Finalização do Atendimento */}
      <Card>
        <CardHeader>
          <CardTitle>Finalização do Atendimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Gerar Declaração de Comparecimento */}
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => setShowDeclaracaoModal(true)}
              className="w-full"
            >
              <FileText className="h-4 w-4 mr-2" />
              Gerar declaração de comparecimento
            </Button>
          </div>

          {/* Desfecho do Atendimento */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Desfecho do atendimento <span className="text-red-500">*</span>
            </Label>
            <RadioGroup value={desfecho} onValueChange={setDesfecho}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="liberar" id="liberar" />
                <Label htmlFor="liberar">Liberar cidadão</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manter" id="manter" />
                <Label htmlFor="manter">Manter cidadão na lista de atendimentos</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Imprimir Atendimento ao Finalizar */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="imprimir"
              checked={imprimirAoFinalizar}
              onCheckedChange={setImprimirAoFinalizar}
            />
            <Label htmlFor="imprimir">Imprimir atendimento ao finalizar</Label>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleImprimirCaderneta}
              className="flex-1"
            >
              <Printer className="h-4 w-4 mr-2" />
              Imprimir caderneta de vacinação
            </Button>
            <Button
              variant="outline"
              onClick={handleCancelarAtendimento}
              className="flex-1"
            >
              Cancelar atendimento de vacinação
            </Button>
            <Button
              onClick={handleFinalizarAtendimento}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Finalizar atendimento vacinação
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modais */}
      <DeclaracaoComparecimentoModal
        isOpen={showDeclaracaoModal}
        onClose={() => setShowDeclaracaoModal(false)}
      />

      <FinalizacaoVacinacaoModal
        isOpen={showFinalizacaoModal}
        onClose={() => setShowFinalizacaoModal(false)}
        onConfirm={onFinalizarVacinacao}
        desfecho={desfecho}
        imprimirAoFinalizar={imprimirAoFinalizar}
      />

      {/* Modal de Cancelamento */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Cancelar Atendimento</h3>
            <p className="text-gray-600 mb-6">
              Deseja cancelar o atendimento de vacinação? As alterações realizadas serão perdidas.
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCancelModal(false)}>
                Não
              </Button>
              <Button onClick={() => window.history.back()}>
                Sim
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
