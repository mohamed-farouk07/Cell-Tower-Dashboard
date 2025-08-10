# Cell-Tower-Dashboard
# Cell Tower Dashboard 📡

A comprehensive React application that provides user authentication and a feature-rich dashboard for monitoring and managing cell tower networks. Built with modern React patterns, TypeScript, and D3.js for data visualization.


## ✨ Features

- 🔐 **User Authentication** - Secure login with session management
- 📊 **Interactive Dashboard** - Real-time cell tower monitoring and analytics
- 📈 **Data Visualization** - D3.js powered charts and graphs
- 🔍 **Advanced Filtering** - Search and filter towers by name, city, and status
- 📱 **Responsive Design** - Mobile-first approach supporting all devices
- 🌐 **RTL Support** - Arabic language compatibility
- ⚡ **Performance Optimized** - Custom hooks and memoization

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cell-tower-dashboard.git
   cd cell-tower-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🔧 Technology Stack

### Core Technologies
- **React 18** - Modern React with hooks
- **TypeScript** - Full type safety
- **D3.js** - Advanced data visualization
- **SCSS** - Advanced styling with variables
- **Vite** - Fast development server

### Key Libraries
- **React Router** - Client-side routing
- **React i18next** - Internationalization
- **ESLint** - Code quality enforcement

## 🎮 Usage

### Authentication
Default login credentials:
- **Username**: `admin`
- **Password**: `password`

### Dashboard Features

#### Summary Cards
- **Total Towers**: Real-time count of filtered towers
- **Active Towers**: Count of operational towers  
- **Average Signal**: Calculated average signal strength

#### Interactive Filters
- **Search Bar**: Filter towers by name in real-time
- **City Dropdown**: Filter by cities (Cairo, Alexandria, Hurghada, Luxor)
- **Combined Filtering**: Search and city filters work together

#### Data Visualization
- **Bar Chart**: Tower distribution by city
- **Pie Chart**: Active vs Offline status distribution
- **Interactive Elements**: Hover effects and tooltips

#### Data Table
- Comprehensive tower information display
- Status indicators and signal strength ratings
- Responsive design with horizontal scroll on mobile

## 🎨 Design System

### Color Palette
```scss
$primary-color: #3E337C;    // Primary brand color
$secondary-color: #A8394B;  // Secondary accent
$tertiary-color: #018DAF;   // Tertiary accent
$dark-blue: #022F95;        // Dark variant
```

### Responsive Breakpoints
```scss
$mobile: 768px;
$tablet: 1024px;
$desktop: 1200px;
```

## ⚡ Performance Features

- **Custom Hooks** - Separated business logic from UI components
- **useMemo** - Expensive calculations are cached
- **React.memo** - Prevents unnecessary re-renders
- **Code Splitting Ready** - Modular architecture for easy optimization

## 🌐 Internationalization

The project supports RTL languages and is ready for internationalization:

- **Arabic Support** - Built-in RTL styling
- **Language Toggle** - Header language switching
- **react-i18next Integration** - Translation system ready

## 📚 API Reference

### Mock Data Structure

```typescript
interface CellTower {
  id: string;
  name: string;
  city: string;
  networkType: '4G' | '5G';
  status: 'active' | 'offline';
  signalStrength: number; // 1-5 scale
}
```

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Custom Hooks

#### `useDashboard`
Handles all dashboard business logic:
- State management for filters
- Data processing and filtering
- Summary statistics calculation
- Chart data preparation

#### `useSideBar`
Manages sidebar navigation:
- Active route tracking
- Menu item configuration
- Navigation handlers

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Vercel
1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

### Manual Deployment
1. Run `npm run build`
2. Upload the contents of `dist` folder to your web server

## 🛠️ Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

#### Node Version Issues
```bash
# Check Node version
node --version
# Update Node.js or use nvm
nvm use 16
```


### Development Guidelines
- Follow TypeScript best practices
- Use custom hooks for business logic
- Maintain responsive design principles
- Write meaningful commit messages
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- React team for the amazing framework
- D3.js team for powerful data visualization tools
- Egyptian cities data for realistic mock data
- Open source community for inspiration


---

**Happy Coding!** 🎉