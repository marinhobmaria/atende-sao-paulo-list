
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AtestadoForm } from "./AtestadoForm";
import { AtestadoList } from "./AtestadoList";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Atestado {
  id: string;
  dataEmissao: string;
  profissional: {
    nome: string;
    especialidade: string;
    crm: string;
  };
  unidadeSaude: string;
  modelo: string;
  texto: string;
  dias?: number;
  cid10?: string;
}

export const AtestadoSection = () => {
  const [atestados, setAtestados] = useState<Atestado[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAtestado, setEditingAtestado] = useState<Atestado | null>(null);

  const handleSaveAtestado = (atestado: Omit<Atestado, 'id'>) => {
    if (editingAtestado) {
      setAtestados(prev => prev.map(a => 
        a.id === editingAtestado.id 
          ? { ...atestado, id: editingAtestado.id }
          : a
      ));
      setEditingAtestado(null);
    } else {
      const newAtestado: Atestado = {
        ...atestado,
        id: Date.now().toString(),
      };
      setAtestados(prev => [newAtestado, ...prev]);
    }
    setShowForm(false);
  };

  const handleEditAtestado = (atestado: Atestado) => {
    setEditingAtestado(atestado);
    setShowForm(true);
  };

  const handleDeleteAtestado = (id: string) => {
    setAtestados(prev => prev.filter(a => a.id !== id));
  };

  if (showForm) {
    return (
      <AtestadoForm
        onSave={handleSaveAtestado}
        onCancel={() => {
          setShowForm(false);
          setEditingAtestado(null);
        }}
        editingAtestado={editingAtestado}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Atestados</h3>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Atestado
        </Button>
      </div>
      
      <AtestadoList
        atestados={atestados}
        onEdit={handleEditAtestado}
        onDelete={handleDeleteAtestado}
      />
    </div>
  );
};
