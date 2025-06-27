
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Baby, Heart, Users } from "lucide-react";

export const SOAPObjetivo = () => {
  const [showPrenatalModal, setShowPrenatalModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Botões especializados */}
      <Card>
        <CardHeader>
          <CardTitle>Programas Especiais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => console.log("Puericultura clicked")}
            >
              <Baby className="h-5 w-5 text-blue-600" />
              <span>Puericultura</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => setShowPrenatalModal(true)}
            >
              <Heart className="h-5 w-5 text-pink-600" />
              <span>Pré-Natal</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto p-4"
              onClick={() => console.log("Idoso clicked")}
            >
              <Users className="h-5 w-5 text-green-600" />
              <span>Idoso</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Seções existentes do SOAP Objetivo */}
      <Card>
        <CardHeader>
          <CardTitle>Exame Físico</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Área para registro do exame físico do paciente.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Antropometria, Sinais Vitais e Glicemia Capilar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Registro de dados antropométricos, sinais vitais e glicemia.
          </p>
        </CardContent>
      </Card>

      {/* Modal do Pré-Natal */}
      <Dialog open={showPrenatalModal} onOpenChange={setShowPrenatalModal}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              Documento de Regras de Negócio - Pré-Natal
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6">
              {/* 1.1 Contexto */}
              <section>
                <h3 className="text-lg font-semibold mb-3">1.1 Contexto</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  O acompanhamento do pré-natal é uma das mais importantes ações de cuidado da Atenção Primária à Saúde. 
                  O sistema organiza o módulo de pré-natal a partir do preenchimento de dados estruturados no modelo SOAP, 
                  alimentando automaticamente o Cartão da Gestante com dados clínicos e epidemiológicos essenciais. 
                  A entrada de dados se inicia com o registro da gravidez e prossegue com o acompanhamento, medições clínicas, 
                  exames e desfecho gestacional.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  O correto preenchimento dos campos relacionados ao pré-natal possibilita ao sistema identificar automaticamente 
                  o início do acompanhamento, classificar o risco gestacional, controlar indicadores, gerar projeções de agendamentos 
                  conforme o Caderno de Atenção Básica nº 32 e oferecer recursos de impressão para facilitar o cuidado compartilhado 
                  entre serviços.
                </p>
              </section>

              {/* 1.2 Processo Relacionado */}
              <section>
                <h3 className="text-lg font-semibold mb-3">1.2 Processo Relacionado</h3>
                <p className="text-sm text-gray-700 mb-2">
                  O processo de acompanhamento do pré-natal está inserido no fluxo assistencial do prontuário e ocorre em etapas:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>Registro inicial da condição de gravidez no bloco "Problemas/Condições e Alergias" na seção "Avaliação" por meio de registro CIAP-2 ou CID-10</li>
                  <li>Ativação automática do bloco de pré-natal (primeira consulta)</li>
                  <li>Registro das condições clínicas e dados obstétricos</li>
                  <li>Evoluções subsequentes do acompanhamento (SOAP Objetivo)</li>
                  <li>Desfecho gestacional com encerramento da condição</li>
                  <li>Projeção automática de consultas futuras até o parto</li>
                  <li>Impressão e visualização do cartão da gestante</li>
                </ul>
              </section>

              {/* 1.3 Atores */}
              <section>
                <h3 className="text-lg font-semibold mb-3">1.3 Atores</h3>
                <p className="text-sm text-gray-700">
                  Podem acessar o SOAP e preencher o pré-natal: profissionais de saúde (médicos, enfermeiros, técnicos de enfermagem, cirurgião dentista).
                </p>
              </section>

              {/* 1.4 Seção: Pré Natal */}
              <section>
                <h3 className="text-lg font-semibold mb-4">1.4 Seção: Pré-Natal</h3>
                
                {/* #01 Registro da condição de gravidez */}
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">#01 Registro da condição de gravidez</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Regras:</h5>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                      <li>O início do acompanhamento pré-natal se dá por meio do registro de uma condição de gravidez ativa, obrigatoriamente no campo "Problema e/ou Condição Detectada" do bloco Avaliação da evolução SOAP.</li>
                      <li>Para que o sistema ative automaticamente o módulo de pré-natal e exiba os campos clínicos correspondentes, é necessário que o profissional registre um dos códigos de gravidez, mantendo o status da condição como "Ativo".</li>
                    </ul>
                    
                    <div className="mt-3">
                      <h6 className="font-medium mb-2">Códigos que ativam o acompanhamento pré-natal:</h6>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-sm">CIAP-2:</p>
                          <ul className="list-disc list-inside text-xs text-gray-600 ml-2">
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
                          <p className="font-medium text-sm">CID-10:</p>
                          <ul className="list-disc list-inside text-xs text-gray-600 ml-2">
                            <li>Z34 – Supervisão de gravidez normal (e subgrupos)</li>
                            <li>Z35 – Supervisão de gravidez de alto risco (e subgrupos)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-sm text-yellow-800">
                        <strong>Importante:</strong> Após o registro da condição de gravidez, o sistema exige o preenchimento da Data da Última Menstruação (DUM) para permitir a finalização da consulta. 
                        Caso a DUM não seja informada, o sistema bloqueia a finalização e exibe uma mensagem de erro: "Informe a DUM para concluir o registro de gestação."
                      </p>
                    </div>
                  </div>
                </div>

                {/* #02 Exibição do quadro de Pré-Natal na Folha de Rosto */}
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">#02 Exibição do quadro de Pré-Natal na Folha de Rosto</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Regras:</h5>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                      <li>O quadro "Acompanhamento do Pré Natal" é exibido de forma fixa na Folha de Rosto do Prontuário Eletrônico.</li>
                      <li>Após o encerramento da primeira consulta com condição de gravidez ativa e DUM informada, o sistema passa a exibir automaticamente o quadro "Pré-Natal" na Folha de Rosto.</li>
                      <li>O quadro sintetiza informações clínicas e de acompanhamento, sendo atualizado dinamicamente a partir dos registros feitos em cada consulta.</li>
                    </ul>
                    
                    <div className="mt-3">
                      <h6 className="font-medium mb-2">Informações exibidas:</h6>
                      <ul className="list-disc list-inside text-xs text-gray-600 ml-2 space-y-1">
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
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">#03 Registro da primeira consulta de pré-natal</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Regras:</h5>
                    <p className="text-sm text-gray-700 mb-3">
                      A primeira consulta de pré-natal deve ser realizada preferencialmente até a 12ª semana de gestação e é registrada no sistema e-SUS APS por meio da evolução clínica no modelo SOAP.
                    </p>
                    
                    <div className="mt-3">
                      <h6 className="font-medium mb-2">Campos a serem preenchidos:</h6>
                      <div className="grid md:grid-cols-2 gap-3">
                        <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                          <li><strong>Tipo de gravidez:</strong> Única, Dupla/Gemelar, Tripla ou mais, Ignorada</li>
                          <li><strong>Altura uterina (cm):</strong> Campo livre para inserção em centímetros</li>
                          <li><strong>Risco da gravidez:</strong> Exibido automaticamente como "Habitual"</li>
                          <li><strong>Edema:</strong> – (ausente), +, ++, +++</li>
                        </ul>
                        <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                          <li><strong>Movimentação fetal:</strong> Sim / Não</li>
                          <li><strong>Gravidez planejada:</strong> Sim / Não</li>
                          <li><strong>Batimento cardíaco fetal (bpm):</strong> Campo livre</li>
                          <li><strong>Data da última menstruação (DUM):</strong> Campo data obrigatório</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* #04 Classificação do Risco Gestacional */}
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">#04 Classificação do Risco Gestacional</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      Sempre que for registrado ou atualizado um problema ou condição relacionada à gravidez, o sistema deve avaliar automaticamente o risco gestacional da gestante.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <h6 className="font-medium text-green-800 mb-1">Risco Habitual (baixo risco):</h6>
                        <p className="text-xs text-green-700">W78 (CIAP2 – Gravidez) ou Z34 (CID-10 – Supervisão de gravidez normal)</p>
                      </div>
                      <div className="p-3 bg-red-50 border border-red-200 rounded">
                        <h6 className="font-medium text-red-800 mb-1">Alto Risco:</h6>
                        <p className="text-xs text-red-700">Qualquer outro código da lista definida para complicações ou condições especiais da gestação</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continuar com outras seções... */}
                <div className="space-y-4">
                  <h5 className="font-medium text-gray-800">Outras seções importantes:</h5>
                  <div className="grid gap-2 text-sm text-gray-600">
                    <p><strong>#05</strong> - Preenchimento dos dados obstétricos no Bloco "Antecedentes"</p>
                    <p><strong>#06</strong> - Registro de sinais vitais e medidas clínicas gestacionais</p>
                    <p><strong>#07</strong> - Visualização de sinais vitais e medidas clínicas gestacionais</p>
                    <p><strong>#08</strong> - Solicitação de exames recomendados no pré-natal</p>
                    <p><strong>#09</strong> - Histórico da condição</p>
                    <p><strong>#10</strong> - Agendamento de consultas do Pré-natal</p>
                    <p><strong>#11</strong> - Registro do desfecho da gestação</p>
                    <p><strong>#12</strong> - Impressão do Cartão de Acompanhamento da Gestante</p>
                    <p><strong>#13</strong> - Acompanhamento do Pré Natal</p>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
