import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import VetPage from "./pages/VetPage";
import MyPet from "./pages/MyPet";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import PrescriptionView from "./components/PrescriptioniewPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypet" element={<MyPet />} />
          <Route path="/vet" element={<VetPage />} />
          <Route path="/appointment/:id" element={<Appointment />} />
          <Route path="/prescriptions/:prescriptionId" element={<PrescriptionView />} />
          <Route path="/myappointment" element={<MyAppointments />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
