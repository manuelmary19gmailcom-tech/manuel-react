import React, { useEffect, useState } from "react";

function AdminMessages({ onBack, onLogout }) {
  const [messages, setMessages] = useState([]);

  const loadMessages = () => {
    try {
      const savedMessages =
        JSON.parse(localStorage.getItem("churchMessages")) || [];

      setMessages(savedMessages);
    } catch (error) {
      console.error("Error loading messages:", error);
      setMessages([]);
    }
  };

  useEffect(() => {
    loadMessages();

    const interval = setInterval(loadMessages, 1000);

    window.addEventListener("storage", loadMessages);
    window.addEventListener("churchMessagesUpdated", loadMessages);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", loadMessages);
      window.removeEventListener("churchMessagesUpdated", loadMessages);
    };
  }, []);

  const handleReply = (id, replyText) => {
    const updatedMessages = messages.map((item) =>
      item.id === id
        ? {
            ...item,
            reply: replyText,
          }
        : item
    );

    localStorage.setItem(
      "churchMessages",
      JSON.stringify(updatedMessages)
    );

    setMessages(updatedMessages);
  };

  const handleDelete = (id) => {
    const updatedMessages = messages.filter((item) => item.id !== id);

    localStorage.setItem(
      "churchMessages",
      JSON.stringify(updatedMessages)
    );

    setMessages(updatedMessages);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Dashboard
        </button>

        <button style={styles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </div>

      <div style={styles.container}>
        <h1 style={styles.title}>Messages from Members</h1>
        <p style={styles.subtitle}>
          Read messages and prayer requests sent by church members.
        </p>

        {messages.length === 0 ? (
          <div style={styles.empty}>
            No messages yet.
          </div>
        ) : (
          messages
            .slice()
            .reverse()
            .map((item) => (
              <MessageCard
                key={item.id}
                item={item}
                onReply={handleReply}
                onDelete={handleDelete}
              />
            ))
        )}
      </div>
    </div>
  );
}

function MessageCard({ item, onReply, onDelete }) {
  const [reply, setReply] = useState(item.reply || "");

  const saveReply = () => {
    onReply(item.id, reply);
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <div>
          <h3 style={styles.name}>{item.name}</h3>
          <p style={styles.date}>{item.date}</p>
        </div>

        <button
          style={styles.deleteButton}
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>

      <div style={styles.messageBox}>
        {item.message}
      </div>

      <label style={styles.label}>Reply to member</label>

      <textarea
        style={styles.textarea}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write your reply..."
      ></textarea>

      <button style={styles.replyButton} onClick={saveReply}>
        Save Reply
      </button>

      {item.reply && (
        <div style={styles.savedReply}>
          <strong>Saved Reply:</strong>
          <p>{item.reply}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    paddingBottom: "50px",
  },

  header: {
    background: "#102a43",
    padding: "20px 6%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    background: "#ffd166",
    color: "#102a43",
    border: "none",
    borderRadius: "8px",
    padding: "11px 18px",
    cursor: "pointer",
    fontWeight: "700",
  },

  logoutButton: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "11px 18px",
    cursor: "pointer",
    fontWeight: "700",
  },

  container: {
    width: "90%",
    maxWidth: "1000px",
    margin: "40px auto",
  },

  title: {
    color: "#102a43",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#52606d",
    marginBottom: "30px",
  },

  empty: {
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    textAlign: "center",
    color: "#52606d",
  },

  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "25px",
    marginBottom: "20px",
    boxShadow: "0 5px 20px rgba(16, 42, 67, 0.08)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
  },

  name: {
    color: "#102a43",
    margin: 0,
  },

  date: {
    color: "#829ab1",
    fontSize: "13px",
    marginTop: "5px",
  },

  deleteButton: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    padding: "8px 12px",
    cursor: "pointer",
  },

  messageBox: {
    background: "#f4f7fb",
    borderLeft: "4px solid #ffd166",
    padding: "15px",
    margin: "20px 0",
    color: "#243b53",
    whiteSpace: "pre-wrap",
  },

  label: {
    display: "block",
    color: "#102a43",
    fontWeight: "700",
    marginBottom: "8px",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    resize: "vertical",
    border: "1px solid #bcccdc",
    borderRadius: "8px",
    padding: "12px",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },

  replyButton: {
    marginTop: "12px",
    background: "#17365d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "11px 18px",
    cursor: "pointer",
    fontWeight: "700",
  },

  savedReply: {
    marginTop: "18px",
    padding: "15px",
    background: "#e8f5e9",
    borderRadius: "8px",
    color: "#245b35",
  },
};

export default AdminMessages;