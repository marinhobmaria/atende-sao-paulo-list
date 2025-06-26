
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedCiaps, setSelectedCiaps] = useState<string[]>([]);

  const filteredCiap2 = mockCiap2.filter(item => 
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCiap2Select = (code: string, description: string) => {
    const ciapString = `${code} - ${description}`;
    if (!selectedCiaps.includes(ciapString)) {
      const newCiaps = [...selectedCiaps, ciapString];
      setSelectedCiaps(newCiaps);
      form.setValue("ciap2", newCiaps);
    }
    setShowResults(false);
    setSearchTerm("");
  };

  const handleRemoveCiap = (ciapToRemove: string) => {
    const newCiaps = selectedCiaps.filter(ciap => ciap !== ciapToRemove);
    setSelectedCiaps(newCiaps);
    form.setValue("ciap2", newCiaps);
  };

  const isCiapAlreadySelected = (code: string, description: string) => {
    const ciapString = `${code} - ${description}`;
    return selectedCiaps.includes(ciapString);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Motivo da Consulta (CIAP2)
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
              <FormLabel>Motivo da consulta (CIAP2) *</FormLabel>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="Digite para buscar código CIAP2..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowResults(e.target.value.length > 0);
                      }}
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowResults(!showResults)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                {showResults && searchTerm && (
                  <div className="border rounded-md max-h-48 overflow-y-auto bg-white shadow-lg z-50">
                    {filteredCiap2.length > 0 ? (
                      filteredCiap2.map((item) => {
                        const isSelected = isCiapAlreadySelected(item.code, item.description);
                        return (
                          <div
                            key={item.code}
                            className={`p-3 border-b last:border-b-0 ${
                              isSelected 
                                ? "bg-gray-100 cursor-not-allowed" 
                                : "hover:bg-gray-50 cursor-pointer"
                            }`}
                            onClick={() => !isSelected && handleCiap2Select(item.code, item.description)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-sm">{item.code}</div>
                                <div className="text-sm text-gray-600">{item.description}</div>
                              </div>
                              {isSelected && (
                                <Badge variant="secondary" className="text-xs">
                                  Adicionado
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-3 text-sm text-gray-500">
                        Nenhum código encontrado
                      </div>
                    )}
                  </div>
                )}

                {selectedCiaps.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">CIAP2 selecionados:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCiaps.map((ciap, index) => (
                        <div key={index} className="flex items-center gap-1 bg-teal-50 text-teal-800 px-2 py-1 rounded border">
                          <span className="text-sm">{ciap}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-teal-100"
                            onClick={() => handleRemoveCiap(ciap)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricaoLivre"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Informe as informações subjetivas do profissional e as expressadas pelo cidadão"
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
