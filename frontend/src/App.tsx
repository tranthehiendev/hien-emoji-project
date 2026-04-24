import { BrowserRouter, Route, Routes } from 'react-router';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ChatAppPage from './pages/ChatAppPage';
import { Toaster } from 'sonner'
import ProtectedRoute from './components/auth/ProtectedRoute';
import { TooltipProvider } from './components/ui/tooltip';
import { userThemeStore } from './stores/useThemeStore';
import { useEffect } from 'react';
import { useAuthStore } from './stores/useAuthStore';
import { useSocketStore } from './stores/useSocketStore';
function App() {
  const { isDark, setTheme } = userThemeStore();
  const { accessToken } = useAuthStore();
  const { connectSocket, disconnectSocket } = useSocketStore()
  useEffect(() => {
    setTheme(isDark);
  }, [isDark])
  useEffect(() => {
    if (accessToken){
      connectSocket();
    }
    return ()=>disconnectSocket(); 
  }, [accessToken])

  return (
    <TooltipProvider>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route
            path='/signin'
            element={<SignInPage />}
          />
          <Route
            path='/signUp'
            element={<SignUpPage />}
          />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>

            <Route
              path='/'
              element={<ChatAppPage />}
            />
          </Route>

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
