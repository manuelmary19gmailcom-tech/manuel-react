import { useEffect, useMemo, useState } from "react";

const API = "http://localhost:8080/api";
const emptyForms = {
  events: { name: "", date: "", location: "" },
  announcements: { title: "", message: "" },
  bibleVerses: { text: "", reference: "" },
};

export default function AdminDashboard({ user, onMessages, onLogout }) {
  const [active, setActive] = useState("overview");
  const [data, setData] = useState({
    events: [],
    announcements: [],
    bibleVerses: [],
  });
  const [forms, setForms] = useState(emptyForms);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [events, announcements, bibleVerses] = await Promise.all(
        ["events", "announcements", "bible-verses"].map(async (endpoint) => {
          const res = await fetch(`${API}/${endpoint}`);
          if (!res.ok) throw new Error(`Unable to load ${endpoint}.`);
          return res.json();
        }),
      );
      setData({ events, announcements, bibleVerses });
    } catch (err) {
      setError(`${err.message} Make sure the backend is running on port 5000.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(
    () => [
      ["Announcements", data.announcements.length, "bi-megaphone"],
      ["Events", data.events.length, "bi-calendar-event"],
      ["Bible Verses", data.bibleVerses.length, "bi-book"],
    ],
    [data],
  );

  const sectionConfig = {
    events: {
      title: "Events",
      singular: "Event",
      endpoint: "events",
      fields: ["name", "date", "location"],
    },
    announcements: {
      title: "Announcements",
      singular: "Announcement",
      endpoint: "announcements",
      fields: ["title", "message"],
    },
    bibleVerses: {
      title: "Bible Verses",
      singular: "Bible Verse",
      endpoint: "bible-verses",
      fields: ["text", "reference"],
    },
  };

  const startEdit = (type, item) => {
    setEditing({ type, id: item.id });
    const next = { ...emptyForms[type] };
    sectionConfig[type].fields.forEach((field) => {
      next[field] = item[field] || "";
    });
    setForms((current) => ({ ...current, [type]: next }));
    setActive(type);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = (type) => {
    setEditing(null);
    setForms((current) => ({ ...current, [type]: { ...emptyForms[type] } }));
  };

<<<<<<< HEAD
  const save = async (type) => {
    setSaving(true);
    setError("");
=======
  const handleEventSubmit = async (event) => {
    event.preventDefault();

    if (
      !eventForm.name.trim() ||
      !eventForm.date ||
      !eventForm.location.trim()
    ) {
      alert("Please complete the event details.");
      return;
    }

<<<<<<< HEAD
=======
    // EDIT EVENT
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
    if (editingId) {
      const updatedEvents = events.map((item) =>
        item.id === editingId
          ? {
              ...item,
              ...eventForm,
            }
          : item
      );

      saveEvents(updatedEvents);
      alert("Event updated successfully.");
      resetForms();
      return;
    }

<<<<<<< HEAD
=======
    // ADD EVENT - SEND TO EXPRESS BACKEND
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f
    try {
      const config = sectionConfig[type];
      const id = editing?.type === type ? editing.id : null;
      const res = await fetch(
        `${API}/${config.endpoint}${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(forms[type]),
        },
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Save failed.");
      resetForm(type);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (type, id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      const res = await fetch(`${API}/${sectionConfig[type].endpoint}/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Delete failed.");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

<<<<<<< HEAD
  const renderForm = (type) => {
    const config = sectionConfig[type];
    const form = forms[type];
    return (
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 className="h5 fw-bold mb-1">
                {editing?.type === type
                  ? `Edit ${config.singular}`
                  : `Add ${config.singular}`}
              </h3>
              <p className="text-secondary mb-0 small">
                Manage {config.title.toLowerCase()} for the ministry.
              </p>
            </div>
            {editing?.type === type && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => resetForm(type)}
              >
                Cancel
              </button>
            )}
          </div>
          {config.fields.map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label fw-semibold text-capitalize">
                {field === "text" ? "Verse" : field}
              </label>
              {field === "message" || field === "text" ? (
                <textarea
                  className="form-control"
                  rows="4"
                  value={form[field]}
                  onChange={(e) =>
                    setForms((current) => ({
                      ...current,
                      [type]: { ...current[type], [field]: e.target.value },
                    }))
                  }
                  required
                />
              ) : (
                <input
                  className="form-control"
                  type={field === "date" ? "date" : "text"}
                  value={form[field]}
                  onChange={(e) =>
                    setForms((current) => ({
                      ...current,
                      [type]: { ...current[type], [field]: e.target.value },
                    }))
                  }
                  required
                />
              )}
            </div>
          ))}
          <button
            className="btn btn-primary"
            disabled={saving}
            onClick={() => save(type)}
          >
            {saving ? "Saving..." : editing?.type === type ? "Update" : "Add"}
          </button>
        </div>
      </div>
    );
  };

  const renderTable = (type) => {
    const config = sectionConfig[type];
    const items = data[type];
    return (
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-0">
          <div className="p-4 border-bottom">
            <h3 className="h5 fw-bold mb-0">{config.title}</h3>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {config.fields.map((field) => (
                    <th key={field} className="text-capitalize">
                      {field === "text" ? "Verse" : field}
                    </th>
                  ))}
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length ? (
                  items.map((item) => (
                    <tr key={item.id}>
                      {config.fields.map((field) => (
                        <td key={field}>
                          <div
                            className={
                              field === "message" || field === "text"
                                ? "text-truncate"
                                : ""
                            }
                            style={{
                              maxWidth:
                                field === "message" || field === "text"
                                  ? 420
                                  : undefined,
                            }}
                          >
                            {item[field]}
                          </div>
                        </td>
                      ))}
                      <td className="text-end text-nowrap">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => startEdit(type, item)}
                        >
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => remove(type, item.id)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={config.fields.length + 1}
                      className="text-center py-5 text-secondary"
                    >
                      No records yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-shell min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark admin-navbar shadow-sm sticky-top">
        <div className="container-fluid px-3 px-lg-4">
          <a
            className="navbar-brand fw-bold d-flex align-items-center gap-2"
            href="#top"
          >
            <img
              src="/logo.webp"
              width="40"
              height="40"
              className="rounded-circle border border-warning"
              alt=""
            />{" "}
            Shepherd of My Soul{" "}
            <span className="badge bg-warning text-dark">ADMIN</span>
          </a>
          <div className="d-flex align-items-center gap-2">
            <span className="d-none d-md-inline text-white-50 small">
              {user?.name || user?.email}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
              <i className="bi bi-box-arrow-right me-1" />
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container-fluid p-3 p-lg-4" id="top">
        {error && (
          <div className="alert alert-danger d-flex justify-content-between">
            <span>{error}</span>
            <button className="btn-close" onClick={() => setError("")} />
          </div>
        )}
        <div className="row g-4">
          <aside className="col-12 col-lg-3 col-xl-2">
=======
  const handleAnnouncementSubmit = async (event) => {
<<<<<<< HEAD
    event.preventDefault();

    if (
      !announcementForm.title.trim() ||
      !announcementForm.message.trim()
    ) {
      alert("Please complete the announcement details.");
      return;
    }

    if (editingId) {
      const updatedAnnouncements = announcements.map((item) =>
        item.id === editingId
          ? {
              ...item,
              ...announcementForm,
            }
          : item
      );

      saveAnnouncements(updatedAnnouncements);
      alert("Announcement updated successfully.");
      resetForms();
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/announcements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: announcementForm.title,
            message: announcementForm.message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add announcement.");
      }

      const newAnnouncement = {
        ...data.announcement,
        date: new Date().toLocaleDateString(),
      };

      saveAnnouncements([...announcements, newAnnouncement]);

      console.log(data);

      alert("Announcement posted successfully.");
      resetForms();
    } catch (error) {
      console.error("Error adding announcement:", error);
      alert(
        "Failed to post announcement. Please make sure the Express server is running."
      );
    }
  };

  const handleVerseSubmit = async (event) => {
    event.preventDefault();

    if (
      !verseForm.verse.trim() ||
      !verseForm.reference.trim()
    ) {
      alert("Please complete the Bible verse details.");
      return;
    }

    if (editingId) {
      const updatedVerses = bibleVerses.map((item) =>
        item.id === editingId
          ? {
              ...item,
              ...verseForm,
            }
          : item
      );

      saveBibleVerses(updatedVerses);
      alert("Bible verse updated successfully.");
      resetForms();
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/bible-verses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: verseForm.verse,
            reference: verseForm.reference,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add Bible verse."
        );
      }

      const newBibleVerse = {
        ...data.bibleVerse,
        date: new Date().toLocaleDateString(),
      };

      saveBibleVerses([...bibleVerses, newBibleVerse]);

      console.log(data);

      alert("Bible verse added successfully.");
      resetForms();
    } catch (error) {
      console.error("Error adding Bible verse:", error);
      alert(
        "Failed to add Bible verse. Please make sure the Express server is running."
      );
    }
  };
=======
  event.preventDefault();

  if (
    !announcementForm.title.trim() ||
    !announcementForm.message.trim()
  ) {
    alert("Please complete the announcement details.");
    return;
  }

  // EDIT ANNOUNCEMENT
  if (editingId) {
    const updatedAnnouncements = announcements.map((item) =>
      item.id === editingId
        ? {
            ...item,
            ...announcementForm,
          }
        : item
    );

    saveAnnouncements(updatedAnnouncements);
    alert("Announcement updated successfully.");
    resetForms();
    return;
  }

  // ADD ANNOUNCEMENT - SEND TO EXPRESS BACKEND
  try {
    const response = await fetch(
      "http://localhost:5000/api/announcements",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: announcementForm.title,
          message: announcementForm.message,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add announcement.");
    }

    const newAnnouncement = {
      ...data.announcement,
      date: new Date().toLocaleDateString(),
    };

    saveAnnouncements([...announcements, newAnnouncement]);

    console.log(data);

    alert("Announcement posted successfully.");
    resetForms();
  } catch (error) {
    console.error("Error adding announcement:", error);
    alert(
      "Failed to post announcement. Please make sure the Express server is running."
    );
  }
};
  
  const handleVerseSubmit = async (event) => {
  event.preventDefault();

  if (
    !verseForm.verse.trim() ||
    !verseForm.reference.trim()
  ) {
    alert("Please complete the Bible verse details.");
    return;
  }

  // EDIT BIBLE VERSE
  if (editingId) {
    const updatedVerses = bibleVerses.map((item) =>
      item.id === editingId
        ? {
            ...item,
            ...verseForm,
          }
        : item
    );

    saveBibleVerses(updatedVerses);
    alert("Bible verse updated successfully.");
    resetForms();
    return;
  }

  // ADD BIBLE VERSE - SEND TO EXPRESS BACKEND
  try {
    const response = await fetch(
      "http://localhost:5000/api/bible-verses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: verseForm.verse,
          reference: verseForm.reference,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to add Bible verse."
      );
    }

    const newBibleVerse = {
      ...data.bibleVerse,
      date: new Date().toLocaleDateString(),
    };

    saveBibleVerses([...bibleVerses, newBibleVerse]);

    console.log(data);

    alert("Bible verse added successfully.");
    resetForms();
  } catch (error) {
    console.error("Error adding Bible verse:", error);
    alert(
      "Failed to add Bible verse. Please make sure the Express server is running."
    );
  }
};
  
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80

  const editEvent = (item) => {
    setEventForm({
      name: item.name || "",
      date: item.date || "",
      location: item.location || "",
      description: item.description || "",
    });

    setEditingId(item.id);
    setActiveForm("event");
<<<<<<< HEAD

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
=======
    window.scrollTo({ top: 0, behavior: "smooth" });
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
  };

  const editAnnouncement = (item) => {
    setAnnouncementForm({
      title: item.title || "",
      message: item.message || "",
    });

    setEditingId(item.id);
    setActiveForm("announcement");
<<<<<<< HEAD

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
=======
    window.scrollTo({ top: 0, behavior: "smooth" });
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
  };

  const editVerse = (item) => {
    setVerseForm({
      verse: item.verse || "",
      reference: item.reference || "",
    });

    setEditingId(item.id);
    setActiveForm("verse");
<<<<<<< HEAD

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
=======
    window.scrollTo({ top: 0, behavior: "smooth" });
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
  };

  const deleteEvent = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

<<<<<<< HEAD
    const updatedEvents = events.filter(
      (item) => item.id !== id
    );

=======
    const updatedEvents = events.filter((item) => item.id !== id);
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
    saveEvents(updatedEvents);
  };

  const deleteAnnouncement = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmDelete) return;

    const updatedAnnouncements = announcements.filter(
      (item) => item.id !== id
    );

    saveAnnouncements(updatedAnnouncements);
  };

  const deleteVerse = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Bible verse?"
    );

    if (!confirmDelete) return;

    const updatedVerses = bibleVerses.filter(
      (item) => item.id !== id
    );

    saveBibleVerses(updatedVerses);
  };

  return (
<<<<<<< HEAD
    <div
      className="min-vh-100"
      style={{
        background:
          "linear-gradient(135deg, #eef3f8 0%, #f8f9fa 50%, #fff8e6 100%)",
      }}
    >
      {/* HEADER */}
      <header
        className="shadow"
        style={{
          background:
            "linear-gradient(135deg, #102a43 0%, #17365d 100%)",
        }}
      >
        <div className="container-fluid px-3 px-md-5">
          <div className="d-flex justify-content-between align-items-center py-3">

            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex justify-content-center align-items-center rounded-4"
                style={{
                  width: "55px",
                  height: "55px",
                  background: "#ffd166",
                  color: "#17365d",
                  fontSize: "28px",
                  flexShrink: 0,
                }}
              >
                ✝
              </div>

              <div>
                <small
                  className="fw-bold"
                  style={{
                    color: "#ffd166",
                    letterSpacing: "1.5px",
                  }}
                >
                  ADMIN PANEL
                </small>

                <h1 className="h5 text-white fw-bold mb-0">
                  Shepherd of My Soul
                </h1>

                <small className="text-light">
                  Christian Ministry Dashboard
                </small>
              </div>
            </div>

            <button
              type="button"
              className="btn fw-bold px-3 px-md-4"
              onClick={onLogout}
              style={{
                background: "#ffd166",
                color: "#102a43",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Logout
            </button>

          </div>
        </div>
      </header>

      <main className="container-fluid px-3 px-md-5 py-4">

        {/* WELCOME */}
        <section
          className="rounded-4 shadow-lg mb-4 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #17365d 0%, #102a43 100%)",
          }}
        >
          <div className="p-4 p-md-5 text-white">
            <div className="row align-items-center">

              <div className="col-lg-8">
                <span
                  className="badge rounded-pill px-3 py-2 mb-3"
                  style={{
                    background: "#ffd166",
                    color: "#102a43",
                  }}
                >
                  DASHBOARD OVERVIEW
                </span>

                <h2 className="display-6 fw-bold mb-2">
                  Welcome, Admin
                </h2>

                <p className="text-light mb-0 fs-6">
                  Manage your church events, announcements,
                  Bible verses, and messages from one place.
                </p>
              </div>

              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                <div
                  className="d-inline-flex justify-content-center align-items-center rounded-circle"
                  style={{
                    width: "110px",
                    height: "110px",
                    background: "rgba(255,209,102,0.15)",
                    border: "2px solid #ffd166",
                    fontSize: "52px",
=======
    <div className="min-vh-100 bg-light py-4">
      <div className="container-fluid">
        <div className="container">

          {/* ADMIN HEADER */}
          <div className="card border-0 shadow-lg rounded-4 mb-4 overflow-hidden">
>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f
            <div
              className="card border-0 shadow-sm rounded-4 sticky-lg-top"
              style={{ top: 80 }}
            >
<<<<<<< HEAD
              <div className="list-group list-group-flush rounded-4 overflow-hidden">
                {[
                  ["overview", "Dashboard", "speedometer2"],
                  ["announcements", "Announcements", "megaphone"],
                  ["events", "Events", "calendar-event"],
                  ["bibleVerses", "Bible Verses", "book"],
                  ["messages", "Messages", "chat-dots"],
                ].map(([key, label, icon]) => (
=======
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-4 d-flex justify-content-center align-items-center"
                    style={{
                      width: "65px",
                      height: "65px",
                      backgroundColor: "#ffd166",
                      color: "#17365d",
                      fontSize: "36px",
                    }}
                  >
                    ✝
                  </div>

                  <div>
                    <small className="text-warning fw-bold">
                      ADMIN PANEL
                    </small>

                    <h1 className="h3 fw-bold mb-1">
                      Shepherd of My Soul
                    </h1>

                    <p className="mb-0 text-light">
                      Christian Ministry Dashboard
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-warning fw-bold px-4"
                  onClick={onLogout}
                >
                  Logout
                </button>

              </div>
            </div>
          </div>

          {/* WELCOME BANNER */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                <div>
                  <p className="text-warning fw-bold mb-2">
                    WELCOME ADMIN
                  </p>

                  <h2 className="h4 fw-bold text-primary mb-2">
                    Manage Your Church Website
                  </h2>

                  <p className="text-muted mb-0">
                    Add announcements, events, and Bible verses
                    that will appear on the user website.
                  </p>
                </div>

                <div
                  className="rounded-4 d-flex justify-content-center align-items-center"
                  style={{
                    width: "85px",
                    height: "85px",
                    backgroundColor: "#ffd166",
                    color: "#17365d",
                    fontSize: "42px",
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
                  }}
                >
                  📖
                </div>
<<<<<<< HEAD
              </div>

            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="row g-4 mb-4">

          {/* EVENTS */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-0 shadow-sm rounded-4 h-100"
              style={{
                borderTop: "4px solid #17365d",
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small className="text-muted fw-bold">
                      EVENTS
                    </small>

                    <div
                      className="display-6 fw-bold mt-2"
                      style={{ color: "#17365d" }}
                    >
                      {events.length}
                    </div>
                  </div>

                  <div
                    className="rounded-3 d-flex justify-content-center align-items-center"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "#e8eef5",
                      fontSize: "25px",
                    }}
                  >
                    📅
                  </div>
                </div>

                <button
                  type="button"
                  className="btn w-100 mt-3 fw-bold"
                  onClick={() => openForm("event")}
                  style={{
                    background: "#17365d",
                    color: "white",
                    borderRadius: "10px",
                  }}
                >
                  + Add Event
                </button>
=======
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80

              </div>
            </div>
          </div>

<<<<<<< HEAD
          {/* ANNOUNCEMENTS */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-0 shadow-sm rounded-4 h-100"
              style={{
                borderTop: "4px solid #ffd166",
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small className="text-muted fw-bold">
                      ANNOUNCEMENTS
                    </small>

                    <div
                      className="display-6 fw-bold mt-2"
                      style={{ color: "#c99600" }}
                    >
                      {announcements.length}
                    </div>
                  </div>

                  <div
                    className="rounded-3 d-flex justify-content-center align-items-center"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "#fff4cf",
                      fontSize: "25px",
                    }}
                  >
                    📢
                  </div>
                </div>

                <button
                  type="button"
                  className="btn w-100 mt-3 fw-bold"
                  onClick={() => openForm("announcement")}
                  style={{
                    background: "#ffd166",
                    color: "#102a43",
                    borderRadius: "10px",
                  }}
                >
                  + Post Announcement
                </button>

              </div>
            </div>
          </div>

          {/* BIBLE VERSES */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-0 shadow-sm rounded-4 h-100"
              style={{
                borderTop: "4px solid #2c7a7b",
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small className="text-muted fw-bold">
                      BIBLE VERSES
                    </small>

                    <div
                      className="display-6 fw-bold mt-2"
                      style={{ color: "#2c7a7b" }}
                    >
                      {bibleVerses.length}
                    </div>
                  </div>

                  <div
                    className="rounded-3 d-flex justify-content-center align-items-center"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "#e3f4f4",
                      fontSize: "25px",
                    }}
                  >
                    📖
                  </div>
                </div>

                <button
                  type="button"
                  className="btn w-100 mt-3 fw-bold"
                  onClick={() => openForm("verse")}
                  style={{
                    background: "#2c7a7b",
                    color: "white",
                    borderRadius: "10px",
                  }}
                >
                  + Add Bible Verse
                </button>

              </div>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className="card border-0 shadow-sm rounded-4 h-100"
              style={{
                borderTop: "4px solid #198754",
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <small className="text-muted fw-bold">
                      COMMUNICATION
                    </small>

                    <div
                      className="fs-3 fw-bold mt-2"
                      style={{ color: "#198754" }}
                    >
                      Messages
                    </div>
                  </div>

                  <div
                    className="rounded-3 d-flex justify-content-center align-items-center"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "#e5f4eb",
                      fontSize: "25px",
                    }}
                  >
                    💬
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-success w-100 mt-3 fw-bold"
                  onClick={onMessages}
                  style={{ borderRadius: "10px" }}
                >
                  View Messages
                </button>

              </div>
            </div>
          </div>

        </section>

        {/* QUICK ACTIONS */}
        <section className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <div className="mb-4">
              <small
                className="fw-bold"
                style={{
                  color: "#c99600",
                  letterSpacing: "1px",
                }}
              >
                QUICK ACTIONS
              </small>

              <h3
                className="h4 fw-bold mb-0"
                style={{ color: "#17365d" }}
              >
                Manage Website Content
              </h3>
            </div>

            <div className="row g-3">

              <div className="col-12 col-md-4">
                <button
                  type="button"
                  className="btn w-100 p-3 text-start border-0 rounded-3"
                  onClick={() => openForm("event")}
                  style={{
                    background: "#eef3f8",
                    color: "#17365d",
                  }}
                >
                  <div className="fs-3 mb-1">📅</div>

                  <div className="fw-bold">
                    Create Event
                  </div>

                  <small className="text-muted">
                    Add a new church event
                  </small>
                </button>
              </div>

              <div className="col-12 col-md-4">
                <button
                  type="button"
                  className="btn w-100 p-3 text-start border-0 rounded-3"
                  onClick={() => openForm("announcement")}
                  style={{
                    background: "#fff8e1",
                    color: "#8a6800",
                  }}
                >
                  <div className="fs-3 mb-1">📢</div>

                  <div className="fw-bold">
                    Post Announcement
                  </div>

                  <small className="text-muted">
                    Share church updates
                  </small>
                </button>
              </div>

              <div className="col-12 col-md-4">
                <button
                  type="button"
                  className="btn w-100 p-3 text-start border-0 rounded-3"
                  onClick={() => openForm("verse")}
                  style={{
                    background: "#edf8f8",
                    color: "#2c7a7b",
                  }}
                >
                  <div className="fs-3 mb-1">📖</div>

                  <div className="fw-bold">
                    Add Bible Verse
                  </div>

                  <small className="text-muted">
                    Share God's Word
                  </small>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* EVENT FORM */}
        {activeForm === "event" && (
          <section
            className="card border-0 shadow-lg rounded-4 mb-4"
            style={{ borderTop: "5px solid #17365d" }}
          >
            <div className="card-body p-4 p-md-5">

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <small
                    className="fw-bold"
                    style={{ color: "#c99600" }}
                  >
                    EVENT MANAGEMENT
                  </small>

                  <h3
                    className="h4 fw-bold mb-1"
                    style={{ color: "#17365d" }}
                  >
                    {editingId ? "Edit Event" : "Add New Event"}
                  </h3>

                  <p className="text-muted mb-0">
                    Create an event for the church website.
                  </p>
                </div>

                <span className="fs-1">📅</span>
              </div>

              <form onSubmit={handleEventSubmit}>

                <div className="row g-3">

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">
                      Event Name
=======
          {/* STATISTICS */}
          <div className="row g-4 mb-4">

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <div className="fs-1 mb-2">📅</div>

                  <h2 className="fw-bold text-primary">
                    {events.length}
                  </h2>

                  <p className="text-muted mb-3">
                    Total Events
                  </p>

>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f
                  <button
                    key={key}
                    className={`list-group-item list-group-item-action border-0 py-3 ${active === key ? "active" : ""}`}
                    onClick={() =>
                      key === "messages" ? onMessages() : setActive(key)
                    }
                  >
                    <i className={`bi bi-${icon} me-2`} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <main className="col-12 col-lg-9 col-xl-10">
            {active === "overview" && (
              <>
                <div className="mb-4">
                  <h1 className="h2 fw-bold mb-1">Admin Dashboard</h1>
                  <p className="text-secondary mb-0">
                    Manage the ministry content from one place.
                  </p>
                </div>
                <div className="row g-3 mb-4">
                  {stats.map(([label, count, icon]) => (
                    <div className="col-12 col-md-4" key={label}>
                      <button
                        className="card border-0 shadow-sm rounded-4 w-100 text-start"
                        onClick={() =>
                          setActive(
                            label === "Announcements"
                              ? "announcements"
                              : label === "Events"
                                ? "events"
                                : "bibleVerses",
                          )
                        }
<<<<<<< HEAD
                      >
                        <div className="card-body p-4 d-flex justify-content-between align-items-center">
                          <div>
                            <div className="text-secondary small">{label}</div>
                            <div className="display-6 fw-bold text-dark">
                              {count}
=======
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">
                        Event Date
                      </label>

                      <input
                        type="date"
                        className="form-control"
                        value={eventForm.date}
                        onChange={(event) =>
                          setEventForm({
                            ...eventForm,
                            date: event.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold">
                        Location
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Example: Church Hall"
                        value={eventForm.location}
                        onChange={(event) =>
                          setEventForm({
                            ...eventForm,
                            location: event.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold">
                        Description
                      </label>

                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Enter event description"
                        value={eventForm.description}
                        onChange={(event) =>
                          setEventForm({
                            ...eventForm,
                            description: event.target.value,
                          })
                        }
                      ></textarea>
                    </div>

                  </div>

                  <div className="d-flex flex-column flex-sm-row gap-2 mt-4">

                    <button
                      type="submit"
                      className="btn btn-primary fw-bold px-4"
                    >
                      {editingId ? "Update Event" : "Save Event"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      onClick={resetForms}
                    >
                      Cancel
                    </button>

                  </div>
                </form>

              </div>
            </div>
          )}

          {/* ANNOUNCEMENT FORM */}
          {activeForm === "announcement" && (
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h3 className="h4 fw-bold text-primary mb-1">
                      {editingId
                        ? "Edit Announcement"
                        : "Post Announcement"}
                    </h3>

                    <p className="text-muted mb-0">
                      Share important church updates.
                    </p>
                  </div>

                  <span className="fs-2">📢</span>
                </div>

                <form onSubmit={handleAnnouncementSubmit}>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Announcement Title
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
                    </label>

                    <input
                      type="text"
<<<<<<< HEAD
                      className="form-control form-control-lg"
                      placeholder="Example: Sunday Worship"
                      value={eventForm.name}
                      onChange={(event) =>
                        setEventForm({
                          ...eventForm,
                          name: event.target.value,
=======
                      className="form-control"
                      placeholder="Enter announcement title"
                      value={announcementForm.title}
                      onChange={(event) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          title: event.target.value,
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
                        })
                      }
                    />
                  </div>

<<<<<<< HEAD
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold">
                      Event Date
                    </label>

                    <input
                      type="date"
                      className="form-control form-control-lg"
                      value={eventForm.date}
                      onChange={(event) =>
                        setEventForm({
                          ...eventForm,
                          date: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">
                      Location
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Example: Church Hall"
                      value={eventForm.location}
                      onChange={(event) =>
                        setEventForm({
                          ...eventForm,
                          location: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">
                      Description
=======
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Announcement Message
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
                    </label>

                    <textarea
                      className="form-control"
<<<<<<< HEAD
                      rows="4"
                      placeholder="Enter event description"
                      value={eventForm.description}
                      onChange={(event) =>
                        setEventForm({
                          ...eventForm,
                          description: event.target.value,
=======
                      rows="5"
                      placeholder="Enter announcement message"
                      value={announcementForm.message}
                      onChange={(event) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          message: event.target.value,
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
                        })
                      }
                    ></textarea>
                  </div>

<<<<<<< HEAD
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2 mt-4">

                  <button
                    type="submit"
                    className="btn fw-bold px-4"
                    style={{
                      background: "#17365d",
                      color: "white",
                    }}
                  >
                    {editingId ? "Update Event" : "Save Event"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-light border px-4"
                    onClick={resetForms}
                  >
                    Cancel
                  </button>

                </div>

              </form>
            </div>
          </section>
        )}

        {/* ANNOUNCEMENT FORM */}
        {activeForm === "announcement" && (
          <section
            className="card border-0 shadow-lg rounded-4 mb-4"
            style={{ borderTop: "5px solid #ffd166" }}
          >
            <div className="card-body p-4 p-md-5">

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <small
                    className="fw-bold"
                    style={{ color: "#c99600" }}
                  >
                    ANNOUNCEMENT MANAGEMENT
                  </small>

                  <h3
                    className="h4 fw-bold mb-1"
                    style={{ color: "#17365d" }}
                  >
                    {editingId
                      ? "Edit Announcement"
                      : "Post Announcement"}
                  </h3>

                  <p className="text-muted mb-0">
                    Share important church updates.
                  </p>
                </div>

                <span className="fs-1">📢</span>
              </div>

              <form onSubmit={handleAnnouncementSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Announcement Title
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter announcement title"
                    value={announcementForm.title}
                    onChange={(event) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        title: event.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Announcement Message
                  </label>

                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Enter announcement message"
                    value={announcementForm.message}
                    onChange={(event) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        message: event.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2">

                  <button
                    type="submit"
                    className="btn fw-bold px-4"
                    style={{
                      background: "#ffd166",
                      color: "#102a43",
                    }}
                  >
                    {editingId
                      ? "Update Announcement"
                      : "Post Announcement"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-light border px-4"
                    onClick={resetForms}
                  >
                    Cancel
                  </button>

                </div>

              </form>
            </div>
          </section>
        )}

        {/* BIBLE VERSE FORM */}
        {activeForm === "verse" && (
          <section
            className="card border-0 shadow-lg rounded-4 mb-4"
            style={{ borderTop: "5px solid #2c7a7b" }}
          >
            <div className="card-body p-4 p-md-5">

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <small
                    className="fw-bold"
                    style={{ color: "#c99600" }}
                  >
                    BIBLE VERSE MANAGEMENT
                  </small>

                  <h3
                    className="h4 fw-bold mb-1"
                    style={{ color: "#17365d" }}
                  >
                    {editingId
                      ? "Edit Bible Verse"
                      : "Add Bible Verse"}
                  </h3>

                  <p className="text-muted mb-0">
                    Post a Bible verse for the user website.
                  </p>
                </div>

                <span className="fs-1">📖</span>
              </div>

              <form onSubmit={handleVerseSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Bible Verse
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter Bible verse"
                    value={verseForm.verse}
                    onChange={(event) =>
                      setVerseForm({
                        ...verseForm,
                        verse: event.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Bible Reference
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Example: Romans 7:15"
                    value={verseForm.reference}
                    onChange={(event) =>
                      setVerseForm({
                        ...verseForm,
                        reference: event.target.value,
                      })
                    }
                  />
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2">

                  <button
                    type="submit"
                    className="btn fw-bold px-4"
                    style={{
                      background: "#2c7a7b",
                      color: "white",
                    }}
                  >
                    {editingId
                      ? "Update Bible Verse"
                      : "Save Bible Verse"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-light border px-4"
                    onClick={resetForms}
                  >
                    Cancel
                  </button>

                </div>

              </form>
            </div>
          </section>
        )}

        {/* EVENTS */}
        <section className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <small
                  className="fw-bold"
                  style={{ color: "#c99600" }}
                >
                  CONTENT MANAGEMENT
                </small>

                <h2
                  className="h4 fw-bold mb-0"
                  style={{ color: "#17365d" }}
                >
                  Church Events
                </h2>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#17365d",
                  color: "white",
                }}
              >
                {events.length}
              </span>

            </div>

            {events.length === 0 ? (
              <div className="text-center py-5">
                <div className="fs-1 mb-2">📅</div>

                <h5 className="fw-bold">
                  No events yet
                </h5>

                <p className="text-muted mb-0">
                  Add your first church event using the button above.
                </p>
              </div>
            ) : (
              <div className="row g-3">

                {events.map((item) => (
                  <div
                    className="col-12 col-lg-6"
                    key={item.id}
                  >
                    <div
                      className="card border-0 shadow-sm h-100 rounded-4"
                      style={{
                        background: "#f8fafc",
                        borderLeft: "4px solid #17365d",
                      }}
                    >
                      <div className="card-body p-4">

                        <div className="d-flex gap-3">

                          <div
                            className="rounded-3 d-flex justify-content-center align-items-center"
                            style={{
                              width: "48px",
                              height: "48px",
                              background: "#e8eef5",
                              fontSize: "23px",
                              flexShrink: 0,
                            }}
                          >
                            📅
                          </div>

                          <div className="flex-grow-1">

                            <h3
                              className="h5 fw-bold mb-2"
                              style={{ color: "#17365d" }}
                            >
                              {item.name}
                            </h3>

                            <div className="small mb-1">
                              <strong>Date:</strong>{" "}
                              {item.date}
                            </div>

                            <div className="small mb-2">
                              <strong>Location:</strong>{" "}
                              {item.location}
                            </div>

                            {item.description && (
                              <p className="text-muted small mb-3">
                                {item.description}
                              </p>
                            )}

                            <div className="d-flex gap-2">

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => editEvent(item)}
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  deleteEvent(item.id)
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>
        </section>

        {/* ANNOUNCEMENTS */}
        <section className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <small
                  className="fw-bold"
                  style={{ color: "#c99600" }}
                >
                  CONTENT MANAGEMENT
                </small>

                <h2
                  className="h4 fw-bold mb-0"
                  style={{ color: "#17365d" }}
                >
                  Announcements
                </h2>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#ffd166",
                  color: "#102a43",
                }}
              >
                {announcements.length}
              </span>

            </div>

            {announcements.length === 0 ? (
              <div className="text-center py-5">
                <div className="fs-1 mb-2">📢</div>

                <h5 className="fw-bold">
                  No announcements yet
                </h5>

                <p className="text-muted mb-0">
                  Your posted announcements will appear here.
                </p>
              </div>
            ) : (
              <div className="row g-3">

                {announcements.map((item) => (
                  <div
                    className="col-12 col-lg-6"
                    key={item.id}
                  >
                    <div
                      className="card border-0 shadow-sm h-100 rounded-4"
                      style={{
                        background: "#fffdf5",
                        borderLeft: "4px solid #ffd166",
                      }}
                    >
                      <div className="card-body p-4">

                        <div className="d-flex gap-3">

                          <div
                            className="rounded-3 d-flex justify-content-center align-items-center"
                            style={{
                              width: "48px",
                              height: "48px",
                              background: "#fff4cf",
                              fontSize: "23px",
                              flexShrink: 0,
                            }}
                          >
                            📢
                          </div>

                          <div className="flex-grow-1">

                            <h3
                              className="h5 fw-bold mb-2"
                              style={{ color: "#17365d" }}
                            >
                              {item.title}
                            </h3>

                            <p className="text-muted mb-2">
                              {item.message}
                            </p>

                            {item.date && (
                              <small className="text-secondary d-block mb-3">
                                Posted: {item.date}
                              </small>
                            )}

                            <div className="d-flex gap-2">

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  editAnnouncement(item)
                                }
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  deleteAnnouncement(item.id)
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>
        </section>

        {/* BIBLE VERSES */}
        <section className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <small
                  className="fw-bold"
                  style={{ color: "#c99600" }}
                >
                  CONTENT MANAGEMENT
                </small>

                <h2
                  className="h4 fw-bold mb-0"
                  style={{ color: "#17365d" }}
                >
                  Bible Verses
                </h2>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#2c7a7b",
                  color: "white",
                }}
              >
                {bibleVerses.length}
              </span>

            </div>

            {bibleVerses.length === 0 ? (
              <div className="text-center py-5">
                <div className="fs-1 mb-2">📖</div>

                <h5 className="fw-bold">
                  No Bible verses yet
                </h5>

                <p className="text-muted mb-0">
                  Your posted Bible verses will appear here.
                </p>
              </div>
            ) : (
              <div className="row g-3">

                {bibleVerses.map((item) => (
                  <div
                    className="col-12 col-lg-6"
                    key={item.id}
                  >
                    <div
                      className="card border-0 shadow-sm h-100 rounded-4"
                      style={{
                        background: "#f7ffff",
                        borderLeft: "4px solid #2c7a7b",
                      }}
                    >
                      <div className="card-body p-4">

                        <div className="d-flex gap-3">

                          <div
                            className="rounded-3 d-flex justify-content-center align-items-center"
                            style={{
                              width: "48px",
                              height: "48px",
                              background: "#e3f4f4",
                              fontSize: "23px",
                              flexShrink: 0,
                            }}
                          >
                            📖
                          </div>

                          <div className="flex-grow-1">

                            <p
                              className="fst-italic mb-3"
                              style={{
                                color: "#17365d",
                                fontSize: "1.05rem",
                              }}
                            >
                              “{item.verse}”
                            </p>

                            <p className="fw-bold mb-3">
                              — {item.reference}
                            </p>

                            <div className="d-flex gap-2">

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  editVerse(item)
                                }
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  deleteVerse(item.id)
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-4">
          <div
            className="fw-bold"
            style={{ color: "#17365d" }}
          >
            Shepherd of My Soul Christian Ministry
          </div>

          <small className="text-muted">
            Admin Dashboard © 2026
          </small>
        </footer>

      </main>
=======
                  <div className="d-flex flex-column flex-sm-row gap-2">

                    <button
                      type="submit"
                      className="btn btn-warning fw-bold px-4"
                    >
                      {editingId
                        ? "Update Announcement"
                        : "Post Announcement"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      onClick={resetForms}
                    >
                      Cancel
                    </button>

                  </div>

                </form>
              </div>
            </div>
          )}

          {/* BIBLE VERSE FORM */}
          {activeForm === "verse" && (
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h3 className="h4 fw-bold text-primary mb-1">
                      {editingId
                        ? "Edit Bible Verse"
                        : "Add Bible Verse"}
                    </h3>

                    <p className="text-muted mb-0">
                      Post a Bible verse for the user website.
                    </p>
                  </div>

                  <span className="fs-2">📖</span>
                </div>

                <form onSubmit={handleVerseSubmit}>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Bible Verse
                    </label>

                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Enter Bible verse"
                      value={verseForm.verse}
                      onChange={(event) =>
                        setVerseForm({
                          ...verseForm,
                          verse: event.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Bible Reference
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Example: Romans 7:15"
                      value={verseForm.reference}
                      onChange={(event) =>
                        setVerseForm({
                          ...verseForm,
                          reference: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="d-flex flex-column flex-sm-row gap-2">

                    <button
                      type="submit"
                      className="btn btn-info fw-bold px-4"
                    >
                      {editingId
                        ? "Update Bible Verse"
                        : "Save Bible Verse"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      onClick={resetForms}
                    >
                      Cancel
                    </button>

                  </div>

                </form>
              </div>
            </div>
          )}

          {/* EVENTS LIST */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">

              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">

                <div>
                  <small className="text-warning fw-bold">
                    CONTENT MANAGEMENT
                  </small>

                  <h2 className="h4 fw-bold text-primary mb-0">
                    Church Events
                  </h2>
                </div>

                <span className="badge bg-primary rounded-pill fs-6">
                  {events.length}
                </span>

              </div>

              {events.length === 0 ? (
                <div className="alert alert-light border text-center mb-0">
                  📅 No events available yet.
                </div>
              ) : (
                <div className="row g-3">

                  {events.map((item) => (
                    <div
                      className="col-12 col-lg-6"
                      key={item.id}
                    >
                      <div className="card border h-100">
                        <div className="card-body">

                          <div className="d-flex gap-3">

                            <div className="fs-2">📅</div>

                            <div className="flex-grow-1">

                              <h3 className="h5 fw-bold text-primary">
                                {item.name}
                              </h3>

                              <p className="mb-1">
                                <strong>Date:</strong> {item.date}
                              </p>

                              <p className="mb-1">
                                <strong>Location:</strong>{" "}
                                {item.location}
                              </p>

                              {item.description && (
                                <p className="text-muted mb-3">
                                  {item.description}
                                </p>
                              )}

                              <div className="d-flex flex-wrap gap-2">

                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => editEvent(item)}
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => deleteEvent(item.id)}
                                >
                                  Delete
                                </button>

                              </div>

>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f
                            </div>
                          </div>
                          <div className="dashboard-icon">
                            <i className={`bi bi-${icon}`} />
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-4">
                    <h2 className="h5 fw-bold">Quick Actions</h2>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => setActive("announcements")}
                      >
                        <i className="bi bi-plus-lg me-1" />
                        Announcement
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setActive("events")}
                      >
                        <i className="bi bi-plus-lg me-1" />
                        Event
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setActive("bibleVerses")}
                      >
                        <i className="bi bi-plus-lg me-1" />
                        Bible Verse
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={onMessages}
                      >
                        <i className="bi bi-chat-dots me-1" />
                        View Messages
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {active !== "overview" && active !== "messages" && (
              <>
                <div className="mb-4">
                  <h1 className="h2 fw-bold mb-1">
                    {sectionConfig[active].title}
                  </h1>
                  <p className="text-secondary mb-0">
                    Create, update, and remove ministry records.
                  </p>
                </div>
                {renderForm(active)}
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" />
                  </div>
                ) : (
                  renderTable(active)
                )}
              </>
            )}
          </main>
        </div>
      </div>
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
    </div>
  );
}
<<<<<<< HEAD
=======

<<<<<<< HEAD
export default AdminDashboard;
=======
export default AdminDashboard;

>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f
