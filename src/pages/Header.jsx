
const solidNavbarCss = `
  nav.navbar.ministry-navbar.solid-navbar {
    background: #081c2d !important;
    background-color: #081c2d !important;
    background-image: linear-gradient(135deg, #071a2d, #102a43) !important;
    opacity: 1 !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    border-bottom: 2px solid #ffd166 !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35) !important;
    z-index: 1030 !important;
  }

  nav.navbar.ministry-navbar.solid-navbar .navbar-brand,
  nav.navbar.ministry-navbar.solid-navbar .navbar-brand span {
    color: #ffffff !important;
  }

  nav.navbar.ministry-navbar.solid-navbar .navbar-brand small {
    color: #ffd166 !important;
  }

  nav.navbar.ministry-navbar.solid-navbar .nav-link {
    color: #ffffff !important;
    font-weight: 500;
  }

  nav.navbar.ministry-navbar.solid-navbar .nav-link:hover,
  nav.navbar.ministry-navbar.solid-navbar .nav-link:focus {
    color: #ffd166 !important;
  }

  /* Mobile menu (when the hamburger is opened) */
  @media (max-width: 991.98px) {
    nav.navbar.ministry-navbar.solid-navbar .navbar-collapse {
      background: #081c2d !important;
      padding: 12px 0;
    }
  }
`;

export default function Header({ user, onLogout }) {
  return (
    <>
      <style>{solidNavbarCss}</style>

      <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow ministry-navbar solid-navbar">
        <div className="container">
          <a
            className="navbar-brand d-flex align-items-center gap-2 fw-bold"
            href="#home"
          >
            <img
              src="/logo.webp"
              alt="Shepherd of My Soul"
              width="48"
              height="48"
              className="rounded-circle border border-2 border-warning"
            />

            <span>
              Shepherd of My Soul
              <small className="d-block text-warning fw-normal">
                Christian Ministry
              </small>
            </span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
              {[
                ["Home", "home"],
                ["About Us", "about"],
                ["Services", "services"],
                ["Events", "events"],
                ["Bible Verse", "bible"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <li className="nav-item" key={id}>
                  <a className="nav-link" href={`#${id}`}>
                    {label}
                  </a>
                </li>
              ))}

              <li className="nav-item ms-lg-2">
                <span className="navbar-text text-white-50 small me-2 d-none d-lg-inline">
                  {user?.name}
                </span>

                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  onClick={onLogout}
                >
                  <i className="bi bi-box-arrow-right me-1" />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}