const Trip = require("../models/Trip");
const { generateTripAI } = require("../services/aiService");

// ✅ CREATE TRIP
const createTrip = async (req, res) => {
  try {
    const { destination, days, budget, interests } = req.body;

    if (!destination || !days || !budget) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTrip = new Trip({
      user: req.user.userId,
      destination,
      days,
      budget,
      interests,
      itinerary: {}
    });

    await newTrip.save();

    res.status(201).json({
      message: "Trip created successfully",
      trip: newTrip
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GENERATE ITINERARY (AI VERSION)
const generateItinerary = async (req, res) => {
  try {
    const { tripId } = req.body;

    if (!tripId) {
      return res.status(400).json({ message: "Trip ID required" });
    }

    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // 🔥 CALL AI
    const aiResponse = await generateTripAI({
      destination: trip.destination,
      days: trip.days,
      budget: trip.budget,
      interests: trip.interests
    });

    // 🔥 SAVE TO DB
    trip.itinerary = aiResponse;
    await trip.save();

    res.json({
      success: true,
      itinerary: aiResponse
    });

  } catch (error) {
    console.log("AI ERROR:", error);
    res.status(500).json({ message: "AI generation failed" });
  }
};

// ✅ EXPORT
module.exports = {
  createTrip,
  generateItinerary
};