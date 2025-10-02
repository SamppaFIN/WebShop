# WebShop - Modern E-Commerce Platform

A modern, responsive e-commerce platform built with React, Node.js, TypeScript, and PostgreSQL. Features a dual-theme system, magnetic UI components, and comprehensive shopping cart functionality.

## 🚀 Features

- **Modern SPA Architecture**: Single Page Application with React Router
- **Dual Theme System**: Esoteric and Industrial themes for different customer preferences
- **Magnetic UI Components**: Interactive buttons and cards with smooth animations
- **Shopping Cart**: Full cart management with quantity controls
- **User Authentication**: Demo authentication system with theme-aware login
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **TypeScript**: Full type safety across frontend and backend
- **Database Integration**: PostgreSQL with Supabase for scalable data management

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- React Router DOM for navigation
- Styled Components for styling
- Framer Motion for animations
- Lucide React for icons

### Backend
- Node.js with Express
- TypeScript for type safety
- PostgreSQL database
- Supabase for database management
- JWT authentication
- CORS and security middleware

## 📦 Project Structure

```
WebShop-Implementation/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React contexts (Cart, Theme, Auth)
│   │   ├── services/       # API and data services
│   │   └── App.tsx         # Main application component
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── src/
│   │   └── index.ts        # Express server setup
│   └── package.json
├── database/               # Database schemas and scripts
│   ├── 01_create_tables.sql
│   ├── 02_create_indexes.sql
│   ├── 03_sample_data.sql
│   └── 04_supabase_setup.sql
└── PROJECT_README.md       # Detailed project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SamppaFIN/WebShop.git
   cd WebShop/WebShop-Implementation
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment example files
   cp backend/env.example backend/.env
   
   # Update backend/.env with your database credentials
   ```

4. **Database Setup**
   - Set up PostgreSQL database or create Supabase project
   - Run the SQL scripts in the `database/` folder in order
   - Update database connection in `backend/.env`

5. **Start Development Servers**
   ```bash
   # Start backend server (port 3000)
   cd backend
   npm run dev
   
   # Start frontend server (port 4000)
   cd ../frontend
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:4000
   - Backend API: http://localhost:3000

## 🎨 Theme System

The application features two distinct themes:

- **Esoteric Theme**: Mystical and consciousness-aware design
- **Industrial Theme**: Clean, professional design for business customers

Switch between themes using the theme switcher in the top-right corner.

## 🛒 Demo Features

- **Product Catalog**: Browse products with search and filtering
- **Shopping Cart**: Add/remove items, adjust quantities
- **Checkout Process**: Complete order flow with demo data
- **User Authentication**: Login with demo credentials
- **Theme Switching**: Experience both design themes

### Demo Credentials
- Email: `aurora@consciousness-aware.com`
- Password: `consciousness123`

## 📱 Pages

- **Home**: Landing page with hero section and features
- **Products**: Product catalog with search and filtering
- **About**: Company information and mission
- **Information**: FAQ and general information
- **Cart**: Shopping cart management
- **Checkout**: Order completion process
- **Login**: User authentication

## 🔧 Development Commands

```bash
# Frontend development
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests

# Backend development
cd backend
npm run dev        # Start development server
npm run build      # Build TypeScript
npm start          # Start production server
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Note**: This is a template project for e-commerce development. For detailed project documentation and consciousness-aware development principles, see `PROJECT_README.md`.
