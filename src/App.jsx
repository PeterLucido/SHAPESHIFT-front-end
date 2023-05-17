// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import DayList from './pages/DayList/DayList'
import DayDetails from './pages/DayDetails/DayDetails'
import NewDay from './pages/NewDay/NewDay'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as dayService from './services/dayService'
import * as profileService from './services/profileService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [days, setDays] = useState([])
  const [averageRating, setAverageRating] = useState()
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  
  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfile(
        profileData.find((pro)=>user.profile===pro._id)
      )
    }
    if (user) fetchProfiles()
  }, [user])

  const getAverageRating = (average) => {
    setAverageRating(average)
  }

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

  const handleDeleteDay = async (dayId) => {
    const deletedDay = await dayService.deleteDay(dayId)
    setDays(days.filter(d => d._id !== deletedDay._id))
    navigate('/days')
  }

  const handleUpdateDay = async (dayFormData) => {
    const updatedDay = await dayService.update(dayFormData)
    setDays(days.map((d) => dayFormData._id === d._id ? updatedDay: d))
    navigate('/days')
  }

  return (
    <>
      {user &&
        <NavBar
          user={user}
          profile={profile}
          handleLogout={handleLogout}
          averageRating={averageRating}
        />
      }
      <Routes>
        <Route
          path="/"
          element={
            <Landing 
              user={user}
              handleAuthEvt={handleAuthEvt}
            />
          }
        />
        <Route
          path='/days'
          element={
            <ProtectedRoute user={user}>
              <DayList 
                days={days}
                user={user}
                getAverageRating={getAverageRating}
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
                user={user}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path='/days/:dayId'
          element={
            <ProtectedRoute user={user}>
              <DayDetails user={user} handleDeleteDay={handleDeleteDay}/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/days/:dayId/edit'
          element={
            <ProtectedRoute user={user}>
              <DayDetails user={user} handleUpdateDay={handleUpdateDay}/>
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
        <Route
          path="/days"
          element={
            <ProtectedRoute user={user}>
              <DayList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
