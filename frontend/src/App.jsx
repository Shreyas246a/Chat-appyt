import { useEffect} from 'react'
import './App.css'
import  {useAuthStore}  from './store/authStore.js'
import { Navbar } from './components/Navbar.jsx';
import {Loader} from 'lucide-react'
import {Routes,Route, Navigate} from 'react-router-dom'
import {HomePage} from './pages/HomePage.jsx'
import {LoginPage} from './pages/LoginPage.jsx'
import {SignupPage} from './pages/SignupPage.jsx'
import {ProfilePage} from './pages/ProfilePage.jsx'
import {SettingsPage} from './pages/SettingsPage.jsx'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js';

function App() {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();

  useEffect(()=>{ 
    checkAuth();
  },[checkAuth])
  const {theme}=useThemeStore()

  if(isCheckingAuth && !authUser){
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className='size-10 animate-spin' />
        </div>
    )
  }

  
 return(
<div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/home" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/home" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
 )
}


export default App
