
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SOAPObjetivo = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Objetivo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Dados objetivos coletados durante o exame físico, sinais vitais e resultados de exames.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
