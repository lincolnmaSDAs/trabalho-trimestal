import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, TrendingUp, TrendingDown, Activity, Lightbulb, Wind, Leaf } from "lucide-react";

// Simulação de dados de consumo energético
const generateMockData = () => {
  const data = [];
  const baseConsumption = 150; // Watts base
  const currentTime = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(currentTime);
    time.setHours(time.getHours() - i);
    
    // Simula variação realista de consumo durante o dia
    let consumption = baseConsumption;
    const hour = time.getHours();
    
    if (hour >= 6 && hour <= 9) consumption += 50; // Manhã
    if (hour >= 12 && hour <= 14) consumption += 30; // Almoço
    if (hour >= 18 && hour <= 22) consumption += 80; // Noite
    
    // Adiciona variação aleatória
    consumption += Math.random() * 40 - 20;
    
    data.push({
      time: time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      consumption: Math.round(consumption),
      efficiency: Math.round(85 + Math.random() * 10) // Eficiência entre 85-95%
    });
  }
  
  return data;
};

const EnergyMonitor = () => {
  const [energyData, setEnergyData] = useState(generateMockData());
  const [isLive, setIsLive] = useState(false);
  const [currentConsumption, setCurrentConsumption] = useState(182);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLive) {
      interval = setInterval(() => {
        // Atualiza dados em tempo real (simulado)
        const newConsumption = 150 + Math.random() * 100;
        setCurrentConsumption(Math.round(newConsumption));
        
        setEnergyData(prev => {
          const newData = [...prev.slice(1)];
          newData.push({
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            consumption: Math.round(newConsumption),
            efficiency: Math.round(85 + Math.random() * 10)
          });
          return newData;
        });
      }, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive]);

  const totalConsumption = energyData.reduce((sum, data) => sum + data.consumption, 0);
  const averageConsumption = Math.round(totalConsumption / energyData.length);
  const efficiency = energyData[energyData.length - 1]?.efficiency || 90;
  const trend = currentConsumption > averageConsumption ? 'up' : 'down';

  const getEfficiencyColor = (eff: number) => {
    if (eff >= 90) return 'text-success';
    if (eff >= 80) return 'text-warning';
    return 'text-destructive';
  };

  const getConsumptionLevel = (consumption: number) => {
    if (consumption <= 150) return { level: 'Baixo', color: 'bg-success', icon: Leaf };
    if (consumption <= 200) return { level: 'Médio', color: 'bg-warning', icon: Lightbulb };
    return { level: 'Alto', color: 'bg-destructive', icon: Zap };
  };

  const consumptionLevel = getConsumptionLevel(currentConsumption);
  const ConsumptionIcon = consumptionLevel.icon;

  return (
    <div className="min-h-screen bg-gradient-nature py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <Card className="shadow-eco">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-eco rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span>Monitor de Energia</span>
                </CardTitle>
                <Button
                  variant={isLive ? "destructive" : "eco"}
                  onClick={() => setIsLive(!isLive)}
                  className="flex items-center space-x-2"
                >
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-white' : 'bg-primary-foreground'} ${isLive ? 'animate-pulse' : ''}`} />
                  <span>{isLive ? 'Pausar' : 'Tempo Real'}</span>
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Cards de Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Consumo Atual</p>
                    <p className="text-3xl font-bold">{currentConsumption}W</p>
                  </div>
                  <div className={`w-12 h-12 ${consumptionLevel.color} rounded-full flex items-center justify-center`}>
                    <ConsumptionIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    {trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-destructive" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-success" />
                    )}
                    <span>{consumptionLevel.level}</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Eficiência</p>
                    <p className={`text-3xl font-bold ${getEfficiencyColor(efficiency)}`}>
                      {efficiency}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Wind className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <Progress value={efficiency} className="mt-4" />
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Média 24h</p>
                    <p className="text-3xl font-bold">{averageConsumption}W</p>
                  </div>
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Total: {(totalConsumption / 1000).toFixed(1)}kWh
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Economia CO₂</p>
                    <p className="text-3xl font-bold text-success">2.1kg</p>
                  </div>
                  <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-success-foreground" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Hoje vs ontem
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico Simulado */}
          <Card className="shadow-eco">
            <CardHeader>
              <CardTitle>Consumo nas Últimas 24 Horas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 relative">
                  <div className="absolute inset-0 flex items-end justify-between space-x-1">
                    {energyData.slice(-12).map((data, index) => {
                      const height = (data.consumption / 300) * 100; // Max 300W
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-gradient-eco rounded-t-sm transition-all duration-500 min-h-[4px]"
                            style={{ height: `${height}%` }}
                          />
                          <p className="text-xs text-muted-foreground mt-2 rotate-45 origin-left">
                            {data.time}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Pico</p>
                    <p className="text-xl font-bold text-destructive">
                      {Math.max(...energyData.map(d => d.consumption))}W
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Mínimo</p>
                    <p className="text-xl font-bold text-success">
                      {Math.min(...energyData.map(d => d.consumption))}W
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Variação</p>
                    <p className="text-xl font-bold text-primary">
                      {Math.max(...energyData.map(d => d.consumption)) - 
                       Math.min(...energyData.map(d => d.consumption))}W
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dicas de Economia */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-warning" />
                <span>Dicas para Economia de Energia</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">
                      <strong>Desligue aparelhos:</strong> Equipamentos em standby consomem até 10% da energia.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">
                      <strong>Use LED:</strong> Lâmpadas LED consomem 80% menos energia que incandescentes.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">
                      <strong>Aproveite luz natural:</strong> Abra cortinas durante o dia.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">
                      <strong>Regulate temperatura:</strong> Cada grau no ar-condicionado representa 6% no consumo.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">
                      <strong>Manutenção regular:</strong> Limpe filtros e faça revisões periódicas.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">
                      <strong>Eletrodomésticos eficientes:</strong> Prefira produtos com selo PROCEL.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnergyMonitor;