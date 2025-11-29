import React from 'react';

export default function AccessibilityStatement() {
  return (
    <main className="main-content legal-page">
      <section className="legal-hero-section">
        <h1 className="legal-title">Accessibility Statement</h1>
        <p className="legal-subtitle">Last updated: November 2025</p>
      </section>

      <section className="legal-content">
        <div className="legal-container">
          <div className="legal-text">
            <h2>Our Commitment to Accessibility</h2>
            <p>
              WorkshopFlow is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <h2>Accessibility Features</h2>
            <p>
              Our workshop platform includes the following accessibility features:
            </p>
            <ul>
              <li><strong>Keyboard Navigation:</strong> All interactive elements can be accessed and operated using keyboard navigation.</li>
              <li><strong>Semantic HTML:</strong> Our website uses semantic HTML to provide clear document structure for assistive technologies.</li>
              <li><strong>Color Contrast:</strong> We maintain sufficient color contrast ratios to ensure text is readable for users with low vision.</li>
              <li><strong>Alternative Text:</strong> All images and visual content include descriptive alt text.</li>
              <li><strong>Video Captions:</strong> Workshop videos include captions for deaf and hard-of-hearing users.</li>
              <li><strong>Screen Reader Support:</strong> Our website is designed to work with popular screen readers like NVDA and JAWS.</li>
              <li><strong>Responsive Design:</strong> The platform is fully responsive and works across various devices and screen sizes.</li>
              <li><strong>Font Sizing:</strong> Users can adjust font size through browser settings for better readability.</li>
            </ul>

            <h2>Accessibility Standards</h2>
            <p>
              WorkshopFlow strives to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines provide recommendations for making web content more accessible to people with disabilities.
            </p>

            <h2>Known Accessibility Issues</h2>
            <p>
              While we continuously work to improve accessibility, there may be some areas that need further enhancement. We are actively addressing:
            </p>
            <ul>
              <li>Improving form labels for better screen reader compatibility</li>
              <li>Enhancing focus indicators for keyboard navigation</li>
              <li>Adding more comprehensive ARIA labels where needed</li>
            </ul>

            <h2>Accessibility Tools and Features</h2>
            <p>
              We recommend the following tools to enhance your experience:
            </p>
            <ul>
              <li><strong>Browser Zoom:</strong> Use your browser's zoom function to increase text and content size.</li>
              <li><strong>High Contrast Mode:</strong> Enable high contrast mode in your operating system settings.</li>
              <li><strong>Text-to-Speech:</strong> Use your browser's built-in reader or third-party extensions for audio reading.</li>
              <li><strong>Keyboard Shortcuts:</strong> Use Tab to navigate forward and Shift+Tab to navigate backward.</li>
            </ul>

            <h2>Browser and Assistive Technology Support</h2>
            <p>
              Our website is compatible with the following:
            </p>
            <ul>
              <li>Modern browsers: Chrome, Firefox, Safari, Edge</li>
              <li>Assistive technologies: NVDA, JAWS, VoiceOver, TalkBack</li>
              <li>Mobile devices with built-in accessibility features</li>
            </ul>

            <h2>Feedback and Improvements</h2>
            <p>
              We welcome feedback on the accessibility of our platform. If you encounter any accessibility barriers or have suggestions for improvement, please contact us through our <a href="/contact" className="legal-link">Contact Us</a> page.
            </p>

            <h2>Third-Party Content</h2>
            <p>
              Our platform includes embedded videos and external resources. We strive to ensure these are accessible, but we encourage you to inform us if you encounter any accessibility issues with third-party content.
            </p>

            <h2>Continuous Improvement</h2>
            <p>
              Accessibility is an ongoing process. We are committed to:
            </p>
            <ul>
              <li>Regular accessibility audits and testing</li>
              <li>User feedback integration</li>
              <li>Staff training on accessibility best practices</li>
              <li>Staying current with WCAG updates and standards</li>
            </ul>

            <h2>Contact for Accessibility Support</h2>
            <p>
              If you need accessibility assistance or have questions about our accessibility features, please reach out to us at <a href="/contact" className="legal-link">Contact Us</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
