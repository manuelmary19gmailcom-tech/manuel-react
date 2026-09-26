import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./lib/firebase.js";
import Header from "./pages/Header";
import Body from "./pages/Body";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMessages from "./pages/AdminMessages";
import Chat from "./pages/Chat";

function AppRoutes() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setUserRole("");
        setLoading(false);
        return;
      }

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
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to={userRole === "admin" ? "/admin" : "/user"} replace />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to={userRole === "admin" ? "/admin" : "/user"} replace />} />
      <Route path="/user" element={user && userRole === "user" ? <><Header onLogout={handleLogout} /><Body /><Chat /><Footer /></> : user && userRole === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/login" replace />} />
      <Route path="/admin" element={user && userRole === "admin" ? <AdminDashboard onMessages={() => navigate("/admin/messages")} onLogout={handleLogout} /> : user && userRole === "user" ? <Navigate to="/user" replace /> : <Navigate to="/login" replace />} />
      <Route path="/admin/messages" element={user && userRole === "admin" ? <AdminMessages onBack={() => navigate("/admin")} onLogout={handleLogout} /> : user && userRole === "user" ? <Navigate to="/user" replace /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
