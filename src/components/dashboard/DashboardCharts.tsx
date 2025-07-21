import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Clock } from "lucide-react";

const hourlyData = [
  { hour: "08:00", atendimentos: 2 },
  { hour: "09:00", atendimentos: 5 },
  { hour: "10:00", atendimentos: 8 },
  { hour: "11:00", atendimentos: 6 },
  { hour: "12:00", atendimentos: 3 },
  { hour: "13:00", atendimentos: 2 },
  { hour: "14:00", atendimentos: 7 },
  { hour: "15:00", atendimentos: 9 },
  { hour: "16:00", atendimentos: 5 },
  { hour: "17:00", atendimentos: 4 },
];

const statusData = [
  { name: "Atendidos", value: 18, color: "hsl(var(--success))" },
  { name: "Na Fila", value: 6, color: "hsl(var(--warning))" },
  { name: "Ausentes", value: 4, color: "hsl(var(--destructive))" },
];

const professionalData = [
  { name: "Dr. Silva", atendimentos: 8, meta: 10 },
  { name: "Dra. Santos", atendimentos: 6, meta: 8 },
  { name: "Dr. Oliveira", atendimentos: 4, meta: 6 },
  { name: "Dra. Costa", atendimentos: 5, meta: 7 },
];

const weeklyData = [
  { day: "Seg", atendimentos: 24, absenteismo: 3 },
  { day: "Ter", atendimentos: 28, absenteismo: 2 },
  { day: "Qua", atendimentos: 22, absenteismo: 4 },
  { day: "Qui", atendimentos: 26, absenteismo: 3 },
  { day: "Sex", atendimentos: 18, absenteismo: 4 },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Evolução dos Atendimentos por Hora */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Evolução dos Atendimentos - Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="atendimentos" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribuição por Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Distribuição por Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Produtividade por Profissional */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Produtividade por Profissional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={professionalData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="atendimentos" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              <Bar dataKey="meta" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm">Realizados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted" />
              <span className="text-sm">Meta</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evolução Semanal */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Comparativo Semanal - Atendimentos vs Absenteísmo</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="atendimentos" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absenteismo" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm">Atendimentos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm">Absenteísmo</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}