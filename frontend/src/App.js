import NotFound from "./components/NotFound/NotFound";
import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom";
import Cars from "./components/cars/Cars";
import Users from "./components/users/Users";
import LoginForm from "./components/modals/Login/Login";
import RegistrationForm from "./components/modals/Register/Register";
import MainPage from "./components/MainPage/MainPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Catalog from "./components/cars/Catalog/Catalog";
import Booking from "./components/booking/booking/Booking";
import TermsAndConditions from "./components/StaticPages/Terms";
import PrivacyPolicy from "./components/StaticPages/PrivacyPolicy";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Booking />} />

        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/auth/registration" element={<RegistrationForm />} />

        <Route path="/admin/cars" element={<Cars />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
