"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Qual é o seu principal objetivo?",
    options: [
      "Explorar novos produtos",
      "Melhorar minha intimidade",
      "Aprender mais sobre bem-estar",
      "Conectar com a comunidade",
    ],
  },
  {
    id: 2,
    question: "Qual é o seu nível de experiência?",
    options: [
      "Iniciante - Estou começando agora",
      "Intermediário - Tenho alguma experiência",
      "Avançado - Já conheço bem o assunto",
      "Especialista - Busco produtos específicos",
    ],
  },
  {
    id: 3,
    question: "O que mais te interessa?",
    options: [
      "Produtos de qualidade premium",
      "Conteúdo educativo",
      "Comunidade e conexões",
      "Consultoria personalizada",
    ],
  },
  {
    id: 4,
    question: "Como prefere receber recomendações?",
    options: [
      "Baseado em tendências",
      "Personalizado para mim",
      "Sugestões da comunidade",
      "Curadoria de especialistas",
    ],
  },
];

export default function OnboardingQuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed - redirect to dashboard
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[questions[currentQuestion].id];

  return (
    <div className="min-h-screen bg-[#0E0A12] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00CFEA] via-[#FF4D6D] to-[#FFB039] flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00CFEA] via-[#FF4D6D] to-[#FFB039] bg-clip-text text-transparent">
            Venus Club
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00CFEA] via-[#FF4D6D] to-[#FFB039] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl mb-6">
          <h2 className="text-2xl font-bold text-white mb-8">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                  currentAnswer === option
                    ? "bg-[#D81B60] border-[#D81B60] text-white shadow-lg shadow-[#D81B60]/30 scale-105"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-[#D81B60]/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      currentAnswer === option
                        ? "border-white bg-white"
                        : "border-gray-400"
                    }`}
                  >
                    {currentAnswer === option && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D81B60]" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              currentAnswer
                ? "bg-[#D81B60] hover:bg-[#D81B60]/90 text-white hover:scale-105 shadow-lg shadow-[#D81B60]/30"
                : "bg-white/5 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentQuestion < questions.length - 1 ? "Próxima" : "Finalizar"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Pular questionário →
          </button>
        </div>
      </div>
    </div>
  );
}
