
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
    <Card>
      <CardHeader>
        <CardTitle>Procedimentos Realizados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {/* Procedimentos Automáticos */}
        {procedimentosAutomaticos.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Procedimentos gerados automaticamente:</h4>
            <div className="flex flex-wrap gap-1">
              {procedimentosAutomaticos.map((procedimento, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                  {procedimento}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Busca SIGTAP */}
        <div>
          <h4 className="font-medium text-sm mb-2">Procedimento SIGTAP:</h4>
          <SearchableSelect
            form={form}
            name="procedimentosSigtapSearch"
            label=""
            placeholder="Pesquise por código, nome ou código reduzido"
            emptyMessage="Nenhum procedimento encontrado"
            options={sigtapProcedures}
            multiple={true}
            className="w-full"
          />
        </div>

        {/* Procedimentos SIGTAP Selecionados */}
        {procedimentosSigtap.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Procedimentos SIGTAP selecionados:</h4>
            <div className="space-y-1">
              {procedimentosSigtap.map((procedimento, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-green-50 border border-green-200 rounded px-3 py-2"
                >
                  <span className="text-sm text-green-800">{procedimento}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-green-200 rounded-full"
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
