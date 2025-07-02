
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Citizen } from "./CitizenSearch";

interface NewCitizenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCitizenCreated: (citizen: Citizen) => void;
}

export const NewCitizenModal = ({ open, onOpenChange, onCitizenCreated }: NewCitizenModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    cns: "",
    birthDate: "",
    address: "",
    medicalRecordNumber: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.cpf || !formData.cns || !formData.birthDate) {
      return; // Basic validation
    }

    const newCitizen: Citizen = {
      id: Date.now().toString(),
      name: formData.name,
      cpf: formData.cpf,
      cns: formData.cns,
      birthDate: formData.birthDate,
      motherName: "", // This could be added to the form if needed
      hasScheduledAppointment: false
    };

    onCitizenCreated(newCitizen);
    
    // Reset form
    setFormData({
      name: "",
      cpf: "",
      cns: "",
      birthDate: "",
      address: "",
      medicalRecordNumber: ""
    });
    
    onOpenChange(false);
  };

  const isFormValid = formData.name && formData.cpf && formData.cns && formData.birthDate;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Munícipe</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                placeholder="000.000.000-00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cns">CNS *</Label>
              <Input
                id="cns"
                value={formData.cns}
                onChange={(e) => handleInputChange('cns', e.target.value)}
                placeholder="000000000000000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento *</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Endereço completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalRecordNumber">Número do Prontuário Individual</Label>
              <Input
                id="medicalRecordNumber"
                value={formData.medicalRecordNumber}
                onChange={(e) => handleInputChange('medicalRecordNumber', e.target.value)}
                placeholder="Número do prontuário"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Cadastrar Munícipe
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
