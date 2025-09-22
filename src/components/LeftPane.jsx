import React, { useState, useEffect, useRef } from 'react';
import portfolioData from '../data/portfolioData.json';
import think from '../static/thinking.png';
import profileImage from '../static/profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud , faXmark} from '@fortawesome/free-solid-svg-icons';
// import attrisense from '../static/logos/attrisense.png';
// import amazon from '../static/logos/amazon.png';
// import aru from '../static/logos/aru.png';
// import eap from '../static/logos/eap.png';

const LeftPane = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const previewRef = useRef(null);

  const { personalInfo, navigationItems } = portfolioData;

  const logoMap = {
    // amazon: amazon,
    // attrisense: attrisense,
    // aru: aru,
    // eap: eap,
  }

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const videoId = url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  };


  // Handle open/close preview events
  useEffect(() => {
    const open = (e) => {
      setActiveProject(e.detail);
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    const close = () => {
      setActiveProject(null);
    };

    window.addEventListener('openPreviewProject', open);
    window.addEventListener('closePreviewProject', close);
    return () => {
      window.removeEventListener('openPreviewProject', open);
      window.removeEventListener('closePreviewProject', close);
    };
  }, []);

  // Escape key closes profile modal
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && setShowProfileModal(false);
    if (showProfileModal) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showProfileModal]);

  return (
    <>
      <aside className="left-pane">
        <div className="left-content">
          {/* Profile Section */}
          <div className="top-section">
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
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-button"
              >
                Preview Resume
              </a>
            </div>
          </div>

          {/* Navigation & Preview */}
          <div className={`bottom-section ${activeProject ? 'flipped' : ''}`} ref={previewRef}>
            {!activeProject ? (
              <div className='svg-nav-container'>
                <div className="svg-nav">
                  <img className="thinking-img" src={think} alt="thinking" />
                  {navigationItems.map((item) => (
                    <a key={item.id} href={item.href} id={item.cloudId} className="cloud-link">
                      <div className="cloud-wrapper" title={`looking for ${item.label}`}>
                        <FontAwesomeIcon icon={faCloud} className="cloud-icon" />
                        <span className="cloud-label">{item.label}</span>
                      </div>
                    </a>
                  ))}
                </div>
                <pre className='hint-for-nav'>
  {`"Thinking of something,
            ask clouds for guidance!"`} 
                </pre>
              </div>
            ) : (
              <div className="device-preview">
                <div className="preview-header">
                  <div className="flex flex-col justify-center h-full">
                    {activeProject.logoname ? (
                      <img src={logoMap[activeProject.logoname]} height={40} alt={activeProject.title} />
                    ) : activeProject.logo ? (
                      <>
                        <img src={logoMap[activeProject.logo]} height={60} alt="" />
                        <div className='centermeverically'><h3>{activeProject.title}</h3></div>
                      </>
                    ) : (
                      <h3>{activeProject.title}</h3>
                    )}
                  </div>

                  <button title="Close" className="circle-cross" onClick={() => window.dispatchEvent(new Event('closePreviewProject'))}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
                <div className="device-container laptop-mode">
                  <div className="laptop-frame">
                    <div className="laptop-screen">
                        <iframe
                          width="460"
                          height="280"
                          src={getYouTubeEmbedUrl(activeProject.video)}
                          style={{ border: 'none' }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                    </div>
                    <div className="laptop-base">
                      <div className="laptop-trackpad"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </aside>

      {/* Profile Modal */}
      <div
        className={`profile-modal ${showProfileModal ? 'show' : ''}`}
        onClick={(e) => e.target.classList.contains('profile-modal') && setShowProfileModal(false)}
      >
        <div className="profile-modal-content">
          <img src={profileImage} alt="Profile" className="profile-modal-image" />
          <p className="profile-modal-title">👋 Hey there, <br /> taking a closer look ahh!</p>
        </div>
        <p className="modal-hint-text">Click anywhere outside to close</p>
      </div>
    </>
  );
};

export default LeftPane;
