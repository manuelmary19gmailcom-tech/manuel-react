import { useEffect, useState } from "react";

// Backend URL.
// Local development: http://localhost:8080  (default)
// To use the Render backend, set VITE_API_URL in your .env file.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API = `${API_BASE}/api/messages`;

// READ SERVER RESPONSE SAFELY
async function readResponse(res) {
  const text = await res.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      `Server returned an invalid response. Status: ${res.status}`
    );
  }

  if (!res.ok) {
    throw new Error(data.message || `Server error: ${res.status}`);
  }

  return data;
}

export default function AdminMessages({ onBack, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const res = await fetch(API);
      const data = await readResponse(res);

      if (!Array.isArray(data)) {
        throw new Error("The messages API did not return a list.");
      }

      setMessages(data);
      setError("");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Cannot connect to the server. Check that your backend is running, your internet connection, and CORS settings."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    const interval = setInterval(load, 5000);

    return () => clearInterval(interval);
  }, []);

  const reply = async (id, value) => {
    if (!value.trim()) {
      setError("Please write a reply first.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reply: value.trim(),
        }),
      });

      await readResponse(res);

      await load();

      alert("Reply sent successfully!");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Cannot connect to the server. Please check your backend."
          : err.message
      );
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      setError("");

      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      await readResponse(res);

      await load();
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Cannot connect to the server. Please check your backend."
          : err.message
      );
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

          <button
            className="btn btn-outline-light btn-sm"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="container py-4 py-lg-5">
        {error && (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={load}
            >
              Try Again
            </button>
          </div>
        )}

        <div className="mb-4">
          <h1 className="h2 fw-bold">Messages from Members</h1>
          <p className="text-secondary">
            Read messages and prayer requests and reply to members.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
            <p className="text-secondary mt-2">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5 text-secondary">
              <i className="bi bi-chat-square-text display-5 d-block mb-3" />
              No messages yet.
            </div>
          </div>
        ) : (
          messages.map((item) => (
            <MessageCard
              key={item.id}
              item={item}
              onReply={reply}
              onDelete={remove}
              saving={saving}
            />
          ))
        )}
      </main>
    </div>
  );
}

function MessageCard({ item, onReply, onDelete, saving }) {
  const [value, setValue] = useState(item.reply || "");

  useEffect(() => {
    setValue(item.reply || "");
  }, [item.reply]);

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between gap-3">
          <div>
            <h2 className="h5 fw-bold mb-1">
              {item.name || "Member"}
            </h2>
            <small className="text-secondary">
              {item.date || ""}
            </small>
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
          <strong>Member Message:</strong>
          <p className="mb-0 mt-1">{item.message}</p>
        </div>

        {item.reply && (
          <div
            className="bg-success bg-opacity-10 rounded p-3 mb-3"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <strong className="text-success">Previous Reply:</strong>
            <p className="mb-0 mt-1">{item.reply}</p>
          </div>
        )}

        <label className="form-label fw-semibold">
          Reply to Member
        </label>

        <textarea
          className="form-control"
          rows="3"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write your reply..."
        />

        <div className="mt-2 d-flex justify-content-between align-items-center">
          <small className="text-secondary">
            {item.reply ? "Reply already sent" : "No reply yet"}
          </small>

          <button
            className="btn btn-primary"
            disabled={saving || !value.trim()}
            onClick={() => onReply(item.id, value)}
          >
            {saving ? "Saving..." : "Send Reply"}
          </button>
        </div>
      </div>
    </div>
  );
}