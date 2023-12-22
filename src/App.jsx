import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AuthProvider from "./context/auth";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import NoInternetConnection from "./components/NoInternetConnection";

function App() {
  return (
    <AuthProvider>
      <NoInternetConnection>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
        </Routes>
      </NoInternetConnection>
    </AuthProvider>
  );
}

export default App;
