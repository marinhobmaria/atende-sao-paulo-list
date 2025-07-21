import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  FileText, 
  UserPlus, 
  Settings, 
  Calendar,
  Stethoscope,
  Syringe,
  BarChart3,
  Clock,
  Phone
} from "lucide-react";

const quickActions = [
  {
    title: "Fila de Atendimento",
    description: "Gerenciar pacientes na fila",
    icon: Users,
    href: "/",
    color: "bg-primary/10 text-primary",
    urgent: false,
  },
  {
    title: "Escuta Inicial",
    description: "Iniciar nova escuta",
    icon: Stethoscope,
    href: "/escuta-inicial",
    color: "bg-success/10 text-success",
    urgent: false,
  },
  {
    title: "Atendimento",
    description: "Consulta médica",
    icon: FileText,
    href: "/atendimento",
    color: "bg-info/10 text-info",
    urgent: false,
  },
  {
    title: "Vacinação",
    description: "Aplicar vacinas",
    icon: Syringe,
    href: "/vacinacao",
    color: "bg-warning/10 text-warning",
    urgent: false,
  },
  {
    title: "Relatórios",
    description: "Visualizar relatórios",
    icon: BarChart3,
    href: "/relatorios",
    color: "bg-purple-100 text-purple-600",
    urgent: false,
  },
  {
    title: "Cadastrar Paciente",
    description: "Novo cadastro",
    icon: UserPlus,
    href: "/cadastrar-paciente",
    color: "bg-teal-100 text-teal-600",
    urgent: false,
  },
];

const urgentActions = [
  {
    title: "Chamada Urgente",
    description: "Chamar próximo paciente",
    icon: Phone,
    action: "call",
    color: "bg-destructive/10 text-destructive",
  },
  {
    title: "Emergência",
    description: "Protocolo de emergência",
    icon: Clock,
    action: "emergency",
    color: "bg-destructive/10 text-destructive",
  },
];

export function QuickActions() {
  const handleUrgentAction = (action: string) => {
    if (action === "call") {
      // Lógica para chamar próximo paciente
      console.log("Chamando próximo paciente...");
    } else if (action === "emergency") {
      // Lógica para emergência
      console.log("Ativando protocolo de emergência...");
    }
  };

  return (
    <div className="space-y-6">
      {/* Ações Urgentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Clock className="h-5 w-5" />
            Ações Urgentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urgentActions.map((action) => (
              <Button
                key={action.title}
                onClick={() => handleUrgentAction(action.action)}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-destructive/5 border-destructive/20"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Acesso Rápido */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Acesso Rápido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                asChild
                variant="outline"
                className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-muted/50"
              >
                <Link to={action.href}>
                  <div className="flex items-center gap-2 w-full">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{action.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}