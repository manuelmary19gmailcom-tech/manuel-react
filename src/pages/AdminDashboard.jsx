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

  const save = async (type) => {
    setSaving(true);
    setError("");
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
            <div
              className="card border-0 shadow-sm rounded-4 sticky-lg-top"
              style={{ top: 80 }}
            >
              <div className="list-group list-group-flush rounded-4 overflow-hidden">
                {[
                  ["overview", "Dashboard", "speedometer2"],
                  ["announcements", "Announcements", "megaphone"],
                  ["events", "Events", "calendar-event"],
                  ["bibleVerses", "Bible Verses", "book"],
                  ["messages", "Messages", "chat-dots"],
                ].map(([key, label, icon]) => (
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
                      >
                        <div className="card-body p-4 d-flex justify-content-between align-items-center">
                          <div>
                            <div className="text-secondary small">{label}</div>
                            <div className="display-6 fw-bold text-dark">
                              {count}
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
    </div>
  );
}
