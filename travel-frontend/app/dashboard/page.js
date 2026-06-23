"use client";

import { useState } from "react";

export default function Dashboard() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [itinerary, setItinerary] = useState(null);

  const createTrip = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      // 1️⃣ CREATE TRIP
      const res = await fetch("http://localhost:5000/api/trips/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          destination,
          days,
          budget,
          interests: ["Food", "Travel"],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Trip creation failed");
        return;
      }

      const tripId = data.trip._id;

      // 2️⃣ GENERATE ITINERARY
      const res2 = await fetch("http://localhost:5000/api/trips/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tripId }),
      });

      const data2 = await res2.json();

      if (!res2.ok) {
        alert(data2.message || "Itinerary generation failed");
        return;
      }

      setItinerary(data2.itinerary);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Create Trip</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Destination"
        onChange={(e) => setDestination(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Days"
        onChange={(e) => setDays(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Budget"
        onChange={(e) => setBudget(e.target.value)}
      />

      <button
        onClick={createTrip}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Generate Trip
      </button>

      {/* RESULT */}
      {itinerary && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Itinerary</h2>

          {Object.entries(itinerary).map(([day, plan]) => (
            <p key={day}>
              <b>{day}:</b> {plan}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}