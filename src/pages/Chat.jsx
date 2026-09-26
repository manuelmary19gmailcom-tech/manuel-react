import React, { useEffect, useState } from "react";

function Chat() {
const [name, setName] = useState("");
const [message, setMessage] = useState("");
const [sentMessages, setSentMessages] = useState([]);
const [success, setSuccess] = useState("");

const loadMessages = () => {
const savedMessages =
JSON.parse(localStorage.getItem("churchMessages")) || [];
<<<<<<< HEAD
=======

>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
const currentUserName =
  localStorage.getItem("currentUserName") || "";

const userMessages = savedMessages.filter(
  (item) => item.name === currentUserName
);

setSentMessages(userMessages);

if (userMessages.length > 0) {
  setName(currentUserName);
}

};

useEffect(() => {
loadMessages();

const interval = setInterval(loadMessages, 1000);

window.addEventListener("storage", loadMessages);

return () => {
  clearInterval(interval);
  window.removeEventListener("storage", loadMessages);
};

}, []);

const handleSubmit = (e) => {
e.preventDefault();

if (!name.trim() || !message.trim()) {
  return;
}

const savedMessages =
  JSON.parse(localStorage.getItem("churchMessages")) || [];

const newMessage = {
  id: Date.now(),
  name: name.trim(),
  message: message.trim(),
  reply: "",
  date: new Date().toLocaleString(),
};

const updatedMessages = [...savedMessages, newMessage];

localStorage.setItem(
  "churchMessages",
  JSON.stringify(updatedMessages)
);

localStorage.setItem("currentUserName", name.trim());

setSentMessages((prev) => [...prev, newMessage]);

setSuccess(
  "Your message has been sent. The admin will reply as soon as possible."
);

setMessage("");

};

return (
<section
id="contact"
className="py-5"
style={{
background:
"linear-gradient(135deg, #071a2d, #102a43, #17365d)",
}}
> <div className="container py-4"> <div className="text-center text-white mb-5">
<span
className="badge rounded-pill px-3 py-2 mb-3"
style={{
backgroundColor: "#ffd166",
color: "#102a43",
}}
>
CONNECT WITH US </span>


      <h2 className="display-5 fw-bold">
        Chat With Admin
      </h2>

      <p className="lead text-white-50 mx-auto">
        You can send us your questions, messages, and prayer requests.
        Our admin team will read your message and reply to you.
      </p>
    </div>

    <div className="row g-4 align-items-stretch">
      <div className="col-lg-5">
        <div
          className="card h-100 border-0 shadow-lg rounded-4"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,209,102,.2), rgba(255,255,255,.08))",
          }}
        >
          <div className="card-body p-4 p-md-5 text-white">
            <div
              className="rounded-4 d-flex align-items-center justify-content-center mb-4"
              style={{
                width: "70px",
                height: "70px",
                backgroundColor: "#ffd166",
                color: "#102a43",
                fontSize: "34px",
              }}
            >
              ✉
            </div>

            <h3
              className="fw-bold mb-3"
              style={{ color: "#ffd166" }}
            >
              We Are Here to Listen
            </h3>

            <p className="text-white-50">
              Whether you have a question, need encouragement, or want
              to request a prayer, feel free to send us a message.
            </p>

            <div className="border-top border-bottom border-warning py-3 my-4">
              <p className="fst-italic mb-0">
                A kind message can bring hope, comfort, and encouragement
                to someone who needs it.
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span
                className="rounded-pill"
                style={{
                  width: "30px",
                  height: "4px",
                  backgroundColor: "#ffd166",
                }}
              ></span>

              <span
                className="fw-semibold"
                style={{ color: "#ffd166" }}
              >
                Shepherd of My Soul Christian Ministry
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-7">
        <div className="card border-0 shadow-lg rounded-4 h-100">
          <div className="card-body p-4 p-md-5">
            <div className="mb-4">
              <h3 className="fw-bold text-dark">
                Send a Message
              </h3>

              <p className="text-secondary mb-0">
                Enter your name and message below.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Message or Prayer Request
                </label>

                <textarea
                  className="form-control"
                  rows="6"
                  placeholder="Write your message or prayer request..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
              >
                Send Message <span className="ms-2">→</span>
              </button>
            </form>

            {success && (
              <div className="alert alert-success mt-4 mb-0">
                {success}
              </div>
            )}

            {sentMessages.length > 0 && (
              <div className="mt-4">
                <h5 className="fw-bold text-dark">
                  Your Messages
                </h5>

                {sentMessages.map((item) => (
                  <div
                    key={item.id}
                    className="bg-light border-start border-warning border-4 rounded p-3 mb-3"
                  >
                    <small className="text-secondary d-block mb-2">
                      {item.date}
                    </small>

                    <p className="mb-2 text-dark">
                      {item.message}
                    </p>

                    {item.reply ? (
                      <div className="alert alert-success mb-0">
                        <strong>Admin Reply:</strong>

                        <p className="mb-0 mt-2">
                          {item.reply}
                        </p>
                      </div>
                    ) : (
                      <p className="text-secondary fst-italic mb-0">
                        Waiting for admin reply...
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

);
}

export default Chat;
