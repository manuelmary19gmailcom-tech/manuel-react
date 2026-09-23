import React, { useState } from "react";

function Header({ onLogout }) {
const [isMenuOpen, setIsMenuOpen] = useState(false);

const closeMenu = () => {
setIsMenuOpen(false);
};

const handleLogout = () => {
closeMenu();
onLogout();
};

return (
<nav
className="navbar navbar-expand-lg navbar-dark sticky-top shadow"
style={{
backgroundColor: "#102a43",
borderBottom: "1px solid rgba(255, 209, 102, 0.25)",
padding: "12px 0",
zIndex: 1000,
}}
> <div className="container">

    <a
      className="navbar-brand d-flex align-items-center gap-2"
      href="#home"
      onClick={closeMenu}
    >
      <img
        src="/logo.webp"
        alt="Shepherd of My Soul Christian Ministry"
        width="52"
        height="52"
        className="rounded-circle border border-2 border-warning object-fit-cover"
      />

      <div className="lh-sm">
        <div className="fw-bold text-white">
          Shepherd of My Soul
        </div>

        <small className="text-warning">
          Christian Ministry
        </small>
      </div>
    </a>

    <button
      className="navbar-toggler"
      type="button"
      aria-label="Toggle navigation"
      aria-expanded={isMenuOpen}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div
      className={`collapse navbar-collapse ${
        isMenuOpen ? "show" : ""
      }`}
      id="mainNavbar"
    >
      <ul className="navbar-nav ms-auto align-items-lg-center">

        <li className="nav-item">
          <a
            className="nav-link active"
            href="#home"
            onClick={closeMenu}
          >
            Home
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            href="#about"
            onClick={closeMenu}
          >
            About Us
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            href="#services"
            onClick={closeMenu}
          >
            Services
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            href="#events"
            onClick={closeMenu}
          >
            Events
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            href="#bible"
            onClick={closeMenu}
          >
            Bible Verse
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            href="#contact"
            onClick={closeMenu}
          >
            Contact
          </a>
        </li>

        <li className="nav-item ms-lg-2">
          <button
            type="button"
            className="btn btn-outline-warning btn-sm"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </li>

      </ul>
    </div>

  </div>
</nav>

);
}

export default Header;
