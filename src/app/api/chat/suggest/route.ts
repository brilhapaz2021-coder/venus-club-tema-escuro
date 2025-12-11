import { NextRequest, NextResponse } from 'next/server';
import { generateSuggestions, analyzeConversationImage } from '@/lib/chatCoach';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversationContext, imageUrl, userId = 'test-user' } = body;

    // Validação
    if (!conversationContext && !imageUrl) {
      return NextResponse.json(
        { error: 'Contexto da conversa ou imagem é obrigatório' },
        { status: 400 }
      );
    }

    let analysis = '';
    
    // Se houver imagem, analisar primeiro
    if (imageUrl) {
      analysis = await analyzeConversationImage(imageUrl);
    }

    // Gerar sugestões de resposta
    const suggestions = await generateSuggestions(
      conversationContext || analysis,
      imageUrl
    );

    return NextResponse.json({
      success: true,
      suggestions: {
        curta: suggestions.curta,
        direta: suggestions.direta,
        charmosa: suggestions.charmosa,
        acao: suggestions.acao
      },
      analysis: imageUrl ? analysis : undefined,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro ao gerar sugestões:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar sugestões' },
      { status: 500 }
    );
  }
}
