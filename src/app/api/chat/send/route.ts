import { NextRequest, NextResponse } from 'next/server';
import { generatePersonaResponse, PersonaType } from '@/lib/chatCoach';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, persona = 'selena', userId = 'test-user', conversationId, imageUrl, audioUrl } = body;

    // Validação básica
    if (!message && !imageUrl && !audioUrl) {
      return NextResponse.json(
        { error: 'Mensagem, imagem ou áudio é obrigatório' },
        { status: 400 }
      );
    }

    // Validar persona
    const validPersonas: PersonaType[] = ['selena', 'venus', 'afrodite', 'esther', 'samila'];
    if (!validPersonas.includes(persona)) {
      return NextResponse.json(
        { error: 'Persona inválida' },
        { status: 400 }
      );
    }

    // Gerar ID da conversa se não existir
    const finalConversationId = conversationId || `conv-${Date.now()}-${userId}`;

    // Salvar mensagem do usuário (simulado - em produção, salvar no Supabase)
    const userMessage = {
      id: `msg-${Date.now()}-user`,
      conversationId: finalConversationId,
      author: 'user',
      text: message || '',
      mediaUrl: imageUrl,
      audioUrl: audioUrl,
      createdAt: new Date().toISOString()
    };

    // Gerar resposta da persona
    const responseText = await generatePersonaResponse(persona, message || 'Olá!');

    // Salvar resposta da coach (simulado)
    const coachMessage = {
      id: `msg-${Date.now()}-coach`,
      conversationId: finalConversationId,
      author: 'coach',
      text: responseText,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      conversationId: finalConversationId,
      userMessage,
      coachMessage,
      persona
    });

  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    );
  }
}
