import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Header from "./pages/Header";
import Body from "./pages/Body";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMessages from "./pages/AdminMessages";
import Chat from "./pages/Chat";

import { auth } from "./lib/firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  // Admin Google account
  const ADMIN_EMAIL = "manuelgusimary19@gmail.com";

  // Check Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setUserRole("");
        setLoading(false);
        return;
      }

      // Determine role from Google account email
      const role =
        currentUser.email === ADMIN_EMAIL ? "admin" : "user";

      const loggedInUser = {
        uid: currentUser.uid,
        email: currentUser.email,
        username:
          currentUser.displayName || currentUser.email,
        photoURL: currentUser.photoURL,
        role: role,
      };

      setUser(loggedInUser);
      setUserRole(role);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login from Google
  const handleLogin = (firebaseUser) => {
    const role =
      firebaseUser.email === ADMIN_EMAIL ? "admin" : "user";

    const loggedInUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      username:
        firebaseUser.displayName || firebaseUser.email,
      photoURL: firebaseUser.photoURL,
      role: role,
    };

    setUser(loggedInUser);
    setUserRole(role);

    if (role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/user", { replace: true });
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);

      setUser(null);
      setUserRole("");

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Firebase checking
  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div
            className="spinner-border"
            role="status"
            style={{ color: "#17365d" }}
          ></div>

          <p className="mt-3">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          !user ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Navigate
              to={userRole === "admin" ? "/admin" : "/user"}
              replace
            />
          )
        }
      />

      {/* USER PAGE */}
      <Route
        path="/user"
        element={
          user && userRole === "user" ? (
            <>
              <Header onLogout={handleLogout} />
              <Body />
              <Chat />
              <Footer />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          user && userRole === "admin" ? (
            <AdminDashboard
              onMessages={() => navigate("/admin/messages")}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* ADMIN MESSAGES */}
      <Route
        path="/admin/messages"
        element={
          user && userRole === "admin" ? (
            <AdminMessages
              onBack={() => navigate("/admin")}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* DEFAULT */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;