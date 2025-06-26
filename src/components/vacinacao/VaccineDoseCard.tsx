
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, FileText, Calendar } from "lucide-react";
import { useState } from "react";

interface VaccineDose {
  id: string;
  nome: string;
  dose: string;
  estrategia: string;
  dataAplicacao: Date;
  localAplicacao: string;
  lote: string;
  fabricante: string;
  dataValidade: string;
  grupoAtendimento: string;
  transcricaoCaderneta: boolean;
  isEditavel: boolean;
}

interface VaccineDoseCardProps {
  dose: VaccineDose;
  onEdit: (doseId: string) => void;
  onDelete: (doseId: string) => void;
}

export const VaccineDoseCard = ({ dose, onEdit, onDelete }: VaccineDoseCardProps) => {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleCardClick = () => {
    if (dose.isEditavel) {
      setShowActions(true);
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(dose.id);
    setShowDeleteConfirm(false);
    setShowActions(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <>
      <Card 
        className={`cursor-pointer transition-colors ${dose.isEditavel ? 'hover:bg-gray-50' : ''}`}
        onClick={handleCardClick}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium">{dose.nome}</h4>
                <Badge variant="outline">{dose.dose}</Badge>
                {dose.transcricaoCaderneta && (
                  <Badge variant="secondary">Transcrição</Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Estratégia:</span> {dose.estrategia}
                </div>
                <div>
                  <span className="font-medium">Data aplicação:</span> {formatDate(dose.dataAplicacao)}
                </div>
                <div>
                  <span className="font-medium">Local:</span> {dose.localAplicacao}
                </div>
                <div>
                  <span className="font-medium">Lote:</span> {dose.lote}
                </div>
                <div>
                  <span className="font-medium">Fabricante:</span> {dose.fabricante}
                </div>
                <div>
                  <span className="font-medium">Validade:</span> {dose.dataValidade}
                </div>
              </div>
            </div>
            {dose.isEditavel && (
              <div className="ml-4">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  Editável
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Ações */}
      {showActions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Ações para {dose.nome} - {dose.dose}</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={() => {
                  onEdit(dose.id);
                  setShowActions(false);
                }}
                className="w-full justify-start"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar dose
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                className="w-full justify-start text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir dose
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowActions(false)}
                className="w-full justify-start"
              >
                <FileText className="h-4 w-4 mr-2" />
                Transcrição de caderneta
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowActions(false)}
                className="w-full justify-start"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Aprazar
              </Button>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => setShowActions(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Excluir Aplicação</h3>
            <p className="text-gray-600 mb-6">
              Deseja excluir a aplicação?
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancelar
              </Button>
              <Button onClick={confirmDelete} variant="destructive">
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
