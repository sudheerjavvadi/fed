import React from 'react';
import { Link } from 'react-router-dom';

const FooterCustom = () => {
  return (
    <footer style={{ background: '#0f272a', color: '#dfeff0', padding: '36px 0' }}>
      <div style={{ maxWidth: 1250, margin: '0 auto', display: 'flex', gap: 350, padding: '0 20px' }}>
        
        {/* Left Section: Logo and Description */}
        <div style={{ maxWidth: 820, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 64, height: 40, background: '#c43b3b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, borderRadius: 4 }}>WF</div>
            <div>
              <h3 style={{ margin: 0, color: '#fff' }}>WorkshopFlow</h3>
              <p style={{ margin: 0, color: '#cfe8e8', fontSize: '0.9em' }}>Hands-on workshops and short courses built by students for learners — practical, project-driven, and easy to follow.</p>
            </div>
          </div>

          <p style={{ marginTop: 30, color: '#bcd', fontSize: '0.95em', lineHeight: 1.6 }}>
            WorkshopFlow is a student project that demonstrates frontend engineering using React, Vite and modern patterns. Our goal is to create approachable workshops that help learners build real projects quickly.
          </p>
        </div>

        {/* Right Section: Links and Social Icons */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          {/* Two Columns: About/Contact and Accessibility/Privacy */}
          <div style={{ display: 'flex', gap: 80 }}>
            
            {/* Left Column: About Us and Contact Us */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Link to="/about" style={{ color: '#cfe8e8', textDecoration: 'underline', fontSize: '1em' }}>About Us</Link>
              <Link to="/contact" style={{ color: '#cfe8e8', textDecoration: 'underline', fontSize: '1em' }}>Contact Us</Link>
            </div>

            {/* Right Column: Accessibility and Privacy Policy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href="/accessibility-statement" style={{ color: '#cfe8e8', textDecoration: 'underline', fontSize: '1em' }}>Accessibility statement</a>
              <a href="/privacy-policy" style={{ color: '#cfe8e8', textDecoration: 'underline', fontSize: '1em' }}>Privacy policy</a>
              <a href="/terms-of-service" style={{ color: '#cfe8e8', textDecoration: 'underline', fontSize: '1em' }}>Terms of service</a>
            </div>
          </div>

          {/* Social Media Icons - Below the two columns */}
          <div style={{ display: 'flex', gap: 10 }}>
            <a href="#" style={{ width: 40, height: 40, background: '#e74c3c', color: '#fff', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '1.2em' }}>♪</a>
            <a href="#" style={{ width: 40, height: 40, background: '#e74c3c', color: '#fff', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '1.2em' }}>◎</a>
            <a href="#" style={{ width: 40, height: 40, background: '#e74c3c', color: '#fff', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '1.2em' }}>f</a>
            <a href="#" style={{ width: 40, height: 40, background: '#e74c3c', color: '#fff', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '1.2em' }}>in</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCustom;
