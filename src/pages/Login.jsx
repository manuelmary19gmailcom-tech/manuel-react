import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // Force Google to show account selection
      googleProvider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, googleProvider);

      console.log("Google login successful:", result.user);
      <h1>eszrdtxgjbrzfjgjjzdxcv</h1>

      setLoading(false); 
    } catch (error) {
      console.error("Google login failed:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      setError(`${error.code}: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        backgroundImage:
          "linear-gradient(rgba(8, 25, 43, 0.82), rgba(8, 25, 43, 0.94)), url('/logo.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5">

            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">

                  <div
                    className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "90px",
                      height: "90px",
                      background: "#ffd166",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "48px",
                        color: "#102a43",
                      }}
                    >
                      ✝
                    </span>
                  </div>

                  <h2
                    className="fw-bold"
                    style={{ color: "#102a43" }}
                  >
                    Shepherd of My Soul
                  </h2>

                  <p className="text-secondary">
                    Christian Ministry
                  </p>

                  <p className="text-muted">
                    Sign in with your Google account
                  </p>

                </div>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-lg w-100 rounded-3 fw-semibold"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  style={{
                    backgroundColor: "#17365d",
                    color: "#fff",
                    border: "none",
                    padding: "13px",
                  }}
                >
                  {loading
                    ? "Signing in..."
                    : "Continue with Google"}
                </button>

                <p
                  className="text-center small mt-4 mb-0"
                  style={{ color: "#64748b" }}
                >
                  Guided by Faith • United in Love • Serving God
                </p>

              </div>
            </div>

            <p
              className="text-center mt-3 small"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              © 2026 Shepherd of My Soul Christian Ministry
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;