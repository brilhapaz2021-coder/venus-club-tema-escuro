import { NextRequest, NextResponse } from 'next/server';

// Tabela de alerts (em produção, usar Supabase)
interface Alert {
  id: string;
  userId: string;
  conversationId?: string;
  triggeredKeywords: string[];
  timestamp: string;
  evidenceSaved: boolean;
  resolved: boolean;
  createdAt: Date;
}

// Simulação de banco de dados
const alertsDB: Alert[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, conversationId, triggeredKeywords, timestamp, evidenceSaved } = body;

    // Criar alerta
    const alert: Alert = {
      id: `alert-${Date.now()}`,
      userId,
      conversationId,
      triggeredKeywords: triggeredKeywords || [],
      timestamp,
      evidenceSaved: evidenceSaved || false,
      resolved: false,
      createdAt: new Date()
    };

    alertsDB.push(alert);

    // Em produção: salvar no Supabase
    // await supabase.from('alerts').insert(alert);

    return NextResponse.json({
      success: true,
      alert,
      message: 'Alerta registrado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao registrar alerta:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao registrar alerta' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar alertas do usuário
    const userAlerts = alertsDB.filter(alert => alert.userId === userId);

    return NextResponse.json({
      success: true,
      alerts: userAlerts,
      count: userAlerts.length
    });
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar alertas' },
      { status: 500 }
    );
  }
}
