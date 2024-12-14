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


function App() {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();

  useEffect(()=>{ 
    checkAuth();
  },[checkAuth])
  console.log(authUser, isCheckingAuth);
  console.log(!authUser)
  if(isCheckingAuth && !authUser){
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className='size-10 animate-spin' />
        </div>
    )
  }

  
 return(
  <div>
    <Navbar />
    <Routes>
      <Route path='/' element={authUser?<HomePage />:<Navigate to='/login'></Navigate>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/profile' element={authUser?<ProfilePage />:<Navigate to='/login'></Navigate>} />
      <Route path='/settings' element={authUser?<SettingsPage />:<Navigate to='/login'></Navigate>} />
    </Routes>
  </div>
 )
}


export default App
