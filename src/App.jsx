import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import NearbyRestaurants from "./Components/NearbyRestaurants";

import HomePage from "./Components/HomePage"
import Footer from "./Components/Footer";
import AboutSection from "./pages/AboutSection";
import ContactSection from "./pages/ContectSection";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/nearby-restaurants" element={<NearbyRestaurants />} />
        <Route path="/about" element={<AboutSection/>}/>
        <Route path="/contact" element={<ContactSection/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
