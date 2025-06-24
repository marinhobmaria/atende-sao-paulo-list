
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Printer, MoreVertical, Filter } from "lucide-react";
import { Atestado } from "./AtestadoSection";

interface AtestadoListProps {
  atestados: Atestado[];
  onEdit: (atestado: Atestado) => void;
  onDelete: (id: string) => void;
}

export const AtestadoList = ({ atestados, onEdit, onDelete }: AtestadoListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAtestado, setSelectedAtestado] = useState<Atestado | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const filteredAtestados = atestados.filter(atestado => {
    const matchesSearch = !searchTerm || 
      atestado.profissional.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atestado.unidadeSaude.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMyFilter = !showOnlyMine || atestado.profissional.nome === "Dr. João Silva";

    return matchesSearch && matchesMyFilter;
  });

  const handlePrint = (atestado: Atestado) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Atestado</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; margin: 20px 0; text-align: center; }
            .content { margin: 20px 0; text-align: justify; }
            .footer { margin-top: 40px; }
            .signature { margin-top: 60px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>UBS Central</h2>
            <p>Sistema de Prontuário Eletrônico</p>
          </div>
          <div class="title">${atestado.modelo === 'licenca-maternidade' ? 'LICENÇA MATERNIDADE' : 'ATESTADO'}</div>
          <div class="content">
            ${atestado.texto.replace(/\n/g, '<br>')}
          </div>
          <div class="footer">
            <p><strong>Local:</strong> São Paulo, SP</p>
            <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}</p>
          </div>
          <div class="signature">
            <p><strong>${atestado.profissional.nome}</strong></p>
            <p>${atestado.profissional.crm}</p>
            <p>${atestado.profissional.especialidade}</p>
            <p>São Paulo, SP - ${new Date().toLocaleDateString('pt-BR', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}</p>
          </div>
        </body>
        </html>
      `;
      
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Lista de Atestados
            <Button variant="outline" onClick={() => setShowFilters(true)}>
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar por profissional ou unidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={showOnlyMine ? "mine" : "all"} onValueChange={(value) => setShowOnlyMine(value === "mine")}>
                <SelectTrigger className="w-60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os atestados</SelectItem>
                  <SelectItem value="mine">Ver somente os meus atestados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredAtestados.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                NENHUM REGISTRO ENCONTRADO
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data de Emissão</TableHead>
                      <TableHead>Profissional</TableHead>
                      <TableHead>Unidade de Saúde</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAtestados.map((atestado) => (
                      <TableRow key={atestado.id}>
                        <TableCell>
                          {new Date(atestado.dataEmissao).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{atestado.profissional.nome}</div>
                            <div className="text-sm text-muted-foreground">
                              {atestado.profissional.especialidade}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{atestado.unidadeSaude}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedAtestado(atestado)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePrint(atestado)}
                            >
                              <Printer className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => onEdit(atestado)}>
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onDelete(atestado.id)}>
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="text-sm text-muted-foreground">
                  {filteredAtestados.length} resultado{filteredAtestados.length !== 1 ? 's' : ''}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Visualização */}
      <Dialog open={!!selectedAtestado} onOpenChange={() => setSelectedAtestado(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Visualizar Atestado</DialogTitle>
          </DialogHeader>
          {selectedAtestado && (
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-gray-50 whitespace-pre-wrap">
                {selectedAtestado.texto}
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handlePrint(selectedAtestado)}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
