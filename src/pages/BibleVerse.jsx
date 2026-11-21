
import { useEffect, useState } from "react";

const API = "http://localhost:8080/api/bible-verses";

export default function BibleVerse() {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVerses = async () => {
      try {
        const response = await fetch(API);

        if (!response.ok) {
          throw new Error("Failed to load Bible verses.");
        }

        const data = await response.json();

        const verseData = Array.isArray(data)
          ? data
          : Array.isArray(data.bibleVerses)
          ? data.bibleVerses
          : Array.isArray(data.verses)
          ? data.verses
          : [];

        setVerses(verseData);
      } catch (err) {
        console.error("Bible Verse Error:", err);
        setError("Unable to load Bible verses.");
      } finally {
        setLoading(false);
      }
    };

    loadVerses();
  }, []);

  const latest = verses.length > 0 ? verses[verses.length - 1] : null;

  return (
    <section id="bible" className="py-5 bible-section">
      <div className="container py-5">
        <div
          className="text-center text-white mx-auto"
          style={{ maxWidth: 900 }}
        >
          <div className="display-4 mb-3">📖</div>

          <p className="section-label text-warning">
            DAILY INSPIRATION
          </p>

          <h2 className="display-5 fw-bold">Bible Verse</h2>

          {loading ? (
            <p className="text-white-50 mt-4">
              Loading Bible Verse...
            </p>
          ) : error ? (
            <p className="text-warning mt-4">{error}</p>
          ) : latest ? (
            <>
              <p
                className="lead fs-3 mt-4"
                style={{ lineHeight: 1.7 }}
              >
                “{latest.text || latest.verse || latest.verseText}”
              </p>

              <h3 className="h5 text-warning mt-4">
                {latest.reference || latest.ref || latest.book}
              </h3>
            </>
          ) : (
            <p className="text-white-50 mt-4">
              A new Bible verse will appear here when the church admin posts one.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
