
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown, MessageSquare, Search, X } from "lucide-react";
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
  const [selectedCiaps, setSelectedCiaps] = useState<Array<{code: string, display: string}>>([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState<{ subjetivo?: string }>({});

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
      (item.display.toLowerCase().includes(searchLower) ||
      item.code.toLowerCase().startsWith(searchLower)) &&
      !selectedCiaps.some(selected => selected.code === item.code)
    );
  });

  const handleCiap2Select = (code: string, display: string) => {
    const newCiap = { code, display };
    setSelectedCiaps(prev => [...prev, newCiap]);
    setOpen(false);
    setSearchTerm("");
  };

  const removeCiap = (codeToRemove: string) => {
    setSelectedCiaps(prev => prev.filter(c => c.code !== codeToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-900">Subjetivo</h2>
            <p className="text-sm text-blue-600">Registre as impressões subjetivas e motivo da consulta</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Campo Subjetivo */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Impressões Subjetivas
              </CardTitle>
              <p className="text-sm text-gray-600">
                Descreva as queixas do paciente, histórico da doença atual e informações relatadas
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Textarea
                  id="subjetivo"
                  placeholder="Informe as informações subjetivas do profissional e as expressadas pelo cidadão"
                  value={subjetivo}
                  onChange={(e) => handleSubjetivoChange(e.target.value)}
                  onBlur={handleSubjetivoBlur}
                  className={cn(
                    "min-h-[120px] resize-none transition-all",
                    errors.subjetivo && "border-red-500 focus:border-red-500"
                  )}
                  maxLength={4000}
                />
                {errors.subjetivo && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {errors.subjetivo}
                  </div>
                )}
                <p className={cn(
                  "text-xs transition-colors text-right",
                  subjetivo.length > 3800 ? "text-red-500 font-medium" : "text-gray-500"
                )}>
                  {subjetivo.length}/4000 caracteres
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Campo CIAP-2 */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Motivo da Consulta (CIAP-2)
              </CardTitle>
              <p className="text-sm text-gray-600">
                Classifique o motivo principal da consulta usando a codificação CIAP-2
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-full justify-between h-12 px-4 bg-white hover:bg-gray-50 transition-colors",
                        !searchTerm && "text-gray-500"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Search className="h-4 w-4 text-gray-400" />
                        <span>{searchTerm || "Buscar por código ou descrição..."}</span>
                      </div>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Digite pelo menos 2 caracteres (ex: A03 ou Febre)" 
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                        className="h-12"
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
                              onSelect={() => handleCiap2Select(item.code, item.display)}
                              className="flex items-center gap-3 p-4 hover:bg-blue-50"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                                  {item.code}
                                </div>
                                <div className="text-gray-900">{item.display}</div>
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
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700">Selecionados:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCiaps.map((ciap) => (
                        <div
                          key={ciap.code}
                          className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
                        >
                          <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                            {ciap.code}
                          </div>
                          <span className="text-sm text-blue-900">{ciap.display}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCiap(ciap.code)}
                            className="h-5 w-5 p-0 hover:bg-blue-200 rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500">
                  Campo opcional - busque por código (ex: A03) ou descrição (ex: Febre)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
