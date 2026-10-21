import { useEffect, useState } from "react";
const API = "http://localhost:5000/api/bible-verses";
export default function BibleVerse() {
  const [verses, setVerses] = useState([]);
  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setVerses)
      .catch(() => setVerses([]));
  }, []);
  const latest = verses[verses.length - 1];
  return (
    <section id="bible" className="py-5 bible-section">
      <div className="container py-5">
        <div
          className="text-center text-white mx-auto"
          style={{ maxWidth: 900 }}
        >
          <div className="display-4 mb-3">📖</div>
          <p className="section-label text-warning">DAILY INSPIRATION</p>
          <h2 className="display-5 fw-bold">Bible Verse</h2>
          {latest ? (
            <>
              <p className="lead fs-3 mt-4" style={{ lineHeight: 1.7 }}>
                “{latest.text}”
              </p>
              <h3 className="h5 text-warning mt-4">{latest.reference}</h3>
            </>
          ) : (
            <p className="text-white-50 mt-4">
              A new Bible verse will appear here when the church admin posts
              one.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
