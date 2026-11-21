import { useEffect, useRef, useState } from "react";

// Backend URL.
// Local development: http://localhost:8080  (default)
// To use the Render backend, set VITE_API_URL in your .env file.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API = `${API_BASE}/api/messages`;

export default function ChatPage({ user, onBack, onLogout }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const lastCount = useRef(0);

  const userId = user?.uid || "";
  const name =
    user?.name ||
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Member";

  // LOAD CONVERSATION (oldest -> newest)
  const loadMessages = async () => {
    if (!userId) return;

    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Unable to load messages.");

      const data = await res.json();

      const mine = data
        .filter((item) => String(item.userId) === String(userId))
        .sort((a, b) => a.id - b.id);

      setMessages(mine);
      setError("");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Cannot connect to the server. Please try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadMessages();

    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // AUTO SCROLL WHEN NEW MESSAGE ARRIVES
  useEffect(() => {
    if (messages.length !== lastCount.current) {
      lastCount.current = messages.length;
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // SEND MESSAGE
  const handleSend = async (e) => {
    e?.preventDefault();

    const text = message.trim();
    if (!text || sending) return;

    try {
      setSending(true);
      setError("");

      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name, message: text }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Unable to send message.");

      setMessage("");
      await loadMessages();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ background: "linear-gradient(135deg, #071a2d, #102a43, #17365d)" }}
    >
      {/* NAVBAR */}
      <nav className="navbar navbar-dark shadow-sm" style={{ background: "#081c2d" }}>
        <div className="container-fluid px-3 px-lg-5">
          <button className="btn btn-outline-light" onClick={onBack}>
            <i className="bi bi-arrow-left me-1" />
            Back to Home
          </button>

          <span className="navbar-text fw-semibold" style={{ color: "#ffd166" }}>
            Shepherd of My Soul
          </span>

          <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* CHAT */}
      <main className="container flex-grow-1 py-4" style={{ maxWidth: 820 }}>
        <div className="text-center text-white mb-4">
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{ backgroundColor: "#ffd166", color: "#102a43" }}
          >
            CONNECT WITH US
          </span>
          <h1 className="h2 fw-bold">Chat With Admin</h1>
          <p className="text-white-50 mb-0">
            Send your questions and prayer requests. Our admin will reply here.
          </p>
        </div>

        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          {/* MESSAGES */}
          <div
            className="p-3 p-md-4"
            style={{ height: "55vh", overflowY: "auto", background: "#f4f7fb" }}
          >
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" />
                <p className="text-secondary mt-2 mb-0">Loading conversation...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-secondary py-5">
                <i className="bi bi-chat-heart display-5 d-block mb-3" />
                No messages yet. Say hello to Admin!
              </div>
            ) : (
              messages.map((item) => (
                <div key={item.id}>
                  {/* USER MESSAGE */}
                  <div className="d-flex justify-content-end mb-2">
                    <div style={{ maxWidth: "80%" }}>
                      <div
                        className="px-3 py-2 rounded-4 text-white"
                        style={{
                          background: "#17365d",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          borderBottomRightRadius: 4,
                        }}
                      >
                        {item.message}
                      </div>
                      <small className="text-secondary d-block text-end mt-1">
                        You • {item.date || ""}
                      </small>
                    </div>
                  </div>

                  {/* ADMIN REPLY */}
                  {item.reply ? (
                    <div className="d-flex justify-content-start mb-3">
                      <div style={{ maxWidth: "80%" }}>
                        <div
                          className="px-3 py-2 rounded-4"
                          style={{
                            background: "#ffffff",
                            border: "1px solid #dbe4ee",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            borderBottomLeftRadius: 4,
                          }}
                        >
                          {item.reply}
                        </div>
                        <small className="text-success fw-semibold d-block mt-1">
                          Admin
                        </small>
                      </div>
                    </div>
                  ) : (
                    <small className="text-secondary fst-italic d-block mb-3 text-end">
                      Waiting for Admin reply...
                    </small>
                  )}
                </div>
              ))
            )}

            <div ref={bottomRef} />
          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-danger rounded-0 mb-0 py-2">{error}</div>
          )}

          {/* INPUT */}
          <form onSubmit={handleSend} className="p-3 bg-white border-top">
            <div className="d-flex gap-2 align-items-end">
              <textarea
                className="form-control"
                rows="2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write your message or prayer request... (Enter to send)"
                style={{ resize: "none" }}
              />

              <button
                className="btn btn-primary px-4"
                type="submit"
                disabled={sending || !message.trim()}
              >
                {sending ? "..." : <i className="bi bi-send" />}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}