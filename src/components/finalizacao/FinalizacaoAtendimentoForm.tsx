
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Clock, User, FileText, X, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FinalizacaoAtendimentoFormProps {
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const tiposServico = [
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

const agravosNotificaveis = [
  "Botulismo",
  "Cólera", 
  "Coqueluche",
  "Dengue",
  "Difteria",
  "Doença Meningocócica",
  "Febre Amarela",
  "Febre Tifoide",
  "Hepatite Viral",
  "Leishmaniose",
  "Malária",
  "Meningite",
  "Raiva",
  "Rubéola",
  "Sarampo",
  "Tuberculose",
  "Varicela",
  "COVID-19",
  "Zika"
];

const racionalidadesSaude = [
  { value: "01", label: "Medicina tradicional chinesa" },
  { value: "02", label: "Antroposofia aplicada à saúde" },
  { value: "03", label: "Homeopatia" },
  { value: "04", label: "Fitoterapia" },
  { value: "05", label: "Ayurveda" },
  { value: "06", label: "Outra" }
];

export const FinalizacaoAtendimentoForm = ({ onSave, onCancel, isLoading }: FinalizacaoAtendimentoFormProps) => {
  const [procedimentosSelecionados, setProcedimentosSelecionados] = useState<string[]>([]);
  const [buscaProcedimento, setBuscaProcedimento] = useState("");
  const [mostrarAgendamento, setMostrarAgendamento] = useState(false);

  const form = useForm({
    defaultValues: {
      tipoAtendimento: "",
      cidadaoParticipou: true,
      formaParticipacao: "",
      atendimentoCompartilhado: "",
      formaParticipacaoCompartilhada: "",
      procedimentos: [],
      agravoNotificavel: "",
      racionalidadeSaude: "",
      conduta: [],
      desfecho: "liberar",
      manterNaLista: {
        profissional: "",
        equipe: "",
        tiposServico: []
      },
      agendamento: {
        profissional: "",
        data: "",
        horario: "",
        observacoes: ""
      }
    }
  });

  const cidadaoParticipou = form.watch("cidadaoParticipou");
  const desfecho = form.watch("desfecho");

  const handleAddProcedimento = (procedimento: string) => {
    if (!procedimentosSelecionados.includes(procedimento)) {
      setProcedimentosSelecionados([...procedimentosSelecionados, procedimento]);
    }
    setBuscaProcedimento("");
  };

  const handleRemoveProcedimento = (procedimento: string) => {
    setProcedimentosSelecionados(procedimentosSelecionados.filter(p => p !== procedimento));
  };

  const handleSubmit = (data: any) => {
    const dadosCompletos = {
      ...data,
      procedimentos: procedimentosSelecionados,
      timestamp: new Date().toISOString()
    };

    onSave(dadosCompletos);
    toast({
      title: "Atendimento finalizado",
      description: "O atendimento foi finalizado com sucesso.",
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Finalização do Atendimento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            
            {/* Tipo de Atendimento */}
            <FormField
              control={form.control}
              name="tipoAtendimento"
              rules={{ required: "Tipo de atendimento é obrigatório" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de atendimento *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="consulta-dia" id="consulta-dia" />
                        <label htmlFor="consulta-dia">Consulta no dia</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgencia" id="urgencia" />
                        <label htmlFor="urgencia">Urgência</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Participação do Cidadão */}
            <FormField
              control={form.control}
              name="cidadaoParticipou"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Cidadão participou do atendimento</FormLabel>
                </FormItem>
              )}
            />

            {/* Forma de Participação */}
            {cidadaoParticipou && (
              <FormField
                control={form.control}
                name="formaParticipacao"
                rules={{ required: cidadaoParticipou ? "Forma de participação é obrigatória" : false }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forma de participação *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a forma de participação" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="presencial">Presencial</SelectItem>
                        <SelectItem value="chamada-video">Chamada de vídeo</SelectItem>
                        <SelectItem value="chamada-voz">Chamada de voz</SelectItem>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="mensagem">Mensagem</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Separator />

            {/* Atendimento Compartilhado */}
            <FormField
              control={form.control}
              name="atendimentoCompartilhado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atendimento compartilhado</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione se houve compartilhamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="estudante">Estudante</SelectItem>
                      <SelectItem value="outro-profissional">Outro profissional da unidade</SelectItem>
                      <SelectItem value="outro-externo">Outro (externo)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Forma de Participação Compartilhada */}
            {form.watch("atendimentoCompartilhado") && (
              <FormField
                control={form.control}
                name="formaParticipacaoCompartilhada"
                rules={{ required: "Forma de participação compartilhada é obrigatória" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forma de participação compartilhada *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a forma de participação" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="presencial">Presencial</SelectItem>
                        <SelectItem value="chamada-video">Chamada de vídeo</SelectItem>
                        <SelectItem value="chamada-voz">Chamada de voz</SelectItem>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="mensagem">Mensagem</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Separator />

            {/* Procedimentos SIGTAP */}
            <div className="space-y-4">
              <FormLabel>Procedimentos (SIGTAP) *</FormLabel>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar procedimento por nome ou código..."
                    value={buscaProcedimento}
                    onChange={(e) => setBuscaProcedimento(e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (buscaProcedimento.trim()) {
                      handleAddProcedimento(buscaProcedimento.trim());
                    }
                  }}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              {procedimentosSelecionados.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {procedimentosSelecionados.map((proc, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {proc}
                      <button
                        type="button"
                        onClick={() => handleRemoveProcedimento(proc)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Agravos Notificáveis */}
            <FormField
              control={form.control}
              name="agravoNotificavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agravos notificáveis</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um agravo (se aplicável)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {agravosNotificaveis.map((agravo) => (
                        <SelectItem key={agravo} value={agravo}>
                          {agravo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Separator />

            {/* Racionalidade em Saúde */}
            <FormField
              control={form.control}
              name="racionalidadeSaude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Racionalidade em saúde (exceto alopatia)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma racionalidade (se aplicável)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {racionalidadesSaude.map((rac) => (
                        <SelectItem key={rac.value} value={rac.value}>
                          {rac.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Separator />

            {/* Conduta */}
            <div className="space-y-4">
              <FormLabel>Conduta *</FormLabel>
              <div className="space-y-2">
                {[
                  { id: "retorno-agendada", label: "Retorno para consulta agendada" },
                  { id: "retorno-programada", label: "Retorno para consulta programada / cuidado continuado" },
                  { id: "emulti", label: "Agendamento para eMulti" },
                  { id: "grupos", label: "Agendamento para grupos" },
                  { id: "alta", label: "Alta do episódio" }
                ].map((opcao) => (
                  <FormField
                    key={opcao.id}
                    control={form.control}
                    name="conduta"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(opcao.id)}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value || [];
                              if (checked) {
                                field.onChange([...currentValues, opcao.id]);
                              } else {
                                field.onChange(currentValues.filter((value: string) => value !== opcao.id));
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {opcao.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Desfecho */}
            <FormField
              control={form.control}
              name="desfecho"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desfecho do atendimento *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="liberar" id="liberar" />
                        <label htmlFor="liberar">Liberar cidadão</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manter" id="manter" />
                        <label htmlFor="manter">Manter cidadão na lista de atendimentos</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Campos para Manter na Lista */}
            {desfecho === "manter" && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium">Detalhes para manter na lista</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="manterNaLista.profissional"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profissional</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um profissional" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dr-silva">Dr. João Silva</SelectItem>
                            <SelectItem value="enf-santos">Enf. Maria Santos</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="manterNaLista.equipe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equipe</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma equipe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="equipe-1">Equipe 1</SelectItem>
                            <SelectItem value="equipe-2">Equipe 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>Tipos de serviço</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {tiposServico.map((tipo) => (
                      <FormField
                        key={tipo}
                        control={form.control}
                        name="manterNaLista.tiposServico"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tipo)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, tipo]);
                                  } else {
                                    field.onChange(currentValues.filter((value: string) => value !== tipo));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {tipo}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {/* Agendamento */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={mostrarAgendamento}
                  onCheckedChange={setMostrarAgendamento}
                />
                <FormLabel>Agendar consulta</FormLabel>
              </div>

              {mostrarAgendamento && (
                <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-medium flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Dados do agendamento
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="agendamento.profissional"
                      rules={{ required: mostrarAgendamento ? "Profissional é obrigatório" : false }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profissional *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um profissional" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dr-silva">Dr. João Silva - CRM 12345</SelectItem>
                              <SelectItem value="enf-santos">Enf. Maria Santos - COREN 67890</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agendamento.data"
                      rules={{ required: mostrarAgendamento ? "Data é obrigatória" : false }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data *</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agendamento.horario"
                      rules={{ required: mostrarAgendamento ? "Horário é obrigatório" : false }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horário *</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agendamento.observacoes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Observações</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Observações adicionais (máximo 200 caracteres)"
                              maxLength={200}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Finalizando..." : "Finalizar Atendimento"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
