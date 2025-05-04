import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./utils/AuthProvider";
import RootLayout from "./layouts/RootLayout";
import BaseLayout from "./layouts/BaseLayout";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { Toaster } from 'react-hot-toast';

// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SongPage from "./pages/song/SongPage";
import CreateSongPage from "./pages/song/CreateSongPage";
import EditSongPage from "./pages/song/EditSongPage";
import SongDetailPage from "./pages/song/SongDetailPage";
import ProfilePage from "./pages/user/ProfilePage";
import EditProfilePage from "./pages/user/EditProfilePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes */}
            <Route element={<BaseLayout />}>
              <Route path="/login" element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              } />
            </Route>

            {/* Protected Routes */}
            <Route element={<RootLayout />}>
              <Route path="/" element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              } />
              <Route path="/songs" element={
                <PrivateRoute>
                  <SongPage />
                </PrivateRoute>
              } />
              <Route path="/songs/create" element={
                <PrivateRoute>
                  <CreateSongPage />
                </PrivateRoute>
              } />
              <Route path="/songs/:id" element={
                <PrivateRoute>
                  <SongDetailPage />
                </PrivateRoute>
              } />
              <Route path="/songs/edit/:id" element={
                <PrivateRoute>
                  <EditSongPage />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } />
              <Route path="/profile/edit" element={
                <PrivateRoute>
                  <EditProfilePage />
                </PrivateRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;