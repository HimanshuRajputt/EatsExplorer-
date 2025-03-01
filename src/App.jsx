import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import NearbyRestaurants from "./Components/NearbyRestaurants";
import SpeechToText from "./Components/speechToText"
// import HomePage from "./Components/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Show SpeechToText first */}
        <Route path="/" element={<Navigate to="/speakandtranslate" />} />
        <Route path="/speakandtranslate" element={<SpeechToText />} />
        {/* <Route path="/home" element={<HomePage/>}/> */}
        <Route path="/nearby-restaurants" element={<NearbyRestaurants />} />
      </Routes>
    </Router>
  );
}

export default App;
