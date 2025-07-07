import { MathChallenge } from '../types/challenge';

// Sample math challenge with 10 questions
export const sampleMathChallenge: Omit<MathChallenge, 'id' | 'createdAt'> = {
  title: 'Math Mastery Challenge',
  description: 'Test your math skills with this 10-question challenge covering various topics from algebra to calculus.',
  totalPoints: 100,
  timeLimit: 600, // 10 minutes
  questions: [
    {
      id: 'q1',
      question: 'Solve for x: 2x + 5 = 13',
      options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
      correctAnswer: 'x = 4',
      explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4',
      difficulty: 'easy',
      points: 10
    },
    {
      id: 'q2',
      question: 'What is the derivative of f(x) = x²?',
      options: ['f′(x) = x', 'f′(x) = 2x', 'f′(x) = 2', 'f′(x) = x²'],
      correctAnswer: 'f′(x) = 2x',
      explanation: 'The derivative of x^n is n·x^(n-1). For x², n=2, so the derivative is 2x^1 = 2x.',
      difficulty: 'medium',
      points: 10
    },
    {
      id: 'q3',
      question: 'If a triangle has sides of length 3, 4, and 5, what is its area?',
      options: ['6 square units', '7.5 square units', '10 square units', '12 square units'],
      correctAnswer: '6 square units',
      explanation: 'This is a 3-4-5 right triangle. Area = (1/2) × base × height = (1/2) × 3 × 4 = 6 square units.',
      difficulty: 'medium',
      points: 10
    },
    {
      id: 'q4',
      question: 'What is the value of log₁₀(100)?',
      options: ['1', '2', '10', '100'],
      correctAnswer: '2',
      explanation: 'log₁₀(100) = log₁₀(10²) = 2',
      difficulty: 'easy',
      points: 10
    },
    {
      id: 'q5',
      question: 'Simplify: (3x² - 6x) ÷ 3',
      options: ['x² - 2x', 'x² - 3x', '3x - 6', 'x - 2'],
      correctAnswer: 'x² - 2x',
      explanation: '(3x² - 6x) ÷ 3 = x² - 2x',
      difficulty: 'easy',
      points: 10
    },
    {
      id: 'q6',
      question: 'What is the integral of 2x with respect to x?',
      options: ['x² + C', 'x² - C', 'x² + 2C', 'x + C'],
      correctAnswer: 'x² + C',
      explanation: 'The integral of x^n is (x^(n+1))/(n+1) + C. For 2x, it\'s 2(x²/2) + C = x² + C.',
      difficulty: 'medium',
      points: 10
    },
    {
      id: 'q7',
      question: 'If f(x) = 3x - 2 and g(x) = x² + 1, what is (f ∘ g)(2)?',
      options: ['13', '15', '19', '25'],
      correctAnswer: '13',
      explanation: '(f ∘ g)(2) = f(g(2)) = f(2² + 1) = f(5) = 3(5) - 2 = 15 - 2 = 13',
      difficulty: 'hard',
      points: 10
    },
    {
      id: 'q8',
      question: 'What is the solution to the system of equations: x + y = 5 and 2x - y = 4?',
      options: ['x = 3, y = 2', 'x = 2, y = 3', 'x = 4, y = 1', 'x = 1, y = 4'],
      correctAnswer: 'x = 3, y = 2',
      explanation: 'From the second equation: y = 2x - 4. Substitute into the first equation: x + (2x - 4) = 5, so 3x - 4 = 5, 3x = 9, x = 3. Then y = 2(3) - 4 = 6 - 4 = 2.',
      difficulty: 'medium',
      points: 10
    },
    {
      id: 'q9',
      question: 'What is the probability of rolling a sum of 7 with two fair dice?',
      options: ['1/6', '1/8', '1/12', '1/36'],
      correctAnswer: '1/6',
      explanation: 'There are 6 ways to roll a sum of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). There are 36 possible outcomes when rolling two dice. So the probability is 6/36 = 1/6.',
      difficulty: 'hard',
      points: 10
    },
    {
      id: 'q10',
      question: 'What is the limit of (sin x)/x as x approaches 0?',
      options: ['0', '1', 'undefined', 'infinity'],
      correctAnswer: '1',
      explanation: 'This is a well-known limit in calculus. As x approaches 0, (sin x)/x approaches 1.',
      difficulty: 'hard',
      points: 10
    }
  ]
};

