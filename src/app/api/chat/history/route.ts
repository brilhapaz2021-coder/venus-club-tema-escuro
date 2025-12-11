import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'test-user';
    const conversationId = searchParams.get('conversationId');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Em produção, buscar do Supabase
    // Simulação de histórico
    const mockHistory = [
      {
        id: 'msg-1',
        conversationId: conversationId || 'conv-default',
        author: 'coach',
        text: 'Olá! Sou a Selena, sua consultora virtual. Como posso te ajudar hoje?',
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'msg-2',
        conversationId: conversationId || 'conv-default',
        author: 'user',
        text: 'Oi Selena! Preciso de ajuda com uma conversa...',
        createdAt: new Date(Date.now() - 3000000).toISOString()
      },
      {
        id: 'msg-3',
        conversationId: conversationId || 'conv-default',
        author: 'coach',
        text: 'Claro! Estou aqui para te ajudar. Me conta mais sobre essa conversa.',
        createdAt: new Date(Date.now() - 2400000).toISOString()
      }
    ];

    // Filtrar por conversationId se fornecido
    const filteredHistory = conversationId
      ? mockHistory.filter(msg => msg.conversationId === conversationId)
      : mockHistory;

    return NextResponse.json({
      success: true,
      messages: filteredHistory.slice(0, limit),
      total: filteredHistory.length,
      userId
    });

  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar histórico' },
      { status: 500 }
    );
  }
}
