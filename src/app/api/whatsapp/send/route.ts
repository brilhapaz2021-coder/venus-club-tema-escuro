import { NextRequest, NextResponse } from 'next/server';

/**
 * API para enviar mensagens via WhatsApp
 * Suporta Twilio e MessageBird
 */

interface SendMessageRequest {
  to: string; // Número do destinatário (formato internacional: +5511999999999)
  message: string;
  mediaUrl?: string; // URL de mídia (imagem, vídeo, etc)
}

// Enviar mensagem via Twilio
async function sendViaTwilio(to: string, message: string, mediaUrl?: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Ex: whatsapp:+14155238886

  if (!accountSid || !authToken || !fromNumber) {
    throw new Error('Credenciais Twilio não configuradas');
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  
  const body = new URLSearchParams({
    From: fromNumber,
    To: `whatsapp:${to}`,
    Body: message
  });

  if (mediaUrl) {
    body.append('MediaUrl', mediaUrl);
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro Twilio: ${error}`);
  }

  return await response.json();
}

// Enviar mensagem via MessageBird
async function sendViaMessageBird(to: string, message: string, mediaUrl?: string) {
  const apiKey = process.env.MESSAGEBIRD_API_KEY;
  const channelId = process.env.MESSAGEBIRD_CHANNEL_ID;

  if (!apiKey || !channelId) {
    throw new Error('Credenciais MessageBird não configuradas');
  }

  const url = 'https://conversations.messagebird.com/v1/send';

  const payload: any = {
    to: to,
    type: 'text',
    content: {
      text: message
    },
    channelId: channelId
  };

  if (mediaUrl) {
    payload.type = 'image';
    payload.content = {
      image: {
        url: mediaUrl
      },
      text: message
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `AccessKey ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro MessageBird: ${error}`);
  }

  return await response.json();
}

export async function POST(request: NextRequest) {
  try {
    const body: SendMessageRequest = await request.json();
    const { to, message, mediaUrl } = body;

    // Validações
    if (!to || !message) {
      return NextResponse.json({
        success: false,
        error: 'Parâmetros obrigatórios: to, message'
      }, { status: 400 });
    }

    // Validar formato do número
    if (!to.startsWith('+')) {
      return NextResponse.json({
        success: false,
        error: 'Número deve estar no formato internacional (+5511999999999)'
      }, { status: 400 });
    }

    const provider = process.env.WHATSAPP_PROVIDER || 'twilio';

    let result;

    if (provider === 'twilio') {
      result = await sendViaTwilio(to, message, mediaUrl);
    } else if (provider === 'messagebird') {
      result = await sendViaMessageBird(to, message, mediaUrl);
    } else {
      return NextResponse.json({
        success: false,
        error: 'Provedor WhatsApp não configurado. Configure WHATSAPP_PROVIDER (twilio ou messagebird)'
      }, { status: 500 });
    }

    console.log('✅ Mensagem enviada via WhatsApp:', { to, provider });

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso',
      provider,
      data: result
    });

  } catch (error) {
    console.error('❌ Erro ao enviar mensagem WhatsApp:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao enviar mensagem'
    }, { status: 500 });
  }
}
