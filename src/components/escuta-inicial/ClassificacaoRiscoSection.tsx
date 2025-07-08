
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ClassificacaoRiscoSectionProps {
  form: any;
}

export const ClassificacaoRiscoSection = ({ form }: ClassificacaoRiscoSectionProps) => {
  const classificacoes = [
    {
      value: "vermelho",
      label: "Vermelho - Alto",
      description: "Emergência — risco iminente de morte ou sofrimento intenso. Atendimento imediato.",
      color: "bg-red-500"
    },
    {
      value: "amarelo",
      label: "Amarelo - Intermediário",
      description: "Urgência — condição instável ou agravamento iminente. Atendimento prioritário.",
      color: "bg-yellow-500"
    },
    {
      value: "verde",
      label: "Verde - Baixo",
      description: "Pouco urgente — condição estável, sem risco iminente. Pode aguar dar.",
      color: "bg-green-500"
    },
    {
      value: "azul",
      label: "Azul - Não Agudo",
      description: "Não urgente — queixas simples, sem sinais de gravidade. Pode ser redirecionado.",
      color: "bg-blue-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Classificação de Risco/Vulnerabilidade
          <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <FormField
          control={form.control}
          name="classificacaoRisco"
          rules={{ required: "Classificação de risco é obrigatória" }}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-4"
                >
                  {classificacoes.map((classificacao) => (
                    <div
                      key={classificacao.value}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={classificacao.value} />
                        </FormControl>
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded ${classificacao.color}`} />
                          <div>
                            <FormLabel className="font-medium cursor-pointer">
                              {classificacao.label}
                            </FormLabel>
                            <p className="text-sm text-muted-foreground mt-1">
                              {classificacao.description}
                            </p>
                          </div>
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
      </CardContent>
    </Card>
  );
};
