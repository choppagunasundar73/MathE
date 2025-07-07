import { useState } from 'react';
import { AppState, SkillArea } from '../types';
import { diagnosticProblems, practiceProblems } from '../data/problems';

const initialSkillAreas: SkillArea[] = [
  { id: 'algebra', name: 'Algebraic Expressions', score: 0, mastery: 'weak', problemsSolved: 0, totalProblems: 10 },
  { id: 'geometry', name: 'Geometry', score: 0, mastery: 'weak', problemsSolved: 0, totalProblems: 8 },
  { id: 'proportions', name: 'Proportions', score: 0, mastery: 'weak', problemsSolved: 0, totalProblems: 6 },
  { id: 'exponents', name: 'Exponents', score: 0, mastery: 'weak', problemsSolved: 0, totalProblems: 5 },
  { id: 'functions', name: 'Functions', score: 0, mastery: 'weak', problemsSolved: 0, totalProblems: 7 },
  { id: 'data', name: 'Data Analysis', score: 0, mastery: 'weak', problemsSolved: 0, totalProblems: 6 },
  { id: 'equations', name: 'Equations', score: 0, mastery: 'weak', problemsSolved: 0, totalProblems: 8 }
];

const initialState: AppState = {
  phase: 'welcome',
  currentProblem: null,
  currentProblemIndex: 0,
  studentProgress: {
    currentLevel: 1,
    totalXP: 0,
    skillAreas: initialSkillAreas,
    completedProblems: [],
    timeSpent: 0,
    sessionStreak: 1
  },
  showHints: false,
  hintsUsed: 0,
  isAnswered: false,
  selectedAnswer: '',
  showExplanation: false,
  lastAnswerCorrect: false,
  timeStarted: Date.now(),
  diagnosticComplete: false
};

