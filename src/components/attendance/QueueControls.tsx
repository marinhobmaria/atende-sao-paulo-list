import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Phone, UserPlus, RefreshCw, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddPatientModal } from "./AddPatientModal";

interface QueueControlsProps {
  onCallNext: () => void;
  onAddToQueue: () => void;
  onRefreshQueue: () => void;
  waitingCount: number;
  averageWaitTime?: number;
}

export function QueueControls({ 
  onCallNext, 
  onAddToQueue, 
  onRefreshQueue, 
  waitingCount,
  averageWaitTime = 36
}: QueueControlsProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCallNext = () => {
    if (waitingCount === 0) {
      toast({
        title: "Fila vazia",
        description: "Não há pacientes aguardando para serem chamados.",
        variant: "destructive",
      });
      return;
    }
    
    onCallNext();
    toast({
      title: "Paciente chamado",
      description: "O próximo paciente foi chamado com sucesso.",
    });
  };

  const handleAddToQueue = () => {
    setShowAddModal(true);
  };

  const handleRefreshQueue = () => {
    onRefreshQueue();
    toast({
      title: "Fila atualizada",
      description: "A fila foi sincronizada com sucesso.",
    });
  };

  const handlePatientAdded = () => {
    // Atualizar fila após adicionar paciente
    onRefreshQueue();
    onAddToQueue(); // Callback original se necessário
  };

  return (
    <>
      <div className="w-72">
        <Card className="sticky top-6 shadow-lg border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Phone className="h-5 w-5 text-primary" />
              Controles da Fila
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Botão Chamar Próximo */}
            <Button 
              onClick={handleCallNext}
              className="w-full h-14 text-base font-semibold bg-green-600 hover:bg-green-700 text-white shadow-lg hover-scale transition-all duration-200"
              disabled={waitingCount === 0}
            >
              <Phone className="h-5 w-5 mr-2" />
              Chamar Próximo
            </Button>

            {/* Botão Adicionar à Fila */}
            <Button 
              onClick={handleAddToQueue}
              variant="outline"
              className="w-full h-12 text-base font-medium border-blue-500/30 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:border-blue-500 transition-all duration-200"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Adicionar à Fila
            </Button>

            {/* Botão Atualizar Fila */}
            <Button 
              onClick={handleRefreshQueue}
              variant="outline"
              className="w-full h-12 text-base font-medium border-muted-foreground/30 bg-muted/50 hover:bg-muted text-muted-foreground hover:border-muted-foreground transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar Fila
            </Button>

            {/* Separador */}
            <div className="border-t border-border/50 my-6"></div>

            {/* Tempo Médio */}
            <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Tempo Médio</span>
              </div>
              <div className="text-3xl font-bold text-primary mb-1">
                {averageWaitTime}
              </div>
              <div className="text-sm text-muted-foreground">
                minutos de espera
              </div>
            </div>

            {/* Data e Hora */}
            <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/30 mt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Hoje</span>
              </div>
              <div className="text-sm font-medium text-foreground">
                {currentTime.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit', 
                  year: 'numeric'
                })}
              </div>
              <div className="text-lg font-mono font-bold text-primary">
                {currentTime.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Adicionar Paciente */}
      <AddPatientModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onPatientAdded={handlePatientAdded}
      />
    </>
  );
}