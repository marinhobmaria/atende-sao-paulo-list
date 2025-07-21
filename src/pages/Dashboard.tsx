import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Users, Clock, CheckCircle, UserX, UserCheck, Timer, Calendar, Home, User } from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: "Agendados Hoje",
      value: "28",
      description: "Total de consultas do dia",
      icon: Calendar,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      title: "Atendidos",
      value: "18",
      description: "64% concluídos",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Ausentes",
      value: "4",
      description: "14% não compareceram",
      icon: UserX,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Na Fila",
      value: "6",
      description: "Aguardando atendimento",
      icon: Users,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  const additionalStats = [
    {
      title: "Tempo Médio de Espera",
      value: "15 min",
      description: "Últimos 30 dias: 18 min",
      icon: Clock,
      color: "text-info",
    },
    {
      title: "Próximo Paciente",
      value: "3 min",
      description: "Estimativa de chamada",
      icon: Timer,
      color: "text-primary",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      patient: "Maria Silva",
      action: "Atendida",
      time: "14:45",
      type: "success",
      priority: false,
    },
    {
      id: 2,
      patient: "João Santos",
      action: "Ausente",
      time: "14:30",
      type: "absent",
      priority: true,
    },
    {
      id: 3,
      patient: "Ana Costa",
      action: "Atendida",
      time: "14:15",
      type: "success",
      priority: false,
    },
    {
      id: 4,
      patient: "Pedro Lima",
      action: "Chamado",
      time: "14:50",
      type: "called",
      priority: true,
    },
    {
      id: 5,
      patient: "Carla Oliveira",
      action: "Atendida",
      time: "13:50",
      type: "success",
      priority: false,
    },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-success";
      case "absent":
        return "text-destructive";
      case "called":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "success":
        return "bg-success/10 text-success border-success/20";
      case "absent":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "called":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          {/* Doctor Header */}
          <div className="flex h-12 items-center gap-3 border-b px-6 bg-background">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span className="font-medium text-sm">Dr OM30</span>
            </div>
          </div>

          {/* Header with Sidebar Trigger */}
          <header className="flex h-14 items-center gap-2 border-b px-6">
            <SidebarTrigger />
            
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
            {/* Header com relógio */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Médico</h1>
                <p className="text-muted-foreground">
                  Gestão da fila de atendimento e visão geral do dia
                </p>
              </div>
              <Card className="min-w-[200px]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-mono font-bold text-primary">
                    {currentTime.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit' 
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentTime.toLocaleDateString('pt-BR', { 
                      weekday: 'long',
                      day: '2-digit',
                      month: 'long'
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cards principais de estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title} className="relative overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <div className={`h-8 w-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cards adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalStats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Atividade recente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Atividade Recente
                </CardTitle>
                <CardDescription>
                  Últimos movimentos na fila de atendimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{activity.patient}</span>
                          {activity.priority && (
                            <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-risk-red/10 text-risk-red border-risk-red/20">
                              Prioritário
                            </Badge>
                          )}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getBadgeVariant(activity.type)}`}
                        >
                          {activity.action}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground font-mono">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resumo visual do dia */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fluxo do Dia</CardTitle>
                  <CardDescription>
                    Progresso dos atendimentos de hoje
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Atendidos</span>
                      <span className="text-sm text-success">18/28 (64%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-medium text-success">18</div>
                        <div className="text-muted-foreground">Atendidos</div>
                      </div>
                      <div>
                        <div className="font-medium text-destructive">4</div>
                        <div className="text-muted-foreground">Ausentes</div>
                      </div>
                      <div>
                        <div className="font-medium text-warning">6</div>
                        <div className="text-muted-foreground">Na fila</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Indicadores de Performance</CardTitle>
                  <CardDescription>
                    Métricas importantes do atendimento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Taxa de comparecimento</span>
                      <span className="text-sm font-medium text-success">86%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tempo médio por consulta</span>
                      <span className="text-sm font-medium">22 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Satisfação dos pacientes</span>
                      <span className="text-sm font-medium text-success">4.8/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Atendimentos no prazo</span>
                      <span className="text-sm font-medium text-success">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}