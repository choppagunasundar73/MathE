import { MathProblem } from '../types';

export const diagnosticProblems: MathProblem[] = [
  {
    id: 'alg-1',
    topic: 'Algebraic Expressions',
    difficulty: 'medium',
    question: 'Simplify the expression: 3x + 5 - 2x + 7',
    type: 'multiple-choice',
    options: ['x + 12', '5x + 12', 'x + 2', '5x + 2'],
    correctAnswer: 'x + 12',
    explanation: 'Combine like terms: 3x - 2x = x, and 5 + 7 = 12. So the answer is x + 12.',
    hints: [
      'Look for terms with the same variable 🤔',
      'Group the x terms together and the constants together',
      'Remember: 3x - 2x = 1x = x'
    ],
    timeEstimate: 60
  },
  {
    id: 'geo-1',
    topic: 'Geometry',
    difficulty: 'medium',
    question: 'What is the area of a triangle with base 8 cm and height 6 cm?',
    type: 'multiple-choice',
    options: ['24 cm²', '48 cm²', '14 cm²', '28 cm²'],
    correctAnswer: '24 cm²',
    explanation: 'Area of triangle = (1/2) × base × height = (1/2) × 8 × 6 = 24 cm²',
    hints: [
      'Remember the formula for triangle area 📐',
      'Area = (1/2) × base × height',
      'Substitute: (1/2) × 8 × 6'
    ],
    timeEstimate: 45
  },
  {
    id: 'prop-1',
    topic: 'Proportions',
    difficulty: 'medium',
    question: 'If 3/4 = x/12, what is the value of x?',
    type: 'multiple-choice',
    options: ['9', '16', '15', '6'],
    correctAnswer: '9',
    explanation: 'Cross multiply: 3 × 12 = 4 × x, so 36 = 4x, therefore x = 9',
    hints: [
      'Use cross multiplication ✖️',
      'Multiply 3 × 12 and 4 × x',
      'Solve: 36 = 4x'
    ],
    timeEstimate: 50
  },
  {
    id: 'exp-1',
    topic: 'Exponents',
    difficulty: 'medium',
    question: 'What is 2³ × 2²?',
    type: 'multiple-choice',
    options: ['2⁵', '2⁶', '4⁵', '4⁶'],
    correctAnswer: '2⁵',
    explanation: 'When multiplying powers with the same base, add the exponents: 2³ × 2² = 2³⁺² = 2⁵',
    hints: [
      'Remember the rule for multiplying powers 🔢',
      'Same base? Add the exponents!',
      '3 + 2 = 5'
    ],
    timeEstimate: 40
  },
  {
    id: 'func-1',
    topic: 'Functions',
    difficulty: 'medium',
    question: 'If f(x) = 2x + 3, what is f(4)?',
    type: 'multiple-choice',
    options: ['11', '8', '5', '14'],
    correctAnswer: '11',
    explanation: 'Substitute x = 4 into the function: f(4) = 2(4) + 3 = 8 + 3 = 11',
    hints: [
      'Replace x with 4 in the function 🔄',
      'f(4) = 2(4) + 3',
      'Calculate: 8 + 3 = ?'
    ],
    timeEstimate: 35
  },
  {
    id: 'data-1',
    topic: 'Data Analysis',
    difficulty: 'medium',
    question: 'The test scores are: 85, 92, 78, 88, 95. What is the mean?',
    type: 'multiple-choice',
    options: ['87.6', '88', '85', '90'],
    correctAnswer: '87.6',
    explanation: 'Mean = (85 + 92 + 78 + 88 + 95) ÷ 5 = 438 ÷ 5 = 87.6',
    hints: [
      'Add all the scores together 📊',
      'Divide by the number of scores',
      'Sum = 438, divide by 5'
    ],
    timeEstimate: 55
  },
  {
    id: 'eq-1',
    topic: 'Equations',
    difficulty: 'medium',
    question: 'Solve for x: 2x + 5 = 13',
    type: 'multiple-choice',
    options: ['4', '6', '8', '9'],
    correctAnswer: '4',
    explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4',
    hints: [
      'Get x by itself step by step 🎯',
      'First, subtract 5 from both sides',
      'Then divide both sides by 2'
    ],
    timeEstimate: 50
  }
];

