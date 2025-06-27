
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Baby, Heart, Users } from 'lucide-react';

export const SOAPObjetivo = () => {
  const [showPrenatalModal, setShowPrenatalModal] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>SOAP - Objetivo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Botões especializados */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 hover:bg-pink-50"
            onClick={() => console.log('Puericultura clicked')}
          >
            <Baby className="w-4 h-4" />
            Puericultura
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 hover:bg-blue-50"
            onClick={() => setShowPrenatalModal(true)}
          >
            <Heart className="w-4 h-4" />
            Pré-Natal
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 hover:bg-green-50"
            onClick={() => console.log('Idoso clicked')}
          >
            <Users className="w-4 h-4" />
            Idoso
          </Button>
        </div>

        {/* Modal do Pré-Natal */}
        <Dialog open={showPrenatalModal} onOpenChange={setShowPrenatalModal}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-blue-600">
                Documento de Regras de Negócio - Pré-Natal
              </DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="h-[70vh] pr-4">
              <div className="space-y-6 text-sm">
                {/* 1.1 Contexto */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">1.1 Contexto</h3>
                  <p className="text-gray-700 leading-relaxed">
                    O acompanhamento do pré-natal é uma das mais importantes ações de cuidado da Atenção Primária à Saúde. 
                    O sistema organiza o módulo de pré-natal a partir do preenchimento de dados estruturados no modelo SOAP, 
                    alimentando automaticamente o Cartão da Gestante com dados clínicos e epidemiológicos essenciais. A entrada 
                    de dados se inicia com o registro da gravidez e prossegue com o acompanhamento, medições clínicas, exames e 
                    desfecho gestacional.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    O correto preenchimento dos campos relacionados ao pré-natal possibilita ao sistema identificar automaticamente 
                    o início do acompanhamento, classificar o risco gestacional, controlar indicadores, gerar projeções de 
                    agendamentos conforme o Caderno de Atenção Básica nº 32 e oferecer recursos de impressão para facilitar o 
                    cuidado compartilhado entre serviços.
                  </p>
                </section>

                {/* 1.2 Processo Relacionado */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">1.2 Processo Relacionado</h3>
                  <p className="text-gray-700 mb-2">
                    O processo de acompanhamento do pré-natal está inserido no fluxo assistencial do prontuário e ocorre em etapas:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Registro inicial da condição de gravidez no bloco "Problemas/Condições e Alergias" na seção "Avaliação" por meio de registro CIAP-2 ou CID-10;</li>
                    <li>Ativação automática do bloco de pré-natal (primeira consulta);</li>
                    <li>Registro das condições clínicas e dados obstétricos;</li>
                    <li>Evoluções subsequentes do acompanhamento (SOAP Objetivo);</li>
                    <li>Desfecho gestacional com encerramento da condição;</li>
                    <li>Projeção automática de consultas futuras até o parto;</li>
                    <li>Impressão e visualização do cartão da gestante.</li>
                  </ul>
                </section>

                {/* 1.3 Atores */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">1.3 Atores</h3>
                  <p className="text-gray-700">
                    Podem acessar o SOAP e preencher o pré natal: profissionais de saúde (médicos, enfermeiros, técnicos de enfermagem, cirurgião dentista).
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    *OBS: Os códigos CBO desses profissionais foram informados em documentos anteriores.
                  </p>
                </section>

                {/* 1.4 Seção: Pré Natal */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">1.4 Seção: Pré Natal</h3>
                  
                  {/* #01 Registro da condição de gravidez */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">#01 Registro da condição de gravidez</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Regras:</strong></p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>O início do acompanhamento pré-natal se dá por meio do registro de uma condição de gravidez ativa, obrigatoriamente no campo "Problema e/ou Condição Detectada" do bloco Avaliação da evolução SOAP.</li>
                        <li>Para que o sistema ative automaticamente o módulo de pré-natal e exiba os campos clínicos correspondentes, é necessário que o profissional registre um dos códigos de gravidez, mantendo o status da condição como "Ativo".</li>
                      </ul>
                      
                      <div className="mt-3">
                        <p className="font-medium">Códigos que ativam o acompanhamento pré-natal:</p>
                        <div className="grid md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="font-medium text-blue-700">CIAP-2:</p>
                            <ul className="list-disc pl-4 text-xs space-y-1">
                              <li>W71 – Infecções que complicam a gravidez</li>
                              <li>W78 – Gravidez</li>
                              <li>W79 – Gravidez não desejada</li>
                              <li>W80 – Gravidez ectópica</li>
                              <li>W81 – Toxemia gravídica – DHEG</li>
                              <li>W84 – Gravidez de alto risco</li>
                              <li>W85 – Diabetes gestacional</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-blue-700">CID-10:</p>
                            <ul className="list-disc pl-4 text-xs space-y-1">
                              <li>Z34 – Supervisão de gravidez normal (e subgrupos)</li>
                              <li>Z35 – Supervisão de gravidez de alto risco (e subgrupos)</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-3 rounded mt-3">
                        <p className="text-yellow-800 font-medium">⚠️ Importante:</p>
                        <p className="text-yellow-700 text-xs">
                          Após o registro da condição de gravidez, o sistema exige o preenchimento da Data da Última Menstruação (DUM) 
                          para permitir a finalização da consulta. Caso a DUM não seja informada, o sistema bloqueia a finalização e 
                          exibe uma mensagem de erro: "Informe a DUM para concluir o registro de gestação."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* #02 Exibição do quadro de Pré-Natal na Folha de Rosto */}
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">#02 Exibição do quadro de Pré-Natal na Folha de Rosto</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Regras:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>O quadro "Acompanhamento do Pré Natal" é exibido de forma fixa na Folha de Rosto do Prontuário Eletrônico.</li>
                        <li>Após o encerramento da primeira consulta com condição de gravidez ativa e DUM informada, o sistema passa a exibir automaticamente o quadro "Pré-Natal" na Folha de Rosto.</li>
                        <li>O quadro sintetiza informações clínicas e de acompanhamento, sendo atualizado dinamicamente a partir dos registros feitos em cada consulta.</li>
                      </ul>
                      
                      <div className="mt-3">
                        <p className="font-medium">Informações exibidas:</p>
                        <ul className="list-disc pl-4 text-xs space-y-1">
                          <li>Risco da gestação: Habitual ou Alto (ícone colorido)</li>
                          <li>DUM (Data da Última Menstruação)</li>
                          <li>IG cronológica (calculada automaticamente com base na DUM)</li>
                          <li>DPP cronológica (calculada pela regra de Naegele, com base na DUM)</li>
                          <li>DPP ecográfica: informada manualmente, se disponível</li>
                          <li>Tipo de gravidez: única, gemelar, múltipla, ignorada</li>
                          <li>Consultas realizadas: número total de atendimentos do pré-natal registrados</li>
                          <li>Data da última consulta</li>
                          <li>Última consulta odontológica: preenchido a partir dos atendimentos vinculados à gestação</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* #03 Registro da primeira consulta de pré-natal */}
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-purple-800 mb-2">#03 Registro da primeira consulta de pré-natal</h4>
                    <div className="space-y-2 text-gray-700">
                      <p className="text-sm">
                        A primeira consulta de pré-natal deve ser realizada preferencialmente até a 12ª semana de gestação e é 
                        registrada no sistema e-SUS APS por meio da evolução clínica no modelo SOAP.
                      </p>
                      
                      <div className="mt-3">
                        <p className="font-medium">Campos a preencher:</p>
                        <div className="grid md:grid-cols-2 gap-3 mt-2">
                          <ul className="list-disc pl-4 text-xs space-y-1">
                            <li><strong>Tipo de gravidez:</strong> Única, Dupla/Gemelar, Tripla ou mais, Ignorada</li>
                            <li><strong>Altura uterina (cm):</strong> Campo numérico livre</li>
                            <li><strong>Risco da gravidez:</strong> Automático (Habitual/Alto risco)</li>
                            <li><strong>Edema:</strong> – (ausente), +, ++, +++</li>
                          </ul>
                          <ul className="list-disc pl-4 text-xs space-y-1">
                            <li><strong>Movimentação fetal:</strong> Sim/Não</li>
                            <li><strong>Gravidez planejada:</strong> Sim/Não</li>
                            <li><strong>Batimento cardíaco fetal (bpm):</strong> Campo livre</li>
                            <li><strong>Data da última menstruação (DUM):</strong> Campo data obrigatório</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Demais regras em formato resumido */}
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-gray-800">#04 Classificação do Risco Gestacional</h4>
                      <p className="text-xs text-gray-600">Classificação automática como risco habitual (W78/Z34) ou alto risco (demais códigos).</p>
                    </div>
                    
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-gray-800">#05 Dados obstétricos no Bloco "Antecedentes"</h4>
                      <p className="text-xs text-gray-600">Informações obstétricas anteriores registradas no bloco "Antecedentes sobre Parto e Nascimento".</p>
                    </div>
                    
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-gray-800">#06-07 Sinais vitais e medidas clínicas</h4>
                      <p className="text-xs text-gray-600">Registro e visualização de parâmetros clínicos, com gráficos de acompanhamento na Folha de Rosto.</p>
                    </div>
                    
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-gray-800">#08 Solicitação de exames</h4>
                      <p className="text-xs text-gray-600">Exames recomendados solicitados no bloco SOAP – Plano.</p>
                    </div>
                    
                    <div className="border-l-4 border-indigo-400 pl-4">
                      <h4 className="font-semibold text-gray-800">#09 Histórico da condição</h4>
                      <p className="text-xs text-gray-600">Histórico exibido na Folha de Rosto no quadro "Últimos contatos".</p>
                    </div>
                    
                    <div className="border-l-4 border-pink-400 pl-4">
                      <h4 className="font-semibold text-gray-800">#10 Agendamento de consultas</h4>
                      <p className="text-xs text-gray-600">Sugestões automáticas de agendamento baseadas na idade gestacional.</p>
                    </div>
                    
                    <div className="border-l-4 border-orange-400 pl-4">
                      <h4 className="font-semibold text-gray-800">#11 Desfecho da gestação</h4>
                      <p className="text-xs text-gray-600">Registro de códigos de encerramento (parto, aborto, natimorto) que finalizam o acompanhamento.</p>
                    </div>
                    
                    <div className="border-l-4 border-teal-400 pl-4">
                      <h4 className="font-semibold text-gray-800">#12 Impressão do Cartão da Gestante</h4>
                      <p className="text-xs text-gray-600">Geração de PDF com dados completos do acompanhamento gestacional.</p>
                    </div>
                    
                    <div className="border-l-4 border-gray-400 pl-4">
                      <h4 className="font-semibold text-gray-800">#13 Acompanhamento do Pré Natal</h4>
                      <p className="text-xs text-gray-600">Card na folha de rosto com resumo das dimensões alteradas.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Conteúdo adicional do SOAP Objetivo */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Demais funcionalidades do SOAP Objetivo serão exibidas aqui...
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
