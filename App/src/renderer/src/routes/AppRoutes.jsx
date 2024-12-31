import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import Login from '../screens/Login';
import Dashboard from '../screens/wholesaler/Dashboard'; // Adjusted the import path for user dashboard
import { getUser } from '../services/localstorageService';
import Notifications from '../screens/Notifications';
import Support from '../screens/Support';
import Settings from '../screens/Settings';
import Reports from '../screens/Reports';
import InvoiceCreate from '../screens/Invoice';
import Item from '../screens/Item';
import About from '../screens/About';
import InvoiceHome from '../screens/Invoice/InvoiceHome';
import TutorialOverlay from '../screens/TutorialOverlay';
import Payment from '../screens/Payment/payment';
import Register from '../screens/Register'
import PartiesManagement from '../screens/Parties';
import Subscription from '../screens/Subscription';

const App = () => {
  // const [user, setUser] = useState(null);
  

 
  // useEffect(() => {
  //   const loggedInUser = getUser(); 
  //   console.log('Role:', loggedInUser.userdata.role);
  //   setUser(loggedInUser);

    
   
  // }, []);

  

  // if (user === null) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="/user/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Register />}  />

       
        <Route
          path="/user/*"
          element={
            <UserLayout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="support" element={<Support />} />
                <Route path="settings" element={<Settings />} />
                <Route path="reports" element={<Reports />} />
                <Route path="item" element={<Item />} />
                <Route path="invoice" element={<InvoiceHome />} />
                <Route path="invoice/create" element={<InvoiceCreate />} />
                <Route path="about" element={<About />} />
                <Route path="payment" element={<Payment/>} />
                <Route path="parties" element={<PartiesManagement/>} />
                <Route path="subscription" element={<Subscription/>} />
                
                
              </Routes>
            </UserLayout>
          }
        />

        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      
     
    </Router>
  );
};

export default App;
