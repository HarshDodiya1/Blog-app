# 🌐 Quillier - A Modern Blogging Platform

<p align="center">
  <img src="https://github.com/user-attachments/assets/34462463-6cdc-4488-bfec-c17e66ac195b" width="100%" height="100%">
</p>
<div align="center">
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="React.js" />
    <img src="https://img.shields.io/badge/-Express-black?style=for-the-badge&logoColor=white&logo=express&color=000000" alt="Express.js" />
    <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logoColor=white&logo=node.js&color=339933" alt="Node.js" />
    <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=white&logo=firebase&color=FFCA28" alt="Firebase" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="MongoDB" /> 
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="Tailwind CSS" />
</div>
</br>

## 🚀 Project Overview
Quillier is a modern full-stack blogging platform built with the MERN stack. I created this blog application during my early days of learning web development. It was a project that helped me explore and understand some essential concepts of building full-stack web applications.

## 💻 For Live Demo
<p align="left".
  <a href="https://quillier.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel"/>
  </a>
</p>



## ✨ Key Features

- **🔐 User Authentication**: 
  - Secure Google Sign-In integration using Firebase
  - Role-based access control

- **📝 Rich Text Editing**: 
  - Interactive content creation with Quill editor
  - Intuitive and user-friendly writing experience

- **💬 Interactive Comments**: 
  - Real-time commenting system
  - Engage and interact with blog posts
  - Nested comment threads

- **🎨 Dynamic Theming**: 
  - Light and dark mode switching
  - Personalized user interface

- **👑 Role Management**: 
  - Admin privileges for comprehensive content management
  - Granular access controls

- **📱 Responsive Design**: 
  - Mobile-first approach
  - Tailwind CSS for adaptive layouts


## 🖼️ Application Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/ff9b7ff4-7e02-45a7-a1df-550b64f5c0c8" width="100%" height="100%">
  <img src="https://github.com/user-attachments/assets/e346ba22-e838-4b21-bee3-68d124ea2632" width="100%" height="100%">
</p>

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Authentication**: Firebase
- **Rich Text Editor**: Quill

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Password Security**: Bcrypt

## 🚀 Local Setup

### Prerequisites
- Node.js (18.x)
- npm or yarn
- MongoDB instance

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/HarshDodiya1/Quillier.git
   cd Quillier
   ```

2. **Install Dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Configure Environment Variables**

   **Client (.env)**
   ```bash
   VITE_API_BASE_DEV=YOUR_SERVER_URL
   VITE_FIREBASE_API_KEY=YOUR_FIREBASE_APIKEY
   ```

   **Server (.env)**
   ```bash
   REACT_APP_API_URL_DEV=YOUR_FRONTEND_URL
   PORT=3000
   MONGO_URL=YOUR_MONGODB_CONNECTION_STRING
   JWT_SECRET=YOUR_JWT_SECRET_KEY
   ```

4. **Run Development Servers**
   ```bash
   # Start client
   cd client
   npm run dev

   # Start server (in another terminal)
   cd server
   npm run start
   ```

## 🌟 Project Journey

This blog application was more than just a coding project—it was a learning journey. As a budding web developer, I embraced challenges and transformed them into opportunities:

- **Learning Authentication**: Implementing Firebase Google Sign-In
- **Interactive Editing**: Mastering the Quill editor for rich text experiences
- **Design Flexibility**: Creating dynamic theme switching
- **Security First**: Developing role-based access controls
- **User Experience**: Building an intuitive admin dashboard

## 🤝 Contributing

Contributions are welcome! 

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss proposed modifications.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Your Name - dodiyaharsh999@gmail.com

Project Link: [https://github.com/HarshDodiya1/Quillier](https://github.com/HarshDodiya1/Quillier)


