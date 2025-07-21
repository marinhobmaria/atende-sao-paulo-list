import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { User, Settings, LogOut, Maximize, Minimize, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export const DoctorHeader = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex h-16 items-center justify-between border-b px-6 bg-gradient-to-r from-background to-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="h-6 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">Julho Verde</span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            🌿 Campanha
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Notificações */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 relative"
              title="Notificações"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500">
                5
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-3">
              <h4 className="font-medium text-sm border-b pb-2">Notificações (5)</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="p-2 hover:bg-accent rounded-md cursor-pointer">
                  <p className="text-sm font-medium">Nova consulta agendada</p>
                  <p className="text-xs text-muted-foreground">João Silva - 14:30</p>
                </div>
                <div className="p-2 hover:bg-accent rounded-md cursor-pointer">
                  <p className="text-sm font-medium">Exame alterado</p>
                  <p className="text-xs text-muted-foreground">Maria Santos - Glicemia</p>
                </div>
                <div className="p-2 hover:bg-accent rounded-md cursor-pointer">
                  <p className="text-sm font-medium">Receita médica vencendo</p>
                  <p className="text-xs text-muted-foreground">Pedro Costa - Hipertensão</p>
                </div>
                <div className="p-2 hover:bg-accent rounded-md cursor-pointer">
                  <p className="text-sm font-medium">Vacina disponível</p>
                  <p className="text-xs text-muted-foreground">Ana Oliveira - COVID-19</p>
                </div>
                <div className="p-2 hover:bg-accent rounded-md cursor-pointer">
                  <p className="text-sm font-medium">Retorno agendado</p>
                  <p className="text-xs text-muted-foreground">Carlos Lima - Cardiologia</p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullscreen}
          className="h-9 w-9 p-0"
          title={isFullscreen ? "Sair da tela cheia" : "Expandir tela"}
        >
          {isFullscreen ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-auto p-2 gap-3 rounded-lg hover:bg-accent">
              <div className="text-right">
                <p className="text-sm font-medium">Dr OM30</p>
                <p className="text-xs text-muted-foreground">Clínico Geral</p>
              </div>
              <Avatar className="h-9 w-9 ring-2 ring-primary/10">
                <AvatarImage src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=150&h=150&fit=crop&crop=face" alt="Dr OM30" />
                <AvatarFallback className="bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end">
            <div className="space-y-3">
              <div className="px-2 py-2 border-b">
                <p className="font-medium text-sm">Dr OM30</p>
                <p className="text-xs text-muted-foreground">Médico Clínico Geral</p>
                <p className="text-xs text-muted-foreground">CRM: 12345-SP</p>
              </div>
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <User className="h-4 w-4" />
                  Meu Perfil
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="h-4 w-4" />
                  Sair do Sistema
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};