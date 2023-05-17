// npm modules
import { NavLink } from 'react-router-dom'

// assets
import closed from '../../assets/icons/closed.png'

// import { fill } from '@cloudinary/url-gen/actions/resize'
// import { CloudinaryImage } from '@cloudinary/url-gen'

import styles from '../NavBar/NavBar.module.css'
import { useEffect, useState } from 'react'


const NavBar = ({ user, handleLogout, averageRating, profile }) => {
  
  let navClass = 'nav-container'
  if (averageRating >= 4) {
    navClass += ' green'
  } else if (averageRating >= 3) {
    navClass += ' lightgreen'
  } else if (averageRating >= 2) {
    navClass += ' yellow'
  } else if (averageRating >= 1) {
    navClass += ' orange'
  } else {
    navClass += ' red'
  }

  return (
    <>
    <nav className={navClass}>
      {user ?
        <>
          <div className="user-info">
            {
              profile ?
              profile.photo ?
              <img src={profile.photo} height='45px' alt={user.name}/> :
              user.name :
              ''
            }
          </div>
          <div className="nav-right">
            <p><NavLink to='/days'>All Days</NavLink></p>
            <p><NavLink to='/days/new'>Add Day</NavLink></p>
          </div>
        </>
          :
          <div >
            <p><NavLink to="/auth/login">Log In</NavLink></p>
            <p><NavLink to="/auth/signup">Sign Up</NavLink></p>
          </div>
        }
        {user &&
          <div >
            <div className="dropdown">
              <button className="dropdown-button"><img src={closed} /></button>
              <div className="dropdown-content">
                <p><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></p>
                <p><NavLink to="/auth/change-password">Change Password</NavLink></p>
              </div>
            </div>
          </div>
        }
      </nav>
    </>
  )
}


export default NavBar
