
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Phone } from "lucide-react";
import { AddCitizen } from "./AddCitizen";
import { PasswordCaller } from "./PasswordCaller";

interface AttendanceActionsProps {
  onAddCitizen?: () => void;
}

export const AttendanceActions = ({ onAddCitizen }: AttendanceActionsProps) => {
  const [showAddCitizen, setShowAddCitizen] = useState(false);
  const [showPasswordCaller, setShowPasswordCaller] = useState(false);

  return (
    <div className="space-y-4">
      {/* Ações principais - lado a lado */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => setShowAddCitizen(true)}
          className="flex items-center gap-2 flex-1"
        >
          <UserPlus className="h-4 w-4" />
          Adicionar munícipe
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setShowPasswordCaller(true)}
          className="flex items-center gap-2 flex-1"
        >
          <Phone className="h-4 w-4" />
          Chamar munícipe
        </Button>
      </div>

      {/* Modais */}
      <AddCitizen
        isOpen={showAddCitizen}
        onClose={() => setShowAddCitizen(false)}
      />

      <PasswordCaller
        isOpen={showPasswordCaller}
        onClose={() => setShowPasswordCaller(false)}
      />
    </div>
  );
};
