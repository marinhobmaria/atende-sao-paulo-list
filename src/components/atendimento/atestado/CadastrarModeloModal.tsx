
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info } from "lucide-react";

interface CadastrarModeloModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (modelo: {id: string, nome: string, conteudo: string}) => void;
}

export const CadastrarModeloModal = ({ open, onClose, onSave }: CadastrarModeloModalProps) => {
  const [nome, setNome] = useState("");
  const [conteudo, setConteudo] = useState("Atesto, para os devidos fins, que [NOME],[CPF/CNS], paciente sob meus cuidados, foi atendido(a) no dia [DATA] às [HORA].");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [originalConteudo] = useState("Atesto, para os devidos fins, que [NOME],[CPF/CNS], paciente sob meus cuidados, foi atendido(a) no dia [DATA] às [HORA].");

  const handleClose = () => {
    if (conteudo !== originalConteudo) {
      setShowCancelConfirm(true);
    } else {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setNome("");
    setConteudo(originalConteudo);
    setShowCancelConfirm(false);
  };

  const handleSave = () => {
    if (nome.trim() && conteudo.trim()) {
      onSave({
        id: `modelo-${Date.now()}`,
        nome: nome.trim(),
        conteudo: conteudo.trim()
      });
      resetForm();
      onClose();
    }
  };

  const isFormValid = nome.trim().length > 0 && conteudo.trim().length > 0;

  if (showCancelConfirm) {
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deseja cancelar a inclusão?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              As alterações realizadas serão perdidas
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCancelConfirm(false)}
              >
                Não, continuar inclusão
              </Button>
              <Button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                Sim, cancelar inclusão
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cadastrar modelo de atestado</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Utilize apenas informações genéricas no conteúdo do modelo de atestado que possam ser aplicadas à demais
            </AlertDescription>
          </Alert>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Os termos [NOME], [CPF/CNS], [DATA] e [HORA], quando escritos entre colchetes, serão substituídos pelos dados do cidadão e do atendimento quando o atestado for emitido.
            </AlertDescription>
          </Alert>

          <div>
            <Label htmlFor="nome-modelo">Nome do modelo *</Label>
            <Input
              id="nome-modelo"
              value={nome}
              onChange={(e) => setNome(e.target.value.slice(0, 41))}
              maxLength={41}
              placeholder="Digite o nome do modelo"
            />
            <div className="text-sm text-muted-foreground mt-1">
              {nome.length}/41 caracteres
            </div>
          </div>

          <div>
            <Label htmlFor="conteudo-modelo">Conteúdo *</Label>
            <Textarea
              id="conteudo-modelo"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value.slice(0, 4000))}
              maxLength={4000}
              rows={8}
              placeholder="Digite o conteúdo do modelo"
            />
            <div className="text-sm text-muted-foreground mt-1">
              {conteudo.length}/4000 caracteres
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="outline" onClick={handleClose}>
            Fechar
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
