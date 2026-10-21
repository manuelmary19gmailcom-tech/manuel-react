import { useEffect, useState } from "react";
const API = "http://localhost:5000/api/announcements";
export default function Announcement() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);
  return (
    <section id="announcements" className="py-5 bg-light">
      <div className="container py-4">
        <div className="text-center mb-5">
          <p className="section-label">CHURCH UPDATES</p>
          <h2 className="section-title">Announcements</h2>
          <p className="section-description">
            Stay updated with the latest ministry announcements.
          </p>
        </div>
        {items.length === 0 ? (
          <div className="alert alert-light text-center border">
            No announcements available.
          </div>
        ) : (
          <div className="row g-4">
            {items.map((item) => (
              <div className="col-12 col-md-6" key={item.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body p-4">
                    <div className="fs-2 mb-3">📢</div>
                    <h3 className="h5 fw-bold">{item.title}</h3>
                    <p
                      className="text-secondary mb-2"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {item.message}
                    </p>
                    {item.date && (
                      <small className="text-muted">Posted: {item.date}</small>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
