
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface PasswordCallerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PasswordCaller = ({ open, onOpenChange }: PasswordCallerProps) => {
  const [password, setPassword] = useState("");

  const handleCall = () => {
    if (password.trim()) {
      console.log(`Calling patient with password: ${password}`);
      setPassword("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Chamar Munícipe</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Senha do Munícipe</Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCall} disabled={!password.trim()}>
              Chamar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
