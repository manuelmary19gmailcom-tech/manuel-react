import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      await updateProfile(result.user, { displayName: name.trim() });
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name: name.trim(),
        email: result.user.email || email.trim(),
        photoURL: result.user.photoURL || "",
        role: "user",
        createdAt: serverTimestamp(),
      });
      navigate("/user", { replace: true });
    } catch (err) {
      const messages = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/network-request-failed":
          "Network error. Check your internet connection.",
      };
      setError(
        messages[err.code] || err.message || "Unable to create account.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                <div className="col-md-5 auth-panel d-flex flex-column justify-content-center p-4 p-lg-5 text-white">
                  <img
                    src="/logo.webp"
                    alt="Shepherd of My Soul"
                    className="rounded-circle border border-3 border-warning mb-4 auth-logo"
                  />
                  <span className="badge bg-warning text-dark align-self-start mb-3">
                    JOIN US
                  </span>
                  <h1 className="h2 fw-bold">Grow With Us</h1>
                  <p className="text-white-50 mb-0">
                    Create your account and stay connected with the ministry.
                  </p>
                </div>
                <div className="col-md-7 bg-white p-4 p-lg-5">
                  <h2 className="h3 fw-bold mb-1">Create Account</h2>
                  <p className="text-secondary mb-4">
                    New accounts are created as <strong>user</strong>.
                  </p>
                  {error && (
                    <div className="alert alert-danger py-2">{error}</div>
                  )}
                  <form onSubmit={submit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Full Name
                      </label>
                      <input
                        className="form-control form-control-lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email</label>
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Password</label>
                      <div className="input-group input-group-lg">
                        <input
                          className="form-control"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          <i
                            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Confirm Password
                      </label>
                      <div className="input-group input-group-lg">
                        <input
                          className="form-control"
                          type={showConfirm ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowConfirm((v) => !v)}
                        >
                          <i
                            className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}
                          />
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-lg w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </form>
                  <p className="text-center text-secondary mt-4 mb-0">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="fw-semibold text-decoration-none"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
