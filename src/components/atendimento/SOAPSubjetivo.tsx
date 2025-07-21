import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown, MessageSquare, Search, X, AlertTriangle } from "lucide-react";
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
  const [queixaPrincipal, setQueixaPrincipal] = useState("");
  const [historiaDoenca, setHistoriaDoenca] = useState("");
  const [sintomasAssociados, setSintomasAssociados] = useState("");
  const [antecedentesPessoais, setAntecedentesPessoais] = useState("");
  const [antecedentesFamiliares, setAntecedentesFamiliares] = useState("");
  const [alergias, setAlergias] = useState("");
  const [selectedCiaps, setSelectedCiaps] = useState<Array<{code: string, display: string}>>([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState<{ 
    queixaPrincipal?: string;
    historiaDoenca?: string;
  }>({});

  const validateQueixaPrincipal = (value: string) => {
    if (!value.trim()) return "Queixa principal é obrigatória";
    if (value.length < 5) return "Mínimo 5 caracteres";
    if (value.length > 200) return "Máximo 200 caracteres";
    
    const genericTerms = ["consulta", "rotina", "acompanhamento", "revisão"];
    if (genericTerms.some(term => value.toLowerCase().includes(term))) {
      return "Não pode ser genérico (consulta, rotina, etc.)";
    }
    return "";
  };

  const validateHistoriaDoenca = (value: string) => {
    if (!value.trim()) return "História da doença atual é obrigatória";
    if (value.length < 10) return "Mínimo 10 caracteres";
    if (value.length > 1000) return "Máximo 1000 caracteres";
    return "";
  };

  const handleQueixaChange = (value: string) => {
    setQueixaPrincipal(value);
    const error = validateQueixaPrincipal(value);
    setErrors(prev => ({ ...prev, queixaPrincipal: error }));
  };

  const handleHistoriaChange = (value: string) => {
    setHistoriaDoenca(value);
    const error = validateHistoriaDoenca(value);
    setErrors(prev => ({ ...prev, historiaDoenca: error }));
  };

  const filteredCiaps = mockCIAP2.filter(ciap =>
    ciap.display.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ciap.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCiap = (ciap: {code: string, display: string}) => {
    if (!selectedCiaps.find(selected => selected.code === ciap.code)) {
      setSelectedCiaps([...selectedCiaps, ciap]);
    }
    setOpen(false);
    setSearchTerm("");
  };

  const removeCiap = (codeToRemove: string) => {
    setSelectedCiaps(selectedCiaps.filter(ciap => ciap.code !== codeToRemove));
  };

  const hasAlergias = alergias.trim().length > 0;
  const isValid = !errors.queixaPrincipal && !errors.historiaDoenca && 
                  queixaPrincipal.trim() && historiaDoenca.trim();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Subjetivo - Impressões do Munícipe
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Registro das informações relatadas pelo paciente
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Queixa Principal */}
          <div className="space-y-2">
            <Label htmlFor="queixa-principal" className="text-sm font-medium">
              Queixa Principal *
              <span className="text-xs text-muted-foreground ml-2">
                ({queixaPrincipal.length}/200 caracteres)
              </span>
            </Label>
            <Textarea
              id="queixa-principal"
              placeholder="Descreva o motivo principal da consulta conforme relato do paciente..."
              value={queixaPrincipal}
              onChange={(e) => handleQueixaChange(e.target.value)}
              maxLength={200}
              className={cn(
                "min-h-[80px]",
                errors.queixaPrincipal && "border-red-500 focus:ring-red-500"
              )}
            />
            {errors.queixaPrincipal && (
              <p className="text-sm text-red-600">{errors.queixaPrincipal}</p>
            )}
          </div>

          {/* História da Doença Atual */}
          <div className="space-y-2">
            <Label htmlFor="historia-doenca" className="text-sm font-medium">
              História da Doença Atual *
              <span className="text-xs text-muted-foreground ml-2">
                ({historiaDoenca.length}/1000 caracteres)
              </span>
            </Label>
            <Textarea
              id="historia-doenca"
              placeholder="Descrição detalhada da evolução dos sintomas, início, duração, fatores agravantes/aliviantes..."
              value={historiaDoenca}
              onChange={(e) => handleHistoriaChange(e.target.value)}
              maxLength={1000}
              className={cn(
                "min-h-[120px]",
                errors.historiaDoenca && "border-red-500 focus:ring-red-500"
              )}
            />
            {errors.historiaDoenca && (
              <p className="text-sm text-red-600">{errors.historiaDoenca}</p>
            )}
          </div>

          {/* Sintomas Associados */}
          <div className="space-y-2">
            <Label htmlFor="sintomas-associados" className="text-sm font-medium">
              Sintomas Associados
            </Label>
            <Textarea
              id="sintomas-associados"
              placeholder="Outros sintomas relatados pelo paciente (separar por vírgula)..."
              value={sintomasAssociados}
              onChange={(e) => setSintomasAssociados(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* CIAP-2 Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Códigos CIAP-2</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Buscar código CIAP-2...
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput 
                    placeholder="Buscar CIAP-2..." 
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                  />
                  <CommandList>
                    <CommandEmpty>Nenhum código encontrado.</CommandEmpty>
                    <CommandGroup>
                      {filteredCiaps.map((ciap) => (
                        <CommandItem
                          key={ciap.code}
                          onSelect={() => handleSelectCiap(ciap)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCiaps.find(selected => selected.code === ciap.code)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <div>
                            <div className="font-medium">{ciap.code}</div>
                            <div className="text-sm text-muted-foreground">{ciap.display}</div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Selected CIAP-2 codes */}
            {selectedCiaps.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCiaps.map((ciap) => (
                  <Badge key={ciap.code} variant="secondary" className="pr-1">
                    <span className="mr-1">{ciap.code} - {ciap.display}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeCiap(ciap.code)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Antecedentes Pessoais */}
          <div className="space-y-2">
            <Label htmlFor="antecedentes-pessoais" className="text-sm font-medium">
              Antecedentes Pessoais
            </Label>
            <Textarea
              id="antecedentes-pessoais"
              placeholder="Doenças prévias, cirurgias, hábitos, medicamentos em uso..."
              value={antecedentesPessoais}
              onChange={(e) => setAntecedentesPessoais(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Antecedentes Familiares */}
          <div className="space-y-2">
            <Label htmlFor="antecedentes-familiares" className="text-sm font-medium">
              Antecedentes Familiares
            </Label>
            <Textarea
              id="antecedentes-familiares"
              placeholder="Doenças familiares relevantes..."
              value={antecedentesFamiliares}
              onChange={(e) => setAntecedentesFamiliares(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Alergias */}
          <div className="space-y-2">
            <Label htmlFor="alergias" className="text-sm font-medium">
              Alergias
            </Label>
            <Textarea
              id="alergias"
              placeholder="Substâncias, medicamentos, alimentos que causam reações alérgicas..."
              value={alergias}
              onChange={(e) => setAlergias(e.target.value)}
              className="min-h-[80px]"
            />
            
            {hasAlergias && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Atenção:</strong> Paciente possui alergias registradas. Verificar antes de prescrever medicamentos.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Status Summary */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                isValid ? "bg-green-500" : "bg-red-500"
              )} />
              <span className="text-sm font-medium">
                {isValid ? "Seção completa" : "Campos obrigatórios pendentes"}
              </span>
            </div>
            <Badge variant={isValid ? "default" : "destructive"}>
              {isValid ? "Válido" : "Incompleto"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};