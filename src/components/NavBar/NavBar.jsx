// npm modules
import { NavLink } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      <nav className="nav-container">
        {user ?
          <div className="nav-right">
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
