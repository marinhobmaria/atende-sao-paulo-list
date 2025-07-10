
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [selectedCiaps, setSelectedCiaps] = useState<Array<{code: string, description: string}>>([]);

  const filteredCiap2 = mockCiap2.filter(item => 
    (item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    !selectedCiaps.some(selected => selected.code === item.code)
  );

  const handleCiap2Select = (code: string, description: string) => {
    const newCiap = { code, description };
    const updatedCiaps = [...selectedCiaps, newCiap];
    setSelectedCiaps(updatedCiaps);
    form.setValue("ciap2", updatedCiaps.map(c => `${c.code} - ${c.description}`).join("; "));
    setShowResults(false);
    setSearchTerm("");
  };

  const removeCiap = (codeToRemove: string) => {
    const updatedCiaps = selectedCiaps.filter(c => c.code !== codeToRemove);
    setSelectedCiaps(updatedCiaps);
    form.setValue("ciap2", updatedCiaps.map(c => `${c.code} - ${c.description}`).join("; "));
  };

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-4 bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          Motivo da consulta
          <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <FormField
          control={form.control}
          name="ciap2"
          rules={{ required: "Campo obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">Motivo da consulta (CIAP2) *</FormLabel>
              <div className="space-y-3">
                <Popover open={showResults} onOpenChange={setShowResults}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between h-11 px-4",
                        !searchTerm && "text-muted-foreground"
                      )}
                      onClick={() => setShowResults(!showResults)}
                    >
                      <div className="flex items-center gap-3">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span>{searchTerm || "Buscar por código ou descrição..."}</span>
                      </div>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Pesquise código ou descrição (ex: A03 ou Febre)" 
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>
                          Nenhum código encontrado
                        </CommandEmpty>
                        <CommandGroup>
                          {filteredCiap2.map((item) => (
                            <CommandItem
                              key={item.code}
                              value={item.code}
                              onSelect={() => handleCiap2Select(item.code, item.description)}
                              className="flex items-center gap-3 p-4 hover:bg-muted cursor-pointer"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <Badge variant="outline" className="font-mono text-xs px-2 py-1">
                                  {item.code}
                                </Badge>
                                <div className="text-foreground">{item.description}</div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                
                {/* Selected CIAPs */}
                {selectedCiaps.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Selecionados:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCiaps.map((ciap) => (
                        <div
                          key={ciap.code}
                          className="flex items-center gap-2 bg-muted border rounded-lg px-3 py-2"
                        >
                          <Badge variant="outline" className="font-mono text-xs">
                            {ciap.code}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{ciap.description}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCiap(ciap.code)}
                            className="h-5 w-5 p-0 hover:bg-muted/80 rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show "Adicionado" for already selected items in search */}
                {mockCiap2.filter(item => 
                  selectedCiaps.some(selected => selected.code === item.code) &&
                  (item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   item.description.toLowerCase().includes(searchTerm.toLowerCase()))
                ).length > 0 && showResults && (
                  <div className="text-xs text-muted-foreground p-2 bg-muted rounded border">
                    Alguns itens já foram adicionados e não aparecem na busca
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
