import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../scss/Header.scss"; 
import logo from "../images/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav__logo">
          <img src={logo} alt="Logo" />
        </Link>

        <button className="nav__toggle" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`nav__list ${menuOpen ? "active" : ""}`}>
          <li className="nav__item">
            <Link to="/" className="nav__link" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li className="nav__item">
            <Link to="/search" className="nav__link" onClick={() => setMenuOpen(false)}>Find Student</Link>
          </li>
          <li className="nav__item">
            <Link to="/students" className="nav__link" onClick={() => setMenuOpen(false)}>Student List</Link>
          </li>
          <li className="nav__item">
            <Link to="/add-student" className="nav__link" onClick={() => setMenuOpen(false)}>Add Student</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
