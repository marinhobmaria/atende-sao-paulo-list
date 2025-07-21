import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Heart, Stethoscope, FileX, Eye } from "lucide-react";

const criticalPatients = [
  {
    id: 1,
    name: "José Santos",
    age: 67,
    risk: "Hipertensão Grave",
    priority: "alta",
    waitTime: "45 min",
    alerts: ["Pressão 180/110", "Diabético"],
  },
  {
    id: 2,
    name: "Maria Oliveira",
    age: 23,
    risk: "Alergia Severa",
    priority: "alta",
    waitTime: "30 min",
    alerts: ["Alergia a Penicilina", "Gestante"],
  },
  {
    id: 3,
    name: "Pedro Lima",
    age: 54,
    risk: "Cardiopata",
    priority: "media",
    waitTime: "25 min",
    alerts: ["IAM Prévio", "Anticoagulado"],
  },
];

const pendingTasks = [
  {
    id: 1,
    type: "cadastro",
    description: "5 pacientes com cadastro incompleto",
    icon: FileX,
    priority: "media",
  },
  {
    id: 2,
    type: "documento",
    description: "3 documentos pendentes de validação",
    icon: FileX,
    priority: "baixa",
  },
  {
    id: 3,
    type: "exame",
    description: "2 resultados de exames chegaram",
    icon: Stethoscope,
    priority: "alta",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "alta":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "media":
      return "bg-warning/10 text-warning border-warning/20";
    case "baixa":
      return "bg-info/10 text-info border-info/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "alta":
      return <AlertTriangle className="h-4 w-4" />;
    case "media":
      return <Heart className="h-4 w-4" />;
    default:
      return <Stethoscope className="h-4 w-4" />;
  }
};

export function CriticalAlerts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pacientes Críticos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Pacientes Críticos na Fila
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {criticalPatients.map((patient) => (
              <div
                key={patient.id}
                className="p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{patient.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {patient.age} anos
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={getPriorityColor(patient.priority)}
                      >
                        {getPriorityIcon(patient.priority)}
                        {patient.risk}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      Aguarda: {patient.waitTime}
                    </div>
                    <Button size="sm" variant="outline" className="mt-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {patient.alerts.map((alert, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-destructive/5 text-destructive"
                    >
                      {alert}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pendências Administrativas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileX className="h-5 w-5 text-warning" />
            Pendências Administrativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${getPriorityColor(task.priority)}`}>
                      <task.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{task.description}</div>
                      <Badge
                        variant="outline"
                        className={`text-xs mt-1 ${getPriorityColor(task.priority)}`}
                      >
                        Prioridade {task.priority}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Resolver
                  </Button>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-border/50">
              <Button className="w-full" variant="outline">
                Ver Todas as Pendências
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}