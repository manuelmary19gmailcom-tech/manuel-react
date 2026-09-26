import React, { useEffect, useState } from "react";
import BibleVerse from "./BibleVerse";

function Body() {
<<<<<<< HEAD
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadAnnouncements = () => {
      const savedAnnouncements =
        JSON.parse(localStorage.getItem("churchAnnouncements")) || [];

      setAnnouncements(savedAnnouncements);
    };

    const loadEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };

    loadAnnouncements();
    loadEvents();

    const handleStorageChange = () => {
      loadAnnouncements();
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      loadAnnouncements();
      loadEvents();
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const navy = "#102a43";
  const darkNavy = "#17365d";
  const gold = "#ffd166";
  const light = "#f8f9fa";

  const cardStyle = {
    background: "linear-gradient(145deg, #17365d, #102a43)",
    border: "1px solid rgba(255, 209, 102, 0.35)",
    borderRadius: "24px",
    color: "#ffffff",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
  };

  return (
    <main style={{ background: navy, color: "#ffffff" }}>
      {/* ================= HERO ================= */}
      <section
        id="home"
        className="min-vh-100 d-flex align-items-center justify-content-center text-center"
        style={{
          background:
            "linear-gradient(rgba(5,23,43,.72), rgba(5,23,43,.92)), url('/logo.webp') center/cover no-repeat",
          padding: "110px 20px 80px",
        }}
      >
        <div className="container">
          <div
            className="mx-auto"
            style={{
              maxWidth: "1000px",
            }}
          >
            {/* CROSS */}
            <div
              className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle"
              style={{
                width: "82px",
                height: "82px",
                background: gold,
                color: navy,
                fontSize: "2.8rem",
                boxShadow: "0 8px 25px rgba(255,209,102,.35)",
              }}
=======
const [announcements, setAnnouncements] = useState([]);
const [events, setEvents] = useState([]);

useEffect(() => {
  const loadAnnouncements = () => {
    const savedAnnouncements =
      JSON.parse(localStorage.getItem("churchAnnouncements")) || [];

    setAnnouncements(savedAnnouncements);
  };

  const loadEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events");

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);  
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  loadAnnouncements();
  loadEvents();

  const handleStorageChange = () => {
    loadAnnouncements();
  };

  window.addEventListener("storage", handleStorageChange);

  const interval = setInterval(() => {
    loadAnnouncements();
    loadEvents();
  }, 1000);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    clearInterval(interval);
  };
}, []);

const darkCardStyle = {
background:
"linear-gradient(145deg, rgba(23,54,93,1), rgba(16,42,67,1))",
border: "1px solid rgba(255, 209, 102, 0.35)",
borderRadius: "22px",
color: "#ffffff",
boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
};

const sectionLabelStyle = {
color: "#ffd166",
fontWeight: "700",
letterSpacing: "3px",
fontSize: "0.85rem",
};

