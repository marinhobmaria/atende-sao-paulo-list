import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Weight, Activity, Droplet } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MeasurementChartsProps {
  patientId: string;
}

export const MeasurementCharts = ({ patientId }: MeasurementChartsProps) => {
  const [selectedChart, setSelectedChart] = useState<'anthropometry' | 'vitals' | 'glucose'>('anthropometry');
  const [selectedPeriod, setSelectedPeriod] = useState<'3m' | '6m' | '1y' | 'all'>('6m');

  // Mock data - em produção, seria obtido via API
  const mockAnthropometryData = {
    labels: ['Jan 2024', 'Fev 2024', 'Mar 2024', 'Abr 2024', 'Mai 2024', 'Jun 2024'],
    datasets: [
      {
        label: 'Peso (kg)',
        data: [72, 71.5, 70.8, 70.2, 70, 69.5],
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'IMC (kg/m²)',
        data: [24.1, 23.9, 23.7, 23.5, 23.4, 23.2],
        borderColor: 'hsl(var(--secondary))',
        backgroundColor: 'hsl(var(--secondary) / 0.1)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const mockVitalsData = {
    labels: ['8h', '12h', '16h', '20h', '24h'],
    datasets: [
      {
        label: 'PA Sistólica (mmHg)',
        data: [120, 125, 118, 122, 120],
        borderColor: 'hsl(0 84% 60%)',
        backgroundColor: 'hsl(0 84% 60% / 0.1)',
        tension: 0.4,
      },
      {
        label: 'PA Diastólica (mmHg)',
        data: [80, 82, 78, 81, 80],
        borderColor: 'hsl(220 84% 60%)',
        backgroundColor: 'hsl(220 84% 60% / 0.1)',
        tension: 0.4,
      },
      {
        label: 'FC (bpm)',
        data: [72, 75, 70, 73, 72],
        borderColor: 'hsl(142 84% 60%)',
        backgroundColor: 'hsl(142 84% 60% / 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const mockGlucoseData = {
    labels: ['Jejum', 'Pós-café', 'Pré-almoço', 'Pós-almoço', 'Pré-jantar', 'Pós-jantar'],
    datasets: [
      {
        label: 'Glicemia (mg/dL)',
        data: [95, 140, 110, 160, 105, 145],
        borderColor: 'hsl(285 84% 60%)',
        backgroundColor: 'hsl(285 84% 60% / 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: function(context: any) {
          const value = context.parsed.y;
          if (value < 70) return 'hsl(0 84% 60%)'; // Hipoglicemia
          if (value > 180) return 'hsl(0 84% 60%)'; // Hiperglicemia
          if (value > 140) return 'hsl(45 84% 60%)'; // Elevada
          return 'hsl(142 84% 60%)'; // Normal
        },
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'hsl(var(--border))',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: {
          color: 'hsl(var(--border))',
        },
      },
      y1: {
        type: 'linear' as const,
        display: selectedChart === 'anthropometry' || selectedChart === 'vitals',
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  const glucoseOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        callbacks: {
          afterLabel: function(context: any) {
            const value = context.parsed.y;
            if (value < 70) return 'Hipoglicemia';
            if (value > 180) return 'Hiperglicemia';
            if (value > 140) return 'Elevada';
            return 'Normal';
          },
        },
      },
    },
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        min: 50,
        max: 200,
        grid: {
          color: function(context: any) {
            if (context.tick.value === 70 || context.tick.value === 140 || context.tick.value === 180) {
              return 'hsl(0 84% 60% / 0.3)';
            }
            return 'hsl(var(--border))';
          },
        },
      },
    },
  };

  const getCurrentData = () => {
    switch (selectedChart) {
      case 'anthropometry':
        return mockAnthropometryData;
      case 'vitals':
        return mockVitalsData;
      case 'glucose':
        return mockGlucoseData;
      default:
        return mockAnthropometryData;
    }
  };

  const getCurrentOptions = () => {
    if (selectedChart === 'glucose') {
      return glucoseOptions;
    }
    return chartOptions;
  };

  const getChartIcon = () => {
    switch (selectedChart) {
      case 'anthropometry':
        return <Weight className="h-4 w-4" />;
      case 'vitals':
        return <Activity className="h-4 w-4" />;
      case 'glucose':
        return <Droplet className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getChartTitle = () => {
    switch (selectedChart) {
      case 'anthropometry':
        return 'Evolução Antropométrica';
      case 'vitals':
        return 'Sinais Vitais';
      case 'glucose':
        return 'Controle Glicêmico';
      default:
        return 'Medições';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {getChartIcon()}
            {getChartTitle()}
          </CardTitle>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={(value: any) => setSelectedPeriod(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">3 meses</SelectItem>
                <SelectItem value="6m">6 meses</SelectItem>
                <SelectItem value="1y">1 ano</SelectItem>
                <SelectItem value="all">Tudo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedChart === 'anthropometry' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedChart('anthropometry')}
          >
            <Weight className="h-3 w-3 mr-1" />
            Antropometria
          </Button>
          <Button
            variant={selectedChart === 'vitals' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedChart('vitals')}
          >
            <Activity className="h-3 w-3 mr-1" />
            Sinais Vitais
          </Button>
          <Button
            variant={selectedChart === 'glucose' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedChart('glucose')}
          >
            <Droplet className="h-3 w-3 mr-1" />
            Glicemia
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <Line data={getCurrentData()} options={getCurrentOptions()} />
        </div>
        
        {selectedChart === 'glucose' && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Hipoglicemia (&lt;70)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Normal (70-140)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Elevada (140-180)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Hiperglicemia (&gt;180)</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};