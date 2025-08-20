import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trash2, RotateCcw, Trophy, Timer } from "lucide-react";

interface Item {
  id: number;
  name: string;
  category: 'organic' | 'recyclable' | 'hazardous' | 'general';
  emoji: string;
}

interface Bin {
  id: string;
  name: string;
  category: 'organic' | 'recyclable' | 'hazardous' | 'general';
  color: string;
  emoji: string;
}

const items: Item[] = [
  { id: 1, name: "Garrafa Plástica", category: "recyclable", emoji: "🍼" },
  { id: 2, name: "Casca de Banana", category: "organic", emoji: "🍌" },
  { id: 3, name: "Pilha", category: "hazardous", emoji: "🔋" },
  { id: 4, name: "Papel de Embrulho", category: "recyclable", emoji: "📄" },
  { id: 5, name: "Resto de Comida", category: "organic", emoji: "🍚" },
  { id: 6, name: "Lata de Refrigerante", category: "recyclable", emoji: "🥤" },
  { id: 7, name: "Fraldas", category: "general", emoji: "👶" },
  { id: 8, name: "Jornal", category: "recyclable", emoji: "📰" },
  { id: 9, name: "Tinta", category: "hazardous", emoji: "🎨" },
  { id: 10, name: "Casca de Ovo", category: "organic", emoji: "🥚" },
  { id: 11, name: "Vidro Quebrado", category: "recyclable", emoji: "🪟" },
  { id: 12, name: "Medicamento Vencido", category: "hazardous", emoji: "💊" },
];

const bins: Bin[] = [
  { id: "organic", name: "Orgânico", category: "organic", color: "bg-amber-500", emoji: "🟤" },
  { id: "recyclable", name: "Reciclável", category: "recyclable", color: "bg-blue-500", emoji: "🔵" },
  { id: "hazardous", name: "Perigoso", category: "hazardous", color: "bg-red-500", emoji: "🔴" },
  { id: "general", name: "Comum", category: "general", color: "bg-gray-500", emoji: "⚫" },
];

