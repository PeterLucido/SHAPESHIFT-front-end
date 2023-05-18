import { NavLink } from 'react-router-dom'

import closed from '../../assets/icons/closed.png'

import styles from '../NavBar/NavBar.module.css'

const NavBar = ({ user, handleLogout, averageRating, profile }) => {
  let color = styles.green
  if (averageRating > 4) {
    color = styles.green
  } else if (averageRating > 3) {
    color = styles.lightGreen
  } else if (averageRating > 2) {
    color = styles.yellow
  } else if (averageRating > 1) {
    color = styles.orange
  } else if (averageRating === 1) {
    color = styles.red
  } else {
    color = styles.green
  }

  return (
    <div className={styles.sticky}>
      <nav className={styles.navContainer} id={color}>
        <div className={styles.userInfo}>
          {
            profile ?
            profile.photo ?
            <img src={profile.photo} height='45px' alt={user.name}/> :
            user.name :
            ''
          }
        </div>
        <div className={styles.navRight}>
          <p><NavLink to='/days'>All Days</NavLink></p>
          <p><NavLink to='/days/new'>Add Day</NavLink></p>
        </div>
        <div>
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}><img src={closed}/></button>
            <div className={styles.dropdownContent}>
              <p><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}


export default NavBar
