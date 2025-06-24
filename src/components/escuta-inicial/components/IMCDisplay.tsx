
import { Badge } from "@/components/ui/badge";

interface IMCDisplayProps {
  peso: string;
  altura: string;
}

export const IMCDisplay = ({ peso, altura }: IMCDisplayProps) => {
  const getIMCClassification = (imc: number) => {
    if (imc < 18.5) return { text: "Baixo peso", color: "bg-blue-500" };
    if (imc < 25) return { text: "Peso normal", color: "bg-green-500" };
    if (imc < 30) return { text: "Sobrepeso", color: "bg-yellow-500" };
    if (imc < 35) return { text: "Obesidade grau I", color: "bg-orange-500" };
    if (imc < 40) return { text: "Obesidade grau II", color: "bg-red-500" };
    return { text: "Obesidade grau III", color: "bg-red-700" };
  };

  const pesoNum = parseFloat(peso) || 0;
  const alturaNum = parseFloat(altura) || 0;
  
  let imc = 0;
  let imcClassification = "";
  let colorClass = "bg-yellow-500";

  if (pesoNum > 0 && alturaNum > 0) {
    imc = pesoNum / Math.pow(alturaNum / 100, 2);
    const classification = getIMCClassification(imc);
    imcClassification = classification.text;
    colorClass = classification.color;
  }

  return (
    <div className="lg:col-span-2">
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-600">IMC</div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-50 p-3 rounded-lg min-w-[80px] text-center">
            <div className="text-lg font-semibold text-gray-800">
              {imc > 0 ? imc.toFixed(1) : "48"}
            </div>
          </div>
          {(imcClassification || imc === 0) && (
            <Badge className={`${colorClass} text-white text-xs px-2 py-1`}>
              {imcClassification || "Sobrepeso"}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
