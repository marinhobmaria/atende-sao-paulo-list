import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchableSelect } from "./components/SearchableSelect";

interface MotivoConsultaSectionProps {
  form: any;
}

// Mock data para CIAP-2 (em produção viria de uma API)
const mockCiap2 = [
  { code: "A03", description: "Febre" },
  { code: "A04", description: "Fadiga/mal-estar" },
  { code: "A07", description: "Perda de consciência/síncope" },
  { code: "D01", description: "Dor abdominal geral/cólica" },
  { code: "D02", description: "Dor epigástrica" },
  { code: "K01", description: "Dor cardíaca" },
  { code: "K02", description: "Pressão/aperto precordial" },
  { code: "K86", description: "Hipertensão não complicada" },
  { code: "K87", description: "Hipertensão complicada" },
  { code: "R05", description: "Tosse" },
  { code: "R21", description: "Sinais/sintomas garganta" },
];

export const MotivoConsultaSection = ({ form }: MotivoConsultaSectionProps) => {
  return (
    <Card className="shadow-sm border">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          Motivo da consulta
          <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <SearchableSelect
          form={form}
          name="ciap2"
          label="Motivo da consulta (CIAP2)"
          placeholder="Pesquise ou selecione por código, nome ou código reduzido"
          emptyMessage="Nenhum código encontrado"
          options={mockCiap2}
          required={true}
          multiple={true}
          className="w-full"
        />

        <FormField
          control={form.control}
          name="descricaoLivre"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Informe as informações subjetivas do profissional e as expressadas pelo cidadão"
                  className="min-h-[80px] resize-none"
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