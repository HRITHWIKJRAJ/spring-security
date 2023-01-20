import { Route, Routes } from "react-router-dom";
import "./App.css";
import AssignmentView from "./AssignmentView/assignmentView";
import Dashboard from "./Dashboard/dashboard";
import Login from "./Login/login";
import PrivateRoute from "./PrivateRoute/privateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import ReviewerDashboard from "./ReviewerDashboard/reviewerDashboard";
import ReviewerAssignmentView from "./ReviewerAssignmentView/reviewerAssignmentView";
import { useUser } from "./UserProvider/userProvider";
import Register from "./Register/register";

function App() {
  const user = useUser();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoles(getRolesFromJwt());
  }, [user.jwt]);

  function getRolesFromJwt() {
    if (user.jwt) {
      const tokenDecode = jwtDecode(user.jwt);
      return tokenDecode.authorities;
    }
    return [];
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/assignments/:id"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <ReviewerAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <ReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
    </Routes>
  );
}

export default App;
