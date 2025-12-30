import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import PostsList from './pages/PostsList';
import GroupsList from './pages/GroupsList';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return null; // Or a loader
  return user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/groups" element={<GroupsList />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
