# 🎯 FindCoach

⚠️ **Educational Project Notice**: This is a learning project that may contain incomplete features, experimental code, or areas that need improvement. It serves as a demonstration of web development skills and modern frontend technologies.

This is purely my personal adaptation of a project taken from the Vue.js course by Maximilian Schwarzmüller (Udemy).

## 🛠️ Technology Stack

### Frontend:

- **Vue 3** - Progressive JavaScript framework with Composition API
- **Vuex 4** - Centralized state management with modular architecture
- **Vue Router 4** - Client-side routing with navigation guards
- **SCSS/Sass** - CSS preprocessor with scoped styling
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend & Services:

- **Firebase Realtime Database** - NoSQL real-time database
- **Firebase Authentication** - User authentication and authorization
- **Firebase Hosting** - Static site hosting and deployment

### Development Tools:

- **Vue CLI 5** - Vue.js development tooling
- **Babel** - JavaScript transpilation for cross-browser compatibility
- **ESLint + Prettier** - Code linting and formatting
- **Webpack 5** - Module bundling and build optimization

## 📁 Project Structure

```
find-coach/
├── src/                          # Source files
│   ├── App.vue                   # Root component
│   ├── main.js                   # Application entry point
│   ├── router.js                 # Vue Router configuration
│   ├── assets/                   # Static assets
│   │   └── css/                  # Global styles
│   ├── components/               # Reusable components
│   │   ├── coaches/              # Coach-related components
│   │   ├── requests/             # Request components
│   │   ├── layout/               # Layout components
│   │   └── UI/                   # Base UI components
│   ├── pages/                    # Route components
│   │   ├── coaches/              # Coach pages
│   │   ├── requests/             # Request pages
│   │   └── auth/                 # Authentication pages
│   └── store/                    # Vuex store
│       ├── index.js              # Store configuration
│       └── modules/              # Store modules
│           ├── coaches/          # Coach state management
│           ├── requests/         # Request state management
│           └── auth/             # Authentication state
├── public/                       # Public assets
├── dist/                         # Built project (generated)
├── firebase.json                 # Firebase configuration
├── vue.config.js                # Vue CLI configuration
└── package.json                 # Project dependencies
```

## 🚀 Quick Start

### Requirements:

- Node.js (version 16 or higher)
- npm or yarn
- Firebase account (for backend services)

### Installation:

1. **Clone the repository:**

```bash
git clone https://github.com/VladislavMogorean/find-coach.git
cd find-coach
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the project in development mode:**

```bash
npm run serve
```

The application will be available at: `http://localhost:8080`

## 📝 Available Scripts

- `npm run serve` - Start development server with hot reload
- `npm run build` - Production build (optimized for deployment)
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier

## 🚀 Deployment

The project is configured for Firebase Hosting:

```bash
# Build for production
npm run build

# Deploy to Firebase (requires Firebase CLI)
firebase deploy
```

## 📄 Important Notes

- This project is educational and created for demonstration purposes
- Contains Firebase configuration for backend services
- May contain experimental implementations or incomplete features
