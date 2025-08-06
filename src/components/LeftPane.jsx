import React, { useState, useEffect } from 'react';
import portfolioData from '../data/portfolioData.json';
import think from '../static/thinking.png';
import profileImage from '../static/profile.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

const LeftPane = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { personalInfo, navigationItems } = portfolioData;

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowProfileModal(false);
      }
    };

    if (showProfileModal) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showProfileModal]);

  return (
    <>
      <aside className="left-pane">
        <div className="left-content">
          <div>
            {/* Profile Section */}
            <div className="profile-section">
              <div className="profile-image-container">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                  onClick={() => setShowProfileModal(true)}
                />
                <div className="profile-gradient-border"></div>
              </div>
              <div className="profile-info">
                <h1 className="profile-name">{personalInfo.name}</h1>
                <p className="mobile-title">{personalInfo.location}</p>
                <p className="profile-title">{personalInfo.title}</p>
              </div>
            </div>

            {/* Social Links and Resume */}
            <div>
              <div className="social-links">
                <a href={`mailto:${personalInfo.email}`} className="social-link" title="Email">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                  <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
              <a
                href={personalInfo.resume_url}
                download="Abhishek_Anantapalli_Resume.pdf"
                className="gradient-button"
              >
                Preview Resume
              </a> 

            </div>
          </div>

          {/* Navigation Clouds */}
          <div className="svg-nav">
            <img className="thinking-img" src={think} alt="thinking figure" />
            {navigationItems.map((item) => (
              <a key={item.id} href={item.href} id={item.cloudId} className="cloud-link">
                <div className="cloud-wrapper">
                  <FontAwesomeIcon icon={faCloud} className="cloud-icon" />
                  <span className="cloud-label">{item.label}</span>
                </div>
              </a>
            ))}

          </div>
        </div>
      </aside>

      
      {/* Profile Modal */}
      <div
        className={`profile-modal ${showProfileModal ? 'show' : ''}`}
        onClick={(e) => {
          if (e.target.classList.contains('profile-modal')) {
            setShowProfileModal(false);
          }
        }}
      >
        <div className="profile-modal-content">
          <img
            src={personalInfo.profileImage || profileImage}
            alt="Profile Preview"
            className="profile-modal-image"
          />
          <p className="profile-modal-name">👋 Hey there, <br /> taking a closer look ahh!</p>
        </div>
        <p className="modal-hint-text">Click anywhere outside to close</p>
      </div>

    </>
  );
};

export default LeftPane;
