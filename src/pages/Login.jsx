import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { Link, useNavigate } from "react-router-dom";

const messageFor = (error) =>
  ({
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/user-not-found": "No account was found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/popup-closed-by-user":
      "Google sign-in was closed before it finished.",
    "auth/popup-blocked": "Your browser blocked the Google sign-in popup.",
  })[error?.code] ||
  error?.message ||
  "Unable to sign in.";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      setError(messageFor(err));
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(messageFor(err));
    } finally {
      setGoogleLoading(false);
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
                    WELCOME
                  </span>
                  <h1 className="h2 fw-bold">Shepherd of My Soul</h1>
                  <p className="text-white-50 mb-0">
                    A place for faith, fellowship, encouragement, and service.
                  </p>
                </div>
                <div className="col-md-7 bg-white p-4 p-lg-5">
                  <div className="mb-4">
                    <h2 className="h3 fw-bold mb-1">Welcome Back</h2>
                    <p className="text-secondary mb-0">
                      Sign in to continue to the ministry.
                    </p>
                  </div>
                  {error && (
                    <div className="alert alert-danger py-2">{error}</div>
                  )}
                  <form onSubmit={submit}>
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
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          <i
                            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                          />
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-lg w-100"
                      disabled={loading || googleLoading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </form>
                  <div className="d-flex align-items-center gap-3 my-4">
                    <hr className="flex-grow-1" />
                    <span className="text-secondary small">OR</span>
                    <hr className="flex-grow-1" />
                  </div>
                  <button
                    className="btn btn-outline-dark btn-lg w-100"
                    type="button"
                    onClick={googleLogin}
                    disabled={loading || googleLoading}
                  >
                    {googleLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-google me-2" />
                        Continue with Google
                      </>
                    )}
                  </button>
                  <p className="text-center text-secondary mt-4 mb-0">
                    New here?{" "}
                    <Link
                      to="/signup"
                      className="fw-semibold text-decoration-none"
                    >
                      Create an account
                    </Link>
                  </p>
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-link text-secondary text-decoration-none"
                      onClick={() => navigate("/")}
                    >
                      ← Back to home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
