import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginCard from '../../components/LoginCard/LoginCard'
import SignupCard from '../../components/SignupCard/SignupCard'

import workout from '../../assets/imgs/workout.jpg'
import sleeping from '../../assets/imgs/sleeping.jpg'
import food from '../../assets/imgs/food.jpg'
import maxresdefault from '../../assets/imgs/maxresdefault.jpg'
import logo from '../../assets/imgs/logo.png'

import styles from './Landing.module.css'

const Landing = ({ handleAuthEvt, user }) => {
  const [loginForm, setLoginForm] = useState(false)
  const [signUpForm, setSignUpForm] = useState(false)

  const navigate = useNavigate()

  const handleLoginForm = () => {
    setLoginForm(true)
    setSignUpForm(false)
  }

  const handleSignUpForm = () => {
    setLoginForm(false)
    setSignUpForm(true)
  }

  const handleCancel = () => {
    setLoginForm(false)
    setSignUpForm(false)
  }

  if (loginForm) {
    return(
      <main className={styles.container}>
        <div className={styles.leftSide}>
          <img src={workout} className={styles.slide} id={styles.slide1}/>
          <img src={sleeping} className={styles.slide} id={styles.slide2}/>
          <img src={food} className={styles.slide} id={styles.slide3}/>
          <img src={maxresdefault} className={styles.slide} id={styles.slide4}/>
        </div>
        <div className={styles.rightSide}>
          <img src={logo} className={styles.shapeshift}/>
          <div className={styles.loginButtonsContainer}>
            <LoginCard handleAuthEvt={handleAuthEvt}/>
            <button onClick={handleCancel} className={styles.cancelButton}>
              CANCEL
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (signUpForm) {
    return(
      <main className={styles.container}>
        <div className={styles.leftSide}>
          <img src={workout} className={styles.slide} id={styles.slide1}/>
          <img src={sleeping} className={styles.slide} id={styles.slide2}/>
          <img src={food} className={styles.slide} id={styles.slide3}/>
          <img src={maxresdefault} className={styles.slide} id={styles.slide4}/>
        </div>
        <div className={styles.rightSide}>
          <img src={logo} className={styles.shapeshift}/>
          <SignupCard handleAuthEvt={handleAuthEvt}/>
          <button onClick={handleCancel} className={styles.cancelButton}>
            CANCEL
          </button>
        </div>
      </main>
    )
  }
  
  if (user) {
    navigate ('/days')
  }

  return (
    <main className={styles.container}>
      <div className={styles.leftSide}>
        <img src={workout} className={styles.slide} id={styles.slide1}/>
        <img src={sleeping} className={styles.slide} id={styles.slide2}/>
        <img src={food} className={styles.slide} id={styles.slide3}/>
        <img src={maxresdefault} className={styles.slide} id={styles.slide4}/>
      </div>
      <div className={styles.rightSide}>
        <img src={logo} className={styles.shapeshift}/>
        <div className={styles.buttonsContainer}>
          <button onClick={handleLoginForm} className={styles.button}>
            Log In
          </button>
          <button onClick={handleSignUpForm}className={styles.button}>
            Sign Up
          </button>
        </div>
      </div>
    </main>
  )
}

export default Landing
