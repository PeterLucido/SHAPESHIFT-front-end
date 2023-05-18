import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import * as authService from './services/authService'
import * as dayService from './services/dayService'
import * as profileService from './services/profileService'

import Landing from './pages/Landing/Landing'
import DayList from './pages/DayList/DayList'
import DayDetails from './pages/DayDetails/DayDetails'
import NewDay from './pages/NewDay/NewDay'

import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

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
      </Routes>
    </>
  )
}

export default App