export const useAppState = () => {
  const [state, setState] = useState<AppState>(initialState);

  const startDiagnostic = () => {
    setState(prev => ({
      ...prev,
      phase: 'diagnostic',
      currentProblem: diagnosticProblems[0],
      currentProblemIndex: 0,
      timeStarted: Date.now()
    }));
  };

  const submitDiagnosticAnswer = (answer: string, timeSpent: number) => {
    const isCorrect = answer === state.currentProblem?.correctAnswer;
    
    setState(prev => ({
      ...prev,
      isAnswered: true,
      selectedAnswer: answer,
      lastAnswerCorrect: isCorrect,
      showExplanation: true
    }));

    // Update skill areas based on the answer
    if (state.currentProblem) {
      const topicMap: { [key: string]: string } = {
        'Algebraic Expressions': 'algebra',
        'Geometry': 'geometry',
        'Proportions': 'proportions',
        'Exponents': 'exponents',
        'Functions': 'functions',
        'Data Analysis': 'data',
        'Equations': 'equations'
      };

      const skillId = topicMap[state.currentProblem.topic];
      if (skillId) {
        setState(prev => ({
          ...prev,
          studentProgress: {
            ...prev.studentProgress,
            skillAreas: prev.studentProgress.skillAreas.map(skill => 
              skill.id === skillId 
                ? { 
                    ...skill, 
                    score: isCorrect ? Math.min(100, skill.score + 20) : Math.max(0, skill.score - 5),
                    problemsSolved: skill.problemsSolved + 1,
                    mastery: isCorrect ? 
                      (skill.score + 20 >= 85 ? 'strong' : skill.score + 20 >= 70 ? 'developing' : 'weak') :
                      (skill.score - 5 >= 85 ? 'strong' : skill.score - 5 >= 70 ? 'developing' : 'weak')
                  }
                : skill
            ),
            totalXP: prev.studentProgress.totalXP + (isCorrect ? 100 : 25),
            timeSpent: prev.studentProgress.timeSpent + timeSpent
          }
        }));
      }
    }

    // Auto-advance after 3 seconds
    setTimeout(() => {
      nextDiagnosticProblem();
    }, 3000);
  };

  const nextDiagnosticProblem = () => {
    const nextIndex = state.currentProblemIndex + 1;
    
    if (nextIndex < diagnosticProblems.length) {
      setState(prev => ({
        ...prev,
        currentProblem: diagnosticProblems[nextIndex],
        currentProblemIndex: nextIndex,
        isAnswered: false,
        selectedAnswer: '',
        showExplanation: false,
        hintsUsed: 0
      }));
    } else {
      // Diagnostic complete
      setState(prev => ({
        ...prev,
        phase: 'results',
        diagnosticComplete: true,
        studentProgress: {
          ...prev.studentProgress,
          currentLevel: Math.floor(prev.studentProgress.totalXP / 500) + 1
        }
      }));
    }
  };

  const startLearning = () => {
    // Find the weakest skill area to focus on
    const weakestSkill = state.studentProgress.skillAreas
      .filter(skill => skill.mastery === 'weak')
      .sort((a, b) => a.score - b.score)[0];

    if (weakestSkill) {
      const problems = practiceProblems[weakestSkill.name] || [];
      if (problems.length > 0) {
        setState(prev => ({
          ...prev,
          phase: 'learning',
          currentProblem: problems[0],
          currentProblemIndex: 0
        }));
      }
    }
  };

  const submitLearningAnswer = (answer: string, timeSpent: number, hintsUsed: number) => {
    const isCorrect = answer === state.currentProblem?.correctAnswer;
    
    setState(prev => ({
      ...prev,
      isAnswered: true,
      selectedAnswer: answer,
      lastAnswerCorrect: isCorrect,
      showExplanation: true,
      hintsUsed
    }));

    // Update progress
    if (state.currentProblem) {
      const topicMap: { [key: string]: string } = {
        'Algebraic Expressions': 'algebra',
        'Geometry': 'geometry',
        'Proportions': 'proportions',
        'Exponents': 'exponents',
        'Functions': 'functions',
        'Data Analysis': 'data',
        'Equations': 'equations'
      };

      const skillId = topicMap[state.currentProblem.topic];
      if (skillId) {
        setState(prev => ({
          ...prev,
          studentProgress: {
            ...prev.studentProgress,
            skillAreas: prev.studentProgress.skillAreas.map(skill => 
              skill.id === skillId 
                ? { 
                    ...skill, 
                    score: Math.min(100, skill.score + (isCorrect ? 15 : 5)),
                    problemsSolved: skill.problemsSolved + 1,
                    mastery: skill.score + (isCorrect ? 15 : 5) >= 85 ? 'strong' : 
                             skill.score + (isCorrect ? 15 : 5) >= 70 ? 'developing' : 'weak'
                  }
                : skill
            ),
            totalXP: prev.studentProgress.totalXP + (isCorrect ? 150 - (hintsUsed * 20) : 50),
            timeSpent: prev.studentProgress.timeSpent + timeSpent
          }
        }));
      }
    }
  };

  const nextLearningProblem = () => {
    // Find next appropriate problem based on current skill levels
    const currentSkill = state.studentProgress.skillAreas.find(skill => 
      skill.name === state.currentProblem?.topic
    );

    if (currentSkill) {
      const problems = practiceProblems[currentSkill.name] || [];
      const nextProblem = problems.find(p => p.id !== state.currentProblem?.id);
      
      if (nextProblem) {
        setState(prev => ({
          ...prev,
          currentProblem: nextProblem,
          isAnswered: false,
          selectedAnswer: '',
          showExplanation: false,
          hintsUsed: 0
        }));
      } else {
        // Move to next weak skill area
        const nextWeakSkill = state.studentProgress.skillAreas
          .filter(skill => skill.mastery !== 'strong' && skill.name !== currentSkill.name)
          .sort((a, b) => a.score - b.score)[0];

        if (nextWeakSkill) {
          const nextProblems = practiceProblems[nextWeakSkill.name] || [];
          if (nextProblems.length > 0) {
            setState(prev => ({
              ...prev,
              currentProblem: nextProblems[0],
              isAnswered: false,
              selectedAnswer: '',
              showExplanation: false,
              hintsUsed: 0
            }));
          }
        }
      }
    }
  };

  const viewProgress = () => {
    setState(prev => ({
      ...prev,
      phase: 'results'
    }));
  };

  return {
    state,
    startDiagnostic,
    submitDiagnosticAnswer,
    nextDiagnosticProblem,
    startLearning,
    submitLearningAnswer,
    nextLearningProblem,
    viewProgress
  };
};