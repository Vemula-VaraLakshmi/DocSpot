
# 🩺 DocSpot — Smart Doctor Appointment Booking System

**DocSpot** is a full-stack web application that allows patients to seamlessly book appointments with doctors, while enabling doctors and admins to manage their services and interactions efficiently. The platform simplifies doctor discovery, appointment scheduling, and communication across the healthcare workflow.

---

## 🚀 Features

### 👤 Users (Patients)
- Register and log in securely
- Browse list of available doctors with details and profile pictures
- Book appointments based on doctor availability
- Receive notifications related to appointments
- View upcoming and past appointments

### 👨‍⚕️ Doctors
- Register and manage their profiles (specialization, fees, timings, bio, etc.)
- Upload a profile picture
- View and manage appointments
- Update availability and personal information
- Secure access to doctor dashboard

### 🛡️ Admin
- Approve or reject doctor registrations
- View and manage all doctors
- View and manage all appointments
- Oversee the platform's operations

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **React Router DOM**
- **Bootstrap 5** for styling
- Axios for API communication

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- Multer for file uploads
- JWT for secure route access

---

## 📁 Folder Structure

```bash
DocSpot/
│
├── backend/               # Express.js API server
│   ├── config/            # MongoDB connection
│   ├── controllers/       # All route logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # User/Admin/Doctor routes
│   ├── uploads/           # Profile images (ignored in git)
│   ├── server.js          # Entry point
│
├── frontend/              # React.js client
│   ├── src/
│   │   ├── components/    # All pages/components by role
│   │   ├── App.js         # Routing setup
│   │   └── axios.js       # Axios instance
│   └── public/
│
├── .gitignore
├── README.md
└── package.json
```

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup
```bash
cd backend
npm install
touch .env
```

Add your `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/docspot
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend:
```bash
npm start
```

### 🎨 Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 🌐 Environment Variables

Ensure the following in `.env` (backend):
```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_key
```

Also add a `.env` in `frontend/` (optional) if required for URLs.

---

## 📷 Screenshots


- 🏠 Home Page
- 👤 User Dashboard
- 👨‍⚕️ Doctor Dashboard
- 🛠️ Admin Panel

---

## 📌 Future Enhancements

- Email notifications
- Calendar integration
- Rescheduling & cancellation
- Reviews and ratings
- Admin analytics dashboard

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/awesome-feature`
3. Commit your changes: `git commit -m 'Add awesome feature'`
4. Push to the branch: `git push origin feature/awesome-feature`
5. Open a Pull Request

---

---

## 👩‍💻 Built By

**Vemula Vara Lakshmi **  
Passionate Full-Stack Developer with a focus on building real-world healthcare solutions.

---

## 📬 Contact

📧 Email: [varalakshmivemula3@gmail.com]  
  
🔗 LinkedIn: [linkedin.com/in/vemulavaralakshmi](https://linkedin.com/in/vemulavaralakshmi)

---
