"use client";

import { useState, useEffect } from "react";
import { MessageCircle, CheckCircle, XCircle, RefreshCw, Copy, ExternalLink } from "lucide-react";

interface StatusData {
  provider: string;
  configured: boolean;
  twilio: {
    available: boolean;
    accountSid: string;
    authToken: string;
    whatsappNumber: string;
  };
  messagebird: {
    available: boolean;
    apiKey: string;
    channelId: string;
  };
  instructions: {
    twilio: string[];
    messagebird: string[];
  };
}

export default function WhatsAppSetupPage() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [testNumber, setTestNumber] = useState("+55");
  const [testMessage, setTestMessage] = useState("Olá! Esta é uma mensagem de teste do ChatCoach.");
  const [sending, setSending] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const webhookUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/whatsapp/webhook`
    : 'https://seu-dominio.com/api/whatsapp/webhook';

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/whatsapp/status');
      const data = await response.json();
      if (data.success) {
        setStatus(data.status);
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendTestMessage = async () => {
    setSending(true);
    setTestResult(null);
    
    try {
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testNumber,
          message: testMessage
        })
      });

      const data = await response.json();
      
      setTestResult({
        success: data.success,
        message: data.success 
          ? '✅ Mensagem enviada com sucesso!' 
          : `❌ Erro: ${data.error}`
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: `❌ Erro ao enviar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      });
    } finally {
      setSending(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span className="text-lg">Verificando configuração...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-venus mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Integração WhatsApp</h1>
          <p className="text-muted-foreground">
            Configure o agente Selena para responder mensagens no WhatsApp
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Status da Integração</h2>
            <button
              onClick={checkStatus}
              className="p-2 hover:bg-muted rounded-lg transition-all"
              title="Atualizar status"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Provedor Atual */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <div className="font-medium">Provedor Configurado</div>
                <div className="text-sm text-muted-foreground">
                  {status?.provider === 'twilio' ? 'Twilio' : 
                   status?.provider === 'messagebird' ? 'MessageBird' : 
                   'Nenhum provedor configurado'}
                </div>
              </div>
              {status?.configured ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
            </div>

            {/* Twilio Status */}
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold">Twilio</h3>
                {status?.twilio.available ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account SID:</span>
                  <span>{status?.twilio.accountSid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Auth Token:</span>
                  <span>{status?.twilio.authToken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">WhatsApp Number:</span>
                  <span>{status?.twilio.whatsappNumber}</span>
                </div>
              </div>
            </div>

            {/* MessageBird Status */}
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold">MessageBird</h3>
                {status?.messagebird.available ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Key:</span>
                  <span>{status?.messagebird.apiKey}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Channel ID:</span>
                  <span>{status?.messagebird.channelId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Webhook URL */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">URL do Webhook</h2>
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <code className="flex-1 text-sm">{webhookUrl}</code>
            <button
              onClick={() => copyToClipboard(webhookUrl)}
              className="p-2 hover:bg-background rounded transition-all"
              title="Copiar URL"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Configure esta URL no painel do seu provedor WhatsApp
          </p>
        </div>

        {/* Test Message */}
        {status?.configured && (
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Enviar Mensagem de Teste</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Número do WhatsApp (formato internacional)
                </label>
                <input
                  type="text"
                  value={testNumber}
                  onChange={(e) => setTestNumber(e.target.value)}
                  placeholder="+5511999999999"
                  className="w-full px-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                onClick={sendTestMessage}
                disabled={sending || !testNumber || !testMessage}
                className="w-full py-3 gradient-venus text-white rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    Enviar Mensagem de Teste
                  </>
                )}
              </button>

              {testResult && (
                <div className={`p-4 rounded-lg ${
                  testResult.success 
                    ? 'bg-green-500/10 border border-green-500/20 text-green-600' 
                    : 'bg-red-500/10 border border-red-500/20 text-red-600'
                }`}>
                  {testResult.message}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Como Configurar</h2>
          
          <div className="space-y-6">
            {/* Twilio Instructions */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                Opção 1: Twilio
                <a 
                  href="https://www.twilio.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm flex items-center gap-1"
                >
                  Acessar site <ExternalLink className="w-3 h-3" />
                </a>
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                {status?.instructions.twilio.map((instruction, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* MessageBird Instructions */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                Opção 2: MessageBird
                <a 
                  href="https://www.messagebird.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm flex items-center gap-1"
                >
                  Acessar site <ExternalLink className="w-3 h-3" />
                </a>
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                {status?.instructions.messagebird.map((instruction, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
