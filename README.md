# ✦ CosmoDeck — Your Productivity Universe

A calm, space-inspired task management system built for focused productivity. Features an animated starfield background, cosmic dark theme, and intuitive interface.

![CosmoDeck](https://img.shields.io/badge/CosmoDeck-Space%20Theme-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite)

## 🚀 Live Demo

| Platform | URL |
|----------|-----|
| **Frontend** | https://cosmodeck.vercel.app |
| **Backend API** | https://cosmodeck-api.onrender.com |
| **API Docs** | https://cosmodeck-api.onrender.com/api-docs |

## ✨ Features

### User Authentication
- ✅ User registration and login
- ✅ JWT-based authentication (Bonus)
- ✅ Protected routes (Bonus)

### Task Management
- ✅ Create, Read, Update, Delete tasks
- ✅ Task categories/tags
- ✅ Priority levels (High, Medium, Low)
- ✅ Due date functionality
- ✅ Task status (Pending, In Progress, Completed)

### Dashboard
- ✅ Task statistics (Total, Completed, In Progress, Overdue)
- ✅ Filter by status and priority
- ✅ Search functionality (Bonus)
- ✅ Animated starfield background
- ✅ Responsive design

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19 + Vite |
| **Styling** | Vanilla CSS (Cosmic Dark Theme) |
| **Backend** | Node.js + Express 5 |
| **Database** | SQLite + Sequelize ORM |
| **Auth** | JWT (JSON Web Tokens) |
| **API Docs** | Swagger UI |

## 📦 Local Setup

### Prerequisites
- Node.js (v18+)
- npm

### Backend

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
JWT_SECRET=your-secret-key-here
```

Start server:
```bash
npm run dev
```
- API: http://localhost:5000
- Swagger: http://localhost:5000/api-docs

### Frontend

```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start dev server:
```bash
npm run dev
```
- App: http://localhost:5173

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (protected) |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| GET | `/api/tasks/:id` | Get specific task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/stats` | Get task statistics |

## 📊 Task Model

```json
{
  "id": "unique_id",
  "title": "string (required)",
  "description": "string",
  "category": "string",
  "priority": "High/Medium/Low",
  "status": "Pending/In Progress/Completed",
  "dueDate": "ISO date string",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string",
  "userId": "user_id"
}
```

## 🎨 Design Philosophy

CosmoDeck follows a **"Quiet Space"** aesthetic:
- Deep space dark theme (#05070a)
- Animated twinkling starfield
- Floating card components with soft shadows
- Cosmic indigo accent (#6366f1)
- Space Grotesk typography
- Calm, focused, professional

## 🧩 Challenges & Solutions

### 1. State Management
**Challenge**: Managing global auth state and task updates across components.

**Solution**: Implemented React Context API for authentication to avoid prop drilling. Used useEffect with dependency arrays to trigger data refetching when tasks are modified.

### 2. Animated Background Performance
**Challenge**: Creating a smooth animated starfield without impacting performance.

**Solution**: Used HTML5 Canvas with requestAnimationFrame for optimal rendering. Limited star count based on screen size and kept animations subtle with low-opacity effects.

### 3. SPA Routing on Vercel
**Challenge**: Page refresh on routes like `/dashboard` returned 404.

**Solution**: Added `vercel.json` with rewrites configuration to redirect all routes to `index.html` for client-side routing.

### 4. CORS Configuration
**Challenge**: Cross-origin requests blocked between Vercel frontend and Render backend.

**Solution**: Configured dynamic CORS origin using environment variable `FRONTEND_URL` in backend, ensuring exact URL match without trailing slash.

## 📁 Project Structure

```
cosmodeck/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── middleware/auth.js
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── swagger.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── components/
│   │   ├── context/AuthContext.jsx
│   │   ├── pages/
│   │   └── index.css
│   ├── vercel.json
│   └── package.json
│
└── README.md
```

## 👨‍🚀 Author

**Pratham Saxena**

---

*"Space for Your Tasks"* ✦
