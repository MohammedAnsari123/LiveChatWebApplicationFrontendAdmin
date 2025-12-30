# ModernLiveChat - Admin Panel

The official Admin Dashboard for the ModernLiveChat application. This frontend application provides administrators with tools to manage users, monitor platform statistics, and moderate content (posts and groups).

## 🚀 Features

-   **Secure Authentication**:
    -   Separate Admin Login/Registration.
    -   Protected routes and session management via JWT.
    -   Registration requires a secure `ADMIN_SECRET` key.
-   **Dashboard & Analytics**:
    -   Real-time statistics visualization (Total Users, Active Users, Posts, Messages).
    -   Interactive charts powered by Recharts.
-   **User Management**:
    -   List all registered users.
    -   Role indicators (User vs Admin).
    -   **Action**: Delete users permanently.
-   **Content Moderation**:
    -   **Post Management**: View all user posts with images. Delete inappropriate content.
    -   **Group Management**: Monitor active group chats, view admin details and member counts.
-   **Modern UI**:
    -   Built with React and Vite.
    -   Styled with TailwindCSS for a responsive, dark-mode-first design.

## 🛠️ Tech Stack

-   **Framework**: [React](https://reactjs.org/) (Vite)
-   **Styling**: [TailwindCSS](https://tailwindcss.com/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **Charts**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```
admin-client/
├── src/
│   ├── api/            # Axios instance and configuration
│   ├── components/     # Reusable components (Sidebar, ProtectedRoute, Charts)
│   ├── context/        # Auth Context provider
│   ├── pages/          # Application views (Dashboard, Users, Posts, Groups)
│   └── App.jsx         # Main routing configuration
├── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite configuration
```

## 🏁 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configuration**:
    The API URL is configured in `src/api/index.js`. Ensure it points to your running backend server.
    ```javascript
    // src/api/index.js
    baseURL: 'http://localhost:5000/api' // or your production URL
    ```

3.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:5173`.

## 📦 Build for Production

1.  **Build**:
    ```bash
    npm run build
    ```
    This creates a `dist` folder ready for deployment.

2.  **Preview**:
    ```bash
    npm run preview
    ```

## 🤝 Integration

This Admin Panel is designed to work seamlessly with the [ModernLiveChat Backend](../server). Ensure the backend is running and the `ADMIN_SECRET` is correctly configured in the server's environment variables to enable admin registration.
