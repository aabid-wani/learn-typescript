# Student Management System 🚀

Modern full-stack app: **React 19 + TypeScript + Tailwind CSS** + **Node/Express + PostgreSQL**

## ✨ Features
- ✅ Full CRUD (Create, Read, Update, Delete) Students
- ✅ 22-field enterprise form (name, DOB, address, enrollment #, etc.)
- ✅ Responsive design (mobile → desktop table/cards)
- ✅ Real-time validation + loading states + notifications
- ✅ TypeScript end-to-end
- ✅ Dynamic DB inserts (any field order)

## 🛠 Tech Stack
```
Frontend: React 19, TypeScript, Vite, Axios, Custom Hooks
Backend: Express 5, TypeScript, PostgreSQL, pg
Styling: Modern CSS Grid/Flexbox + Custom Components
```

## 🚀 Quick Start

### 1. PostgreSQL Setup
```bash
# Create DB
psql -U postgres
CREATE DATABASE student_management;
\c student_management

# Create tables (schema.sql)
\\i schema.sql
```

### 2. Backend
```bash
cd student-project/backend
npm install
npm start
```
**Port:** `http://localhost:3001`  
**Health:** `http://localhost:3001/health`

### 3. Frontend  
```bash
cd student-project/frontend
npm install
npm run dev
```
**Port:** `http://localhost:3000`

### 4. Test API
```bash
curl -X POST http://localhost:3001/api/students/add \\
  -H "Content-Type: application/json" \\
  -d '{
    "first_name": "John", 
    "phone": "1234567890", 
    "enrollment_number": "EN001"
  }'
```

## 📁 Project Structure
```
student-project/
├── backend/           # Express + TS + PG
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── config/db.ts
│   └── package.json
├── frontend/          # React + TS + Modern UI
│   ├── src/
│   │   ├── components/     # StudentForm, StudentList, StudentItem
│   │   ├── hooks/          # useStudents.ts
│   │   ├── pages/          # Home.tsx
│   │   ├── api/            # studentApi.ts
│   │   └── types/
│   └── package.json
└── README.md
```

## 🐛 Troubleshooting

**DB Error (400):**
```
1. Check PG is running
2. Verify `student_management` DB + `students` table exist
3. Backend logs show exact PG error
```

**Frontend 404:**
```
Frontend API baseURL: http://localhost:3001/students → /api/students
```

**Windows CMD:**
```
cd student-project\backend
npm start
```

## 🔮 Schema (students table)
```
id (UUID PK), first_name*, phone*, enrollment_number*, email?, address?, city?, state?, 
country?, zip_code?, dob?, gender?, course_id (FK), status?, remarks?, created_at, updated_at
* = Required
```

## 📱 UI Features
- **Responsive table** → Mobile cards
- **Form validation** real-time
- **Emoji buttons** Edit/Delete
- **Auto-save** success messages (3s)
- **Loading spinners** + skeletons
- **Empty states** with icons

## 🎯 Future
```
[ ] File upload (profile_image)
[ ] Course dropdown (FK)
[ ] Search + Filter
[ ] Export CSV/PDF
[ ] Authentication
```

**Live Demo:** Open `localhost:3000` → Add Rohit Sharma → ✨ Magic!

---
⭐ **Star if helpful!** Built with ❤️ for production-ready student management.

