export default function Header({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm ministry-navbar">
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
  );
}
