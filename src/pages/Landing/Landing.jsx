// css
import styles from './Landing.module.css'
import LoginPage from '../Login/Login'
import Signup from '../Signup/Signup'
import { useState } from 'react'


const Landing = ({handleAuthEvt}) => {

  const [loginForm, setLoginForm] = useState(false)
  const [signUpForm, setSignUpForm] = useState(false)

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
      <>
        <main className={styles.container}>
        <div className={styles.leftSide}>
          <img src='src/assets/imgs/two-strong-people-working-out-in-gym-2021-08-27-09-32-07-utc.jpg' className={styles.slide} id={styles.slide1}/>
          <img src='src/assets/imgs/sleeping.jpg' className={styles.slide} id={styles.slide2}/>
          <img src='src/assets/imgs/pexels-spencer-davis-9837738.jpg' className={styles.slide} id={styles.slide3}/>
          <img src='src/assets/imgs/maxresdefault.jpg' className={styles.slide} id={styles.slide4}/>
        </div>
        <div className={styles.rightSide}>
          <img src='src/assets/imgs/shapeshift-logo.png' className={styles.shapeshift}/>
          <div className={styles.loginButtonsContainer}>
            <LoginPage  handleAuthEvt={handleAuthEvt}/>
            <button onClick={handleCancel} className={styles.cancelButton}>CANCEL</button>
          </div>
        </div>
        </main>
      </>
    )
  }

  if (signUpForm) {
    return(
      <>
        <main className={styles.container}>
        <div className={styles.leftSide}>
          <img src='src/assets/imgs/two-strong-people-working-out-in-gym-2021-08-27-09-32-07-utc.jpg' className={styles.slide} id={styles.slide1}/>
          <img src='src/assets/imgs/sleeping.jpg' className={styles.slide} id={styles.slide2}/>
          <img src='src/assets/imgs/pexels-spencer-davis-9837738.jpg' className={styles.slide} id={styles.slide3}/>
          <img src='src/assets/imgs/maxresdefault.jpg' className={styles.slide} id={styles.slide4}/>
        </div>
        <div className={styles.rightSide}>
          <img src='src/assets/imgs/shapeshift-logo.png' className={styles.shapeshift}/>
          <Signup handleAuthEvt={handleAuthEvt}/>
          <button onClick={handleCancel} className={styles.cancelButton}>CANCEL</button>
        </div>
        </main>
      </>
    )
  }

  return (
    <main className={styles.container}>
      <div className={styles.leftSide}>
        <img src='src/assets/imgs/two-strong-people-working-out-in-gym-2021-08-27-09-32-07-utc.jpg' className={styles.slide} id={styles.slide1}/>
        <img src='src/assets/imgs/sleeping.jpg' className={styles.slide} id={styles.slide2}/>
        <img src='src/assets/imgs/pexels-spencer-davis-9837738.jpg' className={styles.slide} id={styles.slide3}/>
        <img src='src/assets/imgs/maxresdefault.jpg' className={styles.slide} id={styles.slide4}/>
      </div>

      <div className={styles.rightSide}>
        <img src='src/assets/imgs/shapeshift-logo.png' className={styles.shapeshift}/>
        <div className={styles.buttonsContainer}>
          <button onClick={handleLoginForm} className={styles.button}>Log In</button>
          <button onClick={handleSignUpForm}className={styles.button}>Sign Up</button>
        </div>
      </div>
    </main>
  )
}

export default Landing
