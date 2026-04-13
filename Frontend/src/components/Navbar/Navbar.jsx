import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <img src="/img/logo.png" alt="JTC Logo" className="navbar-logo" />
        <span className="navbar-title">Coverband</span>
      </div>

      <button className="navbar-hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
      </button>

      <nav className={`navbar-nav ${isOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Hem</Link></li>
          <li><Link to="/member" onClick={() => setIsOpen(false)}>Om oss</Link></li>
          <li><Link to="/spelningar" onClick={() => setIsOpen(false)}>Spelningar</Link></li>
          <li><Link to="/galleri" onClick={() => setIsOpen(false)}>Galleri</Link></li>
          <li><Link to="/bokning" onClick={() => setIsOpen(false)}>Kontakt</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;