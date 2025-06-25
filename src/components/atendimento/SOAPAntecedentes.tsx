
import { Card, CardContent } from "@/components/ui/card";

export const SOAPAntecedentes = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground">
            Histórico médico, alergias, medicamentos em uso e outros antecedentes relevantes do paciente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
