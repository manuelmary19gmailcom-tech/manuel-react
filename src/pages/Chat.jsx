import { useEffect, useState } from "react";
const API = "http://localhost:5000/api/messages";
export default function Chat({ user }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState([]);
  const [success, setSuccess] = useState("");
  const load = () =>
    fetch(API)
      .then((r) => r.json())
      .then((data) => setSent(data.filter((item) => item.userId === user?.uid)))
      .catch(() => setSent([]));
  useEffect(() => {
    load();
  }, [user?.uid]);
  const submit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.uid,
        name: user.name || user.email,
        message: message.trim(),
      }),
    });
    if (res.ok) {
      setMessage("");
      setSuccess(
        "Your message has been sent. The admin will reply as soon as possible.",
      );
      load();
    }
  };
  return (
    <section id="contact" className="py-5 chat-section">
      <div className="container py-4">
        <div className="text-center text-white mb-5">
          <span className="badge bg-warning text-dark px-3 py-2 mb-3">
            CONNECT WITH US
          </span>
          <h2 className="display-5 fw-bold">Chat With Admin</h2>
          <p className="lead text-white-50">
            Send questions, messages, or prayer requests to our admin team.
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      className="form-control form-control-lg"
                      value={user?.name || ""}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Message or Prayer Request
                    </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message..."
                      required
                    />
                  </div>
                  <button className="btn btn-primary btn-lg w-100">
                    Send Message <i className="bi bi-send ms-2" />
                  </button>
                </form>
                {success && (
                  <div className="alert alert-success mt-4">{success}</div>
                )}
                <div className="mt-4">
                  {sent.map((item) => (
                    <div key={item.id} className="border rounded-3 p-3 mb-3">
                      <small className="text-secondary">{item.date}</small>
                      <p className="mb-2 mt-2">{item.message}</p>
                      {item.reply ? (
                        <div className="alert alert-success mb-0">
                          <strong>Admin Reply:</strong>
                          <div className="mt-1">{item.reply}</div>
                        </div>
                      ) : (
                        <small className="text-secondary fst-italic">
                          Waiting for admin reply...
                        </small>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