return (
<main style={{ background: "#102a43", color: "#ffffff" }}>
{/* HOME */}
<section
id="home"
className="min-vh-100 d-flex align-items-center text-center"
style={{
background:
"linear-gradient(rgba(5,23,43,.68), rgba(5,23,43,.92)), url('/logo.webp') center/cover",
padding: "120px 20px 80px",
}}
> <div className="container">
<div className="mx-auto" style={{ maxWidth: "950px" }}>
<div
className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
style={{
width: "85px",
height: "85px",
background: "#ffd166",
color: "#102a43",
fontSize: "3rem",
boxShadow: "0 8px 25px rgba(255,209,102,0.35)",
}}
>
✝ </div>

        <p
          style={{
            color: "#ffd166",
            fontWeight: "700",
            letterSpacing: "4px",
          }}
        >
          WELCOME TO
        </p>

        <h1 className="display-3 fw-bold mb-4">
          Shepherd of My Soul Christian Ministry
        </h1>

        <p className="lead mb-4 mx-auto" style={{ maxWidth: "760px" }}>
          A place where faith grows, families connect, and lives are
          changed through God's love.
        </p>

        <a
          href="#about"
          className="btn btn-lg rounded-pill px-5 py-3 fw-bold"
          style={{
            background: "#ffd166",
            color: "#102a43",
            border: "none",
          }}
        >
          Learn More
        </a>
      </div>
    </div>
  </section>

  {/* WHO WE ARE */}
  <section
    id="about"
    className="py-5"
    style={{
      background:
        "linear-gradient(135deg, #eaf2f8 0%, #dce8f2 100%)",
      color: "#102a43",
    }}
  >
    <div className="container py-5">
      <div className="text-center mb-5">
        <p style={{ ...sectionLabelStyle, color: "#17365d" }}>
          WHO WE ARE
        </p>

        <h2 className="display-5 fw-bold mb-3">
          Faith. Love. Purpose.
        </h2>

        <p
          className="lead mx-auto"
          style={{ maxWidth: "800px", color: "#40566d" }}
        >
          We are a Christian ministry committed to sharing God's love,
          strengthening faith, and serving our community.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div
            className="h-100 p-4 text-center"
            style={darkCardStyle}
          >
            <div
              className="display-4 mb-3"
              style={{ color: "#ffd166" }}
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
            >
              ✝
            </div>

<<<<<<< HEAD
            <p
              className="mb-3"
              style={{
                color: gold,
                fontWeight: "700",
                letterSpacing: "4px",
                fontSize: "0.9rem",
              }}
            >
              WELCOME TO OUR MINISTRY
            </p>

            <h1
              className="fw-bold mb-3"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                lineHeight: "1.05",
              }}
            >
              Shepherd of
              <br />
              <span style={{ color: gold }}>My Soul</span>
            </h1>

            <h2
              className="fw-semibold mb-4"
              style={{
                fontSize: "clamp(1.3rem, 3vw, 2rem)",
              }}
            >
              Christian Ministry
            </h2>

            <p
              className="lead mx-auto mb-5"
              style={{
                maxWidth: "720px",
                color: "#e5edf5",
                lineHeight: "1.8",
              }}
            >
              A place where faith grows, families connect, and lives are
              changed through God's love.
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <a
                href="#about"
                className="btn btn-lg rounded-pill px-5 py-3 fw-bold"
                style={{
                  background: gold,
                  color: navy,
                  border: "none",
                }}
              >
                Discover More
              </a>

              <a
                href="#services"
                className="btn btn-lg rounded-pill px-5 py-3 fw-bold"
                style={{
                  color: "#ffffff",
                  border: `2px solid ${gold}`,
                  background: "transparent",
                }}
              >
                Our Ministry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #f8f9fa, #e8f0f7)",
          color: navy,
        }}
      >
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "850px" }}>
            <p
              className="fw-bold mb-2"
              style={{
                color: darkNavy,
                letterSpacing: "4px",
                fontSize: "0.85rem",
              }}
            >
              WHO WE ARE
            </p>

            <h2 className="display-5 fw-bold mb-3">
              Faith. Love. Purpose.
            </h2>

            <p
              className="lead"
              style={{
                color: "#40566d",
                lineHeight: "1.8",
              }}
            >
              We are a Christian ministry committed to sharing God's love,
              strengthening faith, and serving our community.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="h-100 p-4 text-center"
                style={cardStyle}
              >
                <div
                  className="display-4 mb-3"
                  style={{ color: gold }}
                >
                  ✝
                </div>

                <h3 className="h4 fw-bold">Strong in Faith</h3>

                <p
                  className="mb-0"
                  style={{ color: "#dce8f2", lineHeight: "1.7" }}
                >
                  Growing together through God's Word, prayer, and worship.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="h-100 p-4 text-center"
                style={cardStyle}
              >
                <div
                  className="display-4 mb-3"
                  style={{ color: gold }}
                >
                  ♥
                </div>

                <h3 className="h4 fw-bold">One Family</h3>

                <p
                  className="mb-0"
                  style={{ color: "#dce8f2", lineHeight: "1.7" }}
                >
                  Building a loving and welcoming church community for
                  everyone.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="h-100 p-4 text-center"
                style={cardStyle}
              >
                <div
                  className="display-4 mb-3"
                  style={{ color: gold }}
                >
                  🤝
                </div>

                <h3 className="h4 fw-bold">Ready to Serve</h3>

                <p
                  className="mb-0"
                  style={{ color: "#dce8f2", lineHeight: "1.7" }}
                >
                  Sharing God's love through kindness, service, and
                  compassion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MINISTRY ================= */}
      <section
        id="services"
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #17365d, #102a43)",
        }}
      >
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "800px" }}>
            <p
              className="fw-bold mb-2"
              style={{
                color: gold,
                letterSpacing: "4px",
                fontSize: "0.85rem",
              }}
            >
              OUR MINISTRY
            </p>

            <h2 className="display-5 fw-bold mb-3">
              Worship, Learn, and Grow
            </h2>

            <p className="lead" style={{ color: "#dce8f2" }}>
              Join us as we worship, learn, and grow together in faith.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="h-100 p-4 text-center"
                style={{
                  ...cardStyle,
                  background: "rgba(255,255,255,.08)",
                }}
              >
                <div
                  className="display-4 mb-3"
                  style={{ color: gold }}
                >
                  ⛪
                </div>

                <h3 className="h4 fw-bold">Sunday Worship</h3>

                <p style={{ color: "#dce8f2", lineHeight: "1.7" }}>
                  Come and worship with us every Sunday as we celebrate God's
                  goodness.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="h-100 p-4 text-center"
                style={{
                  ...cardStyle,
                  background: "rgba(255,255,255,.08)",
                }}
              >
                <div
                  className="display-4 mb-3"
                  style={{ color: gold }}
                >
                  📖
                </div>

                <h3 className="h4 fw-bold">Bible Study</h3>

                <p style={{ color: "#dce8f2", lineHeight: "1.7" }}>
                  Learn more about God's Word and discover how it guides our
                  everyday lives.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="h-100 p-4 text-center"
                style={{
                  ...cardStyle,
                  background: "rgba(255,255,255,.08)",
                }}
              >
                <div
                  className="display-4 mb-3"
                  style={{ color: gold }}
                >
                  🙏
                </div>

                <h3 className="h4 fw-bold">Prayer Meeting</h3>

                <p style={{ color: "#dce8f2", lineHeight: "1.7" }}>
                  Spend time in prayer and fellowship with our church family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BIBLE VERSE ================= */}
      <BibleVerse />

      {/* ================= ANNOUNCEMENTS ================= */}
      <section
        id="announcements"
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #f8f9fa, #e8f0f7)",
          color: navy,
        }}
      >
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "800px" }}>
            <p
              className="fw-bold mb-2"
              style={{
                color: darkNavy,
                letterSpacing: "4px",
                fontSize: "0.85rem",
              }}
            >
              STAY UPDATED
            </p>

            <h2 className="display-5 fw-bold mb-3">
              Announcements
            </h2>

            <p style={{ color: "#40566d" }}>
              Read the latest announcements from our ministry.
            </p>
          </div>

          {announcements.length === 0 ? (
            <div
              className="text-center p-5 rounded-4 mx-auto"
              style={{
                maxWidth: "700px",
                background: "#ffffff",
                color: "#40566d",
                boxShadow: "0 8px 25px rgba(16,42,67,.12)",
              }}
            >
              <div className="display-5 mb-3">📢</div>
              <h3 className="h5 fw-bold">No announcements yet.</h3>
              <p className="mb-0">
                New announcements from the ministry will appear here.
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {announcements.map((announcement, index) => (
                <div
                  className="col-md-6"
                  key={announcement.id || index}
                >
                  <div
                    className="h-100 p-4"
                    style={cardStyle}
                  >
                    <div className="d-flex gap-3">
                      <div
                        className="fs-1"
                        style={{ color: gold }}
                      >
                        📢
                      </div>

                      <div>
                        <h3 className="h5 fw-bold">
                          {announcement.title || "Church Announcement"}
                        </h3>

                        <p style={{ color: "#dce8f2" }}>
                          {announcement.message || announcement.text}
                        </p>

                        {announcement.date && (
                          <small style={{ color: gold }}>
                            {announcement.date}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section
        id="events"
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #102a43, #17365d)",
        }}
      >
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "800px" }}>
            <p
              className="fw-bold mb-2"
              style={{
                color: gold,
                letterSpacing: "4px",
                fontSize: "0.85rem",
              }}
            >
              JOIN US
            </p>

            <h2 className="display-5 fw-bold mb-3">
              Upcoming Events
            </h2>

            <p className="lead" style={{ color: "#dce8f2" }}>
              Stay connected with our upcoming church activities.
            </p>
          </div>

          {events.length === 0 ? (
            <div
              className="text-center p-5 rounded-4 mx-auto"
              style={{
                maxWidth: "800px",
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,209,102,.3)",
              }}
            >
              <div className="display-5 mb-3">📅</div>
              <h3 className="h5 fw-bold">No upcoming events yet.</h3>
            </div>
          ) : (
            <div
              className="table-responsive rounded-4 overflow-hidden"
              style={{
                boxShadow: "0 12px 30px rgba(0,0,0,.2)",
              }}
            >
              <table className="table table-dark table-hover align-middle mb-0">
                <thead>
                  <tr
                    style={{
                      background: gold,
                      color: navy,
                    }}
                  >
                    <th className="p-3">Date</th>
                    <th className="p-3">Event</th>
                    <th className="p-3">Location</th>
                  </tr>
                </thead>

                <tbody>
                  {events.map((event, index) => (
                    <tr key={event.id || index}>
                      <td className="p-3">{event.date}</td>
                      <td className="p-3 fw-bold">{event.name}</td>
                      <td className="p-3">{event.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #f8f9fa, #e8f0f7)",
          color: navy,
        }}
      >
        <div className="container py-5 text-center">
          <p
            className="fw-bold mb-2"
            style={{
              color: darkNavy,
              letterSpacing: "4px",
              fontSize: "0.85rem",
            }}
          >
            CONNECT WITH US
          </p>

          <h2 className="display-5 fw-bold mb-3">
            Let Us Connect in Faith
          </h2>

          <p
            className="lead mx-auto mb-4"
            style={{
              maxWidth: "720px",
              color: "#40566d",
            }}
          >
            Have a question, want to share your thoughts, or need a prayer?
            Our ministry is ready to listen and connect with you.
          </p>

          <div
            className="mx-auto p-5 rounded-4"
            style={{
              ...cardStyle,
              maxWidth: "540px",
            }}
          >
            <div
              className="display-3 mb-3"
              style={{ color: gold }}
            >
              💬
            </div>

            <h3 className="fw-bold">Chat with Admin</h3>

            <p style={{ color: "#dce8f2" }}>
              Send us a message for questions, prayer requests, or fellowship.
            </p>

            <a
              href="#chat"
              className="btn rounded-pill px-4 py-2 fw-bold"
              style={{
                background: gold,
                color: navy,
                border: "none",
              }}
            >
              Send a Message
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        className="py-4 text-center"
        style={{
          background: "#081c2d",
          color: "#dce8f2",
        }}
      >
        <div className="container">
          <h5 className="fw-bold mb-2">
            Shepherd of My Soul
          </h5>

          <p className="mb-2">
            Christian Ministry
          </p>

          <small style={{ color: "#9fb3c8" }}>
            Guided by Faith • United in Love • Serving God
          </small>
        </div>
      </footer>
    </main>
  );
}

export default Body;
=======
            <h3 className="h4 fw-bold">Strong in Faith</h3>

            <p className="mb-0" style={{ color: "#dce8f2" }}>
              Growing together through God's Word, prayer, and worship.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="h-100 p-4 text-center"
            style={darkCardStyle}
          >
            <div
              className="display-4 mb-3"
              style={{ color: "#ffd166" }}
            >
              ♥
            </div>

            <h3 className="h4 fw-bold">One Family</h3>

            <p className="mb-0" style={{ color: "#dce8f2" }}>
              Building a loving and welcoming church community for
              everyone.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="h-100 p-4 text-center"
            style={darkCardStyle}
          >
            <div
              className="display-4 mb-3"
              style={{ color: "#ffd166" }}
            >
              🤝
            </div>

            <h3 className="h4 fw-bold">Ready to Serve</h3>

            <p className="mb-0" style={{ color: "#dce8f2" }}>
              Sharing God's love through kindness, service, and
              compassion.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* OUR MINISTRY */}
  <section
    id="services"
    className="py-5"
    style={{
      background:
        "linear-gradient(135deg, #17365d 0%, #102a43 100%)",
    }}
  >
    <div className="container py-5">
      <div className="text-center mb-5">
        <p style={sectionLabelStyle}>OUR MINISTRY</p>

        <h2 className="display-5 fw-bold mb-3">
          Worship, Learn, and Grow
        </h2>

        <p className="lead mx-auto" style={{ maxWidth: "750px" }}>
          Join us as we worship, learn, and grow together in faith.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div
            className="h-100 p-4 text-center"
            style={{
              ...darkCardStyle,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="display-4 mb-3"
              style={{ color: "#ffd166" }}
            >
              ⛪
            </div>

            <h3 className="h4 fw-bold">Sunday Worship</h3>

            <p style={{ color: "#dce8f2" }}>
              Come and worship with us every Sunday as we celebrate
              God's goodness.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="h-100 p-4 text-center"
            style={{
              ...darkCardStyle,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="display-4 mb-3"
              style={{ color: "#ffd166" }}
            >
              📖
            </div>

            <h3 className="h4 fw-bold">Bible Study</h3>

            <p style={{ color: "#dce8f2" }}>
              Learn more about God's Word and discover how it guides
              our everyday lives.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="h-100 p-4 text-center"
            style={{
              ...darkCardStyle,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="display-4 mb-3"
              style={{ color: "#ffd166" }}
            >
              🙏
            </div>

            <h3 className="h4 fw-bold">Prayer Meeting</h3>

            <p style={{ color: "#dce8f2" }}>
              Spend time in prayer and fellowship with our church
              family.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* BIBLE VERSE */}
  <BibleVerse />

  {/* ANNOUNCEMENTS */}
  <section
    id="announcements"
    className="py-5"
    style={{
      background:
        "linear-gradient(135deg, #eaf2f8 0%, #f8fbfd 100%)",
      color: "#102a43",
    }}
  >
    <div className="container py-5">
      <div className="text-center mb-5">
        <p style={{ ...sectionLabelStyle, color: "#17365d" }}>
          STAY UPDATED
        </p>

        <h2 className="display-5 fw-bold mb-3">
          Announcements
        </h2>

        <p className="lead" style={{ color: "#40566d" }}>
          Read the latest announcements and Bible verses from our
          ministry.
        </p>
      </div>

      {announcements.length === 0 ? (
        <div
          className="text-center p-4 rounded-4"
          style={{
            background: "#ffffff",
            color: "#40566d",
            boxShadow: "0 8px 25px rgba(16,42,67,0.12)",
          }}
        >
          No announcements yet.
        </div>
      ) : (
        <div className="row g-4">
          {announcements.map((announcement, index) => (
            <div
              className="col-md-6"
              key={announcement.id || index}
            >
              <div
                className="h-100 p-4"
                style={{
                  ...darkCardStyle,
                  background:
                    "linear-gradient(145deg, #17365d, #102a43)",
                }}
              >
                <div className="d-flex gap-3">
                  <div
                    className="fs-1"
                    style={{ color: "#ffd166" }}
                  >
                    📢
                  </div>

                  <div>
                    <h3 className="h5 fw-bold">
                      {announcement.title || "Church Announcement"}
                    </h3>

                    <p style={{ color: "#dce8f2" }}>
                      {announcement.message || announcement.text}
                    </p>

                    {announcement.date && (
                      <small style={{ color: "#ffd166" }}>
                        {announcement.date}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>

  {/* EVENTS */}
  <section
    id="events"
    className="py-5"
    style={{
      background:
        "linear-gradient(135deg, #102a43 0%, #17365d 100%)",
    }}
  >
    <div className="container py-5">
      <div className="text-center mb-5">
        <p style={sectionLabelStyle}>JOIN US</p>

        <h2 className="display-5 fw-bold mb-3">
          Upcoming Events
        </h2>

        <p className="lead">
          Stay connected with our upcoming church activities.
        </p>
      </div>

      {events.length === 0 ? (
        <div
          className="text-center p-4 rounded-4"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,209,102,0.3)",
          }}
        >
          No upcoming events yet.
        </div>
      ) : (
        <div
          className="table-responsive rounded-4 overflow-hidden"
          style={{
            boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
          }}
        >
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr style={{ background: "#ffd166", color: "#102a43" }}>
                <th className="p-3">Date</th>
                <th className="p-3">Event</th>
                <th className="p-3">Location</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event, index) => (
                <tr key={event.id || index}>
                  <td className="p-3">{event.date}</td>
                  <td className="p-3 fw-bold">{event.name}</td>
                  <td className="p-3">{event.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </section>

  {/* CONTACT */}
  <section
    id="contact"
    className="py-5"
    style={{
      background:
        "linear-gradient(135deg, #eaf2f8 0%, #dce8f2 100%)",
      color: "#102a43",
    }}
  >
    <div className="container py-5 text-center">
      <p
        style={{
          color: "#17365d",
          fontWeight: "700",
          letterSpacing: "3px",
          fontSize: "0.85rem",
        }}
      >
        CONNECT WITH US
      </p>

      <h2 className="display-5 fw-bold mb-3">
        Let Us Connect in Faith
      </h2>

      <p
        className="lead mx-auto mb-4"
        style={{
          maxWidth: "720px",
          color: "#40566d",
        }}
      >
        Have a question, want to share your thoughts, or need a prayer?
        Our ministry is ready to listen and connect with you.
      </p>

      <div
        className="mx-auto p-5"
        style={{
          ...darkCardStyle,
          maxWidth: "540px",
        }}
      >
        <div
          className="display-3 mb-3"
          style={{ color: "#ffd166" }}
        >
          💬
        </div>

        <h3 className="fw-bold">Chat with Admin</h3>

        <p style={{ color: "#dce8f2" }}>
          Send us a message for questions, prayer requests, or
          fellowship.
        </p>

        <a
          href="#chat"
          className="btn rounded-pill px-4 py-2 fw-bold"
          style={{
            background: "#ffd166",
            color: "#102a43",
            border: "none",
          }}
        >
          Send a Message
        </a>
      </div>
    </div>
  </section>
</main>

);
}

export default Body;
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
