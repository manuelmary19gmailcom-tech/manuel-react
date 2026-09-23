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

    // EDIT EVENT
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

    // ADD EVENT - SEND TO EXPRESS BACKEND
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
  

  const editEvent = (item) => {
    setEventForm({
      name: item.name || "",
      date: item.date || "",
      location: item.location || "",
      description: item.description || "",
    });

    setEditingId(item.id);
    setActiveForm("event");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editAnnouncement = (item) => {
    setAnnouncementForm({
      title: item.title || "",
      message: item.message || "",
    });

    setEditingId(item.id);
    setActiveForm("announcement");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editVerse = (item) => {
    setVerseForm({
      verse: item.verse || "",
      reference: item.reference || "",
    });

    setEditingId(item.id);
    setActiveForm("verse");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteEvent = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    const updatedEvents = events.filter((item) => item.id !== id);
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
    <div className="min-vh-100 bg-light py-4">
      <div className="container-fluid">
        <div className="container">

          {/* ADMIN HEADER */}
          <div className="card border-0 shadow-lg rounded-4 mb-4 overflow-hidden">
            <div
              className="card-body text-white p-4"
              style={{
                background:
                  "linear-gradient(135deg, #17365d, #102a43)",
              }}
            >
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
                  }}
                >
                  📖
                </div>

              </div>
            </div>
          </div>

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

                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => openForm("event")}
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <div className="fs-1 mb-2">📢</div>

                  <h2 className="fw-bold text-warning">
                    {announcements.length}
                  </h2>

                  <p className="text-muted mb-3">
                    Announcements
                  </p>

                  <button
                    type="button"
                    className="btn btn-warning w-100"
                    onClick={() => openForm("announcement")}
                  >
                    Post Announcement
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <div className="fs-1 mb-2">📖</div>

                  <h2 className="fw-bold text-info">
                    {bibleVerses.length}
                  </h2>

                  <p className="text-muted mb-3">
                    Bible Verses
                  </p>

                  <button
                    type="button"
                    className="btn btn-info w-100"
                    onClick={() => openForm("verse")}
                  >
                    Add Bible Verse
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <div className="fs-1 mb-2">💬</div>

                  <h2 className="fw-bold text-success">
                    Chat
                  </h2>

                  <p className="text-muted mb-3">
                    User messages
                  </p>

                  <button
                    type="button"
                    className="btn btn-success w-100"
                    onClick={onMessages}
                  >
                    View Messages
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* EVENT FORM */}
          {activeForm === "event" && (
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h3 className="h4 fw-bold text-primary mb-1">
                      {editingId ? "Edit Event" : "Add New Event"}
                    </h3>

                    <p className="text-muted mb-0">
                      Create an event for the church website.
                    </p>
                  </div>

                  <span className="fs-2">📅</span>
                </div>

                <form onSubmit={handleEventSubmit}>
                  <div className="row g-3">

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">
                        Event Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
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
                    </label>

                    <input
                      type="text"
                      className="form-control"
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

                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>
          </div>

          {/* ANNOUNCEMENTS LIST */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">

              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">

                <div>
                  <small className="text-warning fw-bold">
                    CONTENT MANAGEMENT
                  </small>

                  <h2 className="h4 fw-bold text-primary mb-0">
                    Announcements
                  </h2>
                </div>

                <span className="badge bg-warning text-dark rounded-pill fs-6">
                  {announcements.length}
                </span>

              </div>

              {announcements.length === 0 ? (
                <div className="alert alert-light border text-center mb-0">
                  📢 No announcements posted yet.
                </div>
              ) : (
                <div className="row g-3">

                  {announcements.map((item) => (
                    <div
                      className="col-12 col-lg-6"
                      key={item.id}
                    >
                      <div className="card border h-100">
                        <div className="card-body">

                          <div className="d-flex gap-3">

                            <div className="fs-2">📢</div>

                            <div className="flex-grow-1">

                              <h3 className="h5 fw-bold text-primary">
                                {item.title}
                              </h3>

                              <p className="text-muted">
                                {item.message}
                              </p>

                              {item.date && (
                                <small className="text-secondary d-block mb-3">
                                  Posted: {item.date}
                                </small>
                              )}

                              <div className="d-flex flex-wrap gap-2">

                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() =>
                                    editAnnouncement(item)
                                  }
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm"
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
          </div>

          {/* BIBLE VERSES LIST */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">

              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">

                <div>
                  <small className="text-warning fw-bold">
                    CONTENT MANAGEMENT
                  </small>

                  <h2 className="h4 fw-bold text-primary mb-0">
                    Bible Verses
                  </h2>
                </div>

                <span className="badge bg-info text-dark rounded-pill fs-6">
                  {bibleVerses.length}
                </span>

              </div>

              {bibleVerses.length === 0 ? (
                <div className="alert alert-light border text-center mb-0">
                  📖 No Bible verses posted yet.
                </div>
              ) : (
                <div className="row g-3">

                  {bibleVerses.map((item) => (
                    <div
                      className="col-12 col-lg-6"
                      key={item.id}
                    >
                      <div className="card border h-100">
                        <div className="card-body">

                          <div className="d-flex gap-3">

                            <div className="fs-2">📖</div>

                            <div className="flex-grow-1">

                              <p className="fst-italic text-primary fs-5">
                                “{item.verse}”
                              </p>

                              <p className="fw-bold mb-3">
                                — {item.reference}
                              </p>

                              <div className="d-flex flex-wrap gap-2">

                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => editVerse(item)}
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => deleteVerse(item.id)}
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
          </div>

          {/* FOOTER */}
          <div className="text-center text-muted py-3">
            <small>
              Shepherd of My Soul Christian Ministry © 2026
            </small>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

