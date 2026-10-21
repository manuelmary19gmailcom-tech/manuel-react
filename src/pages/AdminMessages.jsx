import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/messages";

export default function AdminMessages({ onBack, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to load messages.");
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const reply = async (id, value) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to save reply.");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Unable to delete message.");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark admin-navbar shadow-sm">
        <div className="container-fluid px-3 px-lg-5">
          <button className="btn btn-outline-light" onClick={onBack}>
            <i className="bi bi-arrow-left me-1" />
            Dashboard
          </button>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="container py-4 py-lg-5">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-4">
          <h1 className="h2 fw-bold">Messages from Members</h1>
          <p className="text-secondary">
            Read questions, messages, and prayer requests and send replies.
          </p>
        </div>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
          </div>
        ) : messages.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5 text-secondary">
              <i className="bi bi-chat-square-text display-5 d-block mb-3" />
              No messages yet.
            </div>
          </div>
        ) : (
          messages
            .slice()
            .reverse()
            .map((item) => (
              <MessageCard
                key={item.id}
                item={item}
                onReply={reply}
                onDelete={remove}
              />
            ))
        )}
      </main>
    </div>
  );
}

function MessageCard({ item, onReply, onDelete }) {
  const [value, setValue] = useState(item.reply || "");
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between gap-3">
          <div>
            <h2 className="h5 fw-bold mb-1">{item.name || "Member"}</h2>
            <small className="text-secondary">{item.date || ""}</small>
          </div>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(item.id)}
          >
            <i className="bi bi-trash" />
          </button>
        </div>
        <div
          className="bg-light border-start border-warning border-4 rounded p-3 my-3"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {item.message}
        </div>
        <label className="form-label fw-semibold">Admin Reply</label>
        <textarea
          className="form-control"
          rows="3"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write your reply..."
        />
        <div className="mt-2 d-flex justify-content-between align-items-center">
          <small className="text-secondary">
            {item.reply ? "Reply saved" : "No reply yet"}
          </small>
          <button
            className="btn btn-primary"
            onClick={() => onReply(item.id, value)}
          >
            Save Reply
          </button>
        </div>
      </div>
    </div>
  );
}
