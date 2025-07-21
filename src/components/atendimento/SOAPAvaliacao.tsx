
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ClipboardList, Search } from 'lucide-react';

interface SOAPAvaliacaoProps {
  data?: any;
  onChange?: (data: any) => void;
}

export const SOAPAvaliacao = ({ data = {}, onChange }: SOAPAvaliacaoProps) => {
  const [formData, setFormData] = useState({
    diagnosticoPrincipal: data.diagnosticoPrincipal || '',
    diagnosticosDiferenciais: data.diagnosticosDiferenciais || '',
    classificacaoRisco: data.classificacaoRisco || '',
    observacoesClinicas: data.observacoesClinicas || ''
  });

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange?.(updatedData);
  };

  useEffect(() => {
    setFormData({
      diagnosticoPrincipal: data.diagnosticoPrincipal || '',
      diagnosticosDiferenciais: data.diagnosticosDiferenciais || '',
      classificacaoRisco: data.classificacaoRisco || '',
      observacoesClinicas: data.observacoesClinicas || ''
    });
  }, [data]);

  const getRiscoColor = (risco: string) => {
    switch (risco) {
      case 'vermelho': return 'bg-red-500 text-white';
      case 'amarelo': return 'bg-yellow-500 text-white';
      case 'verde': return 'bg-green-500 text-white';
      case 'azul': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          SOAP - Avaliação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Diagnóstico Principal */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold">Diagnóstico Principal</h3>
            <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="diagnosticoPrincipal">
              Diagnóstico Clínico Principal (CID-10/CIAP2) *
            </Label>
            <Input
              id="diagnosticoPrincipal"
              placeholder="Digite para buscar diagnóstico (CID-10/CIAP2)..."
              value={formData.diagnosticoPrincipal}
              onChange={(e) => handleInputChange('diagnosticoPrincipal', e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Seleção obrigatória de lista CID-10/CIAP2 (autocomplete)
            </p>
          </div>
        </div>

        <Separator />

        {/* Diagnósticos Diferenciais */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Diagnósticos Diferenciais</h3>
          
          <div className="space-y-2">
            <Label htmlFor="diagnosticosDiferenciais">
              Outras Hipóteses Diagnósticas Consideradas
            </Label>
            <Textarea
              id="diagnosticosDiferenciais"
              placeholder="Descreva outras hipóteses diagnósticas consideradas..."
              value={formData.diagnosticosDiferenciais}
              onChange={(e) => handleInputChange('diagnosticosDiferenciais', e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Lista ou texto livre
            </p>
          </div>
        </div>

        <Separator />

        {/* Classificação de Risco */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold">Classificação de Risco</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="classificacaoRisco">
              Grau de Urgência do Caso
            </Label>
            <Select
              value={formData.classificacaoRisco}
              onValueChange={(value) => handleInputChange('classificacaoRisco', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a classificação de risco" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vermelho">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    Vermelho - Emergência
                  </div>
                </SelectItem>
                <SelectItem value="amarelo">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    Amarelo - Urgência
                  </div>
                </SelectItem>
                <SelectItem value="verde">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Verde - Pouco Urgente
                  </div>
                </SelectItem>
                <SelectItem value="azul">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    Azul - Não Urgente
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            {formData.classificacaoRisco && (
              <div className="mt-2">
                <Badge className={getRiscoColor(formData.classificacaoRisco)}>
                  Classificação: {formData.classificacaoRisco.charAt(0).toUpperCase() + formData.classificacaoRisco.slice(1)}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Observações Clínicas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Observações Clínicas</h3>
          
          <div className="space-y-2">
            <Label htmlFor="observacoesClinicas">
              Comentários Adicionais sobre a Avaliação
            </Label>
            <Textarea
              id="observacoesClinicas"
              placeholder="Registre observações clínicas adicionais relevantes para a avaliação..."
              value={formData.observacoesClinicas}
              onChange={(e) => handleInputChange('observacoesClinicas', e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
