# 🌾 KrishiVani Agro

KrishiVani is a modern, full-stack agricultural planner application designed to help farmers make data-driven, season-ready decisions with less uncertainty. It provides localized crop suggestions, real-time market prices, weather updates, and information on government schemes.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 + HeroUI
- **State/Routing:** React Context API, standard DOM events
- **Icons:** `reicon-react`

### Backend
- **Framework:** FastAPI (Python)
- **Database ORM:** SQLAlchemy
- **Authentication:** JWT (JSON Web Tokens) with `python-jose` and `passlib`
- **Server:** Uvicorn

### Database
- **Engine:** MySQL
- **Driver:** PyMySQL

---

## ✨ Features

- **User Authentication:** Secure registration and login flow with JWT.
- **Planner Dashboard:** Personalized dashboard based on user state and selected season.
- **Weather Integration:** Live weather data fetched based on the user's pin code (via Open-Meteo).
- **Seasonal Crop Suggestions:** Filtered crop recommendations showing water needs, expected yield, and advisory notes.
- **Live Market Prices:** Simulated real-time shifting market prices for various crops across different mandis.
- **Government Schemes:** Quick scanning of support programs and subsidies tailored for agricultural planning.

---

## 🚀 Local Setup Workflow

Follow these steps to get the full stack running on your local machine.

### 1. Database Setup
Ensure you have MySQL installed and running.
1. Open your terminal and log into MySQL:
   ```bash
   mysql -u root -p
   ```
2. Run the provided SQL script to create the database, tables, and seed the initial data:
   ```bash
   mysql -u root -p < backend/sql/schema.sql
   ```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   Copy `.env.example` to `.env` and update the values. Make sure `MYSQL_PASSWORD` matches your root password.
   ```bash
   cp .env.example .env
   ```
5. Start the FastAPI server:
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   *The backend will be available at `http://localhost:8000`.*
   *API documentation (Swagger UI) is available at `http://localhost:8000/docs`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install the Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:5174` (or port 5173).*

---

## 🔌 API Endpoints (Backend)

The frontend communicates with the backend via the Vite proxy configured in `vite.config.ts`. The main routes include:

**Auth:**
- `POST /api/v1/auth/register` - Create a new account
- `POST /api/v1/auth/login` - Login and receive JWT
- `GET /api/v1/auth/me` - Get current user profile

**Data:**
- `GET /api/v1/data/crops` - Get crop suggestions (query params: `season`, `state`)
- `GET /api/v1/data/schemes` - Get government schemes
- `GET /api/v1/data/market-prices` - Get mandi prices
- `GET /api/v1/weather/pincode/{pin}` - Get current weather by pin code

---

## 🧪 Testing with Postman
A Postman collection is provided for testing the APIs manually.
1. Open Postman.
2. Click **Import** and select the `Collection.json` file located in the `backend/` directory.
3. Make sure to set up an environment variable `baseUrl` to `http://localhost:8000` in Postman.