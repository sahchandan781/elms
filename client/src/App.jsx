import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Courses from './pages/student/Courses'
import Mylearning from './pages/student/Mylearning'


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
      element:
      <>
        <HeroSection />
        {/* Courses */}
        <Courses />
      </>
      },
      {
        path:"login",
        element:<Login />
      },
      {
        path:"my-learning",
        element:<Mylearning />
      }
    ]
  }
])
function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
