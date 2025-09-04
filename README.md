# SPA Fees Test

A modern Vue.js Single Page Application for managing and visualizing fees. Search and filter fees by Product, Type, Cluster, Consumer, and ID with ease.

## 🚀 Features

- **Advanced Search & Filtering**: Search fees across multiple fields with real-time filtering
- **Fee Visualization**: Clean, organized table with detailed information and easy navigation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Environment Configuration**: Configurable ms-fees host via environment variables
- **Modern Tech Stack**: Built with Vue 3, TypeScript, Vite, and Pinia

## 🛠 Tech Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: CSS3 with Scoped Styles
- **Code Quality**: ESLint + Prettier

## 📋 Requirements

- Node.js ^20.19.0 || >=22.12.0
- npm 10.8.2+

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spa-fees-test
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` to configure your ms-fees service:
```env
# MS-Fees API Configuration
VITE_MS_FEES_HOST=http://your-ms-fees-host:port
VITE_MS_FEES_API_VERSION=v1

# Set to 'true' to use mock data instead of making API calls
# Useful for development when the MS-Fees service is not available
VITE_USE_MOCK_DATA=false
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## 🏗 Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🧹 Code Quality

Type checking:
```bash
npm run type-check
```

Linting:
```bash
npm run lint
```

Code formatting:
```bash
npm run format
```

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── FeeFilters.vue  # Search and filter component
│   ├── FeesList.vue    # Fees list table component
│   └── FeeModal.vue    # Fee details modal component
├── services/           # API services
│   └── feesApi.ts     # MS-Fees API integration
├── stores/            # Pinia stores
│   └── fees.ts       # Fees state management
├── types/            # TypeScript type definitions
│   └── fee.ts       # Fee-related types
├── views/           # Page components
│   ├── HomeView.vue    # Landing page
│   ├── FeesView.vue    # Main fees management page
│   └── AboutView.vue   # About page
├── router/          # Vue Router configuration
└── assets/         # Static assets
```

## 🔍 Search & Filter Features

The application supports searching and filtering fees by:

- **Global Search**: Search across all fields simultaneously
- **ID**: Filter by specific fee ID
- **Product**: Filter by product name
- **Type**: Filter by fee type (Transaction, Service, Processing)
- **Cluster**: Filter by cluster name
- **Consumer**: Filter by consumer name

All filters support:
- Real-time search with debouncing (300ms)
- Case-insensitive matching
- Partial string matching
- Clear all filters functionality

## 🌐 Environment Configuration

The application uses environment variables for configuration:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_MS_FEES_HOST` | MS-Fees service host URL | `http://localhost:3000` |
| `VITE_MS_FEES_API_VERSION` | API version | `v1` |
| `VITE_USE_MOCK_DATA` | Force use of mock data instead of API calls | `false` |

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🔄 API Integration

The application integrates with ms-fees service via REST API:

- `GET /api/{version}/fees` - List fees with filters and pagination
- `GET /api/{version}/fees/{id}` - Get specific fee details

**Fallback**: When the ms-fees service is unavailable, the application uses mock data for development and testing.

## 🚦 API Error Handling

- **Intelligent Fallback**: Graceful fallback to mock data when API is unavailable
- **Smart Retry Logic**: Avoids repeated failed requests by tracking API availability
- **Request Timeout**: 5-second timeout to prevent hanging requests
- **User-friendly Messages**: Clear warning messages instead of errors in console
- **Configuration Control**: Option to force mock data usage via environment variable
- **Development Mode**: Seamless development experience even without backend service

## 🎨 UI/UX Features

- Modern, clean design with professional styling
- Loading spinners and progress indicators
- Interactive hover effects and transitions
- Modal dialogs for detailed views
- Pagination for large datasets
- Color-coded fee types with badges
- Responsive navigation with active states

## 📊 Data Visualization

The fees are displayed in a comprehensive table showing:
- Fee ID (with monospace font for better readability)
- Product name
- Type (with color-coded badges)
- Cluster
- Consumer
- Amount (formatted with proper decimal places)
- Currency
- Creation date (formatted for readability)
- Actions (View button for details)

## 🔐 Best Practices

- **TypeScript**: Full type safety throughout the application
- **Component Composition**: Reusable, maintainable components
- **State Management**: Centralized state with Pinia
- **Error Boundaries**: Graceful error handling
- **Performance**: Optimized with debounced search and lazy loading
- **Accessibility**: Semantic HTML and keyboard navigation
- **Code Quality**: ESLint and Prettier for consistent code style

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
