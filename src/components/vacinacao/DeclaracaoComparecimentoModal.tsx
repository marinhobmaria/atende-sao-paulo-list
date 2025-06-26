
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface DeclaracaoComparecimentoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeclaracaoComparecimentoModal = ({ isOpen, onClose }: DeclaracaoComparecimentoModalProps) => {
  const [periodo, setPeriodo] = useState("");
  const [horarioPersonalizado, setHorarioPersonalizado] = useState(false);
  const [horarioEntrada, setHorarioEntrada] = useState("");
  const [horarioSaida, setHorarioSaida] = useState("");
  const [incluirAcompanhante, setIncluirAcompanhante] = useState(false);
  const [nomeAcompanhante, setNomeAcompanhante] = useState("");

  // Mock data do cidadão
  const cidadao = {
    nome: "Maria Antonieta Albuquerque Soares",
    nomeSocial: "Mário Henrique da Silva Oliveira Gomes dos Santos Albuquerque Soares",
    cpf: "094.556.799-80",
    cns: "123456789012345"
  };

  const handleGerarDeclaracao = () => {
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
    const dataExtenso = dataAtual.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    let periodoTexto = "";
    if (periodo === "personalizado") {
      periodoTexto = `das ${horarioEntrada} às ${horarioSaida}`;
    } else {
      periodoTexto = `no turno ${periodo}`;
    }

    const nomeExibicao = cidadao.nomeSocial 
      ? `${cidadao.nomeSocial} – ${cidadao.nome}`
      : cidadao.nome;

    let textoCorpo = `Declaro que ${nomeExibicao}, CPF ${cidadao.cpf}, permaneceu na UBS Jardim Itamaraty, no dia ${dataFormatada} ${periodoTexto}.`;
    
    if (incluirAcompanhante && nomeAcompanhante) {
      textoCorpo = `Declaro que ${nomeExibicao}, CPF ${cidadao.cpf}, permaneceu na UBS Jardim Itamaraty, no dia ${dataFormatada} ${periodoTexto} com acompanhamento de ${nomeAcompanhante}.`;
    }

    // Gerar documento para impressão
    const declaracao = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Declaração de Comparecimento</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; margin-bottom: 40px; }
          .title { font-size: 24px; font-weight: bold; margin: 20px 0; }
          .content { margin: 20px 0; line-height: 1.6; }
          .footer { margin-top: 60px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>UBS Jardim Itamaraty</h1>
        </div>
        <div class="title">DECLARAÇÃO DE COMPARECIMENTO</div>
        <div class="content">
          <p>${textoCorpo}</p>
        </div>
        <div class="footer">
          <p>Local e data: São Paulo, ${dataExtenso}.</p>
          <br><br>
          <p>________________________________</p>
          <p>Dr. João Silva - Médico</p>
          <p>CRM: 123456</p>
        </div>
      </body>
      </html>
    `;

    const novaJanela = window.open();
    if (novaJanela) {
      novaJanela.document.write(declaracao);
      novaJanela.document.close();
      novaJanela.print();
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Gerar Declaração de Comparecimento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dados do Cidadão */}
          <div className="space-y-2">
            <h3 className="font-medium">Dados de Identificação</h3>
            <div className="p-3 bg-gray-50 rounded">
              <p><strong>Nome:</strong> {cidadao.nomeSocial ? `${cidadao.nomeSocial} – ${cidadao.nome}` : cidadao.nome}</p>
              <p><strong>CPF:</strong> {cidadao.cpf}</p>
              <p><strong>CNS:</strong> {cidadao.cns}</p>
            </div>
          </div>

          {/* Período do Atendimento */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Período do Atendimento</Label>
            <RadioGroup value={periodo} onValueChange={setPeriodo}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="matutino" id="matutino" />
                <Label htmlFor="matutino">Matutino</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vespertino" id="vespertino" />
                <Label htmlFor="vespertino">Vespertino</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="noturno" id="noturno" />
                <Label htmlFor="noturno">Noturno</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personalizado" id="personalizado" />
                <Label htmlFor="personalizado">Horário personalizado</Label>
              </div>
            </RadioGroup>

            {periodo === "personalizado" && (
              <div className="grid grid-cols-2 gap-4 ml-6">
                <div>
                  <Label htmlFor="entrada">Horário de entrada</Label>
                  <Input
                    id="entrada"
                    type="time"
                    value={horarioEntrada}
                    onChange={(e) => setHorarioEntrada(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="saida">Horário de saída</Label>
                  <Input
                    id="saida"
                    type="time"
                    value={horarioSaida}
                    onChange={(e) => setHorarioSaida(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Acompanhante */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="acompanhante"
                checked={incluirAcompanhante}
                onCheckedChange={(checked) => setIncluirAcompanhante(checked === true)}
              />
              <Label htmlFor="acompanhante">Incluir nome do acompanhante</Label>
            </div>

            {incluirAcompanhante && (
              <div>
                <Label htmlFor="nomeAcompanhante">Nome do acompanhante</Label>
                <Input
                  id="nomeAcompanhante"
                  value={nomeAcompanhante}
                  onChange={(e) => setNomeAcompanhante(e.target.value)}
                  placeholder="Digite o nome do acompanhante"
                />
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleGerarDeclaracao} disabled={!periodo}>
              Gerar Declaração
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
