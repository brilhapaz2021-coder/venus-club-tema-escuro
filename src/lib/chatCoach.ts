// ChatCoach Service - Personas e lógica de resposta

export type PersonaType = 'selena' | 'venus' | 'afrodite' | 'esther' | 'samila';

export interface ChatMessage {
  id: string;
  conversationId: string;
  author: 'user' | 'coach';
  text: string;
  mediaUrl?: string;
  audioUrl?: string;
  createdAt: Date;
}

export interface SuggestionResponse {
  curta: string;
  direta: string;
  charmosa: string;
  acao: string;
}

export interface PersonaConfig {
  name: string;
  description: string;
  tone: string;
  specialty: string;
}

export const PERSONAS: Record<PersonaType, PersonaConfig> = {
  selena: {
    name: 'Selena Valentini',
    description: 'Coach de relacionamentos empática e profissional',
    tone: 'empático, profissional, adaptável',
    specialty: 'Análise de conversas e sugestões de respostas estratégicas'
  },
  venus: {
    name: 'Vênus',
    description: 'Sexóloga especializada em sensualidade',
    tone: 'educativo, acolhedor, sem julgamentos',
    specialty: 'Educação sexual e desenvolvimento da sensualidade'
  },
  afrodite: {
    name: 'Afrodite',
    description: 'Especialista em sedução e magnetismo',
    tone: 'confiante, elegante, provocativo',
    specialty: 'Exercícios de sedução e micro-dicas práticas'
  },
  esther: {
    name: 'Esther',
    description: 'Coach de autoestima e empoderamento',
    tone: 'motivador, firme, inspirador',
    specialty: 'Planos diários de ações para fortalecer autoestima'
  },
  samila: {
    name: 'Samila (Safety)',
    description: 'Especialista em segurança e proteção',
    tone: 'objetivo, claro, direto',
    specialty: 'Instruções de segurança e contatos de emergência'
  }
};

// Gerar resposta baseada na persona
export async function generatePersonaResponse(
  persona: PersonaType,
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  const personaConfig = PERSONAS[persona];
  
  // Simular resposta baseada na persona (em produção, usar OpenAI API)
  switch (persona) {
    case 'selena':
      return generateSelenaResponse(userMessage, conversationHistory);
    case 'venus':
      return generateVenusResponse(userMessage);
    case 'afrodite':
      return generateAfroditeResponse(userMessage);
    case 'esther':
      return generateEstherResponse(userMessage);
    case 'samila':
      return generateSamilaResponse(userMessage);
    default:
      return 'Olá! Como posso te ajudar hoje?';
  }
}

