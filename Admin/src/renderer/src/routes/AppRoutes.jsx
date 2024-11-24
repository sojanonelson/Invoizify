import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';
import Login from '../screens/Login';
import Dashboard from '../screens/Admin/Dashboard';
import { getRole } from '../services/localstorageService'; // A helper to get user data

import Notifications from '../screens/Notifications';
import Support from '../screens/Support';
import Settings from '../screens/Settings';
import Reports from '../screens/Reports';
import ManageAccount from '../screens/admin/ManageAccount';

const App = () => {
  const [user, setUser] = useState(null);

  // Check user login status on app start
  useEffect(() => {
    const loggedInUser = getRole(); // Fetch user from local storage or API
    console.log("Role:", loggedInUser)
    setUser(loggedInUser);
  }, []);

  if (user === null) {
    // While user data is being fetched, you can show a loading spinner or skeleton screen
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Default Login Page */}
        <Route
          path="/"
          element={<Login/>}
        />
        <Route path="/admin/login" element={<Navigate to="/" replace />} />

        {/* Admin Layout */}
        <Route
          path="/admin/*"
          element={
           
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="account" element={<ManageAccount />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="supports" element={<Support />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="reports" element={<Reports />} />


                  <Route path="/admin/login" element={<Navigate to="/" replace />} />
                  {/* Add more admin-specific routes here */}
                </Routes>
              </AdminLayout>
            
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user/*"
          element={
            user && user.role === 'user' ? (
              <UserLayout>
                <h1>Welcome to User Dashboard</h1>
              </UserLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
