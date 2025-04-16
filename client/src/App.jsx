import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Courses from './pages/student/Courses'
import Mylearning from './pages/student/Mylearning'
import Profile from './pages/student/Profile'
import  Sidebar  from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'


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
      },
      {
        path:"profile",
        element:<Profile/>
      },

      // admin routes start from here
      {
        path:"admin",
        element:<Sidebar />,
        children:[
          {
            path:"dashboard",
            element:<Dashboard />
          },
          {
            path:"course",
            element:<CourseTable />
          },
          {
            path:"course/create",
            element:<AddCourse />
          }
        ]
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
