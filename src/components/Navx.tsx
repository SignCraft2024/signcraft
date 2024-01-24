import React, { useState } from 'react';

const Navx: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark"
      style={{ padding: '20px' }}
    >
      <a className="navbar-brand" href="/">
        Mon Logo
      </a>
      <button className="navbar-toggler" type="button" onClick={toggleNav}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''} justify-content-end`}
      >
        <div className="form-inline ml-auto">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Recherche"
            aria-label="Recherche"
          />
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Accueil
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              À propos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div>
        <input type="button" className='btn bg-danger' value="logout" />
      </div>
    </nav>
  );
};

export default Navx;
