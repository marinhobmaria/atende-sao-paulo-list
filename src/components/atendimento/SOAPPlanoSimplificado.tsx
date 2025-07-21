import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2, FileText, Stethoscope, UserCheck, Calendar as CalendarClock, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface SOAPPlanoSimplificadoProps {
  data?: any;
  onChange?: (data: any) => void;
}

export const SOAPPlanoSimplificado = ({ data = {}, onChange }: SOAPPlanoSimplificadoProps) => {
  const [formData, setFormData] = useState({
    condutaPlanoTerapeutico: data.condutaPlanoTerapeutico || '',
    prescricoes: data.prescricoes || [],
    examesSolicitados: data.examesSolicitados || [],
    encaminhamentos: data.encaminhamentos || [],
    agendamentoRetorno: data.agendamentoRetorno || '',
    dataRetorno: data.dataRetorno || null,
    orientacoesPaciente: data.orientacoesPaciente || ''
  });

  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange?.(updatedData);
  };

  const addPrescricao = () => {
    const novasPrescricoes = [...formData.prescricoes, {
      medicamento: '',
      dose: '',
      frequencia: '',
      via: '',
      duracao: '',
      instrucoes: ''
    }];
    handleInputChange('prescricoes', novasPrescricoes);
  };

  const removePrescricao = (index: number) => {
    const novasPrescricoes = formData.prescricoes.filter((_: any, i: number) => i !== index);
    handleInputChange('prescricoes', novasPrescricoes);
  };

  const updatePrescricao = (index: number, field: string, value: string) => {
    const novasPrescricoes = [...formData.prescricoes];
    novasPrescricoes[index] = { ...novasPrescricoes[index], [field]: value };
    handleInputChange('prescricoes', novasPrescricoes);
  };

  const addExame = () => {
    const novosExames = [...formData.examesSolicitados, {
      tipo: '',
      motivo: '',
      urgencia: ''
    }];
    handleInputChange('examesSolicitados', novosExames);
  };

  const removeExame = (index: number) => {
    const novosExames = formData.examesSolicitados.filter((_: any, i: number) => i !== index);
    handleInputChange('examesSolicitados', novosExames);
  };

  const updateExame = (index: number, field: string, value: string) => {
    const novosExames = [...formData.examesSolicitados];
    novosExames[index] = { ...novosExames[index], [field]: value };
    handleInputChange('examesSolicitados', novosExames);
  };

  const addEncaminhamento = () => {
    const novosEncaminhamentos = [...formData.encaminhamentos, {
      destino: '',
      motivo: '',
      urgencia: ''
    }];
    handleInputChange('encaminhamentos', novosEncaminhamentos);
  };

  const removeEncaminhamento = (index: number) => {
    const novosEncaminhamentos = formData.encaminhamentos.filter((_: any, i: number) => i !== index);
    handleInputChange('encaminhamentos', novosEncaminhamentos);
  };

  const updateEncaminhamento = (index: number, field: string, value: string) => {
    const novosEncaminhamentos = [...formData.encaminhamentos];
    novosEncaminhamentos[index] = { ...novosEncaminhamentos[index], [field]: value };
    handleInputChange('encaminhamentos', novosEncaminhamentos);
  };

  useEffect(() => {
    setFormData({
      condutaPlanoTerapeutico: data.condutaPlanoTerapeutico || '',
      prescricoes: data.prescricoes || [],
      examesSolicitados: data.examesSolicitados || [],
      encaminhamentos: data.encaminhamentos || [],
      agendamentoRetorno: data.agendamentoRetorno || '',
      dataRetorno: data.dataRetorno || null,
      orientacoesPaciente: data.orientacoesPaciente || ''
    });
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          SOAP - Plano
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Conduta/Plano Terapêutico */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold">Conduta/Plano Terapêutico</h3>
            <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condutaPlanoTerapeutico">
              Descrição da Conduta Médica, Procedimentos, Intervenções *
            </Label>
            <Textarea
              id="condutaPlanoTerapeutico"
              placeholder="Descreva a conduta médica, procedimentos e intervenções..."
              value={formData.condutaPlanoTerapeutico}
              onChange={(e) => handleInputChange('condutaPlanoTerapeutico', e.target.value)}
              rows={4}
              required
            />
            <p className="text-xs text-muted-foreground">
              Mínimo 10 caracteres
            </p>
          </div>
        </div>

        <Separator />

        {/* Prescrições */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Prescrições</h3>
            <Button onClick={addPrescricao} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Prescrição
            </Button>
          </div>
          
          {formData.prescricoes.map((prescricao: any, index: number) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Prescrição {index + 1}</h4>
                <Button 
                  onClick={() => removePrescricao(index)} 
                  size="sm" 
                  variant="ghost"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Medicamento</Label>
                  <Input
                    placeholder="Nome do medicamento"
                    value={prescricao.medicamento}
                    onChange={(e) => updatePrescricao(index, 'medicamento', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Dose</Label>
                  <Input
                    placeholder="Ex: 500mg"
                    value={prescricao.dose}
                    onChange={(e) => updatePrescricao(index, 'dose', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Frequência</Label>
                  <Input
                    placeholder="Ex: 8/8h"
                    value={prescricao.frequencia}
                    onChange={(e) => updatePrescricao(index, 'frequencia', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Via</Label>
                  <Select value={prescricao.via} onValueChange={(value) => updatePrescricao(index, 'via', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a via" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oral">Oral</SelectItem>
                      <SelectItem value="sublingual">Sublingual</SelectItem>
                      <SelectItem value="intramuscular">Intramuscular</SelectItem>
                      <SelectItem value="intravenosa">Intravenosa</SelectItem>
                      <SelectItem value="subcutanea">Subcutânea</SelectItem>
                      <SelectItem value="topica">Tópica</SelectItem>
                      <SelectItem value="inalatoria">Inalatória</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Duração</Label>
                  <Input
                    placeholder="Ex: 7 dias"
                    value={prescricao.duracao}
                    onChange={(e) => updatePrescricao(index, 'duracao', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Instruções</Label>
                  <Input
                    placeholder="Ex: Tomar com alimentos"
                    value={prescricao.instrucoes}
                    onChange={(e) => updatePrescricao(index, 'instrucoes', e.target.value)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Exames Solicitados */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Exames Solicitados</h3>
            <Button onClick={addExame} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Exame
            </Button>
          </div>
          
          {formData.examesSolicitados.map((exame: any, index: number) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Exame {index + 1}</h4>
                <Button 
                  onClick={() => removeExame(index)} 
                  size="sm" 
                  variant="ghost"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Exame</Label>
                  <Input
                    placeholder="Ex: Hemograma completo"
                    value={exame.tipo}
                    onChange={(e) => updateExame(index, 'tipo', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Motivo</Label>
                  <Input
                    placeholder="Motivo da solicitação"
                    value={exame.motivo}
                    onChange={(e) => updateExame(index, 'motivo', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Urgência</Label>
                  <Select value={exame.urgencia} onValueChange={(value) => updateExame(index, 'urgencia', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgente">Urgente</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="eletivo">Eletivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Encaminhamentos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">Encaminhamentos</h3>
            </div>
            <Button onClick={addEncaminhamento} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Encaminhamento
            </Button>
          </div>
          
          {formData.encaminhamentos.map((encaminhamento: any, index: number) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Encaminhamento {index + 1}</h4>
                <Button 
                  onClick={() => removeEncaminhamento(index)} 
                  size="sm" 
                  variant="ghost"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Destino</Label>
                  <Input
                    placeholder="Ex: Cardiologia"
                    value={encaminhamento.destino}
                    onChange={(e) => updateEncaminhamento(index, 'destino', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Motivo</Label>
                  <Input
                    placeholder="Motivo do encaminhamento"
                    value={encaminhamento.motivo}
                    onChange={(e) => updateEncaminhamento(index, 'motivo', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Urgência</Label>
                  <Select value={encaminhamento.urgencia} onValueChange={(value) => updateEncaminhamento(index, 'urgencia', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgente">Urgente</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="eletivo">Eletivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Agendamento de Retorno */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <CalendarClock className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold">Agendamento de Retorno</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data Sugerida para Retorno</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dataRetorno && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataRetorno ? format(formData.dataRetorno, "dd/MM/yyyy") : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dataRetorno}
                    onSelect={(date) => handleInputChange('dataRetorno', date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="agendamentoRetorno">Motivo do Retorno</Label>
              <Input
                id="agendamentoRetorno"
                placeholder="Ex: Reavaliação, controle de exames..."
                value={formData.agendamentoRetorno}
                onChange={(e) => handleInputChange('agendamentoRetorno', e.target.value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Orientações ao Paciente */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Orientações ao Paciente</h3>
            <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="orientacoesPaciente">
              Recomendações, Cuidados, Sinais de Alerta, Restrições *
            </Label>
            <Textarea
              id="orientacoesPaciente"
              placeholder="Descreva as orientações para o paciente: recomendações, cuidados, sinais de alerta, restrições..."
              value={formData.orientacoesPaciente}
              onChange={(e) => handleInputChange('orientacoesPaciente', e.target.value)}
              rows={4}
              required
            />
            <p className="text-xs text-muted-foreground">
              Mínimo 10 caracteres
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};