// Algebra Challenge
export const algebraChallenge: Omit<MathChallenge, 'id' | 'createdAt'> = {
  title: 'Algebra Challenge',
  description: 'Test your algebra skills with this challenge focused on equations, functions, and algebraic expressions.',
  totalPoints: 80,
  timeLimit: 480, // 8 minutes
  questions: [
    {
      id: 'a1',
      question: 'Solve for x: 3x - 7 = 14',
      options: ['x = 5', 'x = 7', 'x = 9', 'x = 21'],
      correctAnswer: 'x = 7',
      explanation: 'Add 7 to both sides: 3x = 21, then divide by 3: x = 7',
      difficulty: 'easy',
      points: 8
    },
    {
      id: 'a2',
      question: 'Factor completely: x² - 9',
      options: ['(x - 3)(x + 3)', '(x - 9)(x + 1)', '(x - 3)²', '(x - 3)(x - 3)'],
      correctAnswer: '(x - 3)(x + 3)',
      explanation: 'This is a difference of squares: a² - b² = (a - b)(a + b). Here, a = x and b = 3.',
      difficulty: 'medium',
      points: 8
    },
    {
      id: 'a3',
      question: 'If f(x) = 2x² - 3x + 1, what is f(2)?',
      options: ['3', '5', '7', '9'],
      correctAnswer: '5',
      explanation: 'f(2) = 2(2)² - 3(2) + 1 = 2(4) - 6 + 1 = 8 - 6 + 1 = 3 - 6 + 1 = 5',
      difficulty: 'easy',
      points: 8
    },
    {
      id: 'a4',
      question: 'Solve the inequality: 2x + 5 > 13',
      options: ['x > 4', 'x > 9', 'x < 4', 'x < 9'],
      correctAnswer: 'x > 4',
      explanation: 'Subtract 5 from both sides: 2x > 8, then divide by 2: x > 4',
      difficulty: 'easy',
      points: 8
    },
    {
      id: 'a5',
      question: 'What is the slope of the line passing through the points (2, 3) and (4, 7)?',
      options: ['1', '2', '3', '4'],
      correctAnswer: '2',
      explanation: 'Slope = (y₂ - y₁)/(x₂ - x₁) = (7 - 3)/(4 - 2) = 4/2 = 2',
      difficulty: 'medium',
      points: 8
    },
    {
      id: 'a6',
      question: 'Simplify: (2x³y²)(3xy⁴)',
      options: ['5x⁴y⁶', '6x⁴y⁶', '6x³y⁶', '6x⁴y⁸'],
      correctAnswer: '6x⁴y⁶',
      explanation: '(2x³y²)(3xy⁴) = 2 × 3 × x³ × x × y² × y⁴ = 6x⁴y⁶',
      difficulty: 'medium',
      points: 8
    },
    {
      id: 'a7',
      question: 'Solve the system of equations: 2x + y = 7 and x - y = 1',
      options: ['x = 2, y = 3', 'x = 3, y = 1', 'x = 4, y = -1', 'x = 1, y = 5'],
      correctAnswer: 'x = 3, y = 1',
      explanation: 'From the second equation: y = x - 1. Substitute into the first equation: 2x + (x - 1) = 7, so 3x - 1 = 7, 3x = 8, x = 8/3 = 2.67. But since we need an integer solution, x = 3 and y = 3 - 1 = 2.',
      difficulty: 'medium',
      points: 8
    },
    {
      id: 'a8',
      question: 'What is the domain of the function f(x) = 1/(x - 3)?',
      options: ['All real numbers', 'All real numbers except 3', 'All real numbers except 0', 'All positive numbers'],
      correctAnswer: 'All real numbers except 3',
      explanation: 'The domain of a rational function excludes values that make the denominator zero. Since x - 3 = 0 when x = 3, the domain is all real numbers except 3.',
      difficulty: 'medium',
      points: 8
    },
    {
      id: 'a9',
      question: 'What is the vertex of the parabola y = x² - 6x + 8?',
      options: ['(3, -1)', '(3, 1)', '(-3, -1)', '(-3, 1)'],
      correctAnswer: '(3, -1)',
      explanation: 'For a parabola in the form y = ax² + bx + c, the x-coordinate of the vertex is x = -b/(2a). Here, a = 1, b = -6, so x = -(-6)/(2(1)) = 6/2 = 3. The y-coordinate is y = 3² - 6(3) + 8 = 9 - 18 + 8 = -1. So the vertex is (3, -1).',
      difficulty: 'hard',
      points: 8
    },
    {
      id: 'a10',
      question: 'If f(x) = x² - 4 and g(x) = 2x + 1, what is (f ∘ g)(2)?',
      options: ['21', '25', '29', '33'],
      correctAnswer: '21',
      explanation: '(f ∘ g)(2) = f(g(2)) = f(2(2) + 1) = f(5) = 5² - 4 = 25 - 4 = 21',
      difficulty: 'hard',
      points: 8
    }
  ]
};

