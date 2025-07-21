import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Plus, 
  Trash2, 
  Calendar as CalendarIcon,
  Pill,
  FileText,
  UserPlus,
  AlertCircle,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Medicamento {
  id: string;
  medicamento: string;
  dose: string;
  frequencia: string;
  via: string;
  duracao: string;
  instrucoes: string;
}

interface Exame {
  id: string;
  tipo: string;
  motivo: string;
  urgencia: string;
}

interface Encaminhamento {
  id: string;
  destino: string;
  motivo: string;
  urgencia: string;
}

interface PlanoData {
  conduta: string;
  orientacoes: string;
  medicamentos: Medicamento[];
  exames: Exame[];
  encaminhamentos: Encaminhamento[];
  retornoData?: Date;
  retornoMotivo: string;
}

export const SOAPPlano = () => {
  const [conduta, setConduta] = useState("");
  const [orientacoes, setOrientacoes] = useState("");
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [exames, setExames] = useState<Exame[]>([]);
  const [encaminhamentos, setEncaminhamentos] = useState<Encaminhamento[]>([]);
  const [retornoData, setRetornoData] = useState<Date>();
  const [retornoMotivo, setRetornoMotivo] = useState("");

  // Validações
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Validar campos obrigatórios
  const validateFields = () => {
    const newErrors: {[key: string]: string} = {};

    if (conduta.trim().length < 10) {
      newErrors.conduta = "Conduta deve ter pelo menos 10 caracteres";
    }

    if (orientacoes.trim().length < 10) {
      newErrors.orientacoes = "Orientações devem ter pelo menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateFields();
  }, [conduta, orientacoes]);

  // Funções para medicamentos
  const adicionarMedicamento = () => {
    const novoMedicamento: Medicamento = {
      id: Date.now().toString(),
      medicamento: "",
      dose: "",
      frequencia: "",
      via: "",
      duracao: "",
      instrucoes: ""
    };
    setMedicamentos([...medicamentos, novoMedicamento]);
  };

  const atualizarMedicamento = (id: string, campo: keyof Medicamento, valor: string) => {
    setMedicamentos(medicamentos.map(med => 
      med.id === id ? { ...med, [campo]: valor } : med
    ));
  };

  const removerMedicamento = (id: string) => {
    setMedicamentos(medicamentos.filter(med => med.id !== id));
  };

  // Funções para exames
  const adicionarExame = () => {
    const novoExame: Exame = {
      id: Date.now().toString(),
      tipo: "",
      motivo: "",
      urgencia: "normal"
    };
    setExames([...exames, novoExame]);
  };

  const atualizarExame = (id: string, campo: keyof Exame, valor: string) => {
    setExames(exames.map(exame => 
      exame.id === id ? { ...exame, [campo]: valor } : exame
    ));
  };

  const removerExame = (id: string) => {
    setExames(exames.filter(exame => exame.id !== id));
  };

  // Funções para encaminhamentos
  const adicionarEncaminhamento = () => {
    const novoEncaminhamento: Encaminhamento = {
      id: Date.now().toString(),
      destino: "",
      motivo: "",
      urgencia: "normal"
    };
    setEncaminhamentos([...encaminhamentos, novoEncaminhamento]);
  };

  const atualizarEncaminhamento = (id: string, campo: keyof Encaminhamento, valor: string) => {
    setEncaminhamentos(encaminhamentos.map(enc => 
      enc.id === id ? { ...enc, [campo]: valor } : enc
    ));
  };

  const removerEncaminhamento = (id: string) => {
    setEncaminhamentos(encaminhamentos.filter(enc => enc.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Conduta/Plano Terapêutico - OBRIGATÓRIO */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Conduta/Plano Terapêutico
            <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="conduta">
              Descrição da conduta médica, procedimentos e intervenções
            </Label>
            <Textarea
              id="conduta"
              placeholder="Descreva a conduta médica, procedimentos e intervenções a serem realizados..."
              value={conduta}
              onChange={(e) => setConduta(e.target.value)}
              className={cn(
                "min-h-[120px] resize-y",
                errors.conduta && "border-red-500"
              )}
              maxLength={2000}
            />
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {conduta.length}/2000 caracteres (mínimo 10)
              </div>
              {errors.conduta && (
                <span className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.conduta}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orientações ao Paciente - OBRIGATÓRIO */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Orientações ao Paciente
            <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orientacoes">
              Recomendações, cuidados, sinais de alerta e restrições
            </Label>
            <Textarea
              id="orientacoes"
              placeholder="Descreva as orientações ao paciente: recomendações, cuidados, sinais de alerta, restrições..."
              value={orientacoes}
              onChange={(e) => setOrientacoes(e.target.value)}
              className={cn(
                "min-h-[120px] resize-y",
                errors.orientacoes && "border-red-500"
              )}
              maxLength={2000}
            />
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {orientacoes.length}/2000 caracteres (mínimo 10)
              </div>
              {errors.orientacoes && (
                <span className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.orientacoes}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescrições - OPCIONAL */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Prescrições
              <Badge variant="secondary" className="text-xs">Opcional</Badge>
            </CardTitle>
            <Button onClick={adicionarMedicamento} size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Medicamento
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {medicamentos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum medicamento prescrito. Clique em "Adicionar Medicamento" para começar.
            </div>
          ) : (
            medicamentos.map((medicamento) => (
              <Card key={medicamento.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Medicamento #{medicamentos.indexOf(medicamento) + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removerMedicamento(medicamento.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Medicamento</Label>
                      <Input
                        placeholder="Nome do medicamento"
                        value={medicamento.medicamento}
                        onChange={(e) => atualizarMedicamento(medicamento.id, 'medicamento', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Dose</Label>
                      <Input
                        placeholder="Ex: 500mg"
                        value={medicamento.dose}
                        onChange={(e) => atualizarMedicamento(medicamento.id, 'dose', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Frequência</Label>
                      <Select
                        value={medicamento.frequencia}
                        onValueChange={(value) => atualizarMedicamento(medicamento.id, 'frequencia', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1x-dia">1x ao dia</SelectItem>
                          <SelectItem value="2x-dia">2x ao dia</SelectItem>
                          <SelectItem value="3x-dia">3x ao dia</SelectItem>
                          <SelectItem value="4x-dia">4x ao dia</SelectItem>
                          <SelectItem value="6-6h">6 em 6 horas</SelectItem>
                          <SelectItem value="8-8h">8 em 8 horas</SelectItem>
                          <SelectItem value="12-12h">12 em 12 horas</SelectItem>
                          <SelectItem value="sos">Se necessário</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Via</Label>
                      <Select
                        value={medicamento.via}
                        onValueChange={(value) => atualizarMedicamento(medicamento.id, 'via', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Via de administração" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oral">Oral</SelectItem>
                          <SelectItem value="sublingual">Sublingual</SelectItem>
                          <SelectItem value="topica">Tópica</SelectItem>
                          <SelectItem value="intramuscular">Intramuscular</SelectItem>
                          <SelectItem value="endovenosa">Endovenosa</SelectItem>
                          <SelectItem value="inalatoria">Inalatória</SelectItem>
                          <SelectItem value="nasal">Nasal</SelectItem>
                          <SelectItem value="ocular">Ocular</SelectItem>
                          <SelectItem value="auricular">Auricular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Duração</Label>
                      <Input
                        placeholder="Ex: 7 dias"
                        value={medicamento.duracao}
                        onChange={(e) => atualizarMedicamento(medicamento.id, 'duracao', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Instruções</Label>
                      <Input
                        placeholder="Instruções especiais"
                        value={medicamento.instrucoes}
                        onChange={(e) => atualizarMedicamento(medicamento.id, 'instrucoes', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      {/* Exames Solicitados - OPCIONAL */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Exames Solicitados
              <Badge variant="secondary" className="text-xs">Opcional</Badge>
            </CardTitle>
            <Button onClick={adicionarExame} size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Exame
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {exames.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum exame solicitado. Clique em "Adicionar Exame" para começar.
            </div>
          ) : (
            exames.map((exame) => (
              <Card key={exame.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Exame #{exames.indexOf(exame) + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removerExame(exame.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Tipo de Exame</Label>
                      <Input
                        placeholder="Ex: Hemograma completo"
                        value={exame.tipo}
                        onChange={(e) => atualizarExame(exame.id, 'tipo', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Motivo</Label>
                      <Input
                        placeholder="Motivo da solicitação"
                        value={exame.motivo}
                        onChange={(e) => atualizarExame(exame.id, 'motivo', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Urgência</Label>
                      <Select
                        value={exame.urgencia}
                        onValueChange={(value) => atualizarExame(exame.id, 'urgencia', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a urgência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="urgente">Urgente</SelectItem>
                          <SelectItem value="muito-urgente">Muito Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      {/* Encaminhamentos - OPCIONAL */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Encaminhamentos
              <Badge variant="secondary" className="text-xs">Opcional</Badge>
            </CardTitle>
            <Button onClick={adicionarEncaminhamento} size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Encaminhamento
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {encaminhamentos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum encaminhamento realizado. Clique em "Adicionar Encaminhamento" para começar.
            </div>
          ) : (
            encaminhamentos.map((encaminhamento) => (
              <Card key={encaminhamento.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Encaminhamento #{encaminhamentos.indexOf(encaminhamento) + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removerEncaminhamento(encaminhamento.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Destino</Label>
                      <Input
                        placeholder="Ex: Cardiologia, UPA, etc."
                        value={encaminhamento.destino}
                        onChange={(e) => atualizarEncaminhamento(encaminhamento.id, 'destino', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Motivo</Label>
                      <Input
                        placeholder="Motivo do encaminhamento"
                        value={encaminhamento.motivo}
                        onChange={(e) => atualizarEncaminhamento(encaminhamento.id, 'motivo', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Urgência</Label>
                      <Select
                        value={encaminhamento.urgencia}
                        onValueChange={(value) => atualizarEncaminhamento(encaminhamento.id, 'urgencia', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a urgência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="urgente">Urgente</SelectItem>
                          <SelectItem value="muito-urgente">Muito Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      {/* Agendamento de Retorno - OPCIONAL */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Agendamento de Retorno
            <Badge variant="secondary" className="text-xs">Opcional</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data Sugerida para Retorno</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !retornoData && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {retornoData ? format(retornoData, "PPP", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={retornoData}
                    onSelect={setRetornoData}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Motivo do Retorno</Label>
              <Input
                placeholder="Ex: Reavaliação, controle, resultado de exames..."
                value={retornoMotivo}
                onChange={(e) => setRetornoMotivo(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo de Validação */}
      {Object.keys(errors).length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Existem campos obrigatórios que precisam ser preenchidos corretamente:
            <ul className="mt-2 list-disc list-inside">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};