export const practiceProblems: { [key: string]: MathProblem[] } = {
  'Algebraic Expressions': [
    {
      id: 'alg-2',
      topic: 'Algebraic Expressions',
      difficulty: 'easy',
      question: 'Combine like terms: 5x + 3x',
      type: 'multiple-choice',
      options: ['8x', '15x', '8', '2x'],
      correctAnswer: '8x',
      explanation: 'Add the coefficients: 5 + 3 = 8, so 5x + 3x = 8x',
      hints: [
        'Add the numbers in front of x',
        '5 + 3 = ?',
        'Keep the x!'
      ],
      timeEstimate: 30
    },
    {
      id: 'alg-3',
      topic: 'Algebraic Expressions',
      difficulty: 'hard',
      question: 'Simplify: 4(2x - 3) + 5x',
      type: 'multiple-choice',
      options: ['13x - 12', '8x - 7', '13x - 7', '8x - 12'],
      correctAnswer: '13x - 12',
      explanation: 'Distribute: 4(2x - 3) = 8x - 12, then add 5x: 8x - 12 + 5x = 13x - 12',
      hints: [
        'Use the distributive property first 🔄',
        '4 × 2x = 8x, 4 × (-3) = -12',
        'Then combine: 8x + 5x = 13x'
      ],
      timeEstimate: 80
    }
  ],
  'Geometry': [
    {
      id: 'geo-2',
      topic: 'Geometry',
      difficulty: 'easy',
      question: 'What is the perimeter of a rectangle with length 8 cm and width 5 cm?',
      type: 'multiple-choice',
      options: ['26 cm', '40 cm', '13 cm', '18 cm'],
      correctAnswer: '26 cm',
      explanation: 'Perimeter = 2(length + width) = 2(8 + 5) = 2(13) = 26 cm',
      hints: [
        'Remember the perimeter formula 📏',
        'Add length and width first',
        'Then multiply by 2'
      ],
      timeEstimate: 40
    }
  ],
  'Proportions': [
    {
      id: 'prop-2',
      topic: 'Proportions',
      difficulty: 'easy',
      question: 'If 2/3 = 4/x, what is x?',
      type: 'multiple-choice',
      options: ['6', '8', '12', '3'],
      correctAnswer: '6',
      explanation: 'Cross multiply: 2x = 3 × 4 = 12, so x = 6',
      hints: [
        'Cross multiply the fractions ✖️',
        '2 × x = 3 × 4',
        'Solve: 2x = 12'
      ],
      timeEstimate: 45
    }
  ],
  'Exponents': [
    {
      id: 'exp-2',
      topic: 'Exponents',
      difficulty: 'easy',
      question: 'What is 3²?',
      type: 'multiple-choice',
      options: ['6', '9', '12', '8'],
      correctAnswer: '9',
      explanation: '3² means 3 × 3 = 9',
      hints: [
        'The exponent tells you how many times to multiply 🔢',
        '3² = 3 × 3',
        'What is 3 × 3?'
      ],
      timeEstimate: 25
    }
  ],
  'Functions': [
    {
      id: 'func-2',
      topic: 'Functions',
      difficulty: 'easy',
      question: 'If g(x) = x + 5, what is g(3)?',
      type: 'multiple-choice',
      options: ['8', '15', '2', '5'],
      correctAnswer: '8',
      explanation: 'Substitute x = 3: g(3) = 3 + 5 = 8',
      hints: [
        'Replace x with 3 🔄',
        'g(3) = 3 + 5',
        'What is 3 + 5?'
      ],
      timeEstimate: 30
    }
  ],
  'Data Analysis': [
    {
      id: 'data-2',
      topic: 'Data Analysis',
      difficulty: 'easy',
      question: 'What is the median of: 3, 7, 9, 12, 15?',
      type: 'multiple-choice',
      options: ['9', '7', '12', '15'],
      correctAnswer: '9',
      explanation: 'The median is the middle value when numbers are in order. The middle of 5 numbers is the 3rd number: 9',
      hints: [
        'Find the middle number 📊',
        'Count from both ends',
        'The 3rd number is in the middle'
      ],
      timeEstimate: 40
    }
  ],
  'Equations': [
    {
      id: 'eq-2',
      topic: 'Equations',
      difficulty: 'easy',
      question: 'Solve: x + 7 = 12',
      type: 'multiple-choice',
      options: ['5', '19', '7', '12'],
      correctAnswer: '5',
      explanation: 'Subtract 7 from both sides: x = 12 - 7 = 5',
      hints: [
        'Get x by itself 🎯',
        'What do you subtract from both sides?',
        '12 - 7 = ?'
      ],
      timeEstimate: 35
    }
  ]
};