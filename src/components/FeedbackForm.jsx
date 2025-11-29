import React, { useState } from 'react';

const FeedbackForm = ({ workshopId, moduleId }) => {
    const [feedback, setFeedback] = useState({
        // Participant Info
        name: '',
        email: '',
        
        // Overall Experience
        overallSatisfaction: 5,
        metExpectations: 'yes',
        expectationsComment: '',
        
        // Content & Instructor
        contentClarity: 5,
        instructorEffectiveness: 5,
        materialsRelevant: 'yes',
        materialsComment: '',
        
        // Organization & Logistics
        registrationProcess: 5,
        workshopPace: 'just-right',
        setupConvenient: 'yes',
        setupComment: '',
        
        // Learning & Takeaways
        mostValuableLearning: '',
        desiredTopics: '',
        
        // Future Improvements
        improvementSuggestions: '',
        wouldRecommend: 'yes',
        notifyFutureWorkshops: false,
        notifyEmail: '',
        
        // Fun Question
        oneWordDescription: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the feedback to your backend
        console.log('Feedback submitted:', { workshopId, moduleId, ...feedback });
        // Store feedback in localStorage for now (replace with API call later)
        const key = `feedback_${workshopId}_${moduleId}`;
        localStorage.setItem(key, JSON.stringify(feedback));
        setSubmitted(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFeedback(prev => ({
            ...prev,
            [name]: type === 'checkbox' 
                ? checked 
                : ['overallSatisfaction', 'contentClarity', 'instructorEffectiveness', 'registrationProcess'].includes(name)
                    ? parseInt(value)
                    : value
        }));
    };

    if (submitted) {
        return (
            <div className="feedback-success" style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#f0f9f0',
                borderRadius: '8px',
                margin: '1rem 0'
            }}>
                <h4 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Thank You for Your Feedback! 🎉</h4>
                <p>Your feedback helps us improve our workshops.</p>
            </div>
        );
    }

    return (
        <div className="feedback-form-container" style={{
            padding: '2rem',
            background: '#f5f5f5',
            borderRadius: '8px',
            margin: '2rem 0'
        }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* 1. Participant Info */}
                <section>
                    <h3 style={{ color: '#6a1b9a', marginBottom: '1rem' }}>Participant Information (Optional)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label>Name (Optional)</label>
                            <input
                                type="text"
                                name="name"
                                value={feedback.name}
                                onChange={handleChange}
                                className="form-input"
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    marginTop: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                            />
                        </div>
                        <div>
                            <label>Email (Optional)</label>
                            <input
                                type="email"
                                name="email"
                                value={feedback.email}
                                onChange={handleChange}
                                className="form-input"
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    marginTop: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* 2. Overall Experience */}
                <section>
                    <h3 style={{ color: '#6a1b9a', marginBottom: '1rem' }}>Overall Experience</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label>How satisfied were you with the workshop overall?</label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <label
                                        key={value}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="overallSatisfaction"
                                            value={value}
                                            checked={feedback.overallSatisfaction === value}
                                            onChange={handleChange}
                                        />
                                        {value}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label>Did the workshop meet your expectations?</label>
                            <div style={{ marginTop: '0.5rem' }}>
                                <select
                                    name="metExpectations"
                                    value={feedback.metExpectations}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd'
                                    }}
                                >
                                    <option value="yes">Yes</option>
                                    <option value="partly">Partly</option>
                                    <option value="no">No</option>
                                </select>
                                <textarea
                                    name="expectationsComment"
                                    value={feedback.expectationsComment}
                                    onChange={handleChange}
                                    placeholder="Please explain..."
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        marginTop: '0.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        minHeight: '80px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Content & Instructor */}
                <section>
                    <h3 style={{ color: '#6a1b9a', marginBottom: '1rem' }}>Content & Instructor</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label>How clear and well-structured was the content?</label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <label
                                        key={value}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="contentClarity"
                                            value={value}
                                            checked={feedback.contentClarity === value}
                                            onChange={handleChange}
                                        />
                                        {value}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label>How knowledgeable and engaging was the instructor?</label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <label
                                        key={value}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="instructorEffectiveness"
                                            value={value}
                                            checked={feedback.instructorEffectiveness === value}
                                            onChange={handleChange}
                                        />
                                        {value}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label>Were the examples and materials relevant to your needs?</label>
                            <div style={{ marginTop: '0.5rem' }}>
                                <select
                                    name="materialsRelevant"
                                    value={feedback.materialsRelevant}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd'
                                    }}
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                <textarea
                                    name="materialsComment"
                                    value={feedback.materialsComment}
                                    onChange={handleChange}
                                    placeholder="Comments (optional)..."
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        marginTop: '0.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        minHeight: '80px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Organization & Logistics */}
                <section>
                    <h3 style={{ color: '#6a1b9a', marginBottom: '1rem' }}>Organization & Logistics</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label>How would you rate the registration and communication process?</label>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <label
                                        key={value}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="registrationProcess"
                                            value={value}
                                            checked={feedback.registrationProcess === value}
                                            onChange={handleChange}
                                        />
                                        {value}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label>How suitable were the workshop duration and pace?</label>
                            <select
                                name="workshopPace"
                                value={feedback.workshopPace}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    marginTop: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                            >
                                <option value="too-short">Too short</option>
                                <option value="just-right">Just right</option>
                                <option value="too-long">Too long</option>
                            </select>
                        </div>
                        <div>
                            <label>Was the venue or online setup convenient and accessible?</label>
                            <div style={{ marginTop: '0.5rem' }}>
                                <select
                                    name="setupConvenient"
                                    value={feedback.setupConvenient}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd'
                                    }}
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                <textarea
                                    name="setupComment"
                                    value={feedback.setupComment}
                                    onChange={handleChange}
                                    placeholder="Comments (optional)..."
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        marginTop: '0.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        minHeight: '80px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Learning & Takeaways */}
                <section>
                    <h3 style={{ color: '#6a1b9a', marginBottom: '1rem' }}>Learning & Takeaways</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label>What was the most valuable thing you learned?</label>
                            <textarea
                                name="mostValuableLearning"
                                value={feedback.mostValuableLearning}
                                onChange={handleChange}
                                placeholder="Share your main takeaway..."
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    marginTop: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    minHeight: '100px'
                                }}
                            />
                        </div>
                        <div>
                            <label>Is there anything you wish had been covered in more detail?</label>
                            <textarea
                                name="desiredTopics"
                                value={feedback.desiredTopics}
                                onChange={handleChange}
                                placeholder="Topics you'd like to learn more about..."
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    marginTop: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    minHeight: '100px'
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* 6. Future Improvements */}
                <section>
                    <h3 style={{ color: '#6a1b9a', marginBottom: '1rem' }}>Future Improvements</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label>What could we do to make future workshops better?</label>
                            <textarea
                                name="improvementSuggestions"
                                value={feedback.improvementSuggestions}
                                onChange={handleChange}
                                placeholder="Your suggestions for improvement..."
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    marginTop: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    minHeight: '100px'
                                }}
                            />
                        </div>
                        <div>
                            <label>Would you recommend this workshop to others?</label>
                            <select
                                name="wouldRecommend"
                                value={feedback.wouldRecommend}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    marginTop: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <input
                                type="checkbox"
                                name="notifyFutureWorkshops"
                                checked={feedback.notifyFutureWorkshops}
                                onChange={handleChange}
                                id="notifyCheckbox"
                            />
                            <label htmlFor="notifyCheckbox">Would you like to be notified about future workshops?</label>
                        </div>
                        {feedback.notifyFutureWorkshops && (
                            <div>
                                <input
                                    type="email"
                                    name="notifyEmail"
                                    value={feedback.notifyEmail}
                                    onChange={handleChange}
                                    placeholder="Your email for workshop notifications"
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </section>

                {/* 7. Fun Question */}
                <section>
                    <h3 style={{ color: '#6a1b9a', marginBottom: '1rem' }}>And Finally... 😄</h3>
                    <div>
                        <label>Describe this workshop in one word!</label>
                        <input
                            type="text"
                            name="oneWordDescription"
                            value={feedback.oneWordDescription}
                            onChange={handleChange}
                            maxLength="20"
                            placeholder="Your one-word description..."
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                marginTop: '0.5rem',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>
                </section>

                <button
                    type="submit"
                    style={{
                        padding: '1rem 2rem',
                        background: '#6a1b9a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        alignSelf: 'flex-start',
                        marginTop: '1rem'
                    }}
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;