// Selena: Análise empática e sugestões estratégicas
function generateSelenaResponse(message: string, history: ChatMessage[]): string {
  const responses = [
    'Entendo perfeitamente como você está se sentindo. Vamos analisar essa situação juntas e encontrar a melhor forma de você se posicionar.',
    'Essa é uma situação delicada, mas você tem todo o poder de escolher como reagir. Deixa eu te mostrar algumas opções inteligentes.',
    'Percebo que isso está mexendo com você. Vamos trabalhar juntas para você se comunicar de forma clara e assertiva, sem perder sua essência.',
    'Interessante... Vejo aqui alguns sinais importantes. Vou te ajudar a interpretar isso e responder da melhor forma possível.'
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Vênus: Educação sexual e sensualidade
function generateVenusResponse(message: string): string {
  return `Que ótima pergunta! Vamos explorar isso juntas de forma educativa e sem tabus.

**3 Passos Práticos:**

1️⃣ **Autoconhecimento**: Comece explorando seu próprio corpo e entendendo o que te dá prazer. Isso é fundamental para comunicar suas necessidades.

2️⃣ **Comunicação aberta**: Converse com seu parceiro sobre desejos, limites e fantasias. A intimidade cresce quando há diálogo honesto.

3️⃣ **Experimentação gradual**: Teste novas experiências no seu ritmo, sempre respeitando seus limites e conforto.

Lembre-se: sua sensualidade é única e merece ser celebrada! 💜`;
}

// Afrodite: Sedução e magnetismo
function generateAfroditeResponse(message: string): string {
  const tips = [
    `✨ **Micro-dica de Sedução:**

O segredo está no olhar. Pratique o "triângulo do olhar": olhe para um olho, depois o outro, e finalmente para os lábios. Isso cria uma tensão magnética irresistível.

**Exercício de hoje:** Pratique esse olhar no espelho por 2 minutos. Depois, use naturalmente em uma conversa.`,

    `💋 **Exercício de Magnetismo:**

A sedução começa na sua energia. Hoje, pratique a "pausa sedutora": quando ele falar algo interessante, faça uma pausa de 2 segundos antes de responder, mantendo contato visual.

**Por quê funciona:** Cria mistério e mostra que você está realmente presente.`,

    `🌹 **Dica de Elegância Sedutora:**

Toque sutil é poder. Ao conversar, toque levemente o braço dele por 1-2 segundos quando fizer um ponto importante.

**Regra de ouro:** Menos é mais. Um toque estratégico vale mais que vários aleatórios.`
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
}

// Esther: Autoestima e empoderamento
function generateEstherResponse(message: string): string {
  return `💪 **Plano de Ação para Hoje:**

Você é mais forte do que imagina! Vamos trabalhar sua autoestima com ações práticas:

**Manhã (7h-12h):**
- Afirmação no espelho: "Eu sou suficiente e mereço ser amada"
- Liste 3 qualidades suas que você valoriza

**Tarde (12h-18h):**
- Faça algo só para você (banho relaxante, música favorita, hobby)
- Pratique dizer "não" a algo que não te serve

**Noite (18h-22h):**
- Escreva 1 conquista do dia (por menor que seja)
- Visualize a mulher que você quer ser

**Lembre-se:** Autoestima se constrói com ações diárias. Você está no caminho certo! 🌟`;
}

// Samila: Segurança e proteção
function generateSamilaResponse(message: string): string {
  return `🚨 **Orientações de Segurança:**

Sua segurança é prioridade absoluta. Aqui estão as ações imediatas:

**Se você está em perigo agora:**
- 📞 Ligue 190 (Polícia Militar)
- 📞 Ligue 180 (Central de Atendimento à Mulher)

**Sinais de relacionamento abusivo:**
- Controle excessivo (celular, roupas, amizades)
- Isolamento de família e amigos
- Humilhações e xingamentos
- Ameaças ou violência física

**Ações de proteção:**
1. Documente tudo (prints, áudios, fotos)
2. Conte para alguém de confiança
3. Procure uma Delegacia da Mulher
4. Considere medida protetiva

**Contatos importantes:**
- 180: Central da Mulher (24h)
- 190: Polícia Militar
- 188: Centro de Valorização da Vida

Você não está sozinha. Estou aqui para te apoiar. 💜`;
}

// Gerar sugestões de resposta (específico para Selena)
export async function generateSuggestions(
  conversationContext: string,
  imageUrl?: string
): Promise<SuggestionResponse> {
  // Em produção, usar OpenAI Vision API para analisar imagens
  
  return {
    curta: 'Entendi 😊',
    direta: 'Preciso pensar sobre isso. Vamos conversar depois?',
    charmosa: 'Adorei sua mensagem... me deixou pensativa aqui 💭✨',
    acao: 'Sugestão: Espere algumas horas antes de responder. Isso mostra que você tem sua própria vida e não está ansiosa.'
  };
}

// Analisar imagem de conversa (para Selena)
export async function analyzeConversationImage(imageUrl: string): Promise<string> {
  // Em produção, usar OpenAI Vision API
  return 'Analisando a conversa da imagem, percebo alguns pontos importantes que podemos trabalhar juntas...';
}
