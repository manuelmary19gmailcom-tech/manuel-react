import React, { useEffect, useState } from "react";

function AdminDashboard({ onMessages, onLogout }) {
  const [activeForm, setActiveForm] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [bibleVerses, setBibleVerses] = useState([]);

  const [eventForm, setEventForm] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    message: "",
  });

  const [verseForm, setVerseForm] = useState({
    verse: "",
    reference: "",
  });

  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem("churchEvents")) || [];

    const savedAnnouncements =
      JSON.parse(localStorage.getItem("churchAnnouncements")) || [];

    const savedBibleVerses =
      JSON.parse(localStorage.getItem("churchBibleVerses")) || [];

    setEvents(savedEvents);
    setAnnouncements(savedAnnouncements);
    setBibleVerses(savedBibleVerses);
  }, []);

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem("churchEvents", JSON.stringify(updatedEvents));
  };

  const saveAnnouncements = (updatedAnnouncements) => {
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem(
      "churchAnnouncements",
      JSON.stringify(updatedAnnouncements)
    );
  };

  const saveBibleVerses = (updatedVerses) => {
    setBibleVerses(updatedVerses);
    localStorage.setItem(
      "churchBibleVerses",
      JSON.stringify(updatedVerses)
    );
  };

  const resetForms = () => {
    setEventForm({
      name: "",
      date: "",
      location: "",
      description: "",
    });

    setAnnouncementForm({
      title: "",
      message: "",
    });

    setVerseForm({
      verse: "",
      reference: "",
    });

    setEditingId(null);
    setActiveForm(null);
  };

  const openForm = (formName) => {
    resetForms();
    setActiveForm(formName);
  };

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

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: eventForm.name,
          date: eventForm.date,
          location: eventForm.location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add event.");
      }

      const newEvent = {
        ...data.event,
        description: eventForm.description,
      };

      const updatedEvents = [...events, newEvent];

      saveEvents(updatedEvents);

      alert("Event added successfully!");

      resetForms();
    } catch (error) {
      console.error("Error adding event:", error);
      alert(
        "Failed to add event. Please make sure the Express server is running."
      );
    }
  };

  const handleAnnouncementSubmit = async (event) => {
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

  const editEvent = (item) => {
    setEventForm({
      name: item.name || "",
      date: item.date || "",
      location: item.location || "",
      description: item.description || "",
    });

    setEditingId(item.id);
    setActiveForm("event");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const editAnnouncement = (item) => {
    setAnnouncementForm({
      title: item.title || "",
      message: item.message || "",
    });

    setEditingId(item.id);
    setActiveForm("announcement");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const editVerse = (item) => {
    setVerseForm({
      verse: item.verse || "",
      reference: item.reference || "",
    });

    setEditingId(item.id);
    setActiveForm("verse");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteEvent = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    const updatedEvents = events.filter(
      (item) => item.id !== id
    );

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
                  }}
                >
                  📖
                </div>
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

              </div>
            </div>
          </div>

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
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Example: Sunday Worship"
                      value={eventForm.name}
                      onChange={(event) =>
                        setEventForm({
                          ...eventForm,
                          name: event.target.value,
                        })
                      }
                    />
                  </div>

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
    </div>
  );
}

export default AdminDashboard;