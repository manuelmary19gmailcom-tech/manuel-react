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
        <div
          className="text-center shadow-lg mx-auto"
          style={{
            maxWidth: "1150px",
            padding: "70px 85px",
            border: "2px solid rgba(255, 209, 102, 0.55)",
            borderRadius: "30px",
            background: "rgba(8, 27, 48, 0.86)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
          }}
        >
          <div className="d-flex align-items-center justify-content-center gap-3 mb-4 flex-wrap">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "20px",
                background: "#ffd166",
                color: "#102a43",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              ✦
            </div>

            <div>
              <span
                className="d-block fw-bold"
                style={{
                  color: "#ffd166",
                  fontSize: "20px",
                  fontWeight: 900,
                  letterSpacing: "4px",
                }}
              >
                VERSE OF THE DAY
              </span>

              <p
                className="mt-2 mb-0 text-white"
                style={{ fontSize: "17px" }}
              >
                A message of faith, hope, and encouragement
              </p>
            </div>
          </div>

          <div
            className="mx-auto mb-5"
            style={{
              width: "130px",
              height: "4px",
              borderRadius: "20px",
              background: "#ffd166",
            }}
          ></div>

          <h2
            className="fw-bold mb-4"
            style={{
              color: "#ffd166",
              fontSize: "42px",
              fontWeight: 900,
              lineHeight: 1.3,
            }}
          >
            {latestVerse?.reference || "God’s Word for Today"}
          </h2>

          <p
            className="mx-auto mb-4 fst-italic fw-semibold"
            style={{
              maxWidth: "1000px",
              color: "#ffffff",
              fontSize: "32px",
              lineHeight: 1.8,
              letterSpacing: "0.3px",
            }}
          >
            “
            {latestVerse?.verse ||
              latestVerse?.text ||
              "Your word is a lamp for my feet and a light for my path."}
            ”
          </p>

          <p
            className="fw-bold mb-4"
            style={{
              color: "#ffd166",
              fontSize: "25px",
              letterSpacing: "1px",
            }}
          >
            {latestVerse?.reference || "Psalm 119:105"}
          </p>

          {!latestVerse && (
            <p
              className="mx-auto mb-0"
              style={{
                maxWidth: "750px",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "17px",
                lineHeight: 1.8,
              }}
            >
              A new Bible verse will appear here when the church admin
              posts one.
            </p>
          )}

          <div
            className="mx-auto mt-4"
            style={{
              width: "85px",
              height: "4px",
              borderRadius: "20px",
              background: "#ffd166",
            }}
          ></div>
        </div>
      </div>
    </div>
  </div>

  <style>
    {`
      @media (max-width: 768px) {
        #bible {
          padding: 80px 15px !important;
        }

        #bible .bible-card {
          padding: 45px 25px !important;
          border-radius: 24px !important;
        }

        #bible .bible-title {
          font-size: 30px !important;
        }

        #bible .bible-text {
          font-size: 23px !important;
          line-height: 1.7 !important;
        }
      }

      @media (max-width: 480px) {
        #bible .bible-card {
          padding: 35px 18px !important;
        }

        #bible .bible-title {
          font-size: 25px !important;
        }

        #bible .bible-text {
          font-size: 20px !important;
          line-height: 1.65 !important;
        }
      }
    `}
  </style>
</section>


);
}

export default BibleVerse;
