"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Qual é o seu nome completo, linda?",
    type: "text",
    placeholder: "Digite seu nome completo...",
  },
  {
    id: 2,
    question: "Como você se identifica?",
    type: "single",
    options: [
      "Mulher cis",
      "Mulher trans",
      "Não-binárie",
      "Prefiro não informar",
    ],
  },
  {
    id: 3,
    question: "Qual é a sua faixa etária?",
    type: "single",
    options: [
      "18 a 24 anos",
      "25 a 34 anos",
      "35 a 44 anos",
      "45 a 55 anos",
      "55+",
    ],
  },
  {
    id: 4,
    question: "Qual é sua situação amorosa atual?",
    type: "single",
    options: [
      "Solteira",
      "Ficando",
      "Namorando",
      "Casada",
      "Separada / Divorciada",
      "Vivendo um relacionamento complicado",
    ],
  },
  {
    id: 5,
    question: "Qual é sua maior dor ou desafio no amor hoje?",
    subtitle: "(Escolha a que mais te representa)",
    type: "single",
    options: [
      "Falta de atenção/afeto",
      "Ciúmes",
      "Falta de comunicação",
      "Traição ou medo de ser traída",
      "Dificuldade na cama / vida sexual parada",
      "Me entrego demais e não recebo na mesma medida",
      "Autoestima baixa",
      "Relacionamento tóxico / abuso emocional",
      "Estou em dúvida se ele vale a pena",
    ],
  },
  {
    id: 6,
    question: "Qual é o seu objetivo dentro do Vênus Club?",
    subtitle: "(Escolha até 2)",
    type: "multiple",
    maxSelections: 2,
    options: [
      "Me tornar uma mulher magnética",
      "Desenvolver minha sensualidade",
      "Ser mais confiante e empoderada",
      "Aprender a conquistar um homem específico",
      "Fortalecer meu relacionamento atual",
      "Melhorar minha vida sexual",
      "Curar minha dependência emocional",
      "Aprender a lidar com homens difíceis",
      "Reconquistar um relacionamento",
      "Evoluir como mulher",
    ],
  },
  {
    id: 7,
    question: "Você já percebeu algum sinal de comportamento abusivo em um relacionamento atual ou passado?",
    type: "single",
    options: ["Sim", "Não", "Tenho dúvidas"],
  },
  {
    id: 8,
    question: "Como você prefere que sua coach converse com você?",
    type: "single",
    options: [
      "Doce e acolhedora",
      "Direta e firme",
      "Elegante e sedutora",
      "Técnica, lógica e objetiva",
      "Mistura inteligente conforme meu humor",
    ],
  },
  {
    id: 9,
    question: "Como você se sente sobre sua autoestima e feminilidade hoje?",
    type: "single",
    options: [
      "Me sinto linda e poderosa",
      "Me sinto bem, mas gostaria de melhorar",
      "Me sinto insegura em algumas áreas",
      "Preciso de ajuda urgente",
      "Nem sei mais quem sou",
    ],
  },
  {
    id: 10,
    question: "Qual dessas transformações você mais deseja viver primeiro?",
    type: "single",
    options: [
      "Me tornar irresistível e magnética",
      "Aprender a seduzir com elegância",
      "Saber me posicionar com força e classe",
      "Me libertar da ansiedade e do apego",
      "Recuperar meu brilho, autoestima e confiança",
      "Aprender a dar e receber prazer na cama",
      "Entender os homens e dominar relacionamentos",
    ],
  },
];

// Função para determinar persona recomendada
function getRecommendedPersona(answers: Record<number, any>): string {
  const objectives = answers[6] || [];
  const transformation = answers[10] || "";

  // Lógica de recomendação de persona
  if (
    objectives.includes("Desenvolver minha sensualidade") ||
    transformation === "Aprender a seduzir com elegância"
  ) {
    return "Vênus";
  }
  if (
    objectives.includes("Aprender a conquistar um homem específico") ||
    transformation === "Me tornar irresistível e magnética"
  ) {
    return "Selena";
  }
  if (
    objectives.includes("Ser mais confiante e empoderada") ||
    transformation === "Saber me posicionar com força e classe" ||
    transformation === "Recuperar meu brilho, autoestima e confiança"
  ) {
    return "Esther";
  }
  if (
    objectives.includes("Melhorar minha vida sexual") ||
    transformation === "Aprender a dar e receber prazer na cama"
  ) {
    return "Afrodite";
  }
  if (answers[7] === "Sim") {
    return "Samila";
  }

  return "Esther"; // Padrão
}

