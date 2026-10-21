import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import AdminDashboard from "./pages/AdminDashboard";
import AdminMessages from "./pages/AdminMessages";

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
