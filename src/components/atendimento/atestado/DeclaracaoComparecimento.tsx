
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClipboardCheck } from "lucide-react";

export const DeclaracaoComparecimento = () => {
  const [showModal, setShowModal] = useState(false);
  const [periodo, setPeriodo] = useState("");
  const [horarioEntrada, setHorarioEntrada] = useState("");
  const [horarioSaida, setHorarioSaida] = useState("");
  const [nomeAcompanhante, setNomeAcompanhante] = useState("");

  // Mock data do paciente
  const paciente = {
    nome: "Maria Antonieta Albuquerque Soares",
    nomeSocial: "Mário Henrique da Silva Oliveira Gomes dos Santos Albuquerque Soares",
    cpf: "094.556.799-80",
    cns: "123456789012345"
  };

  const handleGerarDeclaracao = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const periodoTexto = periodo === 'personalizado' 
        ? `das ${horarioEntrada} às ${horarioSaida}`
        : `no turno ${periodo}`;

      const textoComAcompanhante = nomeAcompanhante.trim() 
        ? ` com acompanhamento de ${nomeAcompanhante.trim()}`
        : '';

      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Declaração de Comparecimento</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.8; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 20px; font-weight: bold; margin: 30px 0; text-align: center; }
            .content { margin: 30px 0; text-align: justify; font-size: 16px; }
            .footer { margin-top: 50px; }
            .signature { margin-top: 80px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/logo-sistema.png" alt="Logo" style="max-height: 60px;" />
            <h2>UBS Central</h2>
          </div>
          
          <div class="title">DECLARAÇÃO DE COMPARECIMENTO</div>
          
          <div class="content">
            <p>Declaro que ${paciente.nomeSocial} - ${paciente.nome}, CPF ${paciente.cpf}, permaneceu na UBS Central, no dia ${new Date().toLocaleDateString('pt-BR')} ${periodoTexto}${textoComAcompanhante}.</p>
          </div>
          
          <div class="footer">
            <p><strong>Local e data:</strong> São Paulo, ${new Date().toLocaleDateString('pt-BR', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}.</p>
          </div>
          
          <div class="signature">
            <p><strong>Dr. João Silva</strong></p>
            <p>Clínico Geral</p>
            <p>São Paulo, ${new Date().toLocaleDateString('pt-BR', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}.</p>
          </div>
        </body>
        </html>
      `;
      
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
    
    // Reset form
    setPeriodo("");
    setHorarioEntrada("");
    setHorarioSaida("");
    setNomeAcompanhante("");
    setShowModal(false);
  };

  const isFormValid = () => {
    if (periodo === 'personalizado') {
      return horarioEntrada && horarioSaida;
    }
    return periodo !== "";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Declaração de Comparecimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Gere uma declaração de comparecimento para o paciente e/ou acompanhante.
          </p>
          <Button onClick={() => setShowModal(true)}>
            Gerar Declaração de Comparecimento
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Declaração de Comparecimento</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-gray-50">
              <h4 className="font-medium mb-2">Dados de Identificação do Paciente:</h4>
              <div className="text-sm space-y-1">
                <p><strong>Nome:</strong> {paciente.nome}</p>
                <p><strong>Nome Social:</strong> {paciente.nomeSocial}</p>
                <p><strong>CPF:</strong> {paciente.cpf}</p>
                <p><strong>CNS:</strong> {paciente.cns}</p>
              </div>
            </div>

            <div>
              <Label htmlFor="periodo">Período do Atendimento *</Label>
              <Select value={periodo} onValueChange={setPeriodo} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matutino">Matutino</SelectItem>
                  <SelectItem value="vespertino">Vespertino</SelectItem>
                  <SelectItem value="noturno">Noturno</SelectItem>
                  <SelectItem value="personalizado">Horário personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {periodo === 'personalizado' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="entrada">Horário de Entrada *</Label>
                  <Input
                    id="entrada"
                    type="time"
                    value={horarioEntrada}
                    onChange={(e) => setHorarioEntrada(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="saida">Horário de Saída *</Label>
                  <Input
                    id="saida"
                    type="time"
                    value={horarioSaida}
                    onChange={(e) => setHorarioSaida(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="acompanhante">Nome do Acompanhante</Label>
              <Input
                id="acompanhante"
                value={nomeAcompanhante}
                onChange={(e) => setNomeAcompanhante(e.target.value)}
                placeholder="Digite o nome do acompanhante (opcional)"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Fechar
            </Button>
            <Button onClick={handleGerarDeclaracao} disabled={!isFormValid()}>
              Gerar Declaração
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
