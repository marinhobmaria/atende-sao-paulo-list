import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X, Search, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FinalizacaoAtendimentoFormProps {
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const FinalizacaoAtendimentoForm = ({
  onSave,
  onCancel,
  isLoading = false
}: FinalizacaoAtendimentoFormProps) => {
  const [tipoAtendimento, setTipoAtendimento] = useState("");
  const [cidadaoParticipou, setCidadaoParticipou] = useState(true);
  const [formaParticipacao, setFormaParticipacao] = useState("");
  const [atendimentoCompartilhado, setAtendimentoCompartilhado] = useState("");
  const [formaParticipacaoCompartilhado, setFormaParticipacaoCompartilhado] = useState("");
  const [procedimentos, setProcedimentos] = useState<string[]>([]);
  const [procedimentoBusca, setProcedimentoBusca] = useState("");
  const [agravosNotificaveis, setAgravosNotificaveis] = useState("");
  const [racionalidade, setRacionalidade] = useState("");
  const [condutas, setCondutas] = useState<string[]>([]);
  const [desfecho, setDesfecho] = useState("liberar");
  const [profissionalManutencao, setProfissionalManutencao] = useState("");
  const [equipeManutencao, setEquipeManutencao] = useState("");
  const [tiposServico, setTiposServico] = useState<string[]>([]);
  const [agendarConsulta, setAgendarConsulta] = useState(false);
  const [profissionalAgendamento, setProfissionalAgendamento] = useState("");
  const [dataAgendamento, setDataAgendamento] = useState<Date>();
  const [horarioAgendamento, setHorarioAgendamento] = useState("");
  const [observacoesAgendamento, setObservacoesAgendamento] = useState("");

  const procedimentosSugeridos = [
    "03.01.01.007-2 - Consulta médica em atenção básica",
    "03.01.02.001-9 - Consulta de enfermagem em atenção básica",
    "04.14.02.001-0 - Curativo especial",
    "02.11.07.010-0 - Eletrocardiograma",
    "03.01.10.004-0 - Atividade educativa / orientação em grupo na atenção básica"
  ];

  const agravos = [
    "Dengue",
    "Chikungunya", 
    "Zika",
    "COVID-19",
    "Tuberculose",
    "Sífilis",
    "HIV/AIDS",
    "Hepatite B",
    "Hepatite C"
  ];

  const racionalidades = [
    { value: "01", label: "01 – Medicina tradicional chinesa" },
    { value: "02", label: "02 – Antroposofia aplicada à saúde" },
    { value: "03", label: "03 – Homeopatia" },
    { value: "04", label: "04 – Fitoterapia" },
    { value: "05", label: "05 – Ayurveda" },
    { value: "06", label: "06 – Outra" }
  ];

  const condutasOpcoes = [
    "Retorno para consulta agendada",
    "Retorno para consulta programada / cuidado continuado",
    "Agendamento para eMulti",
    "Agendamento para grupos",
    "Alta do episódio"
  ];

  const tiposServicoOpcoes = [
    "ADM. MEDICAMENTO",
    "ESCUTA INICIAL", 
    "ODONTOLOGIA",
    "CURATIVO",
    "EXAMES",
    "PROCEDIMENTOS",
    "DEMANDA ESPONTÂNEA",
    "NEBULIZAÇÃO",
    "VACINA"
  ];

  const profissionais = [
    "Dr. João Silva - CRM 12345 - Clínico Geral",
    "Dra. Maria Santos - CRM 67890 - Pediatra",
    "Enf. Ana Costa - COREN 11111 - Enfermeira"
  ];

  const equipes = [
    "Equipe 1 - ESF Centro",
    "Equipe 2 - ESF Vila Nova", 
    "Equipe 3 - ESF Jardim"
  ];

  const handleProcedimentoAdd = (procedimento: string) => {
    if (!procedimentos.includes(procedimento)) {
      setProcedimentos([...procedimentos, procedimento]);
    }
    setProcedimentoBusca("");
  };

  const handleProcedimentoRemove = (procedimento: string) => {
    setProcedimentos(procedimentos.filter(p => p !== procedimento));
  };

  const handleCondutaChange = (conduta: string, checked: boolean) => {
    if (checked) {
      setCondutas([...condutas, conduta]);
    } else {
      setCondutas(condutas.filter(c => c !== conduta));
    }
  };

  const handleTipoServicoChange = (tipo: string, checked: boolean) => {
    if (checked) {
      setTiposServico([...tiposServico, tipo]);
    } else {
      setTiposServico(tiposServico.filter(t => t !== tipo));
    }
  };

  const handleSubmit = () => {
    const dados = {
      tipoAtendimento,
      cidadaoParticipou,
      formaParticipacao: cidadaoParticipou ? formaParticipacao : null,
      atendimentoCompartilhado,
      formaParticipacaoCompartilhado,
      procedimentos,
      agravosNotificaveis,
      racionalidade,
      condutas,
      desfecho,
      profissionalManutencao: desfecho === "manter" ? profissionalManutencao : null,
      equipeManutencao: desfecho === "manter" ? equipeManutencao : null,
      tiposServico: desfecho === "manter" ? tiposServico : [],
      agendamento: agendarConsulta ? {
        profissional: profissionalAgendamento,
        data: dataAgendamento,
        horario: horarioAgendamento,
        observacoes: observacoesAgendamento
      } : null
    };

    onSave(dados);
  };

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto p-1">
      {/* Tipo de Atendimento */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tipo de Atendimento</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={tipoAtendimento} onValueChange={setTipoAtendimento}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="consulta-dia" id="consulta-dia" />
              <Label htmlFor="consulta-dia">Consulta no dia</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urgencia" id="urgencia" />
              <Label htmlFor="urgencia">Urgência</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Participação do Cidadão */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Participação do Cidadão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="cidadao-participou" 
              checked={cidadaoParticipou}
              onCheckedChange={(checked) => setCidadaoParticipou(checked === true)}
            />
            <Label htmlFor="cidadao-participou">Cidadão participou do atendimento</Label>
          </div>
          
          {cidadaoParticipou && (
            <div className="space-y-2">
              <Label>Forma de participação *</Label>
              <Select value={formaParticipacao} onValueChange={setFormaParticipacao}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma de participação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="video">Chamada de vídeo</SelectItem>
                  <SelectItem value="voz">Chamada de voz</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="mensagem">Mensagem</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Atendimento Compartilhado */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Atendimento Compartilhado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Participação de outro profissional</Label>
            <Select value={atendimentoCompartilhado} onValueChange={setAtendimentoCompartilhado}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de participação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Nenhum</SelectItem>
                <SelectItem value="estudante">Estudante</SelectItem>
                <SelectItem value="outro-profissional">Outro profissional da unidade</SelectItem>
                <SelectItem value="outro-externo">Outro (externo)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {atendimentoCompartilhado && (
            <div className="space-y-2">
              <Label>Forma de participação *</Label>
              <Select value={formaParticipacaoCompartilhado} onValueChange={setFormaParticipacaoCompartilhado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma de participação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="video">Chamada de vídeo</SelectItem>
                  <SelectItem value="voz">Chamada de voz</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="mensagem">Mensagem</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Procedimentos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Procedimentos (SIGTAP)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Buscar procedimento *</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Digite para buscar procedimentos..."
                value={procedimentoBusca}
                onChange={(e) => setProcedimentoBusca(e.target.value)}
                className="pl-10"
              />
            </div>
            {procedimentoBusca && (
              <div className="border rounded-md max-h-40 overflow-y-auto">
                {procedimentosSugeridos
                  .filter(p => p.toLowerCase().includes(procedimentoBusca.toLowerCase()))
                  .map((procedimento) => (
                    <div
                      key={procedimento}
                      className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                      onClick={() => handleProcedimentoAdd(procedimento)}
                    >
                      {procedimento}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {procedimentos.length > 0 && (
            <div className="space-y-2">
              <Label>Procedimentos selecionados</Label>
              <div className="space-y-2">
                {procedimentos.map((procedimento) => (
                  <Badge key={procedimento} variant="secondary" className="flex items-center justify-between p-2">
                    <span className="text-sm">{procedimento}</span>
                    <X 
                      className="h-4 w-4 cursor-pointer hover:text-red-500" 
                      onClick={() => handleProcedimentoRemove(procedimento)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Agravos Notificáveis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Agravos Notificáveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Agravo (se aplicável)</Label>
            <Select value={agravosNotificaveis} onValueChange={setAgravosNotificaveis}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um agravo notificável" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Nenhum</SelectItem>
                {agravos.map((agravo) => (
                  <SelectItem key={agravo} value={agravo}>{agravo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {agravosNotificaveis && (
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Imprimir Ficha de Notificação
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Racionalidade em Saúde */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Racionalidade em Saúde</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Racionalidade (exceto alopatia/convencional)</Label>
            <Select value={racionalidade} onValueChange={setRacionalidade}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a racionalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Nenhuma</SelectItem>
                {racionalidades.map((item) => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Conduta */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conduta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label>Selecione as condutas adotadas *</Label>
            {condutasOpcoes.map((conduta) => (
              <div key={conduta} className="flex items-center space-x-2">
                <Checkbox
                  id={conduta}
                  checked={condutas.includes(conduta)}
                  onCheckedChange={(checked) => handleCondutaChange(conduta, checked === true)}
                />
                <Label htmlFor={conduta}>{conduta}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Desfecho */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Desfecho do Atendimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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

          {desfecho === "manter" && (
            <div className="space-y-4 mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Profissional</Label>
                  <Select value={profissionalManutencao} onValueChange={setProfissionalManutencao}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      {profissionais.map((prof) => (
                        <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Equipe</Label>
                  <Select 
                    value={equipeManutencao} 
                    onValueChange={(value) => {
                      setEquipeManutencao(value);
                      if (value) setProfissionalManutencao("");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a equipe" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipes.map((equipe) => (
                        <SelectItem key={equipe} value={equipe}>{equipe}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tipo de serviço</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {tiposServicoOpcoes.map((tipo) => (
                    <div key={tipo} className="flex items-center space-x-2">
                      <Checkbox
                        id={tipo}
                        checked={tiposServico.includes(tipo)}
                        onCheckedChange={(checked) => handleTipoServicoChange(tipo, checked === true)}
                      />
                      <Label htmlFor={tipo} className="text-sm">{tipo}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Agendamento */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Agendamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agendar-consulta"
              checked={agendarConsulta}
              onCheckedChange={(checked) => setAgendarConsulta(checked === true)}
            />
            <Label htmlFor="agendar-consulta">Agendar consulta</Label>
          </div>

          {agendarConsulta && (
            <div className="space-y-4 mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Profissional *</Label>
                  <Select value={profissionalAgendamento} onValueChange={setProfissionalAgendamento}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      {profissionais.map((prof) => (
                        <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Data *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dataAgendamento && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dataAgendamento ? format(dataAgendamento, "dd/MM/yyyy") : "Selecione a data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dataAgendamento}
                        onSelect={setDataAgendamento}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Horário *</Label>
                  <Select value={horarioAgendamento} onValueChange={setHorarioAgendamento}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">08:00</SelectItem>
                      <SelectItem value="08:30">08:30</SelectItem>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="09:30">09:30</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="14:30">14:30</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Observações</Label>
                  <Textarea
                    placeholder="Observações adicionais (máx. 200 caracteres)"
                    value={observacoesAgendamento}
                    onChange={(e) => setObservacoesAgendamento(e.target.value)}
                    maxLength={200}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Finalizar Atendimento
        </Button>
      </div>
    </div>
  );
};
