import Navbar from './component/Navbar'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Footer from './component/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext'
import FreeBooks from './pages/FreeBooks'
import AdminDashboad from './pages/AdminDashboad'
import FreeAdminBook from './pages/FreeAdminBook'
import PremiumAdminBook from './pages/PremiumAdminBook'
import Premium from './pages/PremiumBook'


const App = () => {
  const router = createBrowserRouter([
    {
      path:'/',
      element:
      <>
      <Navbar/>
      <Home/>
      <Footer/>
      </>
    },
    {
      path:'/about',
      element:
      <>
      <Navbar/>
      <About/>
      <Footer/>
      </>
    },
    {
      path:'/books',
      element:
      <>
      <Navbar/>
      <FreeBooks/>
      <Footer/>
      </>
    },
    {
      path:'/contact',
      element:
      <>
      <Navbar/>
      <Contact/>
      <Footer/>
      </>
    },
    {
      path:'/Login',
      element:
      <>
      <Navbar/>
      <Login/>
      </>
    },
    {
      path:'/register',
      element:
      <>
      <Navbar/>
      <Register/>
      </>
    },
    {
      path:'/admin-dashboard',
      element:
      <>
      <Navbar/>
      <AdminDashboad/>
      <Footer/>
      </>
    },
    {
      path:'/admin-dashboard/free',
      element:
      <>
      <Navbar/>
      <FreeAdminBook/>
      <Footer/>
      </>
    },
    {
      path:'/admin-dashboard/premium',
      element:
      <>
      <Navbar/>
      <PremiumAdminBook/>
      <Footer/>
      </>
    },
    {
      path:'/prime',
      element:
      <>
      <Navbar/>
      <Premium/>
      <Footer/>
      </>
    },
    
    
  ])

  return (
    <AuthProvider>
      <RouterProvider  router={router}/>
    </AuthProvider>
  )
}

export default App