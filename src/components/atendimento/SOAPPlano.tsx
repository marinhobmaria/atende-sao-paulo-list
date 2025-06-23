
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SOAPPlano = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Plano</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Plano terapêutico, condutas a serem tomadas, prescrições e orientações ao paciente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
