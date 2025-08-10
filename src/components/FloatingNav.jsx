import { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars} from '@fortawesome/free-solid-svg-icons';

const FloatingNav = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ballRef = useRef(null);
  const pos = useRef({
    x: window.innerWidth-50,
    y: window.innerHeight-80,
    dragging: false
  });


  const handleTouchStart = (e) => {
    pos.current.dragging = true;
    const touch = e.touches[0];
    pos.current.startX = touch.clientX - pos.current.x;
    pos.current.startY = touch.clientY - pos.current.y;
  };

  const handleTouchMove = (e) => {
    if (!pos.current.dragging) return;
    const touch = e.touches[0];
    pos.current.x = touch.clientX - pos.current.startX;
    pos.current.y = touch.clientY - pos.current.startY;
    if (ballRef.current) {
      ballRef.current.style.left = `${pos.current.x}px`;
      ballRef.current.style.top = `${pos.current.y}px`;
    }
  };

  const handleTouchEnd = () => {
    pos.current.dragging = false;
  };

  const handleBallClick = () => {
    if (!pos.current.dragging) {
      setIsOpen((prev) => !prev); // toggle open/close
    }
  };

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // close after clicking section
  };

  return (
    <>
      {/* Floating draggable ball */}
    <div
        ref={ballRef}
        className={`floating-ball mobile-only ${isOpen ? "open" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleBallClick}
        >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
    </div>

      {/* Full screen menu */}
      {isOpen && (
        <div
          className="menu-overlay"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="menu-container"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {sections.map((sec, i) => (
              <div
                key={sec.id}
                className="menu-card"
                onClick={() => handleNavClick(sec.id)}
              >
                <div
                  className="menu-avatar"
                  style={{
                    background:
                      sec.color ||
                      ["#FF4C4C", "#FFD93D", "#00C2FF", "#9C27B0", "#FF9800", "#4CAF50"][i % 6]
                  }}
                >
                  {sec.icon || sec.label.charAt(0)}
                </div>
                <div className="menu-label">{sec.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingNav;
