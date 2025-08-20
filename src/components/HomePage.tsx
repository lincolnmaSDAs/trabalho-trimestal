import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Zap, Recycle, Brain, Gamepad2, BarChart3, ArrowRight, Globe, TreePine, Droplets } from "lucide-react";
import heroImage from "@/assets/hero-sustainable-tech.jpg";

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage = ({ onPageChange }: HomePageProps) => {
  const features = [
    {
      icon: Brain,
      title: "Quiz Sustentável",
      description: "Teste seus conhecimentos sobre práticas ambientais e energia renovável",
      action: () => onPageChange("quiz"),
      color: "bg-blue-500",
      badge: "Educativo"
    },
    {
      icon: Gamepad2,
      title: "Jogo de Reciclagem",
      description: "Aprenda a separar o lixo corretamente de forma divertida e interativa",
      action: () => onPageChange("game"),
      color: "bg-green-500",
      badge: "Interativo"
    },
    {
      icon: BarChart3,
      title: "Monitor de Energia",
      description: "Acompanhe o consumo energético em tempo real e receba dicas de economia",
      action: () => onPageChange("monitor"),
      color: "bg-purple-500",
      badge: "IoT Ready"
    }
  ];

  const stats = [
    { icon: Globe, value: "2.1B", label: "Toneladas de CO₂ economizadas", color: "text-blue-600" },
    { icon: TreePine, value: "150K", label: "Árvores plantadas virtualmente", color: "text-green-600" },
    { icon: Droplets, value: "85M", label: "Litros de água poupados", color: "text-cyan-600" },
    { icon: Recycle, value: "92%", label: "Taxa de reciclagem alcançada", color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-nature">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Tecnologia Sustentável" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-eco text-primary-foreground px-4 py-2 text-sm">
                <Leaf className="w-4 h-4 mr-2" />
                Tecnologia Sustentável
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Construindo um
                <span className="text-transparent bg-clip-text bg-gradient-eco"> Futuro Verde</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore soluções tecnológicas inovadoras para promover a sustentabilidade e 
                a conscientização ambiental através da educação e monitoramento inteligente.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="eco" 
                size="lg" 
                onClick={() => onPageChange("quiz")}
                className="w-full sm:w-auto"
              >
                Começar Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="nature" 
                size="lg"
                onClick={() => onPageChange("game")}
                className="w-full sm:w-auto"
              >
                <Gamepad2 className="w-5 h-5 mr-2" />
                Jogar Agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center shadow-soft hover:shadow-eco transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${stat.color} bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Descubra Nossas
              <span className="text-transparent bg-clip-text bg-gradient-eco"> Ferramentas</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Três experiências interativas para aprender e praticar sustentabilidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-eco transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  onClick={feature.action}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-6">
                      {feature.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    >
                      Explorar
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-eco">
              <CardContent className="p-8 md:p-12">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-eco rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">Nossa Missão</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Democratizar o acesso ao conhecimento sobre sustentabilidade através da tecnologia. 
                    Acreditamos que pequenas ações individuais, quando multiplicadas, podem gerar 
                    um impacto transformador no planeta. Nossa plataforma combina educação, 
                    gamificação e monitoramento para tornar a sustentabilidade acessível e prática 
                    para todos.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge className="bg-primary/10 text-primary px-3 py-1">
                      <Leaf className="w-3 h-3 mr-1" />
                      Educação Ambiental
                    </Badge>
                    <Badge className="bg-primary/10 text-primary px-3 py-1">
                      <Recycle className="w-3 h-3 mr-1" />
                      Reciclagem Inteligente
                    </Badge>
                    <Badge className="bg-primary/10 text-primary px-3 py-1">
                      <Zap className="w-3 h-3 mr-1" />
                      Eficiência Energética
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para Fazer a
              <span className="text-transparent bg-clip-text bg-gradient-eco"> Diferença?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já estão construindo um futuro mais sustentável
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="eco" 
                size="lg"
                onClick={() => onPageChange("quiz")}
                className="w-full sm:w-auto"
              >
                <Brain className="w-5 h-5 mr-2" />
                Testar Conhecimento
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onPageChange("monitor")}
                className="w-full sm:w-auto"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Monitorar Energia
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;