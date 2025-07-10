
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { SearchableSelect } from "./components/SearchableSelect";
import { sigtapProcedures } from "@/data/sigtap";

interface ProcedimentosSectionProps {
  form: any;
  procedimentosAutomaticos: string[];
}

export const ProcedimentosSection = ({ form, procedimentosAutomaticos }: ProcedimentosSectionProps) => {
  const [procedimentosSigtap, setProcedimentosSigtap] = useState<string[]>([]);

  const removerProcedimento = (procedimentoToRemove: string) => {
    const novosProcedimentos = procedimentosSigtap.filter(p => p !== procedimentoToRemove);
    setProcedimentosSigtap(novosProcedimentos);
    form.setValue("procedimentosSigtap", novosProcedimentos);
  };

  return (
    <Card className="shadow-sm border">
      <CardHeader className="bg-muted/30">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          Procedimentos realizados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {/* Procedimentos Automáticos */}
        {procedimentosAutomaticos.length > 0 && (
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Procedimentos gerados automaticamente:</h4>
            <div className="flex flex-wrap gap-1">
              {procedimentosAutomaticos.map((procedimento, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {procedimento}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Busca SIGTAP */}
        <div>
          <h4 className="font-medium text-sm text-foreground mb-2">Procedimento SIGTAP:</h4>
          <SearchableSelect
            form={form}
            name="procedimentosSigtapSearch"
            label=""
            placeholder="Pesquise ou selecione por código, nome ou código reduzido"
            emptyMessage="Nenhum procedimento encontrado"
            options={sigtapProcedures}
            multiple={true}
            className="w-full"
          />
        </div>

        {/* Procedimentos SIGTAP Selecionados */}
        {procedimentosSigtap.length > 0 && (
          <div>
            <h4 className="font-medium text-sm text-foreground mb-2">Procedimentos SIGTAP selecionados:</h4>
            <div className="space-y-1">
              {procedimentosSigtap.map((procedimento, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-success/10 border border-success/20 rounded px-3 py-2"
                >
                  <span className="text-sm text-success-foreground">{procedimento}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-success/20 rounded-full"
                    onClick={() => removerProcedimento(procedimento)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
