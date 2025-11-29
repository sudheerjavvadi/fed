import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SessionQnA() {
  const { workshopId } = useParams();
  const { isLoggedIn, userRole } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('sessionQnA');
      if (raw) {
        setQuestions(JSON.parse(raw));
      }
    } catch (err) {
      console.error('Error loading Q&A', err);
    }
  }, []);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) {
      alert('Please enter a question');
      return;
    }

    const question = {
      id: `q-${Date.now()}`,
      text: newQuestion,
      workshopId: workshopId,
      askedBy: 'Student',
      timestamp: new Date().toLocaleTimeString(),
      answered: false,
      votes: 0,
      answers: []
    };

    const updated = [...questions, question];
    setQuestions(updated);
    localStorage.setItem('sessionQnA', JSON.stringify(updated));
    setNewQuestion('');
  };

  const handleAddAnswer = (questionId, answerText) => {
    if (!answerText.trim()) return;

    const updated = questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: [
            ...q.answers,
            {
              id: `a-${Date.now()}`,
              text: answerText,
              author: userRole === 'admin' ? 'Instructor' : 'Student',
              timestamp: new Date().toLocaleTimeString()
            }
          ],
          answered: true
        };
      }
      return q;
    });

    setQuestions(updated);
    localStorage.setItem('sessionQnA', JSON.stringify(updated));
    setAnswers({ ...answers, [questionId]: '' });
  };

  const handleVote = (questionId) => {
    const updated = questions.map(q => 
      q.id === questionId ? { ...q, votes: q.votes + 1 } : q
    );
    setQuestions(updated);
    localStorage.setItem('sessionQnA', JSON.stringify(updated));
  };

  const filteredQuestions = filter === 'all' 
    ? questions 
    : filter === 'answered' 
      ? questions.filter(q => q.answered)
      : questions.filter(q => !q.answered);

  if (!isLoggedIn) {
    return (
      <div className="qna-container">
        <div className="login-prompt">
          <p>Please log in to participate in Q&A</p>
        </div>
      </div>
    );
  }

  return (
    <div className="qna-container">
      <h1 className="qna-title">❓ Session Q&A</h1>

      {/* Ask Question Form */}
      <div className="ask-question-section">
        <form onSubmit={handleAddQuestion}>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask your question here... (be specific and clear)"
            rows="3"
            className="question-input"
          />
          <button type="submit" className="btn-ask">Submit Question</button>
        </form>
      </div>

      {/* Filter Questions */}
      <div className="qna-filter">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({questions.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'unanswered' ? 'active' : ''}`}
          onClick={() => setFilter('unanswered')}
        >
          Unanswered ({questions.filter(q => !q.answered).length})
        </button>
        <button 
          className={`filter-btn ${filter === 'answered' ? 'active' : ''}`}
          onClick={() => setFilter('answered')}
        >
          Answered ({questions.filter(q => q.answered).length})
        </button>
      </div>

      {/* Questions List */}
      <div className="questions-list">
        {filteredQuestions.length === 0 ? (
          <div className="no-questions">
            <p>No questions yet. Be the first to ask!</p>
          </div>
        ) : (
          filteredQuestions.map(question => (
            <div key={question.id} className="question-card">
              <div className="question-header">
                <h3>{question.text}</h3>
                <span className={`question-status ${question.answered ? 'answered' : 'unanswered'}`}>
                  {question.answered ? '✓ Answered' : '⏳ Waiting'}
                </span>
              </div>

              <div className="question-meta">
                <span>{question.askedBy} • {question.timestamp}</span>
                <span>👍 {question.votes} votes</span>
              </div>

              {/* Vote Button */}
              <button 
                className="btn-vote"
                onClick={() => handleVote(question.id)}
              >
                👍 Vote
              </button>

              {/* Answers Section */}
              {question.answers.length > 0 && (
                <div className="answers-section">
                  <h4>Answers ({question.answers.length})</h4>
                  {question.answers.map(answer => (
                    <div key={answer.id} className="answer-card">
                      <div className="answer-author">
                        <strong>{answer.author}</strong> • {answer.timestamp}
                      </div>
                      <p>{answer.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Answer Form (Admin/Instructor) */}
              {userRole === 'admin' && (
                <div className="answer-form">
                  <textarea
                    value={answers[question.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    placeholder="Type your answer..."
                    rows="2"
                    className="answer-input"
                  />
                  <button 
                    className="btn-answer"
                    onClick={() => handleAddAnswer(question.id, answers[question.id])}
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
