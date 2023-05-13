// npm modules
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import DayList from './pages/DayList/DayList'
import NewDay from './pages/NewDay/NewDay'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as dayService from './services/dayService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [days, setDays] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleAddDay = async (dayFormData) => {
    const newDay = await dayService.create(dayFormData)
    setDays([newDay,...days])
    navigate('/days')
  }

  return (
    <>
      <NavBar
        user={user}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Landing 
              user={user}
            />
          }
        />
        <Route
          path='/days'
          element={
            <ProtectedRoute user={user}>
              <DayList 
                days={days}
              />
            </ProtectedRoute>
          }
        />
          <Route
            path="/days/new"
            element={
              <ProtectedRoute user={user}>
                <NewDay
                  handleAddDay={handleAddDay}
                />
              </ProtectedRoute>
            }
          />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
