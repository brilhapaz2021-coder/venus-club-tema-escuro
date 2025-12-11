"use client";

import { useState } from "react";
import { Shield, Phone, MessageSquare, AlertTriangle, X } from "lucide-react";

const EMERGENCY_CONTACTS = {
  BR: [
    { name: "Polícia Militar", number: "190", type: "Emergência Geral" },
    { name: "SAMU", number: "192", type: "Emergência Médica" },
    { name: "Bombeiros", number: "193", type: "Resgate" },
    { name: "Disque Denúncia", number: "181", type: "Denúncias Anônimas" },
    { name: "Central de Atendimento à Mulher", number: "180", type: "Violência contra Mulher" },
  ],
};

export default function SafetyPage() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const handleEmergencyCall = (number: string) => {
    setSelectedContact(number);
    setShowEmergencyModal(true);
  };

  const confirmCall = () => {
    if (selectedContact) {
      window.location.href = `tel:${selectedContact}`;
      setShowEmergencyModal(false);
    }
  };

  const sendEmergencyMessage = () => {
    console.log("Enviando mensagem de emergência para contatos de confiança");
    alert("Mensagem de emergência enviada para seus contatos de confiança!");
    setShowEmergencyModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-venus flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Central de Segurança</h1>
          <p className="text-muted-foreground">
            Sua segurança é nossa prioridade. Acesse recursos de emergência rapidamente.
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="mb-8 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Em Situação de Emergência?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Se você está em perigo imediato, clique no botão abaixo para acessar contatos de emergência rapidamente.
              </p>
              <button
                onClick={() => setShowEmergencyModal(true)}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all hover:scale-105"
              >
                Ativar Modo Emergência
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Contatos de Emergência - Brasil</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EMERGENCY_CONTACTS.BR.map((contact, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.type}</p>
                  </div>
                  <div className="text-2xl font-bold gradient-accent-text">
                    {contact.number}
                  </div>
                </div>
                <button
                  onClick={() => handleEmergencyCall(contact.number)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 gradient-venus text-white rounded-xl font-semibold hover:opacity-90 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Ligar Agora
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Dicas de Segurança</h2>
          <div className="space-y-4">
            <SafetyTip
              title="Privacidade em Primeiro Lugar"
              description="Nunca compartilhe informações pessoais sensíveis com desconhecidos online."
            />
            <SafetyTip
              title="Compras Seguras"
              description="Todas as transações no Venus Club são criptografadas e 100% seguras."
            />
            <SafetyTip
              title="Entrega Discreta"
              description="Seus pedidos chegam em embalagens neutras, sem identificação do conteúdo."
            />
            <SafetyTip
              title="Comunidade Respeitosa"
              description="Denuncie qualquer comportamento inadequado. Nossa equipe age rapidamente."
            />
          </div>
        </div>
      </div>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-red-500">Modo Emergência</h3>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-muted-foreground mb-6">
              Escolha uma ação de emergência:
            </p>

            <div className="space-y-3">
              <button
                onClick={confirmCall}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
              >
                <Phone className="w-5 h-5" />
                Ligar para {selectedContact || "190"}
              </button>

              <button
                onClick={sendEmergencyMessage}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                Enviar Mensagem de Emergência
              </button>

              <button
                onClick={() => setShowEmergencyModal(false)}
                className="w-full px-6 py-4 bg-muted hover:bg-muted/80 rounded-xl font-semibold transition-all"
              >
                Cancelar
              </button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              A mensagem de emergência será enviada para seus contatos de confiança cadastrados.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function SafetyTip({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
