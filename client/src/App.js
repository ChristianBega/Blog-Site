import HomePage from "./pages/home.page";
import LandingPage from "./pages/landing.page";
import SignUpPage from "./pages/signUp.page";
import LoginPage from "./pages/login.page";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/signUp" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
