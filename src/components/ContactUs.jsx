import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.comment.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Show success message
    setSubmitted(true);
    
    // Reset form after 2 seconds and redirect
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', comment: '' });
      setSubmitted(false);
      navigate('/');
    }, 2000);
  };

  return (
    <main className="main-content contact-us-page">
      <section className="contact-hero-section">
        <div className="contact-container">
          <div className="contact-content-left">
            <h1 className="contact-title">We are here to help!</h1>
            <p className="contact-description">
              Let us know how we can best serve you. Use the contact form to email us or select from the topics below that best fit your needs. It's an honor to support you in your journey towards better health.
            </p>
          </div>

          <div className="contact-form-right">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="contact-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="comment"
                    placeholder="Comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="contact-input contact-textarea"
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="contact-submit-button">
                  SEND MESSAGE
                </button>
              </form>
            ) : (
              <div className="contact-success-message">
                <h3>Thank you for reaching out!</h3>
                <p>We've received your message and will get back to you soon.</p>
              </div>
            )}

            <p className="contact-footer-text">
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="/privacy-policy" className="contact-link">Privacy Policy</a> and{' '}
              <a href="/terms-of-service" className="contact-link">Terms of Service</a> apply.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
