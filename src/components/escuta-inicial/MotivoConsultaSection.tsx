
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MotivoConsultaSectionProps {
  form: any;
}

export const MotivoConsultaSection = ({ form }: MotivoConsultaSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Motivo da Consulta
          <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="ciap2"
          rules={{ required: "Campo obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código CIAP2 *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite para buscar código CIAP2..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricaoLivre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição complementar (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva detalhes complementares sobre o motivo da consulta..."
                  className="min-h-[100px]"
                  maxLength={4000}
                  {...field}
                />
              </FormControl>
              <div className="text-xs text-muted-foreground text-right">
                {field.value?.length || 0}/4000 caracteres
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
