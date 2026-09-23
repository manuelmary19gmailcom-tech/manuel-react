import React, { useEffect, useState } from "react";

function BibleVerse() {
  const [bibleVerses, setBibleVerses] = useState([]);

  useEffect(() => {
    const loadVerses = () => {
      const savedVerses = JSON.parse(
        localStorage.getItem("churchBibleVerses") || "[]"
      );

      setBibleVerses(savedVerses);
    };

    loadVerses();

    const interval = setInterval(loadVerses, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="bible"
      className="bible-section"
    >
      <div className="container">
        <div className="text-center mb-5">
          <p className="section-label">DAILY INSPIRATION</p>
          <h2 className="section-title">Bible Verses</h2>
          <p className="section-description">
            Be encouraged and strengthened by God's Word.
          </p>
        </div>

        {bibleVerses.length === 0 ? (
          <div className="empty-bible">
            <span>📖</span>
            <p>No Bible verses posted yet.</p>
          </div>
        ) : (
          <div className="bible-list">
            {bibleVerses.map((item) => (
              <div className="bible-card" key={item.id}>
                <div className="bible-icon">✝</div>

                <p className="bible-text">
                  “{item.text}”
                </p>

                <h5 className="bible-reference">
                  {item.reference}
                </h5>

                {item.date && (
                  <small className="bible-date">
                    Posted: {item.date}
                  </small>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BibleVerse;