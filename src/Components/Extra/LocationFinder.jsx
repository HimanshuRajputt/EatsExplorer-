import { useState } from "react";

function LocationFinder() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log("Latitude:", latitude, "Longitude:", longitude);
      },
      (error) => {
        setError(error.message);
        console.error("Error getting location:", error.message);
      }
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Find My Location</h2>
      <button
        onClick={getLocation}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Get Current Location 📍
      </button>

      {location && (
        <p>
          🌍 Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
    </div>
  );
}

export default LocationFinder;
