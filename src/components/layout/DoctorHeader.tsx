import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User, Settings, LogOut } from "lucide-react";

export const DoctorHeader = () => {
  return (
    <div className="flex h-12 items-center justify-between border-b px-6 bg-background">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-auto p-2 gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=150&h=150&fit=crop&crop=face" alt="Dr OM30" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">Dr OM30</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48" align="start">
            <div className="space-y-2">
              <div className="px-2 py-1.5">
                <p className="font-medium text-sm">Dr OM30</p>
                <p className="text-xs text-muted-foreground">Clínico Geral</p>
              </div>
              <div className="border-t pt-2 space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};