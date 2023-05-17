// npm modules
import { NavLink } from 'react-router-dom'

// import { fill } from '@cloudinary/url-gen/actions/resize'
// import { CloudinaryImage } from '@cloudinary/url-gen'

import styles from '../NavBar/NavBar.module.css'
// import { AdvancedImage } from '@cloudinary/react'
// import * as profileService from '../../services/profileService'



const NavBar = ({ user, profile, handleLogout }) => {
  
  console.log(profile)
  // const myImage = new CloudinaryImage('lijczvtue5qsq0ufnnsg', {cloudName: 'dd5j0nypw'}).resize(fill().width(30).height(30))
  
  return (
    <>
      <nav className="nav-container">
        {user ?
          <div className="nav-right">
            {/* <AdvancedImage cldImg={myImage}/> */}
            <p>{user.name}</p>
            <p><NavLink to='/days'>All Days</NavLink></p>
            <p><NavLink to='/days/new'>Add Day</NavLink></p>
          </div>
          :
          <div className="nav-right">
            <p><NavLink to="/auth/login">Log In</NavLink></p>
            <p><NavLink to="/auth/signup">Sign Up</NavLink></p>
          </div>
        }
        {user &&
          <div className="nav-right">
            <div className="dropdown">
              <button className="dropdown-button">▼</button>
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
