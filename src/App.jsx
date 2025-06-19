import React, { useState, useEffect } from 'react';
import { Clock, Star, Trophy, RotateCcw, Play, CheckCircle, XCircle } from 'lucide-react';

const QuizApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [difficulty, setDifficulty] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // Quiz questions for different difficulty levels - DSA Focus
  const quizData = {
    easy: {
      timeLimit: 20,
      questions: [
        {
          question: "What is an Array?",
          options: ["A collection of elements stored at contiguous memory locations", "A linked list", "A tree structure", "A hash table"],
          correct: "A collection of elements stored at contiguous memory locations"
        },
        {
          question: "What is the time complexity of accessing an element in an array by index?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          correct: "O(1)"
        },
        {
          question: "Which data structure follows LIFO (Last In First Out) principle?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correct: "Stack"
        },
        {
          question: "What is the time complexity of inserting an element at the end of an array?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          correct: "O(1)"
        },
        {
          question: "Which data structure follows FIFO (First In First Out) principle?",
          options: ["Stack", "Queue", "Tree", "Graph"],
          correct: "Queue"
        },
        {
          question: "What is a Linked List?",
          options: ["A linear data structure where elements are stored in nodes", "An array", "A tree", "A hash table"],
          correct: "A linear data structure where elements are stored in nodes"
        },
        {
          question: "What is the space complexity of an array of size n?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          correct: "O(n)"
        },
        {
          question: "Which operation is NOT possible on a stack?",
          options: ["Push", "Pop", "Peek", "Random Access"],
          correct: "Random Access"
        }
      ]
    },
    medium: {
      timeLimit: 25,
      questions: [
        {
          question: "What is the time complexity of binary search in a sorted array?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          correct: "O(log n)"
        },
        {
          question: "Which traversal technique visits the root node first in a binary tree?",
          options: ["Inorder", "Preorder", "Postorder", "Level order"],
          correct: "Preorder"
        },
        {
          question: "What is the worst-case time complexity of insertion sort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
          correct: "O(n²)"
        },
        {
          question: "Which data structure is used to implement recursion?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correct: "Stack"
        },
        {
          question: "What is the average time complexity of hash table operations?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correct: "O(1)"
        },
        {
          question: "Which algorithm is used to find the shortest path in an unweighted graph?",
          options: ["DFS", "BFS", "Dijkstra", "Bellman-Ford"],
          correct: "BFS"
        },
        {
          question: "What is the time complexity of merge sort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
          correct: "O(n log n)"
        },
        {
          question: "Which data structure is best for implementing a priority queue?",
          options: ["Array", "Linked List", "Heap", "Stack"],
          correct: "Heap"
        }
      ]
    },
    hard: {
      timeLimit: 35,
      questions: [
        {
          question: "What is the time complexity of finding the kth smallest element using quickselect?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(k log n)"],
          correct: "O(n)"
        },
        {
          question: "Which algorithm is used to detect cycles in a directed graph?",
          options: ["DFS with coloring", "BFS", "Union-Find", "Topological Sort"],
          correct: "DFS with coloring"
        },
        {
          question: "What is the space complexity of the recursive implementation of Fibonacci sequence?",
          options: ["O(1)", "O(n)", "O(log n)", "O(2ⁿ)"],
          correct: "O(n)"
        },
        {
          question: "Which data structure provides the best average-case performance for dynamic sets with frequent insertions, deletions, and searches?",
          options: ["AVL Tree", "Red-Black Tree", "Hash Table", "B-Tree"],
          correct: "Hash Table"
        },
        {
          question: "What is the time complexity of building a heap from an unsorted array?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          correct: "O(n)"
        },
        {
          question: "Which algorithm is used to find strongly connected components in a directed graph?",
          options: ["Kosaraju's Algorithm", "Kruskal's Algorithm", "Prim's Algorithm", "Floyd-Warshall"],
          correct: "Kosaraju's Algorithm"
        },
        {
          question: "What is the worst-case time complexity of quicksort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
          correct: "O(n²)"
        },
        {
          question: "Which technique is used to optimize recursive algorithms with overlapping subproblems?",
          options: ["Divide and Conquer", "Greedy Approach", "Dynamic Programming", "Backtracking"],
          correct: "Dynamic Programming"
        }
      ]
    }
  };

  const currentQuiz = difficulty ? quizData[difficulty] : null;

  // Timer effect
  useEffect(() => {
    if (currentPage === 'quiz' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentPage === 'quiz' && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, currentPage, showResult]);

  const startQuiz = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentPage('quiz');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(quizData[selectedDifficulty].timeLimit);
    setSelectedAnswer('');
    setShowResult(false);
    setQuizComplete(false);
    setUserAnswers([]);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleTimeUp = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = {
      question: currentQuiz.questions[currentQuestion].question,
      selected: selectedAnswer || 'No answer',
      correct: currentQuiz.questions[currentQuestion].correct,
      isCorrect: selectedAnswer === currentQuiz.questions[currentQuestion].correct
    };
    setUserAnswers(newAnswers);
    
    if (selectedAnswer === currentQuiz.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = {
      question: currentQuiz.questions[currentQuestion].question,
      selected: selectedAnswer,
      correct: currentQuiz.questions[currentQuestion].correct,
      isCorrect: selectedAnswer === currentQuiz.questions[currentQuestion].correct
    };
    setUserAnswers(newAnswers);
    
    if (selectedAnswer === currentQuiz.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowResult(false);
      setTimeLeft(currentQuiz.timeLimit);
    } else {
      setQuizComplete(true);
      setCurrentPage('results');
    }
  };

  const resetQuiz = () => {
    setCurrentPage('home');
    setDifficulty('');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(0);
    setSelectedAnswer('');
    setShowResult(false);
    setQuizComplete(false);
    setUserAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / currentQuiz.questions.length) * 100;
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! 👌";
    return "Keep practicing! 💪";
  };

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  // Home Page
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-8">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">DSA Quiz Master</h1>
            <p className="text-gray-600">Test your Data Structures & Algorithms knowledge!</p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Choose Difficulty Level</h2>
            
            <button
              onClick={() => startQuiz('easy')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Easy (20s per question)</span>
              </div>
              <div className="text-sm opacity-80 mt-1">8 questions • Basic DSA concepts</div>
            </button>
            
            <button
              onClick={() => startQuiz('medium')}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-5 h-5" />
                <Star className="w-5 h-5" />
                <span>Medium (25s per question)</span>
              </div>
              <div className="text-sm opacity-80 mt-1">8 questions • Intermediate algorithms</div>
            </button>
            
            <button
              onClick={() => startQuiz('hard')}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-5 h-5" />
                <Star className="w-5 h-5" />
                <Star className="w-5 h-5" />
                <span>Hard (35s per question)</span>
              </div>
              <div className="text-sm opacity-80 mt-1">8 questions • Advanced DSA topics</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Page
  if (currentPage === 'quiz') {
    const question = currentQuiz.questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Question {currentQuestion + 1}/{currentQuiz.questions.length}
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {difficulty}
              </span>
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${timeLeft <= 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              <Clock className="w-4 h-4" />
              <span className="font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                    showResult
                      ? option === question.correct
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : option === selectedAnswer && option !== question.correct
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-gray-300'
                      : selectedAnswer === option
                      ? 'bg-blue-100 border-blue-500 text-blue-800'
                      : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium">{option}</span>
                    {showResult && option === question.correct && <CheckCircle className="w-5 h-5 ml-auto" />}
                    {showResult && option === selectedAnswer && option !== question.correct && <XCircle className="w-5 h-5 ml-auto" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={resetQuiz}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Quit Quiz
            </button>
            
            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className={`font-bold py-3 px-6 rounded-xl transition-all duration-300 ${
                  selectedAnswer
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'View Results'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results Page
  if (currentPage === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
          <div className="text-center mb-8">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
            <p className="text-xl text-gray-600">{getScoreMessage()}</p>
          </div>

          {/* Score Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{currentQuiz.questions.length - score}</div>
                <div className="text-sm text-gray-600">Wrong</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{Math.round((score / currentQuiz.questions.length) * 100)}%</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Review Your Answers</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {userAnswers.map((answer, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${answer.isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                  <div className="font-medium text-gray-800 mb-2">Q{index + 1}: {answer.question}</div>
                  <div className="text-sm space-y-1">
                    <div className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
                      Your answer: {answer.selected}
                    </div>
                    {!answer.isCorrect && (
                      <div className="text-green-700">
                        Correct answer: {answer.correct}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={resetQuiz}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>New Quiz</span>
            </button>
            <button
              onClick={() => startQuiz(difficulty)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retry {difficulty}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default QuizApp;