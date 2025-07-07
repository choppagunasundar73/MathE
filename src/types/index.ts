export interface MathProblem {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  type: 'multiple-choice' | 'free-response' | 'true-false';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hints: string[];
  timeEstimate: number; // in seconds
}

export interface SkillArea {
  id: string;
  name: string;
  score: number;
  mastery: 'weak' | 'developing' | 'strong';
  problemsSolved: number;
  totalProblems: number;
}

export interface StudentProgress {
  currentLevel: number;
  totalXP: number;
  skillAreas: SkillArea[];
  completedProblems: string[];
  timeSpent: number;
  sessionStreak: number;
}

export interface AppState {
  phase: 'welcome' | 'diagnostic' | 'learning' | 'results';
  currentProblem: MathProblem | null;
  currentProblemIndex: number;
  studentProgress: StudentProgress;
  showHints: boolean;
  hintsUsed: number;
  isAnswered: boolean;
  selectedAnswer: string;
  showExplanation: boolean;
  lastAnswerCorrect: boolean;
  timeStarted: number;
  diagnosticComplete: boolean;
}