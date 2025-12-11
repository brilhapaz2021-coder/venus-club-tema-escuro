// Sistema de detecção de palavras-chave de risco

export interface KeywordDetectionResult {
  detected: boolean;
  keywords: string[];
  riskLevel: 'low' | 'medium' | 'high';
  shouldTriggerSafetyCenter: boolean;
}

// Lista de palavras-chave que indicam situações de risco
const RISK_KEYWORDS = {
  high: [
    'agressão',
    'violência',
    'ameaça',
    'medo',
    'perigo',
    'machucou',
    'bateu',
    'socorr',
    'ajuda urgente',
    'me salva',
    'vou morrer',
    'vai me matar',
    'estou com medo',
    'me trancou',
    'não me deixa sair',
    'controla tudo',
    'quebrou',
    'empurrou',
    'chutou',
    'estrangulou'
  ],
  medium: [
    'controle',
    'ciúmes excessivo',
    'não me deixa',
    'proíbe',
    'xinga',
    'humilha',
    'desrespeita',
    'grita',
    'ofende',
    'diminui',
    'isola',
    'afasta',
    'não posso',
    'tenho que pedir',
    'mexe no celular',
    'vigia',
    'persegue',
    'stalker',
    'obsessivo',
    'possessivo'
  ],
  low: [
    'insegura',
    'confusa',
    'não sei',
    'será que',
    'normal',
    'exagero',
    'sensível demais',
    'culpa',
    'minha culpa',
    'eu provoquei',
    'mereço',
    'não sou boa'
  ]
};

// Threshold: número mínimo de keywords para acionar o Safety Center
const THRESHOLDS = {
  high: 1,    // 1 palavra de alto risco já aciona
  medium: 2,  // 2 palavras de médio risco acionam
  low: 3      // 3 palavras de baixo risco acionam
};

export function detectRiskKeywords(text: string): KeywordDetectionResult {
  const normalizedText = text.toLowerCase();
  
  const detectedHigh: string[] = [];
  const detectedMedium: string[] = [];
  const detectedLow: string[] = [];

  // Detectar palavras de alto risco
  RISK_KEYWORDS.high.forEach(keyword => {
    if (normalizedText.includes(keyword.toLowerCase())) {
      detectedHigh.push(keyword);
    }
  });

  // Detectar palavras de médio risco
  RISK_KEYWORDS.medium.forEach(keyword => {
    if (normalizedText.includes(keyword.toLowerCase())) {
      detectedMedium.push(keyword);
    }
  });

  // Detectar palavras de baixo risco
  RISK_KEYWORDS.low.forEach(keyword => {
    if (normalizedText.includes(keyword.toLowerCase())) {
      detectedLow.push(keyword);
    }
  });

  // Determinar nível de risco e se deve acionar Safety Center
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  let shouldTrigger = false;

  if (detectedHigh.length >= THRESHOLDS.high) {
    riskLevel = 'high';
    shouldTrigger = true;
  } else if (detectedMedium.length >= THRESHOLDS.medium) {
    riskLevel = 'medium';
    shouldTrigger = true;
  } else if (detectedLow.length >= THRESHOLDS.low) {
    riskLevel = 'low';
    shouldTrigger = true;
  }

  const allDetected = [...detectedHigh, ...detectedMedium, ...detectedLow];

  return {
    detected: allDetected.length > 0,
    keywords: allDetected,
    riskLevel,
    shouldTriggerSafetyCenter: shouldTrigger
  };
}

// Função auxiliar para verificar se deve mostrar Safety Center
export function shouldShowSafetyCenter(messages: string[]): KeywordDetectionResult {
  // Analisar últimas 5 mensagens
  const recentMessages = messages.slice(-5).join(' ');
  return detectRiskKeywords(recentMessages);
}