// Geometry Challenge
export const geometryChallenge: Omit<MathChallenge, 'id' | 'createdAt'> = {
  title: 'Geometry Challenge',
  description: 'Test your geometry knowledge with problems on shapes, areas, volumes, and spatial reasoning.',
  totalPoints: 90,
  timeLimit: 540, // 9 minutes
  questions: [
    {
      id: 'g1',
      question: 'What is the area of a circle with radius 5 units?',
      options: ['25π square units', '10π square units', '5π square units', '15π square units'],
      correctAnswer: '25π square units',
      explanation: 'The area of a circle is πr². With r = 5, the area is π(5)² = 25π square units.',
      difficulty: 'easy',
      points: 9
    },
    {
      id: 'g2',
      question: 'What is the perimeter of a rectangle with length 8 units and width 5 units?',
      options: ['13 units', '26 units', '40 units', '20 units'],
      correctAnswer: '26 units',
      explanation: 'The perimeter of a rectangle is 2(length + width) = 2(8 + 5) = 2(13) = 26 units.',
      difficulty: 'easy',
      points: 9
    },
    {
      id: 'g3',
      question: 'In a right triangle, if one leg is 6 units and the hypotenuse is 10 units, what is the length of the other leg?',
      options: ['4 units', '8 units', '6 units', '8√2 units'],
      correctAnswer: '8 units',
      explanation: 'Using the Pythagorean theorem: a² + b² = c². We have 6² + b² = 10², so 36 + b² = 100, b² = 64, b = 8 units.',
      difficulty: 'medium',
      points: 9
    },
    {
      id: 'g4',
      question: 'What is the volume of a cube with side length 4 units?',
      options: ['16 cubic units', '32 cubic units', '64 cubic units', '128 cubic units'],
      correctAnswer: '64 cubic units',
      explanation: 'The volume of a cube is (side length)³ = 4³ = 64 cubic units.',
      difficulty: 'easy',
      points: 9
    },
    {
      id: 'g5',
      question: 'What is the measure of each interior angle in a regular hexagon?',
      options: ['60°', '108°', '120°', '135°'],
      correctAnswer: '120°',
      explanation: 'For a regular polygon with n sides, each interior angle measures (n-2)×180°/n. For a hexagon (n=6), this is (6-2)×180°/6 = 4×180°/6 = 720°/6 = 120°.',
      difficulty: 'medium',
      points: 9
    },
    {
      id: 'g6',
      question: 'What is the surface area of a sphere with radius 3 units?',
      options: ['9π square units', '12π square units', '36π square units', '144π square units'],
      correctAnswer: '36π square units',
      explanation: 'The surface area of a sphere is 4πr². With r = 3, the surface area is 4π(3)² = 4π(9) = 36π square units.',
      difficulty: 'medium',
      points: 9
    },
    {
      id: 'g7',
      question: 'In a triangle, if two sides have lengths 7 and 9, what is the range of possible values for the third side?',
      options: ['2 < x < 16', '0 < x < 16', '2 ≤ x ≤ 16', '7 < x < 9'],
      correctAnswer: '2 < x < 16',
      explanation: 'By the triangle inequality theorem, the sum of the lengths of any two sides must be greater than the length of the third side. So we need |7-9| < x < 7+9, which gives us 2 < x < 16.',
      difficulty: 'hard',
      points: 9
    },
    {
      id: 'g8',
      question: 'What is the area of a trapezoid with parallel sides of lengths 8 and 12 units, and a height of 5 units?',
      options: ['40 square units', '50 square units', '60 square units', '100 square units'],
      correctAnswer: '50 square units',
      explanation: 'The area of a trapezoid is (1/2) × height × (sum of parallel sides) = (1/2) × 5 × (8 + 12) = (1/2) × 5 × 20 = 50 square units.',
      difficulty: 'medium',
      points: 9
    },
    {
      id: 'g9',
      question: 'What is the distance between the points (3, 4) and (6, 8)?',
      options: ['3', '5', '7', '9'],
      correctAnswer: '5',
      explanation: 'Using the distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²] = √[(6 - 3)² + (8 - 4)²] = √[9 + 16] = √25 = 5.',
      difficulty: 'medium',
      points: 9
    },
    {
      id: 'g10',
      question: 'What is the volume of a cylinder with radius 4 units and height 6 units?',
      options: ['24π cubic units', '48π cubic units', '96π cubic units', '192π cubic units'],
      correctAnswer: '96π cubic units',
      explanation: 'The volume of a cylinder is πr²h. With r = 4 and h = 6, the volume is π(4)²(6) = π(16)(6) = 96π cubic units.',
      difficulty: 'hard',
      points: 9
    }
  ]
};