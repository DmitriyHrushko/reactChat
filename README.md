# Product Chat - Full-Stack SPA

Modern single-page application for product management with live chat and real-time updates.

## 🚀 Features

### Core Features

-  **Remote Products**: Browse products from FakeStore API
-  **My Products**: Create, edit, and manage your own products locally
-  **CRUD Operations**: Full Create, Read, Update, Delete functionality
-  **Live Chat**: Real-time chat per product via Socket.IO
-  **Live Updates**: WebSocket integration for product events
-  **Local Persistence**: Redux Persist with localStorage
-  **Search & Filter**: Debounced search, sorting, and filtering
-  **Responsive Design**: Mobile-first approach with Material-UI
-  **Form Validation**: React Hook Form + Yup validation

### ✨ Bonus Features

-  **🔐 Authentication**: Protected routes with auth guard
-  **⚡ Optimistic UI**: Instant feedback before server confirmation
-  **♾️ Infinite Scroll**: Auto-load more products on scroll
-  **↩️ Undo Delete**: 5-second window to undo product deletion
-  **🔍 Search Highlight**: Visual highlighting of search matches
-  **✅ Unit Tests**: Component and utility function tests with Vitest

## 🛠 Tech Stack

### Frontend

-  **React 19** + **TypeScript**
-  **Redux Toolkit** + **RTK Query**
-  **Socket.IO Client**
-  **React Hook Form** + **Yup**
-  **Material-UI (MUI) v7**
-  **React Router v6**
-  **redux-persist**
-  **date-fns**, **uuid**
-  **Vitest** + **Testing Library** (testing)

### Backend (Optional)

-  **Express**
-  **Socket.IO Server**

## 📦 Installation

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and set your variables:

```env
VITE_SOCKET_URL=http://localhost:3001
VITE_API_BASE_URL=https://fakestoreapi.com
```

> **Note:** Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

## 🏃 Running the Application

### Start Backend Server (Terminal 1)

```bash
cd server
npm start
```

Server runs on `http://localhost:3001`

### Start Frontend Dev Server (Terminal 2)

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🧪 Testing

### Run Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Structure

```
src/tests/
├── components/           # Component tests
│   ├── HighlightedText.test.tsx
│   ├── ProductCard.test.tsx
│   ├── SearchBar.test.tsx
│   └── ConfirmDialog.test.tsx
└── utils/               # Utility tests
    └── formatters.test.ts
```

Tests cover:

-  ✅ Component rendering and props
-  ✅ User interactions (clicks, inputs)
-  ✅ Search highlighting functionality
-  ✅ Utility functions (formatters, validators)
-  ✅ Conditional rendering

## 📁 Project Structure

```
src/
├── app/                    # Redux store, hooks, router
│   ├── store.ts           # Redux store with persist
│   ├── hooks.ts           # Typed Redux hooks
│   └── router.tsx         # React Router config
├── features/              # Feature-based modules
│   ├── products/         # Product slice
│   └── chat/             # Chat slice
├── services/             # API services
│   ├── productApi.ts    # RTK Query API
│   └── socketService.ts # Socket.IO client
├── pages/                # Route pages
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CreateProductPage.tsx
│   └── EditProductPage.tsx
├── components/           # Reusable components
│   ├── product/         # Product-specific
│   ├── chat/            # Chat components
│   └── common/          # Shared components
├── hooks/                # Custom hooks
│   ├── useDebounce.ts
│   ├── useSocket.ts
│   ├── useConfirmDialog.ts
│   └── useToast.ts
├── utils/                # Utility functions
├── types/                # TypeScript types
├── constants/            # Constants
└── layouts/              # Layout components
```
