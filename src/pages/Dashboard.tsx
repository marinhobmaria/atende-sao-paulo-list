import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/PageLayout";
import { Users, Clock, CheckCircle, UserX, UserCheck, Timer, Calendar, RefreshCw, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { CriticalAlerts } from "@/components/dashboard/CriticalAlerts";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [filters, setFilters] = useState({
    period: "today",
    professional: "all",
    serviceType: "all",
  });

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Atualização automática dos dados a cada 2 minutos
  useEffect(() => {
    const updateTimer = setInterval(() => {
      setLastUpdate(new Date());
      // Aqui você faria a chamada para atualizar os dados do backend
      console.log("Atualizando dados do dashboard...");
    }, 120000); // 2 minutos

    return () => clearInterval(updateTimer);
  }, []);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setLastUpdate(new Date());
    // Aqui você faria a chamada para o backend com os novos filtros
    console.log("Aplicando filtros:", newFilters);
  };

  const handleManualRefresh = () => {
    setLastUpdate(new Date());
    // Aqui você faria a chamada para atualizar os dados do backend
    console.log("Atualizando dados manualmente...");
  };

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
    <PageLayout breadcrumbItems={[{ title: "Dashboard" }]}>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header com relógio e controles */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Dashboard Médico
                </h1>
                <p className="text-muted-foreground text-lg">
                  Gestão da fila de atendimento e visão geral do dia
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Última atualização</div>
                  <div className="text-sm font-medium">
                    {lastUpdate.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <Button onClick={handleManualRefresh} variant="outline" size="sm" className="hover-scale">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar
                </Button>
                <Card className="min-w-[200px] bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
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
            </div>

            {/* Acesso Rápido - MOVIDO PARA O TOPO */}
            <div className="animate-fade-in">
              <QuickActions />
            </div>

            {/* Filtros */}
            <DashboardFilters onFiltersChange={handleFiltersChange} />

            {/* Alertas Críticos - Movido para cima por prioridade UX */}
            <div className="animate-fade-in">
              <CriticalAlerts />
            </div>

            {/* Cards principais de estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {stats.map((stat, index) => (
                <Card 
                  key={stat.title} 
                  className="relative overflow-hidden hover-scale border-border/50 hover:border-border transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">
                      {stat.title}
                    </CardTitle>
                    <div className={`h-10 w-10 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2 text-foreground/90">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cards adicionais - KPIs importantes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {additionalStats.map((stat, index) => (
                <Card 
                  key={stat.title} 
                  className="hover-scale border-border/50 hover:border-border transition-all duration-300 group bg-gradient-to-br from-card to-card/50"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors">
                      {stat.title}
                    </CardTitle>
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <stat.icon className={`h-5 w-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2 text-foreground/90">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Atividade recente - Design melhorado */}
            <Card className="animate-fade-in border-border/50 hover:border-border transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  Atividade Recente
                </CardTitle>
                <CardDescription className="text-base">
                  Últimos movimentos na fila de atendimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={activity.id} 
                      className="flex items-center justify-between p-4 rounded-xl border border-border/30 hover:border-border hover:shadow-sm transition-all duration-200 hover-scale bg-gradient-to-r from-card to-card/50"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-foreground/90">{activity.patient}</span>
                          {activity.priority && (
                            <Badge variant="outline" className="text-xs px-2 py-1 bg-destructive/10 text-destructive border-destructive/20 font-medium">
                              Prioritário
                            </Badge>
                          )}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs font-medium ${getBadgeVariant(activity.type)}`}
                        >
                          {activity.action}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground font-mono bg-muted/30 px-3 py-1 rounded-full">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gráficos - Analytics e Insights */}
            <div className="animate-fade-in">
              <DashboardCharts />
            </div>

            {/* Resumo visual do dia - Design aprimorado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
              <Card className="hover-scale border-border/50 hover:border-border transition-all duration-300 bg-gradient-to-br from-success/5 to-success/10">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 rounded-lg bg-success/10">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    Fluxo do Dia
                  </CardTitle>
                  <CardDescription className="text-base">
                    Progresso dos atendimentos de hoje
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-medium">Atendidos</span>
                      <span className="text-base font-bold text-success">18/28 (64%)</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-success to-success/80 h-3 rounded-full transition-all duration-1000 animate-scale-in" style={{ width: '64%' }}></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                        <div className="text-xl font-bold text-success">18</div>
                        <div className="text-sm text-muted-foreground">Atendidos</div>
                      </div>
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <div className="text-xl font-bold text-destructive">4</div>
                        <div className="text-sm text-muted-foreground">Ausentes</div>
                      </div>
                      <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                        <div className="text-xl font-bold text-warning">6</div>
                        <div className="text-sm text-muted-foreground">Na fila</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale border-border/50 hover:border-border transition-all duration-300 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    Indicadores de Performance
                  </CardTitle>
                  <CardDescription className="text-base">
                    Métricas importantes do atendimento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-card/50 border border-border/30">
                      <span className="font-medium">Taxa de comparecimento</span>
                      <span className="font-bold text-success text-lg">86%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-card/50 border border-border/30">
                      <span className="font-medium">Tempo médio por consulta</span>
                      <span className="font-bold text-primary text-lg">22 min</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-card/50 border border-border/30">
                      <span className="font-medium">Satisfação dos pacientes</span>
                      <span className="font-bold text-success text-lg">4.8/5</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-card/50 border border-border/30">
                      <span className="font-medium">Atendimentos no prazo</span>
                      <span className="font-bold text-success text-lg">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        </div>
      </div>
    </PageLayout>
  );
}