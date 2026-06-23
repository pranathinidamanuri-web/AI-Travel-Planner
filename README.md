# AI Travel Planner 🌍✈️

## 📌 Project Overview

AI Travel Planner is a full-stack web application that generates personalized travel itineraries using AI. Users can create trips by providing destination, duration, budget, and interests. The system uses an LLM (OpenAI) to generate day-by-day plans, budget estimation, and hotel suggestions.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based)
* 🧳 Create and manage trips
* 🤖 AI-powered itinerary generation
* 💰 Budget estimation (flights, hotels, food, activities)
* 🏨 Hotel recommendations
* 🔒 Secure user-specific data (no cross-user access)

---

## 🛠️ Tech Stack

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* OpenAI API

### Frontend (Planned / Optional):

* Next.js
* Tailwind CSS

---

## 🧠 AI Agent Design

The application uses OpenAI API to generate:

* Day-wise itinerary
* Budget breakdown
* Hotel suggestions

### Prompt Strategy:

* Structured prompt with destination, days, budget, and interests
* Enforced JSON output format for reliable parsing

---

## 🔐 Authentication & Authorization

* Passwords are hashed using bcrypt
* JWT tokens are used for authentication
* Protected routes ensure:

  * Only logged-in users can access data
  * Users cannot access other users’ trips

---

## 📂 API Endpoints

### Auth Routes

* POST `/api/auth/register` → Register user
* POST `/api/auth/login` → Login user

### Trip Routes

* POST `/api/trips/create` → Create trip
* POST `/api/trips/generate` → Generate AI itinerary
* GET `/api/trips` → Get user trips

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/ai-travel-planner.git
cd ai-travel-planner/backend
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
```

---

### 4. Run the Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 🧪 Testing the APIs

Use Postman or similar tools.

### Example Flow:

1. Register user
2. Login → get JWT token
3. Create trip
4. Generate itinerary
5. Fetch trips

---

## 🏗️ Architecture Overview

* Controller-based structure
* Middleware for authentication
* MongoDB for persistent storage
* AI service layer for LLM interaction

---

## 💡 Key Design Decisions

* Used JWT for scalable stateless authentication
* Used MongoDB for flexible schema (itinerary JSON)
* Structured AI output to avoid parsing errors
* Separation of concerns (routes, controllers, services)

---

## ⚖️ Trade-offs

* AI responses may vary (non-deterministic)
* No caching implemented (can improve performance)
* Frontend not fully implemented yet

---

## ⚠️ Known Limitations

* No real-time price APIs for accurate budgets
* Limited itinerary edit features
* Basic error handling for AI failures

---

## 🌟 Future Improvements

* Add itinerary editing (add/remove activities)
* Improve UI with full frontend integration
* Add real-time travel APIs (flights, hotels)
* Optimize AI prompts for better results

---

## 🎥 Demo

(Add your deployed link and video link here)

---

## 📌 Conclusion

This project demonstrates:

* Backend system design
* AI integration
* Secure authentication
* API development
* Real-world problem-solving

---
