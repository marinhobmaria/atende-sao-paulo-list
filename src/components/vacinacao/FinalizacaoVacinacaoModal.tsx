
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface FinalizacaoVacinacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  desfecho: string;
  imprimirAoFinalizar: boolean;
}

export const FinalizacaoVacinacaoModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  desfecho, 
  imprimirAoFinalizar 
}: FinalizacaoVacinacaoModalProps) => {
  
  const handleConfirm = () => {
    if (imprimirAoFinalizar) {
      gerarRelatorioAtendimento();
    }
    onConfirm();
  };

  const gerarRelatorioAtendimento = () => {
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
    const horaFormatada = dataAtual.toLocaleTimeString('pt-BR');

    // Mock data do cidadão e atendimento
    const cidadao = {
      nome: "Maria Antonieta Albuquerque Soares",
      nomeSocial: "Mário Henrique da Silva Oliveira Gomes dos Santos Albuquerque Soares",
      cpf: "094.556.799-80",
      idade: "20a 8m e 2d",
      dataNascimento: "10/02/2004",
      nomeMae: "Llian Cristina de Souza Guimarães"
    };

    const relatorio = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Relatório de Atendimento - Vacinação</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin: 20px 0; }
          .section h3 { border-bottom: 1px solid #ccc; padding-bottom: 5px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .vaccination-item { margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>UBS Jardim Itamaraty</h1>
          <h2>Relatório de Atendimento - Vacinação</h2>
        </div>

        <div class="section">
          <h3>Cidadão</h3>
          <div class="info-grid">
            <div><strong>Nome:</strong> ${cidadao.nomeSocial ? `${cidadao.nomeSocial} – ${cidadao.nome}` : cidadao.nome}</div>
            <div><strong>CPF:</strong> ${cidadao.cpf}</div>
            <div><strong>Idade:</strong> ${cidadao.idade}</div>
            <div><strong>Data de Nascimento:</strong> ${cidadao.dataNascimento}</div>
            <div><strong>Nome da Mãe:</strong> ${cidadao.nomeMae}</div>
          </div>
        </div>

        <div class="section">
          <h3>Atendimento</h3>
          <p><strong>Data e Hora:</strong> ${dataFormatada} às ${horaFormatada}</p>
        </div>

        <div class="section">
          <h3>Condição</h3>
          <p>Não foram registradas condições neste atendimento</p>
        </div>

        <div class="section">
          <h3>Vacinação</h3>
          <div class="vaccination-item">
            <div><strong>Nome da vacina:</strong> COVID-19 – 3ª DOSE – Campanha</div>
            <div><strong>Transcrição de caderneta:</strong> Não</div>
            <div><strong>Data da aplicação:</strong> ${dataFormatada}</div>
            <div><strong>Local de aplicação:</strong> Braço direito</div>
            <div><strong>Lote:</strong> ABC123</div>
            <div><strong>Fabricante:</strong> Pfizer</div>
            <div><strong>Data de validade:</strong> 12/2024</div>
            <div><strong>Grupo de atendimento:</strong> Adultos</div>
          </div>
        </div>

        <div class="section">
          <h3>Identificação do Profissional</h3>
          <p>Dr. João Silva - Médico</p>
        </div>
      </body>
      </html>
    `;

    const novaJanela = window.open();
    if (novaJanela) {
      novaJanela.document.write(relatorio);
      novaJanela.document.close();
      novaJanela.print();
    }
  };

  const getDesfechoText = () => {
    switch (desfecho) {
      case "liberar":
        return "Liberar cidadão";
      case "manter":
        return "Manter cidadão na lista de atendimentos";
      default:
        return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Finalizar Atendimento de Vacinação
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Confirme os dados do atendimento antes de finalizar:
            </p>
            
            <div className="p-3 bg-gray-50 rounded space-y-2">
              <div>
                <span className="font-medium">Desfecho:</span> {getDesfechoText()}
              </div>
              <div>
                <span className="font-medium">Imprimir ao finalizar:</span> {imprimirAoFinalizar ? "Sim" : "Não"}
              </div>
            </div>

            <p className="text-sm text-amber-600">
              ⚠️ Após finalizar, não será mais possível editar ou excluir os registros de vacinação.
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700">
              Finalizar Atendimento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
