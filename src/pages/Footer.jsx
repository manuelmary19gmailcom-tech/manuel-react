import React from "react";

function Footer() {
  return (
    <footer
      className="text-white pt-5"
      style={{ backgroundColor: "#061b33" }}
    >
      <div className="container">
         <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <h5 className="fw-bold text-warning">
              ✝️ Shepherd of My Soul
            </h5>

            <p className="fw-bold">
              Christian Ministry
            </p>

            <p className="text-light">
              We exist to share Christ's love,
              strengthen faith, and make disciples
              for God's glory.
            </p>

            <div className="d-flex gap-2">
              <a href="#" className="btn btn-outline-light btn-sm">
                f
              </a>

              <a href="#" className="btn btn-outline-light btn-sm">
                ▶
              </a>

              <a href="#" className="btn btn-outline-light btn-sm">
                ◎
              </a>
            </div>
          </div>

      
          <div className="col-md-6 col-lg-3">
            <h5 className="text-warning fw-bold">
              QUICK LINKS
            </h5>

            <ul className="list-unstyled">
              <li>
                <a href="#home" className="text-white text-decoration-none">
                  › Home
                </a>
              </li>

              <li>
                <a href="#about" className="text-white text-decoration-none">
                  › About Us
                </a>
              </li>

              <li>
                <a href="#services" className="text-white text-decoration-none">
                  › Services
                </a>
              </li>

              <li>
                <a href="#events" className="text-white text-decoration-none">
                  › Events
                </a>
              </li>

              <li>
                <a href="#bible" className="text-white text-decoration-none">
                  › Bible Verse
                </a>
              </li>

              <li>
                <a href="#contact" className="text-white text-decoration-none">
                  › Contact
                </a>
              </li>
            </ul>
          </div>

        
          <div className="col-md-6 col-lg-3">
            <h5 className="text-warning fw-bold">
              CONTACT US
            </h5>

            <p> Balugo,Mansalay,Oriental Mindoro</p>
            <p> 0912-345-6789</p>
            <p> shepherdofsoul@gmail.com</p>
            <p>Mon - Sat: 8:00 AM - 5:00 PM</p>
          </div>


          <div className="col-md-6 col-lg-3">
            <h5 className="text-warning fw-bold">
              SERVICE HOURS
            </h5>

            <p>
              Sunday Worship
              <br />
              <small>9:00 AM</small>
            </p>

            <p>
              Bible Study
              <br />
              <small>6:00 PM</small>
            </p>

            <p>
              Praise & Worship
              <br />
              <small>6:00 PM</small>
            </p>
          </div>

        </div>

        <hr className="border-secondary mt-4" />

        <div className="text-center py-3">
          <small>
            © 2026 Shepherd of My Soul Christian Ministry.
            All Rights Reserved. 
          </small>
        </div>

      </div>
    </footer>
  );
}

export default Footer;