import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // EMAIL LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      console.log("EMAIL LOGIN SUCCESS");
      console.log("UID:", result.user.uid);
      console.log("EMAIL:", result.user.email);

      onLogin(result.user);
    } catch (error) {
      console.error(error);

      if (error.code === "auth/invalid-credential") {
        setError("Incorrect email or password.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError(`Login failed: ${error.code}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // CREATE ACCOUNT
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = result.user;

      await updateProfile(user, {
        displayName: name.trim(),
      });

      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email,
        photoURL: user.photoURL || "",
        role: "user",
        createdAt: serverTimestamp(),
      });

      console.log("ACCOUNT CREATED");
      console.log("UID:", user.uid);
      console.log("NAME:", name);
      console.log("EMAIL:", user.email);
      console.log("ROLE: user");

      alert("Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsCreateAccount(false);
    } catch (error) {
      console.error("CREATE ACCOUNT ERROR:", error);

      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else if (error.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else if (error.code === "permission-denied") {
        setError("Account created, but user information could not be saved.");
      } else {
        setError(`Create account failed: ${error.code}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      googleProvider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, googleProvider);

      console.log("GOOGLE LOGIN SUCCESS");
      console.log("GOOGLE UID:", result.user.uid);
      console.log("GOOGLE EMAIL:", result.user.email);
      console.log("GOOGLE NAME:", result.user.displayName);

      onLogin(result.user);
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR:", error);

      if (error.code === "auth/popup-closed-by-user") {
        setError("Google login was cancelled.");
      } else if (error.code === "auth/popup-blocked") {
        setError("Please allow pop-ups for this website.");
      } else if (error.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else if (error.code === "auth/cancelled-popup-request") {
        setError("Google login request was cancelled.");
      } else {
        setError(`Google login failed: ${error.code}`);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // SWITCH LOGIN / CREATE ACCOUNT
  const switchMode = () => {
    setIsCreateAccount(!isCreateAccount);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(7,25,43,0.97), rgba(23,54,93,0.94)), url('/logo.webp') center/cover no-repeat",
      }}
    >
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "420px",
          height: "420px",
          background:
            "radial-gradient(circle, rgba(255,209,102,0.13), transparent 70%)",
          top: "-210px",
          right: "-150px",
        }}
      />

      <div
        className="position-absolute rounded-circle"
        style={{
          width: "380px",
          height: "380px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)",
          bottom: "-210px",
          left: "-150px",
        }}
      />

      <div
        className="position-absolute"
        style={{
          width: "130px",
          height: "3px",
          backgroundColor: "#ffd166",
          top: "10%",
          left: "6%",
          borderRadius: "20px",
          opacity: 0.7,
        }}
      />

      <div
        className="position-absolute"
        style={{
          width: "90px",
          height: "3px",
          backgroundColor: "#ffd166",
          bottom: "10%",
          right: "6%",
          borderRadius: "20px",
          opacity: 0.6,
        }}
      />

      <div
        className="container position-relative py-4"
        style={{ zIndex: 2 }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
            <div className="text-center mb-3">
              <div
                className="mx-auto mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "78px",
                  height: "78px",
                  borderRadius: "50%",
                  backgroundColor: "#ffd166",
                  border: "4px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/logo.webp"
                  alt="Shepherd of My Soul"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#ffffff",
                  fontSize: "24px",
                  letterSpacing: "0.4px",
                }}
              >
                Shepherd of My Soul
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#ffd166",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  fontWeight: "600",
                }}
              >
                CHRISTIAN MINISTRY
              </p>
            </div>

            <div
              className="rounded-4 p-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.98)",
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: "0 20px 55px rgba(0,0,0,0.35)",
              }}
            >
              <div className="text-center mb-3">
                <h3
                  className="fw-bold mb-1"
                  style={{ color: "#102a43", fontSize: "25px" }}
                >
                  {isCreateAccount ? "Create Account" : "Sign In"}
                </h3>

                <p className="text-secondary mb-0">
                  {isCreateAccount
                    ? "Create your account to get started"
                    : "Sign in to continue to your account"}
                </p>
              </div>

              {error && (
                <div className="alert alert-danger py-2">{error}</div>
              )}

              <form onSubmit={isCreateAccount ? handleCreateAccount : handleLogin}>
                {isCreateAccount && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {isCreateAccount && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn w-100 fw-bold rounded-3"
                  disabled={loading || googleLoading}
                  style={{
                    height: "50px",
                    background: "linear-gradient(135deg, #17365d, #102a43)",
                    color: "#ffffff",
                    border: "none",
                    fontSize: "16px",
                  }}
                >
                  {loading
                    ? "Please wait..."
                    : isCreateAccount
                      ? "Create Account"
                      : "Sign In"}
                </button>
              </form>

              {!isCreateAccount && (
                <>
                  <div className="d-flex align-items-center my-3">
                    <hr className="flex-grow-1" />
                    <span className="px-3 text-secondary small">OR</span>
                    <hr className="flex-grow-1" />
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-dark w-100 rounded-3"
                    onClick={handleGoogleLogin}
                    disabled={loading || googleLoading}
                    style={{ height: "50px" }}
                  >
                    {googleLoading
                      ? "Connecting to Google..."
                      : "G  Continue with Google"}
                  </button>
                </>
              )}

              <div className="text-center mt-3">
                <span className="text-secondary small">
                  {isCreateAccount
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </span>
                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-0 ms-1"
                  onClick={switchMode}
                  style={{ color: "#17365d", fontWeight: "700" }}
                >
                  {isCreateAccount ? "Sign In" : "Create Account"}
                </button>
              </div>

              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  onClick={() => navigate("/")}
                  style={{ color: "#17365d" }}
                >
                  ← Back to Home
                </button>
              </div>
            </div>

            <p
              className="text-center mt-3 small"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Guided by Faith • United in Love • Serving God
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
