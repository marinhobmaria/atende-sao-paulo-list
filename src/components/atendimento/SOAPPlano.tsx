import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AtestadoSection } from "./atestado/AtestadoSection";
import { DeclaracaoComparecimento } from "./atestado/DeclaracaoComparecimento";
import { PrescricaoMedicamento } from "./prescricao/PrescricaoMedicamento";
import { 
  FileText, 
  ClipboardCheck, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  Undo,
  Redo,
  MessageCircle,
  Trash2,
  Plus,
  Eye,
  Info,
  Pill
} from "lucide-react";

interface CiapEntry {
  id: string;
  code: string;
  display: string;
  comment?: string;
}

interface SigtapEntry {
  id: string;
  code: string;
  display: string;
  comment?: string;
}

// Mock data para CIAP-2
const mockCiapData = [
  { code: "A01", display: "Dor generalizada/múltipla" },
  { code: "A02", display: "Calafrios" },
  { code: "A03", display: "Febre" },
  { code: "A04", display: "Fraqueza/cansaço geral" },
  { code: "A05", display: "Sentir-se doente" },
  { code: "A98", display: "Consulta de rotina" },
  { code: "P01", display: "Sentimentos de ansiedade/nervosismo/tensão" },
  { code: "P02", display: "Reação aguda ao stress" },
  { code: "P03", display: "Sentimentos depressivos" },
];

// Mock data para SIGTAP
const mockSigtapData = [
  { code: "0301010021", display: "Consulta médica em atenção básica" },
  { code: "0301100276", display: "Curativo especial" },
  { code: "0301010030", display: "Consulta de enfermagem em atenção básica" },
  { code: "0702010019", display: "Aferição de pressão arterial" },
  { code: "0702010027", display: "Verificação de sinais vitais" },
];

