// css
import styles from './Landing.module.css'
import { Link } from 'react-router-dom'

const Landing = () => {
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
          <button className={styles.button}>Log In</button>
          <button className={styles.button}>Sign Up</button>
        </div>
      </div>
    </main>
  )
}

export default Landing
