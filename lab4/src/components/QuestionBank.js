import React, { useReducer, useEffect, useState } from "react";
import { Button, Container, Card, ProgressBar, Alert } from "react-bootstrap";
import { FaCheck, FaTimes, FaFlagCheckered, FaStar, FaTrophy } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  showFeedback: false,
  isCorrect: false,
  correctAnswer: "",
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "SHOW_FEEDBACK":
      const currentQ = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === currentQ.answer;
      return {
        ...state,
        showFeedback: true,
        isCorrect,
        correctAnswer: currentQ.answer,
        score: isCorrect ? state.score + 1 : state.score,
      };

    case "NEXT_QUESTION":
      const nextQuestion = state.currentQuestion + 1;
      return {
        ...state,
        currentQuestion: nextQuestion,
        selectedOption: "",
        showFeedback: false,
        isCorrect: false,
        correctAnswer: "",
        showScore: nextQuestion >= state.questions.length,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
      };

    case "AUTO_NEXT":
      // For when timer runs out
      const nextQuestionAuto = state.currentQuestion + 1;
      return {
        ...state,
        currentQuestion: nextQuestionAuto,
        selectedOption: "",
        showFeedback: false,
        isCorrect: false,
        correctAnswer: "",
        showScore: nextQuestionAuto >= state.questions.length,
      };

    default:
      return state;
  }
}

// Component chính
function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, showFeedback, isCorrect, correctAnswer } = state;
  const [timeLeft, setTimeLeft] = useState(10);
  const [highScore, setHighScore] = useState(0);

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (!showScore && !showFeedback && currentQuestion < questions.length) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time's up - auto move to next question
            dispatch({ type: "AUTO_NEXT" });
            return 10; // Reset timer for next question
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showScore, showFeedback, currentQuestion, questions.length]);

  // Reset timer when question changes
  useEffect(() => {
    if (!showScore) {
      setTimeLeft(10);
    }
  }, [currentQuestion, showScore]);

  const handleOptionSelect = (option) => {
    if (!showFeedback) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption && !showFeedback) {
      dispatch({ type: "SHOW_FEEDBACK" });
    } else {
      dispatch({ type: "NEXT_QUESTION" });
    }
  };

  const handleRestartQuiz = () => {
    // Save high score if current score is higher
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('quizHighScore', score.toString());
    }
    dispatch({ type: "RESTART_QUIZ" });
    setTimeLeft(10);
  };

  // Save high score when quiz ends
  useEffect(() => {
    if (showScore && score > highScore) {
      setHighScore(score);
      localStorage.setItem('quizHighScore', score.toString());
    }
  }, [showScore, score, highScore]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isTimeWarning = timeLeft <= 5;

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
          <div className="text-center">
            <h2>Quiz Completed!</h2>
            <h3 className="mb-3">
              Your Score: {score} / {questions.length}
            </h3>
            <h5 className="mb-3">
              High Score: {highScore} / {questions.length}
            </h5>
            {score === questions.length && (
              <Alert variant="success" className="mb-3">
                🎉 Perfect Score! Congratulations!
              </Alert>
            )}
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            {/* Progress indicator */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>
                  Question {currentQuestion + 1} of {questions.length}
                </h5>
                <div className={`fw-bold ${isTimeWarning ? 'text-danger' : 'text-primary'}`}>
                  ⏰ {timeLeft}s
                </div>
              </div>
              <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
            </div>

            {/* Question */}
            {questions[currentQuestion] && (
              <>
                <h4 className="mb-4">
                  {questions[currentQuestion].question}
                </h4>

                {/* Feedback */}
                {showFeedback && (
                  <Alert variant={isCorrect ? "success" : "danger"} className="mb-3">
                    {isCorrect ? (
                      <>
                        <FaCheck className="me-2 text-success" style={{fontSize: '1.2em'}} />
                        Correct! <FaStar className="ms-2 text-warning" style={{fontSize: '1.1em'}} />
                      </>
                    ) : (
                      <>
                        <FaTimes className="me-2 text-danger" style={{fontSize: '1.2em'}} />
                        Incorrect! The correct answer is: <strong>{correctAnswer}</strong>
                      </>
                    )}
                  </Alert>
                )}

                {/* Options */}
                <div className="mt-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        showFeedback && option === questions[currentQuestion].answer
                          ? "success"
                          : showFeedback && selectedOption === option && !isCorrect
                          ? "danger"
                          : selectedOption === option && !showFeedback
                          ? "primary"
                          : "outline-secondary"
                      }
                      className="m-2"
                      onClick={() => handleOptionSelect(option)}
                      disabled={showFeedback}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Next/Finish Button */}
                <Button
                  variant="primary"
                  className="mt-3"
                  disabled={!selectedOption}
                  onClick={handleNextQuestion}
                >
                  {!showFeedback 
                    ? (currentQuestion === questions.length - 1 ? (
                        <>
                          <FaFlagCheckered className="me-2" />
                          Finish Quiz
                        </>
                      ) : "Next Question")
                    : (currentQuestion === questions.length - 1 ? "Show Results" : "Next Question")
                  }
                </Button>
              </>
            )}
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;
