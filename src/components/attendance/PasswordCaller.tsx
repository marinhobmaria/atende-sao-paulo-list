
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, UserCheck, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for queue
const mockQueue = [
  { id: "1", name: "Maria Silva Santos", number: "A001", status: "waiting" },
  { id: "2", name: "João Oliveira Costa", number: "A002", status: "waiting" },
  { id: "3", name: "Carlos Pereira Lima", number: "A003", status: "waiting" },
  { id: "4", name: "Ana Costa Ferreira", number: "A004", status: "waiting" }
];

export const PasswordCaller = () => {
  const [currentCall, setCurrentCall] = useState<string | null>(null);
  const [queue, setQueue] = useState(mockQueue);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const callNext = () => {
    const nextPatient = queue.find(p => p.status === "waiting");
    if (nextPatient) {
      setCurrentCall(nextPatient.number);
      setCountdown(10);
      setShowButtons(false);
      console.log(`Chamando senha: ${nextPatient.number} - ${nextPatient.name}`);
      
      // Update queue status
      setQueue(prev => prev.map(p => 
        p.id === nextPatient.id 
          ? { ...p, status: "called" }
          : p
      ));
    }
  };

  const callAgain = () => {
    if (currentCall) {
      setCountdown(10);
      setShowButtons(false);
      console.log(`Chamando novamente senha: ${currentCall}`);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setShowButtons(true);
      setCountdown(null);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const waitingCount = queue.filter(p => p.status === "waiting").length;

  return (
    <div className="fixed top-20 right-4 z-50">
      <Card className={`transition-all duration-300 shadow-lg border ${
        isExpanded ? 'w-80' : 'w-12'
      }`}>
        {/* Toggle Button */}
        <div className="absolute top-2 left-2">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {isExpanded && (
          <>
            <CardHeader className="pb-2 pt-12">
              <CardTitle className="text-sm flex items-center gap-2 justify-center">
                <Volume2 className="h-4 w-4" />
                Chamar próximo da fila
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {/* Current Call Display */}
              {currentCall && (
                <div className="bg-blue-50 p-3 rounded border text-center">
                  <div className="text-xs text-gray-600 mb-1">Chamando agora:</div>
                  <div className="text-xl font-bold text-blue-600">{currentCall}</div>
                  {countdown !== null && countdown > 0 && (
                    <div className="text-sm text-gray-600 mt-1">
                      Expira em: {countdown}s
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                {!showButtons ? (
                  <Button 
                    onClick={callNext}
                    disabled={waitingCount === 0 || countdown !== null}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-xs"
                    size="sm"
                  >
                    <UserCheck className="h-3 w-3 mr-1" />
                    Chamar próximo ({waitingCount})
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={callAgain}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-xs"
                      size="sm"
                    >
                      Chamar novamente
                    </Button>
                    <Button 
                      onClick={callNext}
                      disabled={waitingCount === 0}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-xs"
                      size="sm"
                    >
                      Chamar próximo
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </>
        )}

        {/* Collapsed state indicator */}
        {!isExpanded && (
          <div className="p-2 flex items-center justify-center">
            <Volume2 className="h-4 w-4 text-gray-500" />
          </div>
        )}
      </Card>
    </div>
  );
};
