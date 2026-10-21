<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./lib/firebase.js";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
<<<<<<< HEAD
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./lib/firebase";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./pages/Header";
import Body from "./pages/Body";
import Footer from "./pages/Footer";
import Chat from "./pages/Chat";
=======

>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
import Header from "./pages/Header";
import Body from "./pages/Body";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
<<<<<<< HEAD
import LandingPage from "./pages/LandingPage";
=======
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f
import AdminDashboard from "./pages/AdminDashboard";
import AdminMessages from "./pages/AdminMessages";

<<<<<<< HEAD
function LoadingScreen() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" />
        <div className="mt-3 fw-semibold text-secondary">Loading account...</div>
      </div>
    </div>
  );
}
=======
<<<<<<< HEAD
function AppRoutes() {
  const navigate = useNavigate();
=======
import { auth } from "./lib/firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";
>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f

function ProtectedRoute({ user, role, allowedRole, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (role !== allowedRole) {
    return <Navigate to={role === "admin" ? "/admin" : "/user"} replace />;
  }
  return children;
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setRole("");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);
        let snap = await getDoc(userRef);
        let data = snap.exists() ? snap.data() : null;
        const isGoogle = currentUser.providerData.some(
          (provider) => provider.providerId === "google.com"
        );

        if (!snap.exists()) {
          const profile = {
            uid: currentUser.uid,
            name: currentUser.displayName || currentUser.email || "User",
            email: currentUser.email || "",
            photoURL: currentUser.photoURL || "",
            role: "user",
            createdAt: serverTimestamp(),
          };
          await setDoc(userRef, profile);
          snap = await getDoc(userRef);
          data = snap.data();
        }

        const currentRole = data?.role;
        if (currentRole !== "admin" && currentRole !== "user") {
          await signOut(auth);
          setUser(null);
          setRole("");
          setLoading(false);
          alert("Your account has no valid role. Use exactly: admin or user.");
          if (location.pathname !== "/login") navigate("/login", { replace: true });
          return;
        }

        const profileUpdate = {
          uid: currentUser.uid,
          email: currentUser.email || data?.email || "",
          name: currentUser.displayName || data?.name || currentUser.email || "User",
          photoURL: currentUser.photoURL || data?.photoURL || "",
        };
        if (!data?.createdAt) profileUpdate.createdAt = serverTimestamp();
        await setDoc(userRef, profileUpdate, { merge: true });

        setUser({ ...profileUpdate, role: currentRole });
        setRole(currentRole);
        setLoading(false);
      } catch (error) {
        console.error("Firebase account error:", error);
        await signOut(auth).catch(() => {});
        setUser(null);
        setRole("");
        setLoading(false);
        alert(`Unable to load your account.\n\n${error.message}`);
        navigate("/login", { replace: true });
      }
    });
    return unsubscribe;
  }, [navigate, location.pathname]);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole("");
    navigate("/login", { replace: true });
  };

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? <Navigate to={role === "admin" ? "/admin" : "/user"} replace /> : <LandingPage />
        }
      />
      <Route path="/login" element={user ? <Navigate to={role === "admin" ? "/admin" : "/user"} replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to={role === "admin" ? "/admin" : "/user"} replace /> : <Signup />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute user={user} role={role} allowedRole="user">
            <div className="bg-light min-vh-100">
              <Header user={user} onLogout={logout} />
              <Body />
              <Chat user={user} />
              <Footer />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user} role={role} allowedRole="admin">
            <AdminDashboard user={user} onMessages={() => navigate("/admin/messages")} onLogout={logout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute user={user} role={role} allowedRole="admin">
            <AdminMessages user={user} onBack={() => navigate("/admin")} onLogout={logout} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
<<<<<<< HEAD
=======

function AppRoutes() {
  const navigate = useNavigate();

>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
=======
  // Admin Google account
  const ADMIN_EMAIL = "manuelgusimary19@gmail.com";

  // Check Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
      if (!currentUser) {
        setUser(null);
        setUserRole("");
        setLoading(false);
        return;
      }

<<<<<<< HEAD
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        let userSnap = await getDoc(userDocRef);
        const isGoogleUser = currentUser.providerData.some(
          (provider) => provider.providerId === "google.com"
        );

        if (!userSnap.exists() && isGoogleUser) {
          await setDoc(userDocRef, {
            uid: currentUser.uid,
            name: currentUser.displayName || currentUser.email || "User",
            email: currentUser.email || "",
            photoURL: currentUser.photoURL || "",
            role: "user",
            createdAt: serverTimestamp(),
          });
          userSnap = await getDoc(userDocRef);
        }

        if (!userSnap.exists()) {
          await signOut(auth);
          setUser(null);
          setUserRole("");
          setLoading(false);
          navigate("/login", { replace: true });
          return;
        }

        const userData = userSnap.data();
        const role = userData.role;

        if (role !== "admin" && role !== "user") {
          await signOut(auth);
          setUser(null);
          setUserRole("");
          setLoading(false);
          navigate("/login", { replace: true });
          return;
        }

        const profile = {
          uid: currentUser.uid,
          email: currentUser.email || userData.email || "",
          name: currentUser.displayName || userData.name || currentUser.email || "User",
          photoURL: currentUser.photoURL || userData.photoURL || "",
          role,
        };

        const profileUpdate = {
          email: profile.email,
          name: profile.name,
          photoURL: profile.photoURL,
        };
        if (!userData.createdAt) profileUpdate.createdAt = serverTimestamp();
        await setDoc(userDocRef, profileUpdate, { merge: true });

        setUser(profile);
        setUserRole(role);
        setLoading(false);
        navigate(role === "admin" ? "/admin" : "/user", { replace: true });
      } catch (error) {
        console.error("Firebase authentication error:", error);
        await signOut(auth).catch(() => {});
        setUser(null);
        setUserRole("");
        setLoading(false);
        navigate("/login", { replace: true });
      }
    });

    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth).catch((error) => console.error("Logout error:", error));
    setUser(null);
    setUserRole("");
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
        <div className="spinner-border" style={{ color: "#17365d" }} role="status" />
        <p className="mt-3 fw-semibold mb-0" style={{ color: "#17365d" }}>Loading Shepherd of My Soul...</p>
=======
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
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
      </div>
    );
  }

  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to={userRole === "admin" ? "/admin" : "/user"} replace />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to={userRole === "admin" ? "/admin" : "/user"} replace />} />
      <Route path="/user" element={user && userRole === "user" ? <><Header onLogout={handleLogout} /><Body /><Chat /><Footer /></> : user && userRole === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/login" replace />} />
      <Route path="/admin" element={user && userRole === "admin" ? <AdminDashboard onMessages={() => navigate("/admin/messages")} onLogout={handleLogout} /> : user && userRole === "user" ? <Navigate to="/user" replace /> : <Navigate to="/login" replace />} />
      <Route path="/admin/messages" element={user && userRole === "admin" ? <AdminMessages onBack={() => navigate("/admin")} onLogout={handleLogout} /> : user && userRole === "user" ? <Navigate to="/user" replace /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
=======

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

>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
    </Routes>
  );
}

<<<<<<< HEAD
export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
=======
export default App;
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f
