
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface ProcedimentosSectionProps {
  form: any;
  procedimentosAutomaticos: string[];
}

export const ProcedimentosSection = ({ form, procedimentosAutomaticos }: ProcedimentosSectionProps) => {
  const [novoProcedimento, setNovoProcedimento] = useState("");
  const [procedimentosManuais, setProcedimentosManuais] = useState<string[]>([]);

  const adicionarProcedimento = () => {
    if (novoProcedimento.trim()) {
      const novosProcedimentos = [...procedimentosManuais, novoProcedimento.trim()];
      setProcedimentosManuais(novosProcedimentos);
      form.setValue("procedimentosManuais", novosProcedimentos);
      setNovoProcedimento("");
    }
  };

  const removerProcedimento = (index: number) => {
    const novosProcedimentos = procedimentosManuais.filter((_, i) => i !== index);
    setProcedimentosManuais(novosProcedimentos);
    form.setValue("procedimentosManuais", novosProcedimentos);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Procedimentos Realizados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Procedimentos Automáticos */}
        {procedimentosAutomaticos.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-3">Procedimentos gerados automaticamente:</h4>
            <div className="flex flex-wrap gap-2">
              {procedimentosAutomaticos.map((procedimento, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {procedimento}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Adicionar Procedimentos Manuais */}
        <div>
          <h4 className="font-medium text-sm mb-3">Adicionar outros procedimentos:</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Digite o nome do procedimento..."
              value={novoProcedimento}
              onChange={(e) => setNovoProcedimento(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  adicionarProcedimento();
                }
              }}
            />
            <Button
              type="button"
              onClick={adicionarProcedimento}
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>
        </div>

        {/* Procedimentos Manuais */}
        {procedimentosManuais.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-3">Procedimentos adicionados:</h4>
            <div className="flex flex-wrap gap-2">
              {procedimentosManuais.map((procedimento, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {procedimento}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => removerProcedimento(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
