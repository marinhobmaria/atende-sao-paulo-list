import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total de Atendimentos Hoje",
      value: "87",
      description: "12 em andamento",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Tempo Médio de Espera",
      value: "25 min",
      description: "Último atendimento: 14:30",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Atendimentos Finalizados",
      value: "75",
      description: "86% concluídos",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Pacientes na Fila",
      value: "12",
      description: "3 prioritários",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Visão geral dos atendimentos e estatísticas do sistema
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Atendimentos por Hora</CardTitle>
                  <CardDescription>
                    Distribuição dos atendimentos ao longo do dia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    Gráfico de atendimentos por hora
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tipos de Atendimento</CardTitle>
                  <CardDescription>
                    Distribuição por categoria de serviço
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    Gráfico de tipos de atendimento
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}