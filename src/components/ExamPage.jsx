import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import workshopsData from '../data/workshops'; // Central data source
import { getExam } from '../data/exams';
const PASSING_SCORE = 70; // 70% to pass

// Helper to find the workshop details
const findWorkshopById = (id) => workshopsData.find(w => w.id === id); 

const ExamPage = () => {
    // Get parameters from the URL: /exam/:workshopId/module/:moduleId
    const { workshopId, moduleId } = useParams();
    const navigate = useNavigate();

    const [workshop, setWorkshop] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [exam, setExam] = useState(null);

    // Total number of questions for score calculation
    const totalQuestions = exam ? exam.questions.length : 0;

    // Load workshop details on component mount
    useEffect(() => {
        const foundWorkshop = findWorkshopById(workshopId);
        setWorkshop(foundWorkshop);
    }, [workshopId]);

    // Load exam for the requested workshop & module
    useEffect(() => {
        const loadedExam = getExam(workshopId, moduleId);
        setExam(loadedExam);
    }, [workshopId, moduleId]);

    // Handler for selecting an answer
    const handleAnswerChange = (questionId, selectedOption) => {
        if (!submitted) {
            setAnswers(prevAnswers => ({
                ...prevAnswers,
                [questionId]: selectedOption,
            }));
        }
    };

    // Handler for submitting the quiz
    const handleSubmit = (e) => {
        e.preventDefault();
        if (submitted) return;

        let correctCount = 0;
        // guard if exam not loaded
        const questions = exam ? exam.questions : [];
        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });
        
        const calculatedScore = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
        setScore(calculatedScore);
        setSubmitted(true);
        
        // --- Mock Module Completion Save ---
        if (calculatedScore >= PASSING_SCORE) {
            // In a real app, this would be an API call to save progress.
            console.log(`Module ${moduleId} of Workshop ${workshopId} completed!`);
            try {
                const key = 'completedModules';
                const raw = localStorage.getItem(key);
                const data = raw ? JSON.parse(raw) : {};
                const mods = data[workshopId] || [];
                if (!mods.includes(String(moduleId))) {
                    mods.push(String(moduleId));
                    data[workshopId] = mods;
                    localStorage.setItem(key, JSON.stringify(data));
                }
            } catch (err) {
                console.error('Failed to save module completion to localStorage', err);
            }
        }
        // ------------------------------------
    };

    // Navigate back to previous page when possible, otherwise fall back to the workshop page
    const handleBack = () => {
        try {
            if (window.history.length > 1) {
                navigate(-1);
            } else {
                navigate(`/workshops/${workshopId}`);
            }
        } catch (err) {
            // Fallback navigation in case something unexpected happens
            navigate(`/workshops/${workshopId}`);
        }
    };

    if (!workshop) {
        return <div className="loading-message">Loading exam details...</div>;
    }

    const isPassing = score >= PASSING_SCORE;

    return (
        <div className="exam-page-container">
            <div className="exam-card">
                <div className="exam-header">
                    <h2>{workshop.title}</h2>
                    <h3 className="exam-subtitle">Module {moduleId}: {exam ? exam.title : 'Loading...'}</h3>
                </div>

                <form className="exam-form" onSubmit={handleSubmit}>
                    <div className="exam-questions-list">
                        {exam && exam.questions.map((q, qIndex) => (
                            <div key={q.id} className="question-item">
                                <p className="question-text">
                                    {qIndex + 1}. {q.text}
                                </p>
                                <div className="options-list">
                                    {q.options.map((option, oIndex) => (
                                        <label key={oIndex} className="option-label">
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={option}
                                                checked={answers[q.id] === option}
                                                onChange={() => handleAnswerChange(q.id, option)}
                                                disabled={submitted}
                                            />
                                            {option}
                                            {submitted && (
                                                <span className="feedback-icon">
                                                    {option === q.correctAnswer ? '✅' : 
                                                     answers[q.id] === option ? '❌' : ''}
                                                </span>
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submission / Results Area */}
                    {!submitted ? (
                        <button type="submit" className="submit-exam-button" disabled={Object.keys(answers).length < totalQuestions}>
                            Submit Exam
                        </button>
                    ) : (
                        <div className="exam-results-box">
                            <h4 className="results-title">
                                {isPassing ? 'Congratulations! 🎉' : 'Keep Studying 📚'}
                            </h4>
                            <p className="results-score">
                                Your Score: <span className={isPassing ? 'score-pass' : 'score-fail'}>{score.toFixed(0)}%</span>
                            </p>
                            <p className="results-message">
                                {isPassing 
                                    ? `You passed the quiz! Module ${moduleId} is now complete.` 
                                    : `The passing score is ${PASSING_SCORE}%. Review the module and try again.`}
                            </p>
                        </div>
                    )}
                </form>

                {/* Footer Actions */}
                <div className="exam-actions">
                    <button 
                        onClick={handleBack}
                        className="back-to-workshop-button"
                    >
                        ← Back to Workshop
                    </button>
                    {submitted && (
                         <button 
                            onClick={() => { setSubmitted(false); setAnswers({}); setScore(0); }}
                            className="retake-exam-button"
                         >
                            Retake Exam
                         </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExamPage;