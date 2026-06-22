const express = require("express");
const router = express.Router();

const { createTrip, generateItinerary } = require("../controllers/tripController");
const authMiddleware = require("../middleware/authMiddleware");
const Trip = require("../models/Trip");

// DEBUG (remove later)
console.log("createTrip:", typeof createTrip);
console.log("generateItinerary:", typeof generateItinerary);
console.log("authMiddleware:", typeof authMiddleware);

// CREATE TRIP
router.post("/create", authMiddleware, createTrip);

// GENERATE ITINERARY
router.post("/generate", authMiddleware, generateItinerary);

// GET ALL TRIPS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.userId });
    res.json(trips);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;