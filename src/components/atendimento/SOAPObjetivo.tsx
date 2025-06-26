
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp,
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  Quote,
  Undo,
  Redo,
  CalendarIcon,
  Info,
  Trash2,
  X,
  Search,
  AlertTriangle
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Mock data para exames SIGTAP
const examCodesSigtap = [
  { code: "0202010295", name: "Dosagem de Colesterol Total" },
  { code: "0202010279", name: "Dosagem de Colesterol HDL" },
  { code: "0202010287", name: "Dosagem de Colesterol LDL" },
  { code: "0202010678", name: "Dosagem de Triglicerídeos" },
  { code: "0202010317", name: "Dosagem de Creatinina" },
  { code: "0202050025", name: "Clearance de Creatinina" },
  { code: "0301010021", name: "Consulta médica em atenção básica" },
  { code: "0301100276", name: "Curativo especial" },
];

const numericExamCodes = [
  "0202010295", "0202010279", "0202010287", 
  "0202010678", "0202010317", "0202050025"
];

interface ExamResult {
  id: string;
  code: string;
  name: string;
  realizadoEm: Date;
  resultadoEm?: Date;
  solicitadoEm?: Date;
  resultado: string;
  valorNumerico?: number;
  descricao?: string;
  profissional: string;
  dataAvaliacao: Date;
}

