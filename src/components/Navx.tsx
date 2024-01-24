import React, { useState } from 'react';
import '../style/style.css';
import SignCraft from '../assets/SignCraft.png';

const Navx: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-sign"
      style={{ padding: '20px' }}
    >
      <a className="navbar-brand" href="/">
        <img className="singCraft" src={SignCraft} alt="" />
      </a>
      <button className="navbar-toggler" type="button" onClick={toggleNav}>
        <span className="navbar-toggler-icon"></span>
      </button>
        <h1 className='text-sign'>SIGN CRAFT</h1>
      <div
        className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''} justify-content-end`}
      >
        {/*
        <div className="form-inline ml-auto">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Recherche"
            aria-label="Recherche"
          />
        </div>*/}
        <ul className="navbar-nav text-dark marg-sign">
          <li className="nav-item">
            <a className="nav-link text-dark" href="/">
              Accueil
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-dark" href="/about">
              À propos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-dark" href="/contact">
              Contact
            </a>
          </li>
          <input type="button" className="btn bg-danger" value="logout" />
        </ul>
      </div>
    </nav>
  );
};

export default Navx;
