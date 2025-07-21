import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  IdCard,
  Heart,
  AlertTriangle
} from "lucide-react";

interface PatientDetailsProps {
  cidadao: {
    id: string;
    name: string;
    socialName?: string;
    cpf: string;
    cns: string;
    birthDate: string;
    age: string;
    sex: string;
    motherName: string;
    healthConditions: string[];
    allergies: string[];
    photo?: string;
  };
}

export const PatientDetails = ({ cidadao }: PatientDetailsProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Dados Pessoais */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Dados Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={cidadao.photo} alt={cidadao.name} />
              <AvatarFallback className="text-lg">
                {getInitials(cidadao.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-xl font-semibold">{cidadao.name}</h3>
                {cidadao.socialName && cidadao.socialName !== cidadao.name && (
                  <p className="text-sm text-muted-foreground">
                    Nome social: {cidadao.socialName}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {cidadao.healthConditions.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Heart className="h-3 w-3 mr-1" />
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">CPF</p>
                  <p className="text-sm text-muted-foreground">{cidadao.cpf}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">CNS</p>
                  <p className="text-sm text-muted-foreground">{cidadao.cns}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Data de Nascimento</p>
                  <p className="text-sm text-muted-foreground">
                    {cidadao.birthDate} ({cidadao.age})
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Sexo</p>
                  <p className="text-sm text-muted-foreground">{cidadao.sex}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Nome da Mãe</p>
                  <p className="text-sm text-muted-foreground">{cidadao.motherName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Endereço</p>
                  <p className="text-sm text-muted-foreground">
                    Rua das Flores, 123 - Centro<br />
                    CEP: 12345-678 - São Paulo/SP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alertas e Condições */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Alertas Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Alergias */}
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Alergias
            </h4>
            <div className="space-y-2">
              {cidadao.allergies.map((allergy, index) => (
                <div 
                  key={index}
                  className="p-2 bg-red-50 border border-red-200 rounded-md text-sm"
                >
                  <span className="font-medium text-red-800">{allergy}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Condições de Saúde */}
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Heart className="h-4 w-4 text-blue-500" />
              Condições de Saúde
            </h4>
            <div className="space-y-2">
              {cidadao.healthConditions.map((condition, index) => (
                <div 
                  key={index}
                  className="p-2 bg-blue-50 border border-blue-200 rounded-md text-sm"
                >
                  <span className="font-medium text-blue-800">{condition}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contatos */}
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4 text-green-500" />
              Contatos
            </h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>maria.antonieta@email.com</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};