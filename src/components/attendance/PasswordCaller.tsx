
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, UserCheck } from "lucide-react";

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

  const callNext = () => {
    const nextPatient = queue.find(p => p.status === "waiting");
    if (nextPatient) {
      setCurrentCall(nextPatient.number);
      console.log(`Chamando senha: ${nextPatient.number} - ${nextPatient.name}`);
      
      // Update queue status
      setQueue(prev => prev.map(p => 
        p.id === nextPatient.id 
          ? { ...p, status: "called" }
          : p
      ));
    }
  };

  const waitingCount = queue.filter(p => p.status === "waiting").length;

  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          Chamar próximo da fila
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Current Call Display */}
        {currentCall && (
          <div className="bg-blue-50 p-2 rounded border text-center">
            <div className="text-xs text-gray-600 mb-1">Chamando agora:</div>
            <div className="text-lg font-bold text-blue-600">{currentCall}</div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button 
            onClick={callNext}
            disabled={waitingCount === 0}
            className="flex-1 bg-green-600 hover:bg-green-700 h-7 text-xs"
            size="sm"
          >
            <UserCheck className="h-3 w-3 mr-1" />
            Próximo ({waitingCount})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
