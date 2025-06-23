
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, AlertCircle } from "lucide-react";

interface FieldAlertProps {
  type: "warning" | "error";
  message: string;
  show: boolean;
}

export const FieldAlert = ({ type, message, show }: FieldAlertProps) => {
  if (!show) return null;

  return (
    <Alert variant={type === "error" ? "destructive" : "default"} className="mt-2">
      {type === "warning" ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertDescription className="text-xs">
        {message}
      </AlertDescription>
    </Alert>
  );
};
