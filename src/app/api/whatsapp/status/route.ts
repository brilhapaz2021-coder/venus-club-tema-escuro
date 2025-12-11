import { NextRequest, NextResponse } from 'next/server';

/**
 * Verificar status da integração WhatsApp
 */

export async function GET(request: NextRequest) {
  try {
    const provider = process.env.WHATSAPP_PROVIDER;
    
    // Verificar configurações do Twilio
    const twilioConfigured = !!(
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_WHATSAPP_NUMBER
    );

    // Verificar configurações do MessageBird
    const messagebirdConfigured = !!(
      process.env.MESSAGEBIRD_API_KEY &&
      process.env.MESSAGEBIRD_CHANNEL_ID
    );

    const isConfigured = provider === 'twilio' 
      ? twilioConfigured 
      : provider === 'messagebird' 
        ? messagebirdConfigured 
        : false;

    return NextResponse.json({
      success: true,
      status: {
        provider: provider || 'não configurado',
        configured: isConfigured,
        twilio: {
          available: twilioConfigured,
          accountSid: process.env.TWILIO_ACCOUNT_SID ? '✓ Configurado' : '✗ Não configurado',
          authToken: process.env.TWILIO_AUTH_TOKEN ? '✓ Configurado' : '✗ Não configurado',
          whatsappNumber: process.env.TWILIO_WHATSAPP_NUMBER || '✗ Não configurado'
        },
        messagebird: {
          available: messagebirdConfigured,
          apiKey: process.env.MESSAGEBIRD_API_KEY ? '✓ Configurado' : '✗ Não configurado',
          channelId: process.env.MESSAGEBIRD_CHANNEL_ID || '✗ Não configurado'
        }
      },
      instructions: {
        twilio: [
          '1. Crie uma conta em https://www.twilio.com',
          '2. Configure um número WhatsApp no Twilio Console',
          '3. Adicione as variáveis de ambiente:',
          '   - WHATSAPP_PROVIDER=twilio',
          '   - TWILIO_ACCOUNT_SID=seu_account_sid',
          '   - TWILIO_AUTH_TOKEN=seu_auth_token',
          '   - TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886',
          '4. Configure o webhook: https://seu-dominio.com/api/whatsapp/webhook'
        ],
        messagebird: [
          '1. Crie uma conta em https://www.messagebird.com',
          '2. Configure um canal WhatsApp no MessageBird Dashboard',
          '3. Adicione as variáveis de ambiente:',
          '   - WHATSAPP_PROVIDER=messagebird',
          '   - MESSAGEBIRD_API_KEY=sua_api_key',
          '   - MESSAGEBIRD_CHANNEL_ID=seu_channel_id',
          '4. Configure o webhook: https://seu-dominio.com/api/whatsapp/webhook'
        ]
      }
    });

  } catch (error) {
    console.error('Erro ao verificar status WhatsApp:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro ao verificar status'
    }, { status: 500 });
  }
}
