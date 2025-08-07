import React, { useState, useEffect } from 'react';
import portfolioData from '../data/portfolioData.json';
import profileImage from '../static/profile.jpeg';

const RightPane = () => {
  const [modalState, setModalState] = useState({ isVisible: false, title: '', message: '' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showProfileModal, setShowProfileModal] = useState(false);
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

  useEffect(() => {
    const handleKeyDown = (e) => e.key === 'Escape' && setShowProfileModal(false);
    if (showProfileModal) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showProfileModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, v.trim()]));
    if (!trimmed.name || !trimmed.email || !trimmed.message) {
      showModal('Oops!', 'Please fill out all fields.');
      return;
    }
    showModal('Success!', 'Your message has been sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  const handlePreview = (project) => {
    window.dispatchEvent(new CustomEvent('openPreviewProject', { detail: project }));
  };

  return (
    <>
      <main className="right-pane">
        <div className="mobile-header">
          <img src={profileImage} alt="Profile" className="profile-image" onClick={() => setShowProfileModal(true)} />
          <h1>{personalInfo.name}</h1>
          <p>{personalInfo.location}</p>
          <p>{personalInfo.title}</p>
        </div>

        <section id="projects" className="section">
          <h2>Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="content-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button className="preview-button" onClick={() => handlePreview(project)}>Show Preview</button>
            </div>
          ))}
        </section>

        <section id="contact" className="section">
          <h2>Contact Me</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required />
            <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" required />
            <textarea name="message" rows="4" value={formData.message} onChange={handleInputChange} placeholder="Your Message" required />
            <button type="submit">Send Message</button>
          </form>
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

      {/* Profile Modal */}
      <div className={`profile-modal ${showProfileModal ? 'show' : ''}`} onClick={(e) => e.target.classList.contains('profile-modal') && setShowProfileModal(false)}>
        <div className="profile-modal-content">
          <img src={profileImage} alt="Profile" />
          <p>👋 Hey there, <br /> taking a closer look ahh!</p>
        </div>
      </div>
    </>
  );
};

export default RightPane;
