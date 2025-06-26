
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, UserCheck, Users } from "lucide-react";

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

  const callSpecific = (patientId: string) => {
    const patient = queue.find(p => p.id === patientId);
    if (patient) {
      setCurrentCall(patient.number);
      console.log(`Chamando senha: ${patient.number} - ${patient.name}`);
      
      // Update queue status
      setQueue(prev => prev.map(p => 
        p.id === patientId 
          ? { ...p, status: "called" }
          : p
      ));
    }
  };

  const waitingCount = queue.filter(p => p.status === "waiting").length;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Chamador de Senhas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Call Display */}
        {currentCall && (
          <div className="bg-blue-50 p-3 rounded-lg border text-center">
            <div className="text-sm text-gray-600 mb-1">Chamando agora:</div>
            <div className="text-2xl font-bold text-blue-600">{currentCall}</div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button 
            onClick={callNext}
            disabled={waitingCount === 0}
            className="flex-1 bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Próximo ({waitingCount})
          </Button>
        </div>

        {/* Queue List */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Fila de Espera
          </div>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {queue.filter(p => p.status === "waiting").map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded border text-sm"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    {patient.number}
                  </Badge>
                  <span className="truncate">{patient.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => callSpecific(patient.id)}
                  className="h-6 px-2 text-xs"
                >
                  Chamar
                </Button>
              </div>
            ))}
          </div>
          
          {waitingCount === 0 && (
            <div className="text-center text-sm text-gray-500 py-4">
              Nenhum paciente na fila
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
