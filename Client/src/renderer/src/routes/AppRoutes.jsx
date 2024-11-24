import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import Login from '../screens/Login';
import Dashboard from '../screens/wholesaler/Dashboard'; // Adjusted the import path for user dashboard
import { getRole } from '../services/localstorageService';
import Notifications from '../screens/Notifications';
import Support from '../screens/Support';
import Settings from '../screens/Settings';
import Reports from '../screens/Reports';
import InvoiceCreate from '../screens/Invoice';
import Item from '../screens/Item';
import About from '../screens/About';
import InvoiceHome from '../screens/Invoice/InvoiceHome';
// import ManageCustomers from '../screens/user/ManageCustomers'; 

const App = () => {
  const [user, setUser] = useState(null);

  // Check user login status on app start
  useEffect(() => {
    const loggedInUser = getRole(); // Fetch user data from local storage or API
    console.log('Role:', loggedInUser);
    setUser(loggedInUser);
  }, []);

  if (user === null) {
    // While user data is being fetched, show a loading spinner or skeleton screen
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Default Login Page */}
        <Route path="/" element={<Login />} />
        <Route path="/user/login" element={<Navigate to="/" replace />} />

        {/* User Layout */}
        <Route
          path="/user/*"
          element={
           
              <UserLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  {/* <Route path="customers" element={<ManageCustomers />} /> */}
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="support" element={<Support />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path='item' element={<Item/>}/>
                  <Route path='invoice' element={<InvoiceHome/>}/>
                  <Route path='invoice/create' element={<InvoiceCreate/>}/>
                  <Route path='about' element={<About/>}/>

                  {/* Add more user-specific routes here */}
                </Routes>
              </UserLayout>
          
          }
        />

        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
