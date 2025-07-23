# JobForge Backend API

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- Multer
- Cloudinary
- CORS
- dotenv


## 📁 Project Structure
```
backend/
├── controllers/           # Route controllers
│   ├── userController.js
│   ├── companyController.js
│   ├── jobController.js
│   └── applicationController.js
├── models/               # MongoDB schemas
│   ├── userModel.js
│   ├── companyModel.js
│   ├── jobModel.js
│   └── applicationModel.js
├── routes/               # API routes
│   ├── userRoutes.js
│   ├── companyRoutes.js
│   ├── jobRoutes.js
│   └── applicationRoutes.js
├── middlewares/          # Custom middlewares
│   ├── isAuthenticated.js
│   └── multer.js
├── utils/                # Utility functions
│   ├── db.js
│   ├── cloudinary.js
│   └── dataUri.js
├── index.js              # Server entry point
└── package.json
```


