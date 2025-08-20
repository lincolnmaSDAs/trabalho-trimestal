import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual é a principal fonte de energia renovável mais utilizada no mundo?",
    options: ["Solar", "Eólica", "Hidrelétrica", "Geotérmica"],
    correctAnswer: 2,
    explanation: "A energia hidrelétrica é atualmente a principal fonte renovável, responsável por cerca de 16% da geração mundial de eletricidade."
  },
  {
    id: 2,
    question: "Quanto tempo uma garrafa plástica leva para se degradar na natureza?",
    options: ["10 anos", "50 anos", "100 anos", "Mais de 400 anos"],
    correctAnswer: 3,
    explanation: "Garrafas plásticas podem levar mais de 400 anos para se degradar completamente, por isso a reciclagem é crucial."
  },
  {
    id: 3,
    question: "Qual ação doméstica economiza mais água?",
    options: ["Tomar banho de 5 minutos", "Escovar dentes com torneira fechada", "Lavar roupa só com máquina cheia", "Reutilizar água da chuva"],
    correctAnswer: 3,
    explanation: "Reutilizar água da chuva pode economizar até 50% do consumo doméstico, sendo a medida mais eficaz."
  },
  {
    id: 4,
    question: "O que significa o conceito de 'pegada de carbono'?",
    options: ["Marca deixada por veículos", "Emissão total de gases de efeito estufa", "Área de floresta desmatada", "Quantidade de lixo produzida"],
    correctAnswer: 1,
    explanation: "Pegada de carbono é a quantidade total de gases de efeito estufa emitidos por uma pessoa, organização ou atividade."
  },
  {
    id: 5,
    question: "Qual o principal benefício da compostagem doméstica?",
    options: ["Reduz odores do lixo", "Economiza dinheiro", "Reduz resíduos orgânicos e cria adubo natural", "Atrai menos insetos"],
    correctAnswer: 2,
    explanation: "A compostagem reduz até 30% dos resíduos domésticos e produz adubo natural rico em nutrientes para plantas."
  }
];

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excelente! Você é um expert em sustentabilidade! 🌟";
    if (percentage >= 60) return "Muito bom! Continue aprendendo sobre sustentabilidade! 🌱";
    if (percentage >= 40) return "Bom início! Que tal estudar mais sobre o meio ambiente? 🌿";
    return "Continue aprendendo! Cada pequeno passo faz diferença! 💚";
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-nature py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-eco">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-eco rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl mb-2">Quiz Concluído!</CardTitle>
              <p className="text-muted-foreground">
                Você acertou {score} de {questions.length} perguntas
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <p className="text-lg">{getScoreMessage()}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Revisão das Respostas:</h3>
                {questions.map((question, index) => {
                  const userAnswer = userAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">{question.question}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Sua resposta: {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-success mb-2">
                              Resposta correta: {question.options[question.correctAnswer]}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button onClick={resetQuiz} className="w-full" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Fazer Quiz Novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-nature py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-eco">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-xl">Quiz de Sustentabilidade</CardTitle>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} de {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
              
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      showResult
                        ? index === question.correctAnswer
                          ? "default"
                          : index === selectedAnswer
                          ? "destructive"
                          : "outline"
                        : selectedAnswer === index
                        ? "default"
                        : "outline"
                    }
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                    className="w-full justify-start h-auto p-4 transition-smooth"
                  >
                    <span className="text-left">{option}</span>
                    {showResult && index === question.correctAnswer && (
                      <CheckCircle className="w-5 h-5 ml-auto text-primary-foreground" />
                    )}
                    {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 ml-auto text-destructive-foreground" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {showResult && (
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-2">Explicação:</h4>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            )}

            {!showResult && (
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="w-full"
                size="lg"
              >
                {currentQuestion === questions.length - 1 ? "Finalizar Quiz" : "Próxima Pergunta"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizSection;