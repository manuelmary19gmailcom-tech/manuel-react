import React, { useEffect, useState } from "react";

function Announcement() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const loadAnnouncements = () => {
      const savedAnnouncements = JSON.parse(
        localStorage.getItem("churchAnnouncements") || "[]"
      );

      setAnnouncements(savedAnnouncements);
    };

    loadAnnouncements();

    const interval = setInterval(loadAnnouncements, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="announcements"
      className="announcement-section"
    >
      <div className="container">
        <div className="text-center mb-5">
          <p className="section-label">CHURCH UPDATES</p>
          <h2 className="section-title">Announcements</h2>
          <p className="section-description">
            Stay updated with the latest church announcements.
          </p>
        </div>

        {announcements.length === 0 ? (
          <div className="empty-announcement">
            <span>📢</span>
            <p>No announcements available.</p>
          </div>
        ) : (
          <div className="announcement-list">
            {announcements.map((item) => (
              <div
                className="announcement-card"
                key={item.id}
              >
                <div className="announcement-icon">📢</div>

                <div>
                  <h4>{item.title}</h4>

                  <p>{item.message}</p>

                  {item.date && (
                    <small>
                      Posted: {item.date}
                    </small>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Announcement;