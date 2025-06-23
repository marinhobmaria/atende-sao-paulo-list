
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface DesfechoSectionProps {
  form: any;
}

export const DesfechoSection = ({ form }: DesfechoSectionProps) => {
  const [selectedDesfecho, setSelectedDesfecho] = useState("");

  const desfechos = [
    {
      value: "liberar",
      label: "Liberar cidadão",
      description: "O cidadão será retirado da lista de atendimentos, sem necessidade de outros atendimentos."
    },
    {
      value: "adicionar_lista",
      label: "Adicionar cidadão na lista de atendimentos",
      description: "Encaminhar o cidadão para outro atendimento no mesmo dia."
    },
    {
      value: "agendar",
      label: "Agendar consulta",
      description: "Redirecionar o cidadão para agendamento futuro."
    }
  ];

  const tiposServicoAgendamento = [
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

  const tiposServicoLista = [
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
    "Dr. João Silva",
    "Dra. Maria Santos",
    "Enf. Ana Costa",
    "Dr. Pedro Oliveira"
  ];

  const equipes = [
    "Equipe A",
    "Equipe B",
    "Equipe C"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Desfecho da Escuta Inicial
          <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="desfecho"
          rules={{ required: "Selecione o desfecho da escuta inicial" }}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedDesfecho(value);
                  }}
                  value={field.value}
                  className="space-y-4"
                >
                  {desfechos.map((desfecho) => (
                    <div
                      key={desfecho.value}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={desfecho.value} />
                        </FormControl>
                        <div>
                          <FormLabel className="font-medium cursor-pointer">
                            {desfecho.label}
                          </FormLabel>
                          <p className="text-sm text-muted-foreground mt-1">
                            {desfecho.description}
                          </p>
                        </div>
                      </FormItem>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campos condicionais baseados no desfecho */}
        {selectedDesfecho === "adicionar_lista" && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
            <h4 className="font-medium">Dados para adicionar na lista de atendimentos:</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="profissionalDesfecho"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profissional</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o profissional" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {profissionais.map((prof) => (
                          <SelectItem key={prof} value={prof}>
                            {prof}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="equipeDesfecho"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipe</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a equipe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {equipes.map((equipe) => (
                          <SelectItem key={equipe} value={equipe}>
                            {equipe}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tipoServicoDesfecho"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Serviço *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tiposServicoLista.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {selectedDesfecho === "agendar" && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
            <h4 className="font-medium">Dados para agendamento:</h4>
            
            <FormField
              control={form.control}
              name="tipoServicoAgendamento"
              rules={{ required: selectedDesfecho === "agendar" ? "Campo obrigatório" : false }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Serviço *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tiposServicoAgendamento.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profissionalDesfecho"
              rules={{ required: selectedDesfecho === "agendar" ? "Campo obrigatório" : false }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profissional *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o profissional" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {profissionais.map((prof) => (
                        <SelectItem key={prof} value={prof}>
                          {prof}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dataAgendamento"
                rules={{ required: selectedDesfecho === "agendar" ? "Campo obrigatório" : false }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data do Agendamento *</FormLabel>
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
                name="horarioAgendamento"
                rules={{ required: selectedDesfecho === "agendar" ? "Campo obrigatório" : false }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário do Agendamento *</FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name="observacoesAgendamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observações sobre o agendamento..."
                      maxLength={200}
                      {...field}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground text-right">
                    {field.value?.length || 0}/200 caracteres
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
