import type { Language, Translations } from '../types/language';

const translations: Record<Language, Translations> = {
  en: {
    appTitle: 'Mental Math Trainer',
    difficulty: 'Difficulty:',
    easy: 'EASY',
    medium: 'MEDIUM',
    hard: 'HARD',
    mixed: 'MIXED',
    enableTwoDigitOperations: 'Enable two-digit operations',
    enableTimer: 'Enable timer',
    time: 'Time:',
    enterAnswer: 'Enter answer',
    submit: 'Submit',
    nextQuestion: 'Next Question',
    correct: 'Correct!',
    incorrect: 'Incorrect.',
    timeIsUp: 'Time is up.',
    theCorrectAnswerIs: 'The correct answer is',
  },
  tr: {
    appTitle: 'Zihinsel Matematik Antrenörü',
    difficulty: 'Zorluk:',
    easy: 'KOLAY',
    medium: 'ORTA',
    hard: 'ZOR',
    mixed: 'KARIŞIK',
    enableTwoDigitOperations: 'İki haneli işlemleri etkinleştir',
    enableTimer: 'Zamanlayıcıyı etkinleştir',
    time: 'Süre:',
    enterAnswer: 'Cevabı girin',
    submit: 'Gönder',
    nextQuestion: 'Sonraki Soru',
    correct: 'Doğru!',
    incorrect: 'Yanlış.',
    timeIsUp: 'Süre doldu.',
    theCorrectAnswerIs: 'Doğru cevap',
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}

