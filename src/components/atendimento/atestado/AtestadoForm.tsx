
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CadastrarModeloModal } from "./CadastrarModeloModal";
import { Atestado } from "./AtestadoSection";
import { Plus } from "lucide-react";

interface AtestadoFormProps {
  onSave: (atestado: Omit<Atestado, 'id'>) => void;
  onCancel: () => void;
  editingAtestado?: Atestado | null;
}

export const AtestadoForm = ({ onSave, onCancel, editingAtestado }: AtestadoFormProps) => {
  const [modelo, setModelo] = useState("padrao");
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [hora, setHora] = useState("");
  const [dias, setDias] = useState("");
  const [cid10, setCid10] = useState("");
  const [textoLivre, setTextoLivre] = useState("");
  const [modelosCustomizados, setModelosCustomizados] = useState<Array<{id: string, nome: string, conteudo: string}>>([]);
  const [showCadastrarModal, setShowCadastrarModal] = useState(false);

  // Mock data - assumindo sexo feminino com idade >= 10 para mostrar opção de licença maternidade
  const pacienteFeminino = true;
  const idadeGte10 = true;

  useEffect(() => {
    if (editingAtestado) {
      setModelo(editingAtestado.modelo);
      setData(editingAtestado.dataEmissao);
      setDias(editingAtestado.dias?.toString() || "");
      setCid10(editingAtestado.cid10 || "");
    }
  }, [editingAtestado]);

  const getTextoAtestado = () => {
    const nomeCompleto = "Maria Antonieta Albuquerque Soares";
    const cpf = "094.556.799-80";
    const unidadeSaude = "UBS Central";

    switch (modelo) {
      case "padrao":
        return `ATESTADO

Atesto, para os devidos fins, que ${nomeCompleto}, CPF ${cpf}, recebeu atendimento na ${unidadeSaude} no dia ${new Date(data).toLocaleDateString('pt-BR')} às ${hora}. Em decorrência, deverá permanecer em afastamento de suas atividades laborativas por um período de ${dias} dia(s) a partir desta data.`;
      
      case "licenca-maternidade":
        return `LICENÇA MATERNIDADE

Atesto, para os fins de licença maternidade, que ${nomeCompleto}, CPF ${cpf}, necessita de afastamento de suas atividades laborativas a partir do dia ${new Date(data).toLocaleDateString('pt-BR')}.`;
      
      case "em-branco":
        return textoLivre;
      
      default:
        const modeloCustom = modelosCustomizados.find(m => m.id === modelo);
        if (modeloCustom) {
          return modeloCustom.conteudo
            .replace(/\[NOME\]/g, nomeCompleto)
            .replace(/\[CPF\/CNS\]/g, cpf)
            .replace(/\[DATA\]/g, new Date(data).toLocaleDateString('pt-BR'))
            .replace(/\[HORA\]/g, hora);
        }
        return "";
    }
  };

  const handleSave = () => {
    const atestadoData: Omit<Atestado, 'id'> = {
      dataEmissao: data,
      profissional: {
        nome: "Dr. João Silva",
        especialidade: "Clínico Geral",
        crm: "CRM/SP 123456"
      },
      unidadeSaude: "UBS Central",
      modelo,
      texto: getTextoAtestado(),
      dias: dias ? parseInt(dias) : undefined,
      cid10: cid10 || undefined
    };

    onSave(atestadoData);
  };

  const isFormValid = () => {
    if (modelo === "padrao") {
      return data && hora && dias;
    }
    if (modelo === "licenca-maternidade") {
      return true;
    }
    if (modelo === "em-branco") {
      return textoLivre.trim().length > 0;
    }
    return data && hora;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editingAtestado ? "Editar Atestado" : "Novo Atestado"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="modelo">Modelo *</Label>
              <Select value={modelo} onValueChange={setModelo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="padrao">Padrão</SelectItem>
                  <SelectItem value="em-branco">Em branco</SelectItem>
                  {pacienteFeminino && idadeGte10 && (
                    <SelectItem value="licenca-maternidade">Licença maternidade</SelectItem>
                  )}
                  {modelosCustomizados.map(m => (
                    <SelectItem key={m.id} value={m.id}>{m.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowCadastrarModal(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Cadastrar modelo
            </Button>
          </div>

          {modelo !== "licenca-maternidade" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="data">Data *</Label>
                  <Input
                    id="data"
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>
                {modelo !== "em-branco" && (
                  <div>
                    <Label htmlFor="hora">Hora *</Label>
                    <Input
                      id="hora"
                      type="time"
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {modelo === "padrao" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dias">Dias *</Label>
                    <Input
                      id="dias"
                      type="number"
                      value={dias}
                      onChange={(e) => setDias(e.target.value)}
                      placeholder="Número de dias"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cid10">CID-10</Label>
                    <Input
                      id="cid10"
                      value={cid10}
                      onChange={(e) => setCid10(e.target.value)}
                      placeholder="Pesquisar CID-10"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {modelo === "em-branco" && (
            <div>
              <Label htmlFor="texto-livre">Texto *</Label>
              <Textarea
                id="texto-livre"
                value={textoLivre}
                onChange={(e) => setTextoLivre(e.target.value)}
                maxLength={4000}
                rows={8}
                placeholder="Digite o texto do atestado..."
              />
              <div className="text-sm text-muted-foreground mt-1">
                {textoLivre.length}/4000 caracteres
              </div>
            </div>
          )}

          <div>
            <Label>Texto do Atestado</Label>
            <div className="mt-2 p-4 border rounded-md bg-gray-50 min-h-[200px] whitespace-pre-wrap">
              {getTextoAtestado()}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid()}>
            Salvar Atestado
          </Button>
        </div>

        <CadastrarModeloModal
          open={showCadastrarModal}
          onClose={() => setShowCadastrarModal(false)}
          onSave={(novoModelo) => {
            setModelosCustomizados(prev => [...prev, novoModelo]);
            setModelo(novoModelo.id);
          }}
        />
      </CardContent>
    </Card>
  );
};
