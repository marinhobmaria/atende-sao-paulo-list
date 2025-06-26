
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Search, X } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedCiaps, setSelectedCiaps] = useState<string[]>([]);
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
      item.display.toLowerCase().includes(searchLower) ||
      item.code.toLowerCase().startsWith(searchLower)
    );
  });

  const handleCiapSelect = (code: string, display: string) => {
    const ciapString = `${code} - ${display}`;
    if (!selectedCiaps.includes(ciapString)) {
      setSelectedCiaps(prev => [...prev, ciapString]);
    }
    setShowResults(false);
    setSearchTerm("");
  };

  const handleRemoveCiap = (ciapToRemove: string) => {
    setSelectedCiaps(prev => prev.filter(ciap => ciap !== ciapToRemove));
  };

  const isCiapAlreadySelected = (code: string, display: string) => {
    const ciapString = `${code} - ${display}`;
    return selectedCiaps.includes(ciapString);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
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
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    Campo opcional - pode ser deixado em branco
                  </p>
                  <p className={cn(
                    "text-xs transition-colors",
                    subjetivo.length > 3800 ? "text-red-500 font-medium" : "text-gray-500"
                  )}>
                    {subjetivo.length}/4000 caracteres
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campo CIAP-2 */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Motivo da consulta (CIAP2)
              </CardTitle>
              <p className="text-sm text-gray-600">
                Classifique o motivo principal da consulta usando a codificação CIAP-2
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite pelo menos 2 caracteres (ex: A03 ou Febre)"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowResults(e.target.value.length > 1);
                    }}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setShowResults(!showResults)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {showResults && searchTerm.length > 1 && (
                  <div className="border rounded-md max-h-48 overflow-y-auto bg-white shadow-lg z-50">
                    {filteredCIAP2.length > 0 ? (
                      filteredCIAP2.map((item) => {
                        const isSelected = isCiapAlreadySelected(item.code, item.display);
                        return (
                          <div
                            key={item.code}
                            className={`p-3 border-b last:border-b-0 ${
                              isSelected 
                                ? "bg-gray-100 cursor-not-allowed" 
                                : "hover:bg-blue-50 cursor-pointer"
                            }`}
                            onClick={() => !isSelected && handleCiapSelect(item.code, item.display)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                                  {item.code}
                                </div>
                                <div className="text-gray-900">{item.display}</div>
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
                        {searchTerm.length < 2 
                          ? "Digite pelo menos 2 caracteres para buscar"
                          : "Nenhum resultado encontrado."
                        }
                      </div>
                    )}
                  </div>
                )}

                {selectedCiaps.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">CIAP2 selecionados:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCiaps.map((ciap, index) => (
                        <div key={index} className="flex items-center gap-1 bg-blue-50 text-blue-800 px-2 py-1 rounded border">
                          <span className="text-sm">{ciap}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-blue-100"
                            onClick={() => handleRemoveCiap(ciap)}
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
