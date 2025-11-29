import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProMembership = () => {
  const { isLoggedIn, currentUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: currentUser?.email || ''
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 99,
      description: 'Perfect for trying out premium features',
      features: [
        '✓ Access to all workshops',
        '✓ Unlimited workshop registrations',
        '✓ Advanced analytics',
        '✓ Priority support',
        '✓ Certificate generation',
        '✓ Ad-free experience'
      ],
      billingCycle: '/month'
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      price: 249,
      description: 'Save 16% compared to monthly',
      features: [
        '✓ Access to all workshops',
        '✓ Unlimited workshop registrations',
        '✓ Advanced analytics',
        '✓ Priority support',
        '✓ Certificate generation',
        '✓ Ad-free experience',
        '✓ Exclusive quarterly webinars'
      ],
      billingCycle: '/3 months',
      originalPrice: 297
    },
    {
      id: 'annual',
      name: 'Annual',
      price: 999,
      description: 'Best value - Save 17% annually',
      features: [
        '✓ Access to all workshops',
        '✓ Unlimited workshop registrations',
        '✓ Advanced analytics',
        '✓ Priority 24/7 support',
        '✓ Certificate generation',
        '✓ Ad-free experience',
        '✓ Exclusive monthly webinars',
        '✓ Personal learning coach access',
        '✓ Early access to new courses'
      ],
      billingCycle: '/year',
      originalPrice: 1188,
      popular: true
    }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      formattedValue = formattedValue.slice(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      formattedValue = formattedValue.slice(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const validateForm = () => {
    if (!formData.cardName.trim()) {
      alert('Please enter cardholder name');
      return false;
    }
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }
    if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      alert('Please enter expiry date in MM/YY format');
      return false;
    }
    if (formData.cvv.length !== 3) {
      alert('Please enter a valid 3-digit CVV');
      return false;
    }
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);

      // Store pro membership status in localStorage
      try {
        const membershipData = {
          planId: selectedPlan,
          planName: currentPlan.name,
          price: currentPlan.price,
          purchaseDate: new Date().toISOString(),
          expiryDate: new Date(Date.now() + (selectedPlan === 'monthly' ? 30 : selectedPlan === 'quarterly' ? 90 : 365) * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        };
        localStorage.setItem('proMembership', JSON.stringify(membershipData));
        
        // Reset form
        setTimeout(() => {
          setShowPaymentForm(false);
          setPaymentSuccess(false);
          setFormData({
            cardName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            email: currentUser?.email || ''
          });
        }, 3000);
      } catch (err) {
        console.error('Error storing membership', err);
      }
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <div className="pro-membership-container">
        <div className="login-required-message">
          <h2>Login Required</h2>
          <p>Please log in to access pro membership plans.</p>
          <a href="/login" className="login-link-button">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="pro-membership-container">
      <div className="pro-header">
        <h1>✨ WorkshopFlow Pro</h1>
        <p>Unlock unlimited access to all premium features and accelerate your learning journey</p>
      </div>

      {/* Plans Section */}
      <div className="plans-section">
        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
              onClick={() => {
                setSelectedPlan(plan.id);
                setShowPaymentForm(false);
                setPaymentSuccess(false);
              }}
            >
              {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
              
              <h3>{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
              
              <div className="price-section">
                <span className="price">${plan.price}</span>
                <span className="billing-cycle">{plan.billingCycle}</span>
                {plan.originalPrice && (
                  <span className="original-price">Original ${plan.originalPrice}</span>
                )}
              </div>

              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <button 
                className={`select-plan-btn ${selectedPlan === plan.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlan(plan.id);
                  setShowPaymentForm(false);
                }}
              >
                {selectedPlan === plan.id ? '✓ Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Section */}
      {selectedPlan && !showPaymentForm && !paymentSuccess && (
        <div className="action-section">
          <button 
            className="proceed-payment-btn"
            onClick={() => setShowPaymentForm(true)}
          >
            Proceed to Payment
          </button>
        </div>
      )}

      {/* Payment Form */}
      {showPaymentForm && !paymentSuccess && (
        <div className="payment-section">
          <h2>Payment Details</h2>
          
          <div className="payment-summary">
            <p><strong>Plan:</strong> {currentPlan.name}</p>
            <p><strong>Amount:</strong> ${currentPlan.price}</p>
          </div>

          <form className="payment-form" onSubmit={handlePayment}>
            {/* Cardholder Name */}
            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                placeholder="John Doe"
                value={formData.cardName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Card Number */}
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength="19"
                required
              />
            </div>

            {/* Expiry and CVV */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  maxLength="5"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  maxLength="3"
                  required
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit/Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal
              </label>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowPaymentForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="pay-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay $${currentPlan.price}`}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success Message */}
      {paymentSuccess && (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Payment Successful!</h2>
          <p>Your pro membership is now active</p>
          <p className="plan-info">Plan: <strong>{currentPlan.name}</strong></p>
          <p className="plan-info">Valid until: <strong>{new Date(Date.now() + (selectedPlan === 'monthly' ? 30 : selectedPlan === 'quarterly' ? 90 : 365) * 24 * 60 * 60 * 1000).toLocaleDateString()}</strong></p>
        </div>
      )}

      <style jsx>{`
        .pro-membership-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 20px;
        }

        .login-required-message {
          text-align: center;
          padding: 60px 20px;
        }

        .login-required-message h2 {
          color: #333;
          margin-bottom: 10px;
        }

        .login-link-button {
          display: inline-block;
          margin-top: 20px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
        }

        .pro-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .pro-header h1 {
          color: #333;
          font-size: 36px;
          margin-bottom: 10px;
        }

        .pro-header p {
          color: #666;
          font-size: 16px;
        }

        .plans-section {
          margin-bottom: 40px;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 30px;
        }

        .plan-card {
          background: white;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .plan-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .plan-card.selected {
          border-color: #667eea;
          background: #f0f4ff;
        }

        .plan-card.popular {
          transform: scale(1.05);
          border-color: #667eea;
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
        }

        .plan-card h3 {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
          margin-top: 10px;
        }

        .plan-description {
          color: #666;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .price-section {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e0e0e0;
        }

        .price {
          font-size: 32px;
          font-weight: bold;
          color: #667eea;
        }

        .billing-cycle {
          color: #666;
          font-size: 14px;
          margin-left: 5px;
        }

        .original-price {
          display: block;
          color: #999;
          text-decoration: line-through;
          font-size: 12px;
          margin-top: 5px;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 20px 0;
        }

        .features-list li {
          color: #666;
          padding: 8px 0;
          font-size: 14px;
        }

        .select-plan-btn {
          width: 100%;
          padding: 12px;
          background: #f0f0f0;
          border: 2px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
          color: #333;
        }

        .select-plan-btn:hover {
          background: #e0e0e0;
        }

        .select-plan-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #667eea;
        }

        .action-section {
          text-align: center;
          margin: 40px 0;
        }

        .proceed-payment-btn {
          padding: 14px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .proceed-payment-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .payment-section {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 30px;
          max-width: 500px;
          margin: 30px auto;
        }

        .payment-section h2 {
          color: #333;
          margin-bottom: 20px;
        }

        .payment-summary {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .payment-summary p {
          margin: 8px 0;
          color: #666;
        }

        .payment-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 500;
          color: #333;
          margin-bottom: 8px;
        }

        .form-group input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          font-family: inherit;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .payment-methods {
          display: flex;
          gap: 20px;
          padding: 15px;
          background: #f9f9f9;
          border-radius: 4px;
        }

        .payment-methods label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: #666;
        }

        .payment-methods input[type="radio"] {
          cursor: pointer;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .cancel-btn,
        .pay-btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
        }

        .cancel-btn {
          background: #e0e0e0;
          color: #333;
        }

        .cancel-btn:hover {
          background: #d0d0d0;
        }

        .pay-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .pay-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
        }

        .pay-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-message {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          border-radius: 8px;
          text-align: center;
          max-width: 500px;
          margin: 30px auto;
          animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }

        .success-message h2 {
          margin: 0 0 10px 0;
          font-size: 24px;
        }

        .success-message p {
          margin: 10px 0;
          font-size: 16px;
        }

        .plan-info {
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .plans-grid {
            grid-template-columns: 1fr;
          }

          .plan-card.popular {
            transform: scale(1);
          }

          .pro-header h1 {
            font-size: 28px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ProMembership;
