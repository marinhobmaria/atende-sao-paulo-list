
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SOAPAntecedentes = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Antecedentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Histórico médico, alergias, medicamentos em uso e outros antecedentes relevantes do paciente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