const RecyclingGame = () => {
  const [currentItems, setCurrentItems] = useState<Item[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    const shuffledItems = shuffleArray(items).slice(0, 8);
    setCurrentItems(shuffledItems);
    setGameStarted(true);
    setGameCompleted(false);
    setScore(0);
    setMistakes(0);
    setTimeLeft(60);
    setFeedback(null);

    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setGameCompleted(true);
    setGameStarted(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetGame = () => {
    setCurrentItems([]);
    setGameStarted(false);
    setGameCompleted(false);
    setScore(0);
    setMistakes(0);
    setTimeLeft(60);
    setFeedback(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleDragStart = (item: Item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, binCategory: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const isCorrect = draggedItem.category === binCategory;
    
    if (isCorrect) {
      setScore(score + 10);
      setCurrentItems(currentItems.filter(item => item.id !== draggedItem.id));
      setFeedback({ message: "Correto! Boa separação! 🎉", type: "success" });
      
      if (currentItems.length === 1) {
        setTimeout(endGame, 1000);
      }
    } else {
      setMistakes(mistakes + 1);
      setScore(Math.max(0, score - 5));
      setFeedback({ message: "Ops! Esse item não vai nessa lixeira. Tente novamente! ❌", type: "error" });
    }

    setDraggedItem(null);
    setTimeout(() => setFeedback(null), 2000);
  };

  const handleItemClick = (item: Item, binCategory: string) => {
    // Mobile-friendly interaction
    if (!draggedItem) {
      setDraggedItem(item);
      setFeedback({ message: "Item selecionado! Agora clique na lixeira correta.", type: "success" });
    } else if (draggedItem.id === item.id) {
      setDraggedItem(null);
      setFeedback(null);
    } else {
      const isCorrect = draggedItem.category === binCategory;
      
      if (isCorrect) {
        setScore(score + 10);
        setCurrentItems(currentItems.filter(item => item.id !== draggedItem.id));
        setFeedback({ message: "Correto! Boa separação! 🎉", type: "success" });
        
        if (currentItems.length === 1) {
          setTimeout(endGame, 1000);
        }
      } else {
        setMistakes(mistakes + 1);
        setScore(Math.max(0, score - 5));
        setFeedback({ message: "Ops! Esse item não vai nessa lixeira. Tente novamente! ❌", type: "error" });
      }

      setDraggedItem(null);
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const getScoreMessage = () => {
    if (score >= 70) return "Excelente! Você é um mestre da reciclagem! 🏆";
    if (score >= 50) return "Muito bom! Continue praticando a separação correta! 🌟";
    if (score >= 30) return "Bom trabalho! Cada passo conta para o meio ambiente! 🌱";
    return "Continue aprendendo! A prática leva à perfeição! 💚";
  };

  if (!gameStarted && !gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-nature py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-eco">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl mb-4">Jogo da Reciclagem</CardTitle>
              <p className="text-muted-foreground">
                Ajude a separar o lixo corretamente! Arraste cada item para a lixeira apropriada.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bins.map((bin) => (
                  <div key={bin.id} className="text-center">
                    <div className={`w-16 h-16 ${bin.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <span className="text-2xl">{bin.emoji}</span>
                    </div>
                    <p className="text-sm font-medium">{bin.name}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Como jogar:</strong><br />
                  • Desktop: Arraste os itens para as lixeiras<br />
                  • Mobile: Toque no item e depois na lixeira correta<br />
                  • Você tem 60 segundos para separar tudo!
                </p>
              </div>

              <Button onClick={startGame} className="w-full" size="lg">
                Começar Jogo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-nature py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-eco">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl mb-2">Jogo Concluído!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-primary">{score} pontos</div>
                <p className="text-lg">{getScoreMessage()}</p>
                
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{score / 10}</div>
                    <p className="text-sm text-muted-foreground">Acertos</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">{mistakes}</div>
                    <p className="text-sm text-muted-foreground">Erros</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Dicas de Reciclagem:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>🟤 <strong>Orgânico:</strong> Restos de comida, cascas, folhas</li>
                  <li>🔵 <strong>Reciclável:</strong> Plástico, papel, vidro, metal</li>
                  <li>🔴 <strong>Perigoso:</strong> Pilhas, tintas, medicamentos</li>
                  <li>⚫ <strong>Comum:</strong> Fraldas, papel higiênico, outros</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button onClick={startGame} className="flex-1">
                  Jogar Novamente
                </Button>
                <Button onClick={resetGame} variant="outline" className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Menu Principal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-nature py-4">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-eco">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Jogo da Reciclagem</CardTitle>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Timer className="w-4 h-4" />
                  <span>{timeLeft}s</span>
                </Badge>
                <Badge className="bg-gradient-eco text-primary-foreground">
                  {score} pontos
                </Badge>
              </div>
            </div>
            <Progress value={(score / (currentItems.length * 10)) * 100} className="h-2" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            {feedback && (
              <div className={`p-3 rounded-lg text-center ${
                feedback.type === 'success' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
              }`}>
                {feedback.message}
              </div>
            )}

            {/* Items to sort */}
            <div>
              <h3 className="font-semibold mb-4">Itens para separar:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item)}
                    onClick={() => handleItemClick(item, '')}
                    className={`p-4 border-2 border-dashed rounded-lg cursor-move hover:bg-muted/50 transition-smooth text-center ${
                      draggedItem?.id === item.id ? 'border-primary bg-primary/10' : 'border-border'
                    }`}
                  >
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <p className="text-sm font-medium">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bins */}
            <div>
              <h3 className="font-semibold mb-4">Lixeiras:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bins.map((bin) => (
                  <div
                    key={bin.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, bin.category)}
                    onClick={() => draggedItem && handleItemClick(draggedItem, bin.category)}
                    className="p-6 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-smooth cursor-pointer text-center"
                  >
                    <div className={`w-16 h-16 ${bin.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-2xl">{bin.emoji}</span>
                    </div>
                    <p className="font-medium">{bin.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button onClick={resetGame} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar Jogo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecyclingGame;