export interface MathQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface MathChallenge {
  id: string;
  title: string;
  description: string;
  questions: MathQuestion[];
  timeLimit?: number; // in seconds, optional
  totalPoints: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserChallengeAttempt {
  userId: string;
  userName: string;
  userPhotoURL?: string;
  challengeId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: Date;
  timeSpent: number; // in seconds
  answers?: Record<string, string>; // Optional map of question IDs to selected answers
}

export interface LeaderboardEntry extends UserChallengeAttempt {
  rank?: number; // Will be calculated when retrieving leaderboard
}