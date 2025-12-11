import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook do WhatsApp - Recebe mensagens via Twilio/MessageBird
 * 
 * CONFIGURAÇÃO NECESSÁRIA:
 * - WHATSAPP_PROVIDER: 'twilio' ou 'messagebird'
 * - TWILIO_ACCOUNT_SID: SID da conta Twilio
 * - TWILIO_AUTH_TOKEN: Token de autenticação Twilio
 * - TWILIO_WHATSAPP_NUMBER: Número WhatsApp Twilio (formato: whatsapp:+14155238886)
 * 
 * OU para MessageBird:
 * - MESSAGEBIRD_API_KEY: Chave API MessageBird
 * - MESSAGEBIRD_CHANNEL_ID: ID do canal WhatsApp
 */

interface WhatsAppMessage {
  from: string;
  to: string;
  body: string;
  mediaUrl?: string;
  timestamp: string;
}

// Verificação do webhook (Twilio)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hubMode = searchParams.get('hub.mode');
  const hubVerifyToken = searchParams.get('hub.verify_token');
  const hubChallenge = searchParams.get('hub.challenge');

  // Token de verificação (configurar no ambiente)
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'chatcoach-verify-token';

  if (hubMode === 'subscribe' && hubVerifyToken === VERIFY_TOKEN) {
    console.log('✅ Webhook verificado com sucesso');
    return new NextResponse(hubChallenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verificação falhou' }, { status: 403 });
}

// Receber mensagens do WhatsApp
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📱 Mensagem recebida do WhatsApp:', body);

    const provider = process.env.WHATSAPP_PROVIDER || 'twilio';

    let message: WhatsAppMessage;

    // Parser para Twilio
    if (provider === 'twilio') {
      message = {
        from: body.From?.replace('whatsapp:', ''), // Remove prefixo whatsapp:
        to: body.To?.replace('whatsapp:', ''),
        body: body.Body || '',
        mediaUrl: body.MediaUrl0,
        timestamp: new Date().toISOString()
      };
    } 
    // Parser para MessageBird
    else if (provider === 'messagebird') {
      message = {
        from: body.message?.from || '',
        to: body.message?.to || '',
        body: body.message?.content?.text || '',
        mediaUrl: body.message?.content?.image?.url,
        timestamp: body.message?.createdDatetime || new Date().toISOString()
      };
    } 
    else {
      throw new Error('Provedor WhatsApp não configurado');
    }

    // Validar mensagem
    if (!message.from || !message.body) {
      return NextResponse.json({ 
        success: false, 
        error: 'Mensagem inválida' 
      }, { status: 400 });
    }

    // Processar mensagem com o agente Selena
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/chat/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message.body,
        persona: 'selena',
        userId: message.from, // Usar número do WhatsApp como userId
        source: 'whatsapp',
        mediaUrl: message.mediaUrl
      })
    });

    const chatData = await response.json();

    if (chatData.success) {
      // Enviar resposta de volta para o WhatsApp
      const sendResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/whatsapp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: message.from,
          message: chatData.coachMessage.text
        })
      });

      const sendData = await sendResponse.json();

      return NextResponse.json({
        success: true,
        message: 'Mensagem processada e resposta enviada',
        data: {
          received: message,
          response: chatData.coachMessage,
          sent: sendData
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Erro ao processar mensagem com o agente'
    }, { status: 500 });

  } catch (error) {
    console.error('❌ Erro no webhook WhatsApp:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}
