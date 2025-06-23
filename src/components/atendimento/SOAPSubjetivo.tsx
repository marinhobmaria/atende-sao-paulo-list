
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data para CIAP-2
const mockCIAP2 = [
  { code: "A03", display: "Febre" },
  { code: "A04", display: "Fraqueza/cansaço geral" },
  { code: "A05", display: "Sentimento/comportamento relativo à doença" },
  { code: "A06", display: "Desmaio/síncope" },
  { code: "A07", display: "Coma" },
  { code: "A08", display: "Inchaço" },
  { code: "A09", display: "Problema de suor" },
  { code: "A10", display: "Sangramento/hemorragia NE" },
  { code: "D01", display: "Dor abdominal/cólicas" },
  { code: "D02", display: "Dor de estômago" },
  { code: "D03", display: "Azia" },
  { code: "D04", display: "Dor retal/anal" },
  { code: "D05", display: "Perda de apetite" },
];

export const SOAPSubjetivo = () => {
  const [subjetivo, setSubjetivo] = useState("");
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState<{ subjetivo?: string; motivoConsulta?: string }>({});

  const handleSubjetivoChange = (value: string) => {
    setSubjetivo(value);
    
    // Remove erro quando usuário começa a digitar
    if (errors.subjetivo) {
      setErrors(prev => ({ ...prev, subjetivo: undefined }));
    }
  };

  const handleSubjetivoBlur = () => {
    const trimmedValue = subjetivo.trim();
    
    if (trimmedValue === "" && subjetivo !== "") {
      setErrors(prev => ({ ...prev, subjetivo: "Informe as impressões subjetivas do profissional e do cidadão." }));
    } else if (trimmedValue.length > 4000) {
      setErrors(prev => ({ ...prev, subjetivo: "O texto não pode exceder 4 000 caracteres." }));
    }
  };

  const filteredCIAP2 = mockCIAP2.filter(item => {
    if (searchTerm.length < 2) return [];
    
    const searchLower = searchTerm.toLowerCase();
    return (
      item.display.toLowerCase().includes(searchLower) ||
      item.code.toLowerCase().startsWith(searchLower)
    );
  });

  const selectedCIAP2 = mockCIAP2.find(item => item.code === motivoConsulta);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subjetivo - Impressões Subjetivas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subjetivo">
              Subjetivo (Impressões Subjetivas)
            </Label>
            <Textarea
              id="subjetivo"
              placeholder="Descreva as impressões subjetivas do profissional e do cidadão..."
              value={subjetivo}
              onChange={(e) => handleSubjetivoChange(e.target.value)}
              onBlur={handleSubjetivoBlur}
              className={cn("min-h-[120px]", errors.subjetivo && "border-red-500")}
              maxLength={4000}
            />
            {errors.subjetivo && (
              <p className="text-sm text-red-500">{errors.subjetivo}</p>
            )}
            <p className="text-sm text-muted-foreground">
              {subjetivo.length}/4000 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label>Motivo da Consulta (CIAP-2)</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedCIAP2 ? (
                    <span>{selectedCIAP2.code} - {selectedCIAP2.display}</span>
                  ) : (
                    <span className="text-muted-foreground">Selecione um motivo...</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput 
                    placeholder="Digite pelo menos 2 caracteres para buscar..." 
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                  />
                  <CommandList>
                    <CommandEmpty>
                      {searchTerm.length < 2 
                        ? "Digite pelo menos 2 caracteres para buscar"
                        : "Nenhum resultado encontrado."
                      }
                    </CommandEmpty>
                    <CommandGroup>
                      {filteredCIAP2.map((item) => (
                        <CommandItem
                          key={item.code}
                          value={item.code}
                          onSelect={(currentValue) => {
                            setMotivoConsulta(currentValue === motivoConsulta ? "" : currentValue);
                            setOpen(false);
                            setSearchTerm("");
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              motivoConsulta === item.code ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div>
                            <div className="font-medium">{item.code}</div>
                            <div className="text-sm text-muted-foreground">{item.display}</div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