export const SOAPObjetivo = () => {
  const [objetivoTexto, setObjetivoTexto] = useState("");
  const [ultimaMenstruacao, setUltimaMenstruacao] = useState<Date>();
  const [showUltimaMenstruacao, setShowUltimaMenstruacao] = useState(false);
  
  // Antropometria e Sinais Vitais
  const [antropometriaOpen, setAntropometriaOpen] = useState(false);
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState("");
  const [perimetroCefalico, setPerimetroCefalico] = useState("");
  const [circunferenciaAbdominal, setCircunferenciaAbdominal] = useState("");
  const [perimetroPanturrilha, setPerimetroPanturrilha] = useState("");
  const [pressaoArterial, setPressaoArterial] = useState("");
  const [frequenciaRespiratoria, setFrequenciaRespiratoria] = useState("");
  const [frequenciaCardiaca, setFrequenciaCardiaca] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [saturacaoO2, setSaturacaoO2] = useState("");
  const [glicemiaCapilar, setGlicemiaCapilar] = useState("");
  
  // Marcadores de consumo alimentar
  const [marcadoresOpen, setMarcadoresOpen] = useState(false);
  const [refeicaoTv, setRefeicaoTv] = useState("");
  const [refeicoesDia, setRefeicoesDia] = useState<string[]>([]);
  const [consumoOntem, setConsumoOntem] = useState<{[key: string]: string}>({});
  
  // Vacinação
  const [vacinacaoEmDia, setVacinacaoEmDia] = useState("");
  
  // Exames
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [showExamHistoryModal, setShowExamHistoryModal] = useState(false);
  const [showDeleteExamDialog, setShowDeleteExamDialog] = useState<string | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [currentExam, setCurrentExam] = useState<{
    code: string;
    name: string;
    realizadoEm?: Date;
    resultadoEm?: Date;
    resultado: string;
    valorNumerico?: number;
    descricao?: string;
  } | null>(null);
  const [examSearch, setExamSearch] = useState("");
  const [examHistorySearch, setExamHistorySearch] = useState("");

  // Mock user data - normalmente viria do contexto
  const patientAge = 25; // anos
  const patientSex = "feminino"; // ou "masculino"
  const isPregnant = false;

  // Determinar botões especiais baseado na idade e condições
  const showPuericultura = patientAge <= 18;
  const showIdoso = patientAge >= 60;
  const showPreNatal = patientSex === "feminino" && isPregnant;

  // Mostrar campo DUM para mulheres >= 10 anos
  const shouldShowDUM = patientSex === "feminino" && patientAge >= 10;

  // Funções de formatação de texto
  const handleTextFormat = (format: string) => {
    console.log(`Aplicando formatação: ${format}`);
  };

  // Função para validar perímetros
  const validatePerimeter = (value: string, min: number, max: number) => {
    const numericValue = parseFloat(value.replace(',', '.'));
    if (isNaN(numericValue)) return "";
    if (numericValue < min || numericValue > max) {
      return `Deve ter valor entre ${min} e ${max}`;
    }
    return "";
  };

  // Função para calcular risco cardiovascular
  const getCardiovascularRisk = (circunferencia: string, sexo: string) => {
    const valor = parseFloat(circunferencia.replace(',', '.'));
    if (isNaN(valor)) return null;
    
    if (sexo === "masculino") {
      return valor >= 102 ? "Alto risco cardiovascular" : "Risco cardiovascular normal";
    } else {
      return valor >= 88 ? "Alto risco cardiovascular" : "Risco cardiovascular normal";
    }
  };

  // Função para limpar campos dos marcadores
  const clearMarcadores = () => {
    setRefeicaoTv("");
    setRefeicoesDia([]);
    setConsumoOntem({});
  };

  // Função para adicionar/remover refeições
  const toggleRefeicao = (refeicao: string) => {
    setRefeicoesDia(prev => 
      prev.includes(refeicao) 
        ? prev.filter(r => r !== refeicao)
        : [...prev, refeicao]
    );
  };

  // Função para salvar exame
  const saveExam = () => {
    if (!currentExam) return;
    
    const newExam: ExamResult = {
      id: Date.now().toString(),
      code: currentExam.code,
      name: currentExam.name,
      realizadoEm: currentExam.realizadoEm || new Date(),
      resultadoEm: currentExam.resultadoEm,
      resultado: currentExam.resultado,
      valorNumerico: currentExam.valorNumerico,
      descricao: currentExam.descricao,
      profissional: "Dr. João Silva - Clínico Geral",
      dataAvaliacao: new Date()
    };
    
    setExamResults(prev => [...prev, newExam]);
    setCurrentExam(null);
    setShowAddExamModal(false);
  };

  // Filtrar exames para busca
  const filteredExams = examCodesSigtap.filter(exam =>
    exam.name.toLowerCase().includes(examSearch.toLowerCase()) ||
    exam.code.includes(examSearch)
  );

  const filteredExamHistory = examResults.filter(exam =>
    exam.name.toLowerCase().includes(examHistorySearch.toLowerCase()) ||
    exam.code.includes(examHistorySearch)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Objetivo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Dados objetivos coletados durante o exame físico, sinais vitais e resultados de exames.
          </p>

          {/* Botões especiais baseados na idade/condição */}
          <div className="flex gap-2 mb-6">
            {showPuericultura && (
              <Button variant="outline" className="flex items-center gap-2">
                Puericultura
              </Button>
            )}
            {showIdoso && (
              <Button variant="outline" className="flex items-center gap-2">
                Idoso
              </Button>
            )}
            {showPreNatal && (
              <Button variant="outline" className="flex items-center gap-2">
                Pré-natal
              </Button>
            )}
          </div>

          {/* Campo de texto livre */}
          <div className="space-y-3 mb-6">
            <Label htmlFor="objetivo-texto" className="text-base font-medium">
              Dados do Exame Físico
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
                <ToggleGroupItem 
                  value="quote" 
                  onClick={() => handleTextFormat('quote')}
                  className="h-8 w-8 p-0"
                >
                  <Quote className="h-4 w-4" />
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
              id="objetivo-texto"
              placeholder="Descreva os dados objetivos do exame físico..."
              value={objetivoTexto}
              onChange={(e) => setObjetivoTexto(e.target.value)}
              className="min-h-[120px] resize-y"
              maxLength={4000}
            />
            <div className="text-sm text-gray-500 text-right">
              {objetivoTexto.length}/4000 caracteres
            </div>
          </div>

          {/* Data da Última Menstruação */}
          {shouldShowDUM && (
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Label className="text-base font-medium">
                  Data da Última Menstruação (DUM)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Preencher mesmo se a cidadã estiver com dúvidas</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !ultimaMenstruacao && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {ultimaMenstruacao ? (
                      format(ultimaMenstruacao, "dd/MM/yyyy", { locale: ptBR })
                    ) : (
                      <span>Selecionar data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={ultimaMenstruacao}
                    onSelect={setUltimaMenstruacao}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Antropometria, Sinais Vitais e Glicemia */}
          <Collapsible open={antropometriaOpen} onOpenChange={setAntropometriaOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between mb-4">
                <span className="text-base font-medium">
                  Antropometria, sinais vitais e glicemia capilar
                </span>
                {antropometriaOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-md bg-gray-50">
                {/* Peso */}
                <div className="space-y-2">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    id="peso"
                    placeholder="Ex: 70,5"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                  />
                </div>

                {/* Altura */}
                <div className="space-y-2">
                  <Label htmlFor="altura">Altura (cm)</Label>
                  <Input
                    id="altura"
                    placeholder="Ex: 175"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                  />
                </div>

                {/* IMC */}
                <div className="space-y-2">
                  <Label htmlFor="imc">IMC</Label>
                  <Input
                    id="imc"
                    placeholder="Calculado automaticamente"
                    value={imc}
                    onChange={(e) => setImc(e.target.value)}
                    readOnly
                  />
                </div>

                {/* Perímetro Cefálico */}
                <div className="space-y-2">
                  <Label htmlFor="perimetro-cefalico">Perímetro cefálico (cm)</Label>
                  <Input
                    id="perimetro-cefalico"
                    placeholder="Ex: 56,5"
                    value={perimetroCefalico}
                    onChange={(e) => setPerimetroCefalico(e.target.value)}
                  />
                  {perimetroCefalico && validatePerimeter(perimetroCefalico, 10, 200) && (
                    <p className="text-sm text-red-500">
                      {validatePerimeter(perimetroCefalico, 10, 200)}
                    </p>
                  )}
                </div>

                {/* Circunferência Abdominal */}
                <div className="space-y-2">
                  <Label htmlFor="circunferencia-abdominal">Circunferência abdominal (cm)</Label>
                  <Input
                    id="circunferencia-abdominal"
                    placeholder="Ex: 85,0"
                    value={circunferenciaAbdominal}
                    onChange={(e) => setCircunferenciaAbdominal(e.target.value)}
                  />
                  {circunferenciaAbdominal && getCardiovascularRisk(circunferenciaAbdominal, patientSex) && (
                    <div className={cn(
                      "flex items-center gap-2 p-2 rounded text-sm",
                      getCardiovascularRisk(circunferenciaAbdominal, patientSex)?.includes("Alto") 
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-green-50 text-green-700 border border-green-200"
                    )}>
                      <AlertTriangle className="h-4 w-4" />
                      {getCardiovascularRisk(circunferenciaAbdominal, patientSex)}
                    </div>
                  )}
                </div>

                {/* Perímetro da Panturrilha */}
                <div className="space-y-2">
                  <Label htmlFor="perimetro-panturrilha">Perímetro da panturrilha (cm)</Label>
                  <Input
                    id="perimetro-panturrilha"
                    placeholder="Ex: 34,5"
                    value={perimetroPanturrilha}
                    onChange={(e) => setPerimetroPanturrilha(e.target.value)}
                  />
                  {perimetroPanturrilha && validatePerimeter(perimetroPanturrilha, 10, 99) && (
                    <p className="text-sm text-red-500">
                      {validatePerimeter(perimetroPanturrilha, 10, 99)}
                    </p>
                  )}
                </div>

                {/* Pressão Arterial */}
                <div className="space-y-2">
                  <Label htmlFor="pressao-arterial">Pressão arterial (mmHg)</Label>
                  <Input
                    id="pressao-arterial"
                    placeholder="Ex: 120/80"
                    value={pressaoArterial}
                    onChange={(e) => setPressaoArterial(e.target.value)}
                  />
                </div>

                {/* Frequência Respiratória */}
                <div className="space-y-2">
                  <Label htmlFor="frequencia-respiratoria">Frequência respiratória (mpm)</Label>
                  <Input
                    id="frequencia-respiratoria"
                    placeholder="Ex: 16"
                    value={frequenciaRespiratoria}
                    onChange={(e) => setFrequenciaRespiratoria(e.target.value)}
                  />
                </div>

                {/* Frequência Cardíaca */}
                <div className="space-y-2">
                  <Label htmlFor="frequencia-cardiaca">Frequência cardíaca (bpm)</Label>
                  <Input
                    id="frequencia-cardiaca"
                    placeholder="Ex: 72"
                    value={frequenciaCardiaca}
                    onChange={(e) => setFrequenciaCardiaca(e.target.value)}
                  />
                </div>

                {/* Temperatura */}
                <div className="space-y-2">
                  <Label htmlFor="temperatura">Temperatura (ºC)</Label>
                  <Input
                    id="temperatura"
                    placeholder="Ex: 36,5"
                    value={temperatura}
                    onChange={(e) => setTemperatura(e.target.value)}
                  />
                </div>

                {/* Saturação O2 */}
                <div className="space-y-2">
                  <Label htmlFor="saturacao-o2">Saturação de O2 (%)</Label>
                  <Input
                    id="saturacao-o2"
                    placeholder="Ex: 98"
                    value={saturacaoO2}
                    onChange={(e) => setSaturacaoO2(e.target.value)}
                  />
                </div>

                {/* Glicemia Capilar */}
                <div className="space-y-2">
                  <Label htmlFor="glicemia-capilar">Glicemia capilar (mg/dL)</Label>
                  <Input
                    id="glicemia-capilar"
                    placeholder="Ex: 95"
                    value={glicemiaCapilar}
                    onChange={(e) => setGlicemiaCapilar(e.target.value)}
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Marcadores de consumo alimentar */}
          <Collapsible open={marcadoresOpen} onOpenChange={setMarcadoresOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between mb-4">
                <span className="text-base font-medium">
                  Marcadores de consumo alimentar
                </span>
                {marcadoresOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mb-6">
              <div className="p-4 border rounded-md bg-gray-50 space-y-4">
                <div className="space-y-2">
                  <p className="font-bold text-sm">
                    Crianças com 2 anos ou mais, adolescentes, adultos, gestantes e pessoas idosas.
                  </p>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
                    <Info className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-blue-700">
                      Para registrar os marcadores de consumo alimentar todas as perguntas devem ser respondidas
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearMarcadores}
                    disabled={!refeicaoTv && refeicoesDia.length === 0 && Object.keys(consumoOntem).length === 0}
                  >
                    Limpar campos
                  </Button>
                </div>

                {/* Pergunta sobre TV/computador */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Você tem costume de realizar as refeições assistindo à TV, mexendo no computador e/ou celular?
                  </Label>
                  <RadioGroup value={refeicaoTv} onValueChange={setRefeicaoTv}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id="tv-sim" />
                      <Label htmlFor="tv-sim">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id="tv-nao" />
                      <Label htmlFor="tv-nao">Não</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao-sabe" id="tv-nao-sabe" />
                      <Label htmlFor="tv-nao-sabe">Não sabe</Label>
                    </div>
                  </RadioGroup>
                  {refeicaoTv && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRefeicaoTv("")}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Refeições do dia */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Quais refeições você faz ao longo do dia?
                  </Label>
                  <div className="space-y-2">
                    {[
                      "Café da manhã",
                      "Lanche da manhã", 
                      "Almoço",
                      "Lanche da tarde",
                      "Jantar",
                      "Ceia"
                    ].map((refeicao) => (
                      <div key={refeicao} className="flex items-center space-x-2">
                        <Checkbox
                          id={refeicao}
                          checked={refeicoesDia.includes(refeicao)}
                          onCheckedChange={() => toggleRefeicao(refeicao)}
                        />
                        <Label htmlFor={refeicao}>{refeicao}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consumo de ontem */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Ontem você consumiu:
                  </Label>
                  <div className="space-y-3">
                    {[
                      "Feijão",
                      "Frutas frescas (não considerar suco de frutas)",
                      "Verduras e/ou legumes (não considerar batata, mandioca, aipim, macaxeira, cará e inhame)",
                      "Hambúrguer e/ou embutidos (presunto, mortadela, salame, linguiça, salsicha)",
                      "Bebidas adoçadas (refrigerante, suco de caixinha, suco em pó, água de coco de caixinha, xaropes de guaraná/groselha ou suco de fruta com adição de açúcar)",
                      "Macarrão instantâneo, salgadinhos de pacote ou biscoitos salgados",
                      "Biscoito recheado, doces ou guloseimas (balas, pirulitos, chiclete, caramelo, gelatina)"
                    ].map((item) => (
                      <div key={item} className="space-y-2">
                        <Label className="text-sm">{item}</Label>
                        <RadioGroup 
                          value={consumoOntem[item] || ""} 
                          onValueChange={(value) => setConsumoOntem(prev => ({...prev, [item]: value}))}
                        >
                          <div className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sim" id={`${item}-sim`} />
                              <Label htmlFor={`${item}-sim`}>Sim</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="nao" id={`${item}-nao`} />
                              <Label htmlFor={`${item}-nao`}>Não</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="nao-sabe" id={`${item}-nao-sabe`} />
                              <Label htmlFor={`${item}-nao-sabe`}>Não sabe</Label>
                            </div>
                            {consumoOntem[item] && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setConsumoOntem(prev => {
                                  const newState = {...prev};
                                  delete newState[item];
                                  return newState;
                                })}
                                className="h-6 w-6 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Vacinação em dia */}
          <div className="space-y-3 mb-6">
            <Label className="text-base font-medium">Vacinação em dia</Label>
            <div className="flex items-center gap-4">
              <RadioGroup value={vacinacaoEmDia} onValueChange={setVacinacaoEmDia}>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sim" id="vacinacao-sim" />
                    <Label htmlFor="vacinacao-sim">SIM</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao" id="vacinacao-nao" />
                    <Label htmlFor="vacinacao-nao">Não</Label>
                  </div>
                </div>
              </RadioGroup>
              {vacinacaoEmDia && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setVacinacaoEmDia("")}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Resultados de exames */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Dialog open={showAddExamModal} onOpenChange={setShowAddExamModal}>
                <DialogTrigger asChild>
                  <Button variant="outline">Resultados de exames</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Adicionar resultados de exames</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    {/* Campo de busca */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Adicionar exame sem solicitação"
                        value={examSearch}
                        onChange={(e) => setExamSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Lista de exames filtrados */}
                    {examSearch && filteredExams.length > 0 && (
                      <div className="border rounded-md max-h-40 overflow-y-auto">
                        {filteredExams.map((exam) => (
                          <button
                            key={exam.code}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setCurrentExam({
                                code: exam.code,
                                name: exam.name,
                                resultado: "",
                              });
                              setExamSearch("");
                            }}
                          >
                            <div className="font-medium text-sm">{exam.code}</div>
                            <div className="text-gray-600 text-xs">{exam.name}</div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Exame selecionado */}
                    {currentExam && (
                      <div className="space-y-4 p-4 border rounded-md bg-gray-50">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            {currentExam.name} - {currentExam.code}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDeleteExamDialog(currentExam.code)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Datas opcionais */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Exame realizado em (DD/MM/AAAA)</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {currentExam.realizadoEm ? 
                                    format(currentExam.realizadoEm, "dd/MM/yyyy") : 
                                    "Selecionar data"
                                  }
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={currentExam.realizadoEm}
                                  onSelect={(date) => setCurrentExam(prev => prev ? {...prev, realizadoEm: date} : null)}
                                  disabled={(date) => date > new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label>Resultado em (DD/MM/AAAA)</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {currentExam.resultadoEm ? 
                                    format(currentExam.resultadoEm, "dd/MM/yyyy") : 
                                    "Selecionar data"
                                  }
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={currentExam.resultadoEm}
                                  onSelect={(date) => setCurrentExam(prev => prev ? {...prev, resultadoEm: date} : null)}
                                  disabled={(date) => date > new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        {/* Campo numérico para exames específicos */}
                        {numericExamCodes.includes(currentExam.code) && (
                          <div className="space-y-2">
                            <Label>Valor numérico *</Label>
                            <Input
                              type="number"
                              min="1"
                              max="10000"
                              placeholder="Digite o valor entre 1 e 10000"
                              value={currentExam.valorNumerico || ""}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (value > 10000) {
                                  alert("Deve ter valor entre 1 e 10000");
                                  return;
                                }
                                setCurrentExam(prev => prev ? {...prev, valorNumerico: value} : null);
                              }}
                            />
                          </div>
                        )}

                        {/* Resultado (obrigatório) */}
                        <div className="space-y-2">
                          <Label>Resultado de exame *</Label>
                          <Textarea
                            placeholder="Digite o resultado do exame..."
                            value={currentExam.resultado}
                            onChange={(e) => setCurrentExam(prev => prev ? {...prev, resultado: e.target.value} : null)}
                            maxLength={2000}
                            rows={4}
                          />
                          <div className="text-sm text-gray-500 text-right">
                            {currentExam.resultado.length}/2000 caracteres
                          </div>
                        </div>

                        {/* Descrição para exames numéricos */}
                        {numericExamCodes.includes(currentExam.code) && currentExam.valorNumerico && (
                          <div className="space-y-2">
                            <Label>Descrição</Label>
                            <Textarea
                              placeholder="Digite a descrição..."
                              value={currentExam.descricao || ""}
                              onChange={(e) => setCurrentExam(prev => prev ? {...prev, descricao: e.target.value} : null)}
                              maxLength={2000}
                              rows={3}
                            />
                            <div className="text-sm text-gray-500 text-right">
                              {(currentExam.descricao || "").length}/2000 caracteres
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowExitDialog(true)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      onClick={saveExam}
                      disabled={!currentExam || !currentExam.resultado.trim()}
                    >
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={showExamHistoryModal} onOpenChange={setShowExamHistoryModal}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline"
                    disabled={examResults.length === 0}
                  >
                    Histórico de resultado de exames
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Histórico de resultados de exames</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    {/* Campo de busca */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Pesquise por exame ou código"
                        value={examHistorySearch}
                        onChange={(e) => setExamHistorySearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Lista de exames do histórico */}
                    <div className="space-y-2">
                      {filteredExamHistory.map((exam) => (
                        <Collapsible key={exam.id}>
                          <CollapsibleTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              <div className="text-left">
                                <div className="font-medium">{exam.name} - {exam.code}</div>
                                <div className="text-sm text-gray-500">
                                  Realizado em: {format(exam.realizadoEm, "dd/MM/yyyy")} | 
                                  Última avaliação em: {format(exam.dataAvaliacao, "dd/MM/yyyy")}
                                </div>
                              </div>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="p-4 border rounded-md bg-gray-50 mt-2">
                            <div className="space-y-2 text-sm">
                              <div><strong>Realizado em:</strong> {format(exam.realizadoEm, "dd/MM/yyyy")}</div>
                              <div><strong>Resultado em:</strong> {exam.resultadoEm ? format(exam.resultadoEm, "dd/MM/yyyy") : "-"}</div>
                              {exam.valorNumerico && (
                                <div><strong>Resultado (mg/dL):</strong> {exam.valorNumerico}</div>
                              )}
                              <div><strong>Resultado:</strong> {exam.resultado}</div>
                              {exam.descricao && (
                                <div><strong>Descrição:</strong> {exam.descricao}</div>
                              )}
                              <div><strong>Avaliado por:</strong> {exam.profissional}</div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>

                    <div className="text-sm text-gray-500 text-center pt-4 border-t">
                      Total de exames: {filteredExamHistory.length}
                    </div>
                  </div>

                  <DialogFooter>
                    <Button onClick={() => setShowExamHistoryModal(false)}>
                      Fechar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Lista de exames incluídos no atendimento */}
            {examResults.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Exames registrados neste atendimento:</h4>
                {examResults.map((exam) => (
                  <Collapsible key={exam.id}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        <div className="flex items-center gap-2">
                          <span>{exam.name}</span>
                          <Badge variant="secondary">registrado agora</Badge>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 border rounded-md bg-gray-50 mt-2">
                      <div className="space-y-2 text-sm">
                        <div><strong>Nome do exame:</strong> {exam.name}</div>
                        <div><strong>Data da realização:</strong> {format(exam.realizadoEm, "dd/MM/yyyy")}</div>
                        <div><strong>Data de resultado:</strong> {exam.resultadoEm ? format(exam.resultadoEm, "dd/MM/yyyy") : "-"}</div>
                        <div><strong>Data de solicitação:</strong> {exam.solicitadoEm ? format(exam.solicitadoEm, "dd/MM/yyyy") : "-"}</div>
                        {exam.valorNumerico && (
                          <div><strong>Resultado (mg/dL):</strong> {exam.valorNumerico}</div>
                        )}
                        <div><strong>Resultado:</strong> {exam.resultado}</div>
                        {exam.descricao && (
                          <div><strong>Descrição:</strong> {exam.descricao}</div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            )}
          </div>

          {/* Dialog de confirmação de exclusão */}
          <AlertDialog open={!!showDeleteExamDialog} onOpenChange={() => setShowDeleteExamDialog(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deseja excluir este exame?</AlertDialogTitle>
                <AlertDialogDescription>
                  Os dados deste exame não serão salvos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowDeleteExamDialog(null)}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => {
                    setCurrentExam(null);
                    setShowDeleteExamDialog(null);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Dialog de confirmação de saída */}
          <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deseja sair sem salvar?</AlertDialogTitle>
                <AlertDialogDescription>
                  As alterações realizadas serão perdidas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowExitDialog(false)}>
                  Não, continuar aqui
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => {
                    setCurrentExam(null);
                    setShowAddExamModal(false);
                    setShowExitDialog(false);
                  }}
                >
                  Sim, sair da tela
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};
