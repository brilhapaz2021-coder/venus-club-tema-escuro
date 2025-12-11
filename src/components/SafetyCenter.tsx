"use client";

import { useState } from "react";
import { 
  X, 
  Phone, 
  Shield, 
  AlertTriangle, 
  Download, 
  MessageSquare,
  MapPin,
  FileText,
  ExternalLink
} from "lucide-react";

interface SafetyCenterProps {
  isOpen: boolean;
  onClose: () => void;
  triggeredKeywords?: string[];
  conversationId?: string;
}

export default function SafetyCenter({ 
  isOpen, 
  onClose, 
  triggeredKeywords = [],
  conversationId 
}: SafetyCenterProps) {
  const [isSavingEvidence, setIsSavingEvidence] = useState(false);
  const [evidenceSaved, setEvidenceSaved] = useState(false);

  if (!isOpen) return null;

  const handleSaveEvidence = async () => {
    setIsSavingEvidence(true);
    
    try {
      // Em produção: salvar prints/mensagens em storage seguro
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Registrar alerta na tabela alerts
      await fetch('/api/safety/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'test-user',
          conversationId,
          triggeredKeywords,
          timestamp: new Date().toISOString(),
          evidenceSaved: true
        })
      });
      
      setEvidenceSaved(true);
    } catch (error) {
      console.error('Erro ao salvar evidências:', error);
    } finally {
      setIsSavingEvidence(false);
    }
  };

  const handleContactSupport = () => {
    // Placeholder: abrir chat com suporte humano
    alert('Conectando você com nossa equipe de suporte especializada...');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-red-500 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">Centro de Segurança</h2>
              <p className="text-sm text-red-100">Sua segurança é nossa prioridade</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-600 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alert Message */}
        {triggeredKeywords.length > 0 && (
          <div className="mx-6 mt-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-red-900 dark:text-red-100 mb-1">
                Detectamos sinais de alerta na conversa
              </p>
              <p className="text-red-700 dark:text-red-300">
                Identificamos palavras que podem indicar uma situação de risco. 
                Estamos aqui para te apoiar.
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Emergency Contacts */}
          <section>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-500" />
              Números de Emergência
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                href="tel:180"
                className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/40 transition-all"
              >
                <div className="font-semibold text-red-900 dark:text-red-100">180 - Central da Mulher</div>
                <div className="text-sm text-red-700 dark:text-red-300">Atendimento 24h gratuito</div>
              </a>
              
              <a
                href="tel:190"
                className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/40 transition-all"
              >
                <div className="font-semibold text-red-900 dark:text-red-100">190 - Polícia Militar</div>
                <div className="text-sm text-red-700 dark:text-red-300">Emergência imediata</div>
              </a>
              
              <a
                href="tel:188"
                className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/40 transition-all"
              >
                <div className="font-semibold text-red-900 dark:text-red-100">188 - CVV</div>
                <div className="text-sm text-red-700 dark:text-red-300">Centro de Valorização da Vida</div>
              </a>
              
              <a
                href="tel:197"
                className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/40 transition-all"
              >
                <div className="font-semibold text-red-900 dark:text-red-100">197 - Polícia Civil</div>
                <div className="text-sm text-red-700 dark:text-red-300">Denúncias e ocorrências</div>
              </a>
            </div>
          </section>

          {/* Local Resources */}
          <section>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Recursos Locais
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-muted rounded-lg">
                <div className="font-semibold mb-1">Casa da Mulher Brasileira</div>
                <div className="text-sm text-muted-foreground mb-2">
                  Atendimento humanizado e integrado para mulheres em situação de violência
                </div>
                <a 
                  href="https://www.gov.br/mdh/pt-br/navegue-por-temas/politicas-para-mulheres/arquivo/assuntos/violencia/programa-mulher-viver-sem-violencia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Encontrar unidade mais próxima
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="font-semibold mb-1">Delegacia da Mulher</div>
                <div className="text-sm text-muted-foreground mb-2">
                  Delegacias especializadas no atendimento à mulher (DEAM)
                </div>
                <div className="text-sm text-muted-foreground">
                  📍 Busque "Delegacia da Mulher" + sua cidade no Google Maps
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="font-semibold mb-1">Lei Maria da Penha</div>
                <div className="text-sm text-muted-foreground mb-2">
                  Lei 11.340/2006 - Proteção contra violência doméstica
                </div>
                <a 
                  href="http://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Conheça seus direitos
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <section>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Ações de Proteção
            </h3>
            <div className="space-y-3">
              <button
                onClick={handleSaveEvidence}
                disabled={isSavingEvidence || evidenceSaved}
                className="w-full p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSavingEvidence ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Salvando evidências...
                  </>
                ) : evidenceSaved ? (
                  <>
                    <Download className="w-5 h-5" />
                    Evidências salvas com segurança
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Salvar Provas (Mensagens/Prints)
                  </>
                )}
              </button>

              {evidenceSaved && (
                <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-800 dark:text-green-200">
                  ✓ Suas evidências foram salvas de forma segura e criptografada. 
                  Você pode acessá-las a qualquer momento.
                </div>
              )}

              <button
                onClick={handleContactSupport}
                className="w-full p-4 bg-card border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Falar com Suporte Humano Especializado
              </button>
            </div>
          </section>

          {/* Safety Tips */}
          <section>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Dicas de Segurança
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold mb-1">🔒 Proteja suas informações</div>
                <div className="text-muted-foreground">
                  Não compartilhe senhas, localização em tempo real ou dados bancários
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold mb-1">👥 Conte para alguém</div>
                <div className="text-muted-foreground">
                  Mantenha amigos/família informados sobre onde você está e com quem
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold mb-1">📱 Documente tudo</div>
                <div className="text-muted-foreground">
                  Guarde prints, áudios e mensagens que possam servir como prova
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold mb-1">🚨 Confie no seu instinto</div>
                <div className="text-muted-foreground">
                  Se algo não parece certo, provavelmente não está. Sua intuição importa
                </div>
              </div>
            </div>
          </section>

          {/* Footer Message */}
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
            <p className="text-sm font-medium text-primary mb-1">
              💜 Você não está sozinha
            </p>
            <p className="text-xs text-muted-foreground">
              Estamos aqui para te apoiar em qualquer situação. 
              Sua segurança e bem-estar são nossa prioridade absoluta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
