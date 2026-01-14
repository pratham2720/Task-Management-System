# CosmoDeck — Your Productivity Universe ✦

A calm, space-inspired task management system built for focused productivity. Features an animated starfield background, cosmic dark theme, and intuitive interface.

![CosmoDeck](https://img.shields.io/badge/CosmoDeck-Space%20Theme-6366f1?style=for-the-badge)

## 🚀 Live Demo

- **Frontend**: [Add Vercel link here]
- **Backend API**: [Add Render link here]
- **API Docs**: [Add Render link]/api-docs

## 📸 Screenshots

[Add screenshots after deployment]

## ✨ Features

### User Authentication
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Protected routes

### Task Management
- ✅ Create, Read, Update, Delete tasks
- ✅ Task categories/tags
- ✅ Priority levels (High, Medium, Low)
- ✅ Due date functionality
- ✅ Task status (Pending, In Progress, Completed)

### Dashboard
- ✅ Task statistics (Total, Completed, In Progress, Overdue)
- ✅ Filter by status, priority
- ✅ Search functionality
- ✅ Animated starfield background

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js + Vite |
| **Styling** | Vanilla CSS (Cosmic Dark Theme) |
| **Backend** | Node.js + Express |
| **Database** | SQLite (Sequelize ORM) |
| **Auth** | JWT (JSON Web Tokens) |
| **API Docs** | Swagger UI |

## 📦 Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm

### Backend Setup

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

Server runs at http://localhost:5000
Swagger docs at http://localhost:5000/api-docs

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start development server:
```bash
npm run dev
```

App runs at http://localhost:5173

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

CosmoDeck follows a **"Quiet Space"** design philosophy:
- Deep space dark theme (#05070a background)
- Subtle animated starfield with twinkling effect
- Floating card components with soft shadows
- Cosmic indigo accent color (#6366f1)
- Clean typography with Space Grotesk font
- Calm, focused, and professional aesthetic

## 🧩 Challenges & Solutions

### 1. State Management
**Challenge**: Managing global auth state and task updates across components.

**Solution**: Implemented React Context API for authentication to avoid prop drilling, and triggered data refetching in Dashboard upon task modifications.

### 2. Animated Background Performance
**Challenge**: Creating a smooth animated starfield without impacting performance.

**Solution**: Used HTML5 Canvas with requestAnimationFrame for optimal rendering. Limited star count based on screen size and kept animations subtle.

### 3. Responsive Design
**Challenge**: Making the cosmic theme work across all device sizes.

**Solution**: Used CSS Grid with auto-fit/minmax for adaptive layouts, and implemented mobile-first breakpoints.

### 4. Production Deployment
**Challenge**: Configuring CORS and environment variables for production.

**Solution**: Used environment variables for API URL (frontend) and CORS origin (backend) to support both development and production environments.

## 📁 Project Structure

```
cosmodeck/
├── backend/
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Auth middleware
│   │   ├── models/       # Sequelize models
│   │   ├── routes/       # API routes
│   │   └── index.js      # App entry point
│   ├── swagger.json      # API documentation
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios instance
│   │   ├── components/   # React components
│   │   ├── context/      # Auth context
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main app
│   │   └── index.css     # Cosmic theme styles
│   └── package.json
│
└── README.md
```

## 👨‍🚀 Author

**Pratham Saxena**

---

*"Space for Your Tasks"* ✦
