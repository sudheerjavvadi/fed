import React from "react";

export default function AboutUs() {
  return (
    <main className="main-content about-page">
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="about-hero-text">
            <h1 className="about-title">SkillSphere Workshops</h1>
            <p className="about-subtitle">A student-developed frontend project from <strong>KL University</strong>. We build hands-on, project-driven workshops to help learners convert theory into working web applications.</p>
            <div className="hero-actions">
              <a href="/workshops" className="register-button">Browse workshops</a>
              <a href="/projects" className="register-button outline-button">See project demo</a>
            </div>
          </div>

          <aside className="about-hero-aside">
            <div className="about-card team-card">
              <div className="team-avatar">WF</div>
              <div className="team-info">
                <p className="muted-text">Developed by</p>
                <p className="team-names">A.N.S. Madav &amp; J.V.N.SUDHEER</p>
                <p className="muted-text">2nd Year Students — KL University</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="about-content">
        <div className="about-grid">
          <div>
            <h2 className="section-title">Project Overview</h2>
            <p className="section-text">SkillSphere Workshops is a frontend project created as part of the Frontend Development curriculum at KL University. Our objective is to design a responsive, accessible, and maintainable workshop platform that demonstrates proficiency in modern web development practices.</p>

            <h3 className="section-subtitle">Objectives</h3>
            <ul className="section-list">
              <li>Implement a responsive UI with component-driven architecture using React.</li>
              <li>Demonstrate state management, routing, and form handling (workshop listings, feedback forms, and subscriptions).</li>
              <li>Prioritize accessibility, performance, and clean code structure for collaboration.</li>
            </ul>

            <h3 className="section-subtitle">Learning Outcomes</h3>
            <ul className="section-list">
              <li>Collaborative development with Git and GitHub</li>
              <li>Component design, props, and state management in React</li>
              <li>Responsive layouts and utility-first styling</li>
              <li>Basic accessibility practices (semantic markup, ARIA labels)</li>
            </ul>

            <h3 className="section-subtitle">Technologies Used</h3>
            <div className="tech-grid">
              <div className="tech-chip">React.js</div>
              <div className="tech-chip">Tailwind CSS</div>
              <div className="tech-chip">JavaScript (ES6+)</div>
              <div className="tech-chip">Vite / npm</div>
              <div className="tech-chip">Git &amp; GitHub</div>
              <div className="tech-chip">HTML5 &amp; CSS3</div>
            </div>

            <h3 className="section-subtitle">Future Roadmap</h3>
            <ol className="section-list">
              <li>Integrate a backend (Node.js + Express) for registration and contact endpoints.</li>
              <li>Add authentication and user dashboards for participants.</li>
              <li>Deploy the project to a hosting service (Vercel / Netlify) and configure CI/CD.</li>
              <li>Enhance admin features for managing workshop content and participants.</li>
            </ol>
          </div>

          <aside>
            <div className="about-card stats-card">
              <h4>Project Stats</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <p className="stat-value">2</p>
                  <p className="muted-text">Team members</p>
                </div>
                <div className="stat-item">
                  <p className="stat-value">2nd</p>
                  <p className="muted-text">Year</p>
                </div>
                <div className="stat-item">
                  <p className="stat-value">React</p>
                  <p className="muted-text">Framework</p>
                </div>
                <div className="stat-item">
                  <p className="stat-value">KLU</p>
                  <p className="muted-text">Institution</p>
                </div>
              </div>
            </div>

            <div className="about-card about-card-website">
              <h4 className="about-card-title">About the Website</h4>
              <p className="muted-text">SkillSphere Workshops is designed to make learning interactive and application-based. Each workshop combines detailed explanations, real-time coding sessions, and participant engagement through feedback forms.</p>
              <p className="muted-text about-card-subtitle">Our vision is to expand this platform into a full-featured educational hub where students can register, collaborate, and share learning resources seamlessly.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
