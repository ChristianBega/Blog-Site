import HomePage from "./pages/home.page";
import LandingPage from "./pages/landing.page";
import SignUpPage from "./pages/signUp.page";
import LoginPage from "./pages/login.page";

import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/signUp" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
