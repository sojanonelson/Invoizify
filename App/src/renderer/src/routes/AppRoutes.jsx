import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import Login from '../screens/Login'
import Dashboard from '../screens/wholesaler/Dashboard' // Adjusted the import path for user dashboard
import { getUser } from '../services/localstorageService'
import Notifications from '../screens/Notifications'
import Support from '../screens/Support'
import Settings from '../screens/Settings'
import Reports from '../screens/Reports'
import InvoiceCreate from '../screens/Invoice'
import Item from '../screens/Item'
import About from '../screens/About'
import InvoiceHome from '../screens/Invoice/InvoiceHome'
import Payment from '../screens/Payment/payment'
import Register from '../screens/Register'
import PartiesManagement from '../screens/Parties'
import Subscription from '../screens/Subscription'

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme')
  })

  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Login theme={theme} />} />
        <Route path="/user/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Register theme={theme} />} />

        <Route
          path="/user/*"
          element={
            <UserLayout>
              <Routes>
                <Route path="dashboard" element={<Dashboard theme={theme} />} />
                <Route path="notifications" element={<Notifications theme={theme} />} />
                <Route path="support" element={<Support theme={theme} />} />
                <Route path="settings" element={<Settings theme={theme} />} />
                <Route path="reports" element={<Reports theme={theme} />} />
                <Route path="item" element={<Item theme={theme} />} />
                <Route path="invoice" element={<InvoiceHome theme={theme} />} />
                <Route path="invoice/create" element={<InvoiceCreate theme={theme} />} />
                <Route path="about" element={<About theme={theme} />} />
                <Route path="payment" element={<Payment theme={theme} />} />
                <Route path="parties" element={<PartiesManagement theme={theme} />} />
                <Route path="subscription" element={<Subscription theme={theme} />} />
              </Routes>
            </UserLayout>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
