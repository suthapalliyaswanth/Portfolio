import React, { useState, useEffect } from 'react';
import portfolioData from '../data/portfolioData.json';
import profileImage from '../static/profile.jpeg';
import bov from '../static/logos/bov.png';
import jnv from '../static/logos/jnv.png';
import nptel from '../static/logos/nptel.png';
import oracle from '../static/logos/oracle.png';
import svec from '../static/logos/svec.png';
import { BiSolidCameraMovie } from "react-icons/bi";
import FloatingNav from './FloatingNav';

const RightPane = () => {
  const logoMap = {
    bov: bov,
    jnv: jnv,
    nptel: nptel,
    svec: svec,
    oracle: oracle
  };

  const [modalState, setModalState] = useState({ isVisible: false, title: '', message: '' });
  const {
    personalInfo = {},
    experiences = [],
    projects = [],
    skills = [],
    education = [],
    certifications = [],
  } = portfolioData;

  const showModal = (title, message) => setModalState({ isVisible: true, title, message });
  const hideModal = () => setModalState(prev => ({ ...prev, isVisible: false }));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    // ✅ Send to Netlify (will still capture in dashboard)
    fetch("/", {
      method: "POST",
      body: data,
    }).catch((err) => console.error("Netlify submit error:", err));

    // ✅ Send to Formspree (replace with your real endpoint)
    const formspreeEndpoint = "https://formspree.io/f/mpwlkzpd";
    try {
      await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Formspree submit error:", err);
      alert("There was a problem sending your message.");
    }
  }
  const handlePreview = (project) => {
    window.dispatchEvent(new CustomEvent('openPreviewProject', { detail: project }));
  }
  return (
    <>
      <main className="right-pane">
        {/* Mobile Header */}
        <div className="mobile-header">
          <div className="profile-image-container">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
            />
            <div className="profile-gradient-border"></div>
          </div>
          <h1 className="mobile-name">{personalInfo.name}</h1>
          <p className="mobile-title">{personalInfo.location}</p>
          <p className="mobile-title">{personalInfo.title}</p>
          <div className="social-links">
                <a href={`mailto:${personalInfo.email}`} className="social-link-hover" title="Email">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link-hover" title="LinkedIn">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link-hover" title="GitHub">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
              <a
                href={personalInfo.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-button"
              >
                Preview Resume
              </a>
        </div>
        <FloatingNav
  sections={[
    { id: "experience", label: "Experience", icon: "💼", color: "#FF4C4C" },
    { id: "skills", label: "Skills", icon: "🛠", color: "#FFD93D" },
    { id: "projects", label: "Projects", icon: "📂", color: "#00C2FF" },
    { id: "education", label: "Education", icon: "🎓", color: "#9C27B0" },
    { id: "certifications", label: "Certification", icon: "📜", color: "#FF9800" },
    { id: "contact", label: "Contact", icon: "✉️", color: "#4CAF50" },
  ]}
/>


        {/* Experience Section */}
        <section id="experience" className="section">
          <h2 className="section-title">Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="content-card">
              <div className='flex flex-column'>
                <div className='exp-logo'>
                  <img src={logoMap[exp.logo]} alt={exp.logo} height={50}></img>
                </div>
                <div className="experience-header">
                  <div>
                    <h3 className="experience-title">{exp.title}</h3>
                    <p className="experience-company">{exp.company}</p>
                  </div>
                  <span className="experience-duration">{exp.duration}</span>
                </div>
              </div>
              <ul className="experience-list">
                {exp.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <h2 className="section-title">Skills</h2>
          <div className="content-card">
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className={`skill-item ${skill.category.toLowerCase()}`}>
                  <div className='skill-logo'>
                    <img src={skill.logo} height={40} width={40} />
                  </div>
                  <div className='skill-content'>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-category">{skill.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <h2 className="section-title">Projects</h2>
          <div className="projects-container">
            {projects.map((project) => (
              <div key={project.id} className="content-card">
                <div className='project-header'>
                  <div><h3 className="project-title">{project.title}</h3></div>
                  {project.video &&
                    <div><button title="Preview" className="preview-button" onClick={() => handlePreview(project)}>
                      <BiSolidCameraMovie size={18}/>
                    </button></div>
                  }
                </div>
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

        {/* Education Section */}
        <section id="education" className="section">
          <h2 className="section-title">Education</h2>
          <div className="education-container">
            {education.map((edu) => (
              <div key={edu.id} className="content-card">
                <div className='edu-logo'>
                    <img src={logoMap[edu.logo]} alt={edu.logo} width={80} height={80}></img>
                </div>
                <div className='full-width'>
                  <div className="education-header">
                    <div>
                      <h3 className="education-institution">{edu.institution}</h3>
                      <p className="education-degree">{edu.degree}</p>
                    </div>
                    <div>
                    <span className="education-duration">{edu.duration}</span>
                    </div>
                  </div>
                  {edu.grade && <p className="education-grade">{edu.grade}</p>}
                </div>
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
                <div className='cert-logo'>
                  <img src={logoMap[cert.logo]} alt={cert.logo} height={50}></img>
                </div>
                <div>
                    <p className="certification-title">{cert.title}</p>
                    <p className="certification-details">{cert.score} ({cert.duration})</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <h2 className="section-title">Contact Me</h2>
          <div className="content-card">
            <p className="contact-description">
              Have a question or want to work together? Feel free to reach out.
            </p>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="contact-form"
              aria-label="Contact Form"
            >
              {/* Required hidden input for Netlify */}
              <input type="hidden" name="form-name" value="contact" />

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
              <button
                type="submit"
                className="gradient-button form-submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Modal */}
      {modalState.isVisible && (
        <div className="modal" onClick={(e) => e.target.classList.contains('modal') && hideModal()}>
          <div className="modal-content">
            <h3>{modalState.title}</h3>
            <p>{modalState.message}</p>
            <button onClick={hideModal}>Close</button>
          </div>
        </div>
      )}

    </>
  );
};

export default RightPane;
