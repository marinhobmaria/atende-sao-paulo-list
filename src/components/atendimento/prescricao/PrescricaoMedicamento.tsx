import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Printer, 
  Copy,
  X,
  AlertCircle
} from "lucide-react";

interface Medicamento {
  id: string;
  nome: string;
  concentracao: string;
  formaFarmaceutica: string;
  principioAtivo: string;
  viaAdministracao: string;
  tipoReceita: string;
  tipoDose: string;
  quantidadeDose: number;
  unidadeMedida: string;
  periodicidade: {
    tipo: 'intervalo' | 'frequencia' | 'turno' | 'fracionada';
    valor: string;
  };
  inicioTratamento: string;
  duracao: {
    valor: number;
    unidade: string;
  };
  recomendacoes?: string;
  dataPrescricao: string;
  profissional: string;
}

interface PrescricaoMedicamentoProps {
  ultimoPeso?: { valor: number; data: string };
}

export const PrescricaoMedicamento = ({ ultimoPeso }: PrescricaoMedicamentoProps) => {
  const [showModal, setShowModal] = useState(false);
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [preenchimentoManual, setPreenchimentoManual] = useState(false);
  const [busca, setBusca] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  const [showEncaminhar, setShowEncaminhar] = useState(false);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState<Medicamento | null>(null);

  // Estados do formulário
  const [formData, setFormData] = useState({
    principioAtivo: "",
    concentracao: "",
    formaFarmaceutica: "",
    viaAdministracao: "",
    tipoReceita: "",
    tipoDose: "",
    quantidadeDose: "",
    unidadeMedida: "",
    periodicidadeTipo: "",
    periodicidadeValor: "",
    inicioTratamento: "",
    duracaoValor: "",
    duracaoUnidade: "",
    recomendacoes: ""
  });

  const viasAdministracao = [
    "Oral", "Parenteral", "Local", "Outros", "Bucal", "Capilar", "Dermatológica",
    "Epidural", "Inalatória", "Inalatória por via nasal", "Inalatória por via oral",
    "Intra-arterial", "Intra-articular", "Intradérmica", "Intramuscular",
    "Intratecal", "Intrauterina", "Intravenosa", "Irrigação", "Nasal",
    "Oftálmica", "Otológica", "Retal", "Subcutânea", "Sublingual",
    "Transdérmica", "Uretral", "Vaginal"
  ];

  const tiposReceita = [
    "Comum",
    "Especial",
    "Especial - notificação azul",
    "Especial - notificação amarela"
  ];

  const tiposDose = [
    { value: "unica", label: "Única - administrada uma única vez" },
    { value: "comum", label: "Comum - intervalos regulares e convencionais" },
    { value: "fracionada", label: "Fracionada - doses variam por turno" }
  ];

  const unidadesMedida = [
    "mg", "g", "mL", "L", "unidade", "comprimido", "drágea", "cápsula",
    "supositório", "ampola", "frasco", "gotas", "UI", "mcg"
  ];

  const intervalos = ["4h", "6h", "8h", "12h", "24h"];
  const frequencias = ["1x", "2x", "3x", "4x"];
  const turnos = ["Manhã", "Tarde", "Noite"];
  const unidadesTempo = ["Dia(s)", "Semana(s)", "Mês(es)", "Indeterminada", "Uso contínuo"];

  const handleLimparCampos = () => {
    setFormData({
      principioAtivo: "",
      concentracao: "",
      formaFarmaceutica: "",
      viaAdministracao: "",
      tipoReceita: "",
      tipoDose: "",
      quantidadeDose: "",
      unidadeMedida: "",
      periodicidadeTipo: "",
      periodicidadeValor: "",
      inicioTratamento: "",
      duracaoValor: "",
      duracaoUnidade: "",
      recomendacoes: ""
    });
    setPreenchimentoManual(false);
  };

  const handleSalvarPrescricao = () => {
    // Validações básicas
    if (!formData.principioAtivo || !formData.viaAdministracao || !formData.tipoDose) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const novoMedicamento: Medicamento = {
      id: Date.now().toString(),
      nome: formData.principioAtivo,
      concentracao: formData.concentracao,
      formaFarmaceutica: formData.formaFarmaceutica,
      principioAtivo: formData.principioAtivo,
      viaAdministracao: formData.viaAdministracao,
      tipoReceita: formData.tipoReceita,
      tipoDose: formData.tipoDose,
      quantidadeDose: parseFloat(formData.quantidadeDose),
      unidadeMedida: formData.unidadeMedida,
      periodicidade: {
        tipo: formData.periodicidadeTipo as any,
        valor: formData.periodicidadeValor
      },
      inicioTratamento: formData.inicioTratamento,
      duracao: {
        valor: parseInt(formData.duracaoValor),
        unidade: formData.duracaoUnidade
      },
      recomendacoes: formData.recomendacoes,
      dataPrescricao: new Date().toLocaleDateString('pt-BR'),
      profissional: "Dr. João Silva"
    };

    setMedicamentos([...medicamentos, novoMedicamento]);
    handleLimparCampos();
  };

  const handleExcluirMedicamento = (id: string) => {
    setMedicamentos(medicamentos.filter(m => m.id !== id));
    setShowConfirmDelete(null);
  };

  const renderPeriodicidade = () => {
    switch (formData.periodicidadeTipo) {
      case 'intervalo':
        return (
          <div className="space-y-2">
            <Label>A cada</Label>
            <div className="flex gap-2">
              <Select value={formData.periodicidadeValor} onValueChange={(value) => setFormData({...formData, periodicidadeValor: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {intervalos.map(intervalo => (
                    <SelectItem key={intervalo} value={intervalo}>{intervalo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="flex items-center">horas</span>
            </div>
          </div>
        );
      case 'frequencia':
        return (
          <div className="space-y-2">
            <Label>Frequência</Label>
            <div className="flex gap-2">
              <Select value={formData.periodicidadeValor} onValueChange={(value) => setFormData({...formData, periodicidadeValor: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {frequencias.map(freq => (
                    <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="flex items-center">vez(es) por dia</span>
            </div>
          </div>
        );
      case 'turno':
        return (
          <div className="space-y-2">
            <Label>Turno</Label>
            <Select value={formData.periodicidadeValor} onValueChange={(value) => setFormData({...formData, periodicidadeValor: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o turno" />
              </SelectTrigger>
              <SelectContent>
                {turnos.map(turno => (
                  <SelectItem key={turno} value={turno}>{turno}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 'fracionada':
        return (
          <div className="space-y-2">
            <Label>Fracionada por turno</Label>
            <Input
              placeholder="Descreva o fracionamento"
              value={formData.periodicidadeValor}
              onChange={(e) => setFormData({...formData, periodicidadeValor: e.target.value})}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Prescrição de Medicamentos</h3>
        <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar prescrição
        </Button>
      </div>

      {/* Lista de medicamentos prescritos */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquise por medicamento"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
          <Checkbox id="uso-continuo" />
          <Label htmlFor="uso-continuo" className="text-sm">
            Ver apenas medicamentos de uso contínuo
          </Label>
        </div>

        {medicamentos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma prescrição adicionada
          </div>
        ) : (
          medicamentos.map((medicamento) => (
            <Card key={medicamento.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold">{medicamento.nome}</h4>
                    <p className="text-sm text-gray-600">{medicamento.formaFarmaceutica}</p>
                    <p className="text-sm text-gray-600">
                      {medicamento.quantidadeDose} {medicamento.unidadeMedida} - {medicamento.periodicidade.valor}
                    </p>
                    <p className="text-xs text-gray-500">
                      Prescrito em {medicamento.dataPrescricao} por {medicamento.profissional}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowConfirmDelete(medicamento.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {medicamentos.length > 0 && (
          <p className="text-sm text-gray-500">{medicamentos.length} resultado(s)</p>
        )}
      </div>

      {/* Modal de adicionar prescrição */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Adicionar prescrição</h2>
                <Button variant="ghost" onClick={() => setShowModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Formulário */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Preenchimento manual */}
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="manual"
                      checked={preenchimentoManual}
                      onCheckedChange={(checked) => setPreenchimentoManual(checked === true)}
                    />
                    <Label htmlFor="manual">Preencher manualmente. Medicamento não encontrado na lista</Label>
                  </div>

                  {preenchimentoManual ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="principio-ativo">Princípio ativo *</Label>
                        <Input
                          id="principio-ativo"
                          value={formData.principioAtivo}
                          onChange={(e) => setFormData({...formData, principioAtivo: e.target.value})}
                          maxLength={200}
                        />
                      </div>
                      <div>
                        <Label htmlFor="concentracao">Concentração *</Label>
                        <Input
                          id="concentracao"
                          value={formData.concentracao}
                          onChange={(e) => setFormData({...formData, concentracao: e.target.value})}
                          maxLength={200}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="medicamento">Princípio ativo/medicamento *</Label>
                      <Input
                        id="medicamento"
                        placeholder="Pesquise ou selecione para buscar medicamento..."
                        value={formData.principioAtivo}
                        onChange={(e) => setFormData({...formData, principioAtivo: e.target.value})}
                      />
                    </div>
                  )}

                  {/* Via de administração */}
                  <div>
                    <Label>Via de administração *</Label>
                    <Select value={formData.viaAdministracao} onValueChange={(value) => setFormData({...formData, viaAdministracao: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a via" />
                      </SelectTrigger>
                      <SelectContent>
                        {viasAdministracao.map(via => (
                          <SelectItem key={via} value={via}>{via}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tipo de receita */}
                  <div>
                    <Label>Tipo de receita *</Label>
                    <Select value={formData.tipoReceita} onValueChange={(value) => setFormData({...formData, tipoReceita: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposReceita.map(tipo => (
                          <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tipo de dose */}
                  <div>
                    <Label>Tipo de dose *</Label>
                    <RadioGroup value={formData.tipoDose} onValueChange={(value) => setFormData({...formData, tipoDose: value})}>
                      {tiposDose.map(tipo => (
                        <div key={tipo.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={tipo.value} id={tipo.value} />
                          <Label htmlFor={tipo.value}>{tipo.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Quantidade e unidade */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantidade">Quantidade da dose *</Label>
                      <Input
                        id="quantidade"
                        type="number"
                        min="0.01"
                        max="99999"
                        step="0.01"
                        value={formData.quantidadeDose}
                        onChange={(e) => setFormData({...formData, quantidadeDose: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Unidade de medida *</Label>
                      <Select value={formData.unidadeMedida} onValueChange={(value) => setFormData({...formData, unidadeMedida: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {unidadesMedida.map(unidade => (
                            <SelectItem key={unidade} value={unidade}>{unidade}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Peso do paciente */}
                  {ultimoPeso && (
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm font-medium">Último peso registrado:</p>
                      <p className="text-sm">{ultimoPeso.valor} kg - {ultimoPeso.data}</p>
                    </div>
                  )}

                  {/* Periodicidade */}
                  <div className="space-y-3">
                    <Label>Periodicidade da dose *</Label>
                    <RadioGroup value={formData.periodicidadeTipo} onValueChange={(value) => setFormData({...formData, periodicidadeTipo: value})}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intervalo" id="intervalo" />
                        <Label htmlFor="intervalo">Intervalo</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="frequencia" id="frequencia" />
                        <Label htmlFor="frequencia">Frequência</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="turno" id="turno" />
                        <Label htmlFor="turno">Turno</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fracionada" id="fracionada" />
                        <Label htmlFor="fracionada">Fracionada por turno</Label>
                      </div>
                    </RadioGroup>
                    {renderPeriodicidade()}
                  </div>

                  {/* Início do tratamento */}
                  <div>
                    <Label htmlFor="inicio">Início do tratamento *</Label>
                    <Input
                      id="inicio"
                      type="date"
                      value={formData.inicioTratamento}
                      onChange={(e) => setFormData({...formData, inicioTratamento: e.target.value})}
                    />
                  </div>

                  {/* Duração */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duracao-valor">Duração *</Label>
                      <Input
                        id="duracao-valor"
                        type="number"
                        min="1"
                        max="999"
                        value={formData.duracaoValor}
                        onChange={(e) => setFormData({...formData, duracaoValor: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Unidade</Label>
                      <Select value={formData.duracaoUnidade} onValueChange={(value) => setFormData({...formData, duracaoUnidade: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {unidadesTempo.map(unidade => (
                            <SelectItem key={unidade} value={unidade}>{unidade}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Recomendações */}
                  <div>
                    <Label htmlFor="recomendacoes">Recomendações</Label>
                    <Textarea
                      id="recomendacoes"
                      placeholder="Insira as recomendações para o uso do medicamento, detalhes da dose ou outras informações relevantes."
                      value={formData.recomendacoes}
                      onChange={(e) => setFormData({...formData, recomendacoes: e.target.value})}
                      maxLength={500}
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.recomendacoes.length}/500 caracteres</p>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={handleLimparCampos}>
                      Limpar campos
                    </Button>
                    <Button onClick={handleSalvarPrescricao}>
                      Salvar prescrição
                    </Button>
                    <Button variant="outline" onClick={() => setShowModal(false)}>
                      Fechar
                    </Button>
                    <Button variant="outline" onClick={() => setShowEncaminhar(true)}>
                      Encaminhar
                    </Button>
                  </div>
                </div>

                {/* Lista lateral de medicamentos */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Medicamentos prescritos</h3>
                  {medicamentos.length === 0 ? (
                    <p className="text-sm text-gray-500">Nenhum medicamento adicionado</p>
                  ) : (
                    medicamentos.map((medicamento) => (
                      <Card key={medicamento.id} className="p-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{medicamento.nome}</p>
                            <p className="text-xs text-gray-600">{medicamento.formaFarmaceutica}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0"
                              onClick={() => setShowConfirmDelete(medicamento.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <h3 className="text-lg font-semibold">Confirmar exclusão</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Deseja excluir este medicamento? Este medicamento será excluído da prescrição do atendimento.
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowConfirmDelete(null)}>
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleExcluirMedicamento(showConfirmDelete)}
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