export const SOAPPlano = () => {
  const [planoTexto, setPlanoTexto] = useState("");
  const [cidadaoObservacao, setCidadaoObservacao] = useState(false);
  const [ciapEntries, setCiapEntries] = useState<CiapEntry[]>([]);
  const [sigtapEntries, setSigtapEntries] = useState<SigtapEntry[]>([]);
  const [ciapSearch, setCiapSearch] = useState("");
  const [sigtapSearch, setSigtapSearch] = useState("");
  const [showCiapSuggestions, setShowCiapSuggestions] = useState(false);
  const [showSigtapSuggestions, setShowSigtapSuggestions] = useState(false);
  const [editingComment, setEditingComment] = useState<{type: 'ciap' | 'sigtap', id: string} | null>(null);
  const [commentText, setCommentText] = useState("");

  // Funções de formatação de texto
  const handleTextFormat = (format: string) => {
    console.log(`Aplicando formatação: ${format}`);
    // Aqui seria implementada a lógica de formatação do texto
  };

  // Filtrar sugestões CIAP-2
  const filteredCiap = mockCiapData.filter(item =>
    item.code.toLowerCase().includes(ciapSearch.toLowerCase()) ||
    item.display.toLowerCase().includes(ciapSearch.toLowerCase())
  );

  // Filtrar sugestões SIGTAP
  const filteredSigtap = mockSigtapData.filter(item =>
    item.code.toLowerCase().includes(sigtapSearch.toLowerCase()) ||
    item.display.toLowerCase().includes(sigtapSearch.toLowerCase())
  );

  // Adicionar entrada CIAP-2
  const addCiapEntry = (item: { code: string; display: string }) => {
    const newEntry: CiapEntry = {
      id: Date.now().toString(),
      code: item.code,
      display: item.display
    };
    setCiapEntries([...ciapEntries, newEntry]);
    setCiapSearch("");
    setShowCiapSuggestions(false);
  };

  // Adicionar entrada SIGTAP
  const addSigtapEntry = (item: { code: string; display: string }) => {
    const newEntry: SigtapEntry = {
      id: Date.now().toString(),
      code: item.code,
      display: item.display
    };
    setSigtapEntries([...sigtapEntries, newEntry]);
    setSigtapSearch("");
    setShowSigtapSuggestions(false);
  };

  // Remover entrada
  const removeCiapEntry = (id: string) => {
    setCiapEntries(ciapEntries.filter(entry => entry.id !== id));
  };

  const removeSigtapEntry = (id: string) => {
    setSigtapEntries(sigtapEntries.filter(entry => entry.id !== id));
  };

  // Abrir modal de comentário
  const openCommentModal = (type: 'ciap' | 'sigtap', id: string, currentComment?: string) => {
    setEditingComment({ type, id });
    setCommentText(currentComment || "");
  };

  // Salvar comentário
  const saveComment = () => {
    if (!editingComment) return;

    if (editingComment.type === 'ciap') {
      setCiapEntries(entries => 
        entries.map(entry => 
          entry.id === editingComment.id 
            ? { ...entry, comment: commentText }
            : entry
        )
      );
    } else {
      setSigtapEntries(entries => 
        entries.map(entry => 
          entry.id === editingComment.id 
            ? { ...entry, comment: commentText }
            : entry
        )
      );
    }

    setEditingComment(null);
    setCommentText("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Plano</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Plano terapêutico, condutas a serem tomadas, prescrições e orientações ao paciente.
          </p>
          
          <Tabs defaultValue="plano-cuidado" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="plano-cuidado" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Plano de Cuidado
              </TabsTrigger>
              <TabsTrigger value="prescricao" className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                Prescrição de Medicamento
              </TabsTrigger>
              <TabsTrigger value="atestados" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Atestados
              </TabsTrigger>
              <TabsTrigger value="declaracao" className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />
                Declaração de Comparecimento
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="plano-cuidado" className="mt-6 space-y-6">
              {/* Campo de texto livre com formatação */}
              <div className="space-y-3">
                <Label htmlFor="plano-texto" className="text-base font-medium">
                  Plano de Cuidado
                </Label>
                
                {/* Barra de formatação */}
                <div className="flex items-center gap-1 p-2 border rounded-md bg-gray-50">
                  <ToggleGroup type="multiple" className="gap-1">
                    <ToggleGroupItem 
                      value="bold" 
                      onClick={() => handleTextFormat('bold')}
                      className="h-8 w-8 p-0"
                    >
                      <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="italic" 
                      onClick={() => handleTextFormat('italic')}
                      className="h-8 w-8 p-0"
                    >
                      <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="underline" 
                      onClick={() => handleTextFormat('underline')}
                      className="h-8 w-8 p-0"
                    >
                      <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="strikethrough" 
                      onClick={() => handleTextFormat('strikethrough')}
                      className="h-8 w-8 p-0"
                    >
                      <Strikethrough className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                  
                  <div className="w-px h-6 bg-gray-300 mx-2" />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTextFormat('undo')}
                    className="h-8 w-8 p-0"
                  >
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTextFormat('redo')}
                    className="h-8 w-8 p-0"
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                </div>

                <Textarea
                  id="plano-texto"
                  placeholder="Descreva o plano de cuidado para o paciente..."
                  value={planoTexto}
                  onChange={(e) => setPlanoTexto(e.target.value)}
                  className="min-h-[120px] resize-y"
                  maxLength={4000}
                />
                <div className="text-sm text-gray-500 text-right">
                  {planoTexto.length}/4000 caracteres
                </div>
              </div>

              {/* Toggle Cidadão em Observação */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Label htmlFor="observacao" className="text-base font-medium">
                      Cidadão em Observação
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            Ao ativar esta opção, o cidadão será mantido em observação clínica 
                            até que o atendimento seja encerrado. A observação será vinculada a este profissional.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Switch
                    id="observacao"
                    checked={cidadaoObservacao}
                    onCheckedChange={setCidadaoObservacao}
                  />
                </div>
                
                {cidadaoObservacao && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">
                        Paciente em observação clínica
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      O campo de plano de cuidado torna-se obrigatório para pacientes em observação.
                    </p>
                  </div>
                )}
              </div>

              {/* Campo CIAP-2 */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  CIAP-2 - Intervenção ou procedimento clínico
                </Label>
                
                <div className="relative">
                  <Input
                    placeholder="Pesquise ou selecione o código ou descrição CIAP-2..."
                    value={ciapSearch}
                    onChange={(e) => {
                      setCiapSearch(e.target.value);
                      setShowCiapSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowCiapSuggestions(ciapSearch.length > 0)}
                  />
                  
                  {showCiapSuggestions && filteredCiap.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {filteredCiap.map((item) => (
                        <button
                          key={item.code}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          onClick={() => addCiapEntry(item)}
                        >
                          <div className="font-medium text-sm">{item.code}</div>
                          <div className="text-gray-600 text-xs">{item.display}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Lista de entradas CIAP-2 */}
                {ciapEntries.length > 0 && (
                  <div className="space-y-2">
                    {ciapEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {entry.display} - {entry.code}
                          </div>
                          {entry.comment && (
                            <div className="text-xs text-gray-600 mt-1">
                              Comentário: {entry.comment}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openCommentModal('ciap', entry.id, entry.comment)}
                          className="h-8 w-8 p-0"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCiapEntry(entry.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Campo SIGTAP */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  SIGTAP - Procedimento SUS realizado
                </Label>
                
                <div className="relative">
                  <Input
                    placeholder="Pesquise ou selecione o código ou descrição SIGTAP..."
                    value={sigtapSearch}
                    onChange={(e) => {
                      setSigtapSearch(e.target.value);
                      setShowSigtapSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowSigtapSuggestions(sigtapSearch.length > 0)}
                  />
                  
                  {showSigtapSuggestions && filteredSigtap.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {filteredSigtap.map((item) => (
                        <button
                          key={item.code}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          onClick={() => addSigtapEntry(item)}
                        >
                          <div className="font-medium text-sm">{item.code}</div>
                          <div className="text-gray-600 text-xs">{item.display}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Lista de entradas SIGTAP */}
                {sigtapEntries.length > 0 && (
                  <div className="space-y-2">
                    {sigtapEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {entry.display} - {entry.code}
                          </div>
                          {entry.comment && (
                            <div className="text-xs text-gray-600 mt-1">
                              Comentário: {entry.comment}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openCommentModal('sigtap', entry.id, entry.comment)}
                          className="h-8 w-8 p-0"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSigtapEntry(entry.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="prescricao" className="mt-6">
              <PrescricaoMedicamento 
                ultimoPeso={{ valor: 70, data: "15/12/2024" }}
              />
            </TabsContent>
            
            <TabsContent value="atestados" className="mt-6">
              <AtestadoSection />
            </TabsContent>
            
            <TabsContent value="declaracao" className="mt-6">
              <DeclaracaoComparecimento />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modal de comentário */}
      {editingComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4">
              Adicionar Comentário
            </h3>
            <Textarea
              placeholder="Adicione seu comentário..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-4"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingComment(null)}
              >
                Cancelar
              </Button>
              <Button onClick={saveComment}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
