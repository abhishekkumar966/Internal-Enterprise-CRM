import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Templates from "./pages/Templates";
import Sites from "./pages/ClientSites";
import Login from "./pages/Login";

import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/sites" element={<Sites />} />
      </Route>
    </Routes>
  );
}

export default App;