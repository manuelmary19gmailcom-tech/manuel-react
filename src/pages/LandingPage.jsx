import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        color: "#102a43",
        overflowX: "hidden",
      }}
    >
<<<<<<< HEAD
=======
      {/* NAVBAR */}
>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{
          backgroundColor: "rgba(16, 42, 67, 0.98)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="container py-2">
          <a
            href="#home"
            className="navbar-brand d-flex align-items-center text-white fw-bold"
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{
                width: "42px",
                height: "42px",
                backgroundColor: "#ffd166",
                color: "#102a43",
                fontSize: "20px",
              }}
            >
              ✝
            </div>

            <span>Shepherd of My Soul</span>
          </a>

          <div className="d-flex align-items-center gap-2">
            <a
              href="#about"
              className="text-white text-decoration-none d-none d-md-block px-3"
            >
              About
            </a>

            <a
              href="#ministry"
              className="text-white text-decoration-none d-none d-md-block px-3"
            >
              Ministry
            </a>

            <button
              onClick={() => navigate("/login")}
              className="btn fw-bold px-4"
              style={{
                backgroundColor: "#ffd166",
                color: "#102a43",
                border: "none",
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="position-relative overflow-hidden"
        style={{
          minHeight: "calc(100vh - 70px)",
          background:
            "linear-gradient(135deg, rgba(16,42,67,0.96), rgba(23,54,93,0.93)), url('/logo.webp') center/cover no-repeat",
        }}
      >
        {/* Decorative circles */}
        <div
          className="position-absolute rounded-circle"
          style={{
            width: "420px",
            height: "420px",
            backgroundColor: "rgba(255,209,102,0.07)",
            top: "-180px",
            right: "-160px",
          }}
        />

        <div
          className="position-absolute rounded-circle"
          style={{
            width: "300px",
            height: "300px",
            backgroundColor: "rgba(255,255,255,0.04)",
            bottom: "-160px",
            left: "-130px",
          }}
        />

        {/* CENTERED HERO */}
        <div
          className="container position-relative d-flex align-items-center justify-content-center"
          style={{
            minHeight: "calc(100vh - 70px)",
            paddingTop: "70px",
            paddingBottom: "70px",
          }}
        >
          <div
            className="text-center w-100"
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {/* LABEL */}
            <div
              className="d-inline-block px-4 py-2 rounded-pill mb-4"
              style={{
                backgroundColor: "rgba(255,209,102,0.12)",
                border: "1px solid rgba(255,209,102,0.4)",
                color: "#ffd166",
                letterSpacing: "2px",
                fontSize: "0.85rem",
                fontWeight: "600",
              }}
            >
              ✦ WELCOME TO OUR MINISTRY
            </div>

            {/* TITLE */}
            <h1
              className="fw-bold mb-3"
              style={{
                color: "#ffffff",
                fontSize: "clamp(3.2rem, 8vw, 6.5rem)",
                lineHeight: "0.98",
                letterSpacing: "-2px",
              }}
            >
              Shepherd of
              <br />
              <span style={{ color: "#ffd166" }}>
                My Soul
              </span>
            </h1>

            {/* SUBTITLE */}
            <h4
              className="fw-normal mb-4"
              style={{
                color: "#dce6ef",
                fontSize: "1.4rem",
                letterSpacing: "1px",
              }}
            >
              Christian Ministry
            </h4>

            {/* DESCRIPTION */}
            <p
              className="mx-auto mb-4"
              style={{
                color: "#f1f4f7",
                maxWidth: "720px",
                lineHeight: "1.9",
                fontSize: "1.1rem",
              }}
            >
              A welcoming place where faith grows,
              hearts are encouraged, and lives are guided
              by God's love.
            </p>

            {/* BUTTONS */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
              <button
                className="btn btn-lg fw-bold px-5 py-3"
                style={{
                  backgroundColor: "#ffd166",
                  color: "#102a43",
                  border: "none",
                  boxShadow:
                    "0 8px 25px rgba(255,209,102,0.25)",
                }}
                onClick={() => navigate("/login")}
              >
                Get Started →
              </button>

              <a
                href="#about"
                className="btn btn-lg px-5 py-3"
                style={{
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.45)",
                }}
              >
                Explore Our Ministry
              </a>
            </div>

            {/* FEATURE CARD */}
            <div
              className="mx-auto p-3 p-md-4 rounded-4 shadow-lg"
              style={{
                maxWidth: "760px",
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="row align-items-center text-center g-3">
                <div className="col-md-5">
                  <div
                    className="d-flex align-items-center justify-content-center mx-auto mb-2 rounded-circle"
                    style={{
                      width: "65px",
                      height: "65px",
                      backgroundColor: "#ffd166",
                      color: "#102a43",
                      fontSize: "28px",
                    }}
                  >
                    ✝
                  </div>

                  <h4 className="fw-bold text-white mb-1">
                    Guided by Faith
                  </h4>

                  <small style={{ color: "#dce6ef" }}>
                    United in Love • Serving God
                  </small>
                </div>

                <div className="col-md-7">
                  <div className="row text-center">
                    <div className="col-4">
                      <div
                        className="fw-bold fs-5"
                        style={{ color: "#ffd166" }}
                      >
                        Faith
                      </div>

                      <small className="text-white">
                        Growing
                      </small>
                    </div>

                    <div className="col-4">
                      <div
                        className="fw-bold fs-5"
                        style={{ color: "#ffd166" }}
                      >
                        Love
                      </div>

                      <small className="text-white">
                        Sharing
                      </small>
                    </div>

                    <div className="col-4">
                      <div
                        className="fw-bold fs-5"
                        style={{ color: "#ffd166" }}
                      >
                        Hope
                      </div>

                      <small className="text-white">
                        Living
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="container py-5">
          <div className="text-center mb-5">
            <span
              className="fw-bold"
              style={{
                color: "#b28720",
                letterSpacing: "2px",
              }}
            >
              WHO WE ARE
            </span>

            <h2
              className="display-6 fw-bold mt-2"
              style={{ color: "#102a43" }}
            >
              A Community Built on Faith
            </h2>

            <p
              className="text-muted mx-auto mt-3"
              style={{
                maxWidth: "700px",
                lineHeight: "1.8",
              }}
            >
              We believe that faith grows stronger when
              people come together, encourage one another,
              and serve with love.
            </p>

            <div
              className="mx-auto mt-3"
              style={{
                width: "65px",
                height: "4px",
                backgroundColor: "#ffd166",
                borderRadius: "5px",
              }}
            />
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="h-100 p-4 rounded-4 shadow-sm text-center"
                style={{
                  backgroundColor: "#ffffff",
                  borderTop: "4px solid #ffd166",
                }}
              >
                <div className="fs-1 mb-3">🙏</div>

                <h4 className="fw-bold">
                  Faith
                </h4>

                <p className="text-muted mb-0">
                  Grow closer to God through prayer,
                  His Word, and a life grounded in faith.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="h-100 p-4 rounded-4 shadow-sm text-center"
                style={{
                  backgroundColor: "#ffffff",
                  borderTop: "4px solid #17365d",
                }}
              >
                <div className="fs-1 mb-3">❤️</div>

                <h4 className="fw-bold">
                  Community
                </h4>

                <p className="text-muted mb-0">
                  Build meaningful friendships and
                  encourage one another through every season.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="h-100 p-4 rounded-4 shadow-sm text-center"
                style={{
                  backgroundColor: "#ffffff",
                  borderTop: "4px solid #ffd166",
                }}
              >
                <div className="fs-1 mb-3">🤝</div>

                <h4 className="fw-bold">
                  Service
                </h4>

                <p className="text-muted mb-0">
                  Share your gifts and make a meaningful
                  difference by serving others with love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINISTRY */}
      <section
        id="ministry"
        className="py-5"
        style={{
          backgroundColor: "#102a43",
        }}
      >
        <div className="container py-5">
          <div className="text-center mb-5">
            <span
              className="fw-bold"
              style={{
                color: "#ffd166",
                letterSpacing: "2px",
              }}
            >
              OUR MINISTRY
            </span>

            <h2 className="display-6 fw-bold text-white mt-2">
              Worship • Learn • Connect
            </h2>

            <p
              className="mx-auto mt-3"
              style={{
                color: "#cbd8e3",
                maxWidth: "680px",
                lineHeight: "1.8",
              }}
            >
              Opportunities to worship together, discover
              God's Word, and build relationships that
              strengthen our faith.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="p-4 rounded-4 h-100 text-center"
                style={{
                  backgroundColor: "#17365d",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "15px",
                  }}
                >
                  ✦
                </div>

                <h4
                  className="fw-bold"
                  style={{ color: "#ffd166" }}
                >
                  Worship
                </h4>

                <p
                  className="mb-0"
                  style={{
                    color: "#dce6ef",
                    lineHeight: "1.8",
                  }}
                >
                  Come together in worship and prayer
                  as we honor God and grow closer to Him.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="p-4 rounded-4 h-100 text-center"
                style={{
                  backgroundColor: "#17365d",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "15px",
                  }}
                >
                  📖
                </div>

                <h4
                  className="fw-bold"
                  style={{ color: "#ffd166" }}
                >
                  Bible Study
                </h4>

                <p
                  className="mb-0"
                  style={{
                    color: "#dce6ef",
                    lineHeight: "1.8",
                  }}
                >
                  Discover God's Word and learn how
                  His teachings can guide our daily lives.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="p-4 rounded-4 h-100 text-center"
                style={{
                  backgroundColor: "#17365d",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "15px",
                  }}
                >
                  🤝
                </div>

                <h4
                  className="fw-bold"
                  style={{ color: "#ffd166" }}
                >
                  Fellowship
                </h4>

                <p
                  className="mb-0"
                  style={{
                    color: "#dce6ef",
                    lineHeight: "1.8",
                  }}
                >
                  Build genuine friendships through
                  fellowship, encouragement, and shared faith.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-5 text-center"
        style={{
          backgroundColor: "#ffd166",
          color: "#102a43",
        }}
      >
        <div className="container py-5">
          <h2 className="fw-bold display-6">
            Come and Grow With Us
          </h2>

          <p
            className="mb-4 mx-auto"
            style={{
              maxWidth: "650px",
              lineHeight: "1.8",
            }}
          >
            Take the next step and become part of a
            community where faith, friendship, and service
            come together.
          </p>

          <button
            className="btn btn-lg fw-bold px-5 py-3"
            style={{
              backgroundColor: "#102a43",
              color: "#ffffff",
              border: "none",
            }}
            onClick={() => navigate("/login")}
          >
            Join Our Community →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-4 text-center"
        style={{
          backgroundColor: "#0b1f33",
          color: "#ffffff",
        }}
      >
        <div className="container">
          <h6 className="fw-bold mb-2">
            Shepherd of My Soul Christian Ministry
          </h6>

          <small style={{ color: "#b9c5d0" }}>
            Guided by Faith • United in Love • Serving God
          </small>

          <div
            className="mt-3"
            style={{
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          />

          <small
            className="d-block mt-3"
            style={{ color: "#8294a6" }}
          >
            © 2026 Shepherd of My Soul Christian Ministry
          </small>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;