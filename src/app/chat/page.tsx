"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon, Mic, User, Bot, Sparkles, ChevronDown, Shield } from "lucide-react";
import { PersonaType, PERSONAS } from "@/lib/chatCoach";
import SafetyCenter from "@/components/SafetyCenter";
import { detectRiskKeywords } from "@/lib/safetyDetection";

type Message = {
  id: string;
  sender: "user" | "coach";
  text: string;
  timestamp: Date;
  mediaUrl?: string;
  audioUrl?: string;
};

type Suggestion = {
  curta: string;
  direta: string;
  charmosa: string;
  acao: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<PersonaType>('selena');
  const [conversationId, setConversationId] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion | null>(null);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showSafetyCenter, setShowSafetyCenter] = useState(false);
  const [triggeredKeywords, setTriggeredKeywords] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Carregar histórico ao montar
  useEffect(() => {
    loadHistory();
  }, []);

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Detectar palavras de risco após cada mensagem
  useEffect(() => {
    if (messages.length > 0) {
      const recentMessages = messages.slice(-5).map(m => m.text).join(' ');
      const detection = detectRiskKeywords(recentMessages);
      
      if (detection.shouldTriggerSafetyCenter && !showSafetyCenter) {
        setTriggeredKeywords(detection.keywords);
        setShowSafetyCenter(true);
      }
    }
  }, [messages]);

  const loadHistory = async () => {
    try {
      const response = await fetch('/api/chat/history?userId=test-user');
      const data = await response.json();
      
      if (data.success && data.messages.length > 0) {
        const formattedMessages = data.messages.map((msg: any) => ({
          id: msg.id,
          sender: msg.author === 'user' ? 'user' : 'coach',
          text: msg.text,
          timestamp: new Date(msg.createdAt),
          mediaUrl: msg.mediaUrl,
          audioUrl: msg.audioUrl
        }));
        setMessages(formattedMessages);
        setConversationId(data.messages[0].conversationId);
      } else {
        // Mensagem inicial se não houver histórico
        setMessages([{
          id: 'welcome',
          sender: 'coach',
          text: `Olá! Sou a ${PERSONAS[currentPersona].name}. ${PERSONAS[currentPersona].description}. Como posso te ajudar hoje?`,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      sender: "user",
      text: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputText,
          persona: currentPersona,
          userId: 'test-user',
          conversationId: conversationId || undefined
        })
      });

      const data = await response.json();

      if (data.success) {
        // Atualizar conversationId se for nova conversa
        if (!conversationId) {
          setConversationId(data.conversationId);
        }

        // Adicionar resposta da coach
        const coachMessage: Message = {
          id: data.coachMessage.id,
          sender: 'coach',
          text: data.coachMessage.text,
          timestamp: new Date(data.coachMessage.createdAt)
        };

        setMessages(prev => [...prev, coachMessage]);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      // Mensagem de erro
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        sender: 'coach',
        text: 'Desculpe, ocorreu um erro. Tente novamente.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    try {
      const lastMessages = messages.slice(-5).map(m => `${m.sender}: ${m.text}`).join('\n');
      
      const response = await fetch('/api/chat/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationContext: lastMessages,
          userId: 'test-user'
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuggestions(data.suggestions);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Em produção, fazer upload para storage e enviar URL
      console.log("Arquivo selecionado:", file.name);
      
      // Simular envio de imagem
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        sender: "user",
        text: "[Imagem enviada]",
        timestamp: new Date(),
        mediaUrl: URL.createObjectURL(file)
      };
      
      setMessages(prev => [...prev, userMessage]);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? "Parou de gravar" : "Iniciou gravação");
  };

  const switchPersona = (newPersona: PersonaType) => {
    setCurrentPersona(newPersona);
    setShowPersonaMenu(false);
    
    // Mensagem de transição
    const transitionMessage: Message = {
      id: `transition-${Date.now()}`,
      sender: 'coach',
      text: `Olá! Agora você está conversando com ${PERSONAS[newPersona].name}. ${PERSONAS[newPersona].description}. Como posso te ajudar?`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, transitionMessage]);
  };

  const personaConfig = PERSONAS[currentPersona];

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Safety Center Modal */}
      <SafetyCenter 
        isOpen={showSafetyCenter}
        onClose={() => setShowSafetyCenter(false)}
        triggeredKeywords={triggeredKeywords}
        conversationId={conversationId}
      />

      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-venus flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold">{personaConfig.name}</h2>
              <p className="text-xs text-muted-foreground">{personaConfig.specialty}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Safety Center Button */}
            <button
              onClick={() => setShowSafetyCenter(true)}
              className="p-2 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 rounded-lg transition-all"
              title="Centro de Segurança"
            >
              <Shield className="w-5 h-5 text-red-600" />
            </button>

            {/* Persona Menu */}
            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
              >
                Trocar Persona
                <ChevronDown className="w-4 h-4" />
              </button>

              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
                  {(Object.keys(PERSONAS) as PersonaType[]).map((persona) => (
                    <button
                      key={persona}
                      onClick={() => switchPersona(persona)}
                      className={`w-full px-4 py-3 text-left hover:bg-muted transition-all first:rounded-t-lg last:rounded-b-lg ${
                        currentPersona === persona ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="font-medium">{PERSONAS[persona].name}</div>
                      <div className="text-xs text-muted-foreground">{PERSONAS[persona].specialty}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === "user"
                    ? "bg-primary"
                    : "gradient-venus"
                }`}
              >
                {message.sender === "user" ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              <div
                className={`max-w-[70%] ${
                  message.sender === "user" ? "items-end" : "items-start"
                } flex flex-col gap-1`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-card border border-border"
                  }`}
                >
                  {message.mediaUrl && (
                    <img 
                      src={message.mediaUrl} 
                      alt="Imagem enviada" 
                      className="rounded-lg mb-2 max-w-full"
                    />
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
                <span className="text-xs text-muted-foreground px-2">
                  {message.timestamp.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full gradient-venus flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-card border border-border px-4 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions Panel */}
      {showSuggestions && suggestions && currentPersona === 'selena' && (
        <div className="bg-card border-t border-border px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Sugestões de Resposta
              </h3>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Fechar
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <button
                onClick={() => setInputText(suggestions.curta)}
                className="p-3 bg-muted hover:bg-muted/80 rounded-lg text-left transition-all"
              >
                <div className="text-xs font-medium text-muted-foreground mb-1">Curta</div>
                <div className="text-sm">{suggestions.curta}</div>
              </button>
              
              <button
                onClick={() => setInputText(suggestions.direta)}
                className="p-3 bg-muted hover:bg-muted/80 rounded-lg text-left transition-all"
              >
                <div className="text-xs font-medium text-muted-foreground mb-1">Direta</div>
                <div className="text-sm">{suggestions.direta}</div>
              </button>
              
              <button
                onClick={() => setInputText(suggestions.charmosa)}
                className="p-3 bg-muted hover:bg-muted/80 rounded-lg text-left transition-all"
              >
                <div className="text-xs font-medium text-muted-foreground mb-1">Charmosa</div>
                <div className="text-sm">{suggestions.charmosa}</div>
              </button>
            </div>
            
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="text-xs font-medium text-primary mb-1">💡 Sugestão de Ação</div>
              <div className="text-sm">{suggestions.acao}</div>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-card border-t border-border px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Botão de sugestões (apenas para Selena) */}
          {currentPersona === 'selena' && messages.length > 2 && (
            <div className="mb-3">
              <button
                onClick={handleGetSuggestions}
                disabled={isLoading}
                className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                Gerar Sugestões de Resposta
              </button>
            </div>
          )}

          <div className="flex items-end gap-2">
            {/* Photo Button */}
            <button
              onClick={handlePhotoUpload}
              className="p-3 bg-muted hover:bg-muted/80 rounded-xl transition-all"
              title="Enviar foto"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Audio Button */}
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-xl transition-all ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                  : "bg-muted hover:bg-muted/80"
              }`}
              title={isRecording ? "Parar gravação" : "Gravar áudio"}
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Text Input */}
            <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-transparent py-3 focus:outline-none"
                disabled={isLoading}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="p-3 gradient-venus text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Enviar mensagem"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
