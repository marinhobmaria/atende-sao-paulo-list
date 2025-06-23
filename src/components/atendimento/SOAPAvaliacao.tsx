
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SOAPAvaliacao = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Avaliação</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Análise clínica, hipóteses diagnósticas e avaliação do quadro clínico do paciente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
