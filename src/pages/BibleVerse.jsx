<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from "react";

function BibleVerse() {
const [verses, setVerses] = useState([]);

useEffect(() => {
const loadVerses = () => {
const savedVerses =
JSON.parse(localStorage.getItem("churchBibleVerses")) || [];

  setVerses(savedVerses);
};

loadVerses();

const interval = setInterval(loadVerses, 1000);

return () => clearInterval(interval);

}, []);

const latestVerse = verses[verses.length - 1];

return (
<section
id="bible"
className="position-relative overflow-hidden text-white"
style={{
padding: "120px 20px",
background:
"linear-gradient(135deg, rgba(8, 27, 48, 0.98), rgba(16, 42, 67, 0.96)), url('/logo.webp') center / cover no-repeat",
}}
>
<div
className="position-absolute top-0 start-0 w-100 h-100"
style={{
background: "rgba(8, 27, 48, 0.25)",
pointerEvents: "none",
}}
></div>

<<<<<<< HEAD
=======
```
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
  <div className="container position-relative z-2">
    <div className="row justify-content-center">
      <div className="col-12">
>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f
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