export default function OnboardingQuiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [textInput, setTextInput] = useState("");

  const question = QUIZ_QUESTIONS[currentQuestion];

  const handleAnswer = (answer: string) => {
    if (question.type === "multiple") {
      const current = answers[currentQuestion] || [];
      const maxSelections = question.maxSelections || 999;

      if (current.includes(answer)) {
        // Remove se já selecionado
        setAnswers({
          ...answers,
          [currentQuestion]: current.filter((a: string) => a !== answer),
        });
      } else if (current.length < maxSelections) {
        // Adiciona se não atingiu o limite
        setAnswers({
          ...answers,
          [currentQuestion]: [...current, answer],
        });
      }
    } else {
      setAnswers({ ...answers, [currentQuestion]: answer });
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      setAnswers({ ...answers, [currentQuestion]: textInput.trim() });
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTextInput("");
    } else {
      // Finalizar quiz - salvar respostas e redirecionar
      const persona = getRecommendedPersona(answers);
      console.log("Respostas do quiz:", answers);
      console.log("Persona recomendada:", persona);

      // Salvar no localStorage (em produção, salvar no Supabase)
      localStorage.setItem("onboarding_answers", JSON.stringify(answers));
      localStorage.setItem("recommended_persona", persona);

      // Redirecionar para checkout com plano anual destacado
      router.push("/checkout?plan=anual&persona=" + persona);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTextInput("");
    }
  };

  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  // Verificar se tem resposta válida
  let hasAnswer = false;
  if (question.type === "text") {
    hasAnswer = textInput.trim().length > 0 || answers[currentQuestion];
  } else if (question.type === "multiple") {
    hasAnswer = (answers[currentQuestion] || []).length > 0;
  } else {
    hasAnswer = answers[currentQuestion] !== undefined;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-accent-text mb-2">
            Vamos te conhecer melhor, linda 💖
          </h1>
          <p className="text-gray-600">
            Responda 10 perguntas para personalizar sua jornada no Vênus Club
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Pergunta {currentQuestion + 1} de {QUIZ_QUESTIONS.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-white/50 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full gradient-venus transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-3xl p-8 shadow-2xl mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">
            {question.question}
          </h2>
          {question.subtitle && (
            <p className="text-gray-500 mb-6 text-sm">{question.subtitle}</p>
          )}

          {/* Campo de texto */}
          {question.type === "text" && (
            <div className="space-y-4">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onBlur={handleTextSubmit}
                placeholder={question.placeholder}
                className="w-full px-6 py-4 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none text-lg transition-all"
              />
            </div>
          )}

          {/* Opções de escolha única */}
          {question.type === "single" && (
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                    answers[currentQuestion] === option
                      ? "border-pink-500 bg-pink-50 shadow-lg scale-[1.02]"
                      : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion] === option
                          ? "border-pink-500 bg-pink-500"
                          : "border-gray-300"
                      }`}
                    >
                      {answers[currentQuestion] === option && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="font-medium text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Opções de múltipla escolha */}
          {question.type === "multiple" && (
            <div className="space-y-3">
              {question.options?.map((option, index) => {
                const isSelected = (answers[currentQuestion] || []).includes(
                  option
                );
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-pink-500 bg-pink-50 shadow-lg"
                        : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-pink-500 bg-pink-500"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium text-gray-700">{option}</span>
                    </div>
                  </button>
                );
              })}
              <p className="text-sm text-gray-500 mt-2">
                {(answers[currentQuestion] || []).length} de{" "}
                {question.maxSelections} selecionadas
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </button>

          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            className="flex items-center gap-2 px-8 py-3 gradient-venus text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {currentQuestion === QUIZ_QUESTIONS.length - 1
              ? "Finalizar ✨"
              : "Próxima"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
