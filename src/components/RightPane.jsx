import React, { useState } from 'react';
import portfolioData from '../data/portfolioData.json';
import profileImage from '../static/profile.jpeg';

const RightPane = () => {
  const [modalState, setModalState] = useState({ isVisible: false, title: '', message: '' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const {
    personalInfo = {},
    experiences = [],
    projects = [],
    skills = [],
    education = [],
    certifications = [],
  } = portfolioData;

  const showModal = (title, message) => {
    setModalState({ isVisible: true, title, message });
  };

  const hideModal = () => {
    setModalState(prev => ({ ...prev, isVisible: false }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.message) {
      showModal('Oops!', 'Please fill out all fields.');
      return;
    }

    showModal('Success!', 'Your message has been sent. Thank you for reaching out!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <main className="right-pane">
        {/* Mobile Header */}
        <div className="mobile-header">
          <img src={profileImage} alt="Profile Photo" className="mobile-profile-image" />
          <h1 className="mobile-name">{personalInfo.name}</h1>
          <p className="mobile-title">{personalInfo.title}</p>
          <div className="mobile-links">
            <a href={`mailto:${personalInfo.email}`} className="mobile-link">Email</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="mobile-link">LinkedIn</a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="mobile-link">GitHub</a>
          </div>
          <a
            href="https://www.overleaf.com/download/project/6877ad159f3e0c5740cf6190/build/19841eda8c6-b3c4ee8307cbc621/output/output.pdf?compileGroup=standard&clsiserverid=clsi-reg-n2d-c-f-l43b&enable_pdf_caching=true&popupDownload=true"
            download="DB_Abhishek_Anantapalli_Resume.pdf"
            className="gradient-button"
          >
            Download Resume
          </a>
        </div>

        {/* Experience Section */}
        <section id="experience" className="section">
          <h2 className="section-title">Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="content-card">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">{exp.title}</h3>
                  <p className="experience-company">{exp.company}</p>
                </div>
                <span className="experience-duration">{exp.duration}</span>
              </div>
              <ul className="experience-list">
                {exp.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2 className="section-title">Projects</h2>
          <div className="projects-container">
            {projects.map((project) => (
              <div key={project.id} className="content-card">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={`${tech}-${index}`} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} className="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <h2 className="section-title">Skills</h2>
          <div className="content-card">
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-category">{skill.category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <h2 className="section-title">Education</h2>
          <div className="education-container">
            {education.map((edu) => (
              <div key={edu.id} className="content-card">
                <div className="education-header">
                  <div>
                    <h3 className="education-institution">{edu.institution}</h3>
                    <p className="education-degree">{edu.degree}</p>
                  </div>
                  <span className="education-duration">{edu.duration}</span>
                </div>
                {edu.grade && <p className="education-grade">{edu.grade}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="section">
          <h2 className="section-title">Certifications</h2>
          <div className="certifications-container">
            {certifications.map((cert) => (
              <div key={cert.id} className="content-card">
                <p className="certification-title">{cert.title}</p>
                <p className="certification-details">{cert.score} ({cert.duration})</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <h2 className="section-title">Contact Me</h2>
          <div className="content-card">
            <p className="contact-description">Have a question or want to work together? Feel free to reach out.</p>
            <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact Form">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                className="form-input form-textarea"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="gradient-button form-submit">Send Message</button>
            </form>
          </div>
        </section>

        <footer className="footer">
          <p>Designed & Built by {personalInfo.name}</p>
        </footer>
      </main>

      {/* Modal */}
      {modalState.isVisible && (
        <div className="modal visible" onClick={(e) => e.target.classList.contains('modal') && hideModal()}>
          <div className="modal-content">
            <h3 className="modal-title">{modalState.title}</h3>
            <p className="modal-message">{modalState.message}</p>
            <button onClick={hideModal} className="gradient-button modal-close">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RightPane;
