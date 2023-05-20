import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import * as authService from '../../services/authService'

import styles from '../LoginCard/LoginCard.module.css'

const LoginCard = ({ handleAuthEvt }) => {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const navigate = useNavigate()

  const handleChange = (evt) => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/days')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  const { email, password } = formData

  const isFormInvalid = () => {
    return !(email && password)
  }

  return (
    <main className={styles.logincontainer}>
      <h1>Log In</h1>
      <p className={styles.message}>{message}</p>
      <form autoComplete='off' onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Email
          <input
            type='text'
            value={email}
            name='email'
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            type='password'
            value={password}
            name='password'
            onChange={handleChange}
          />
        </label>
        <div>
          <button className={styles.button} disabled={isFormInvalid()}>
            Log In
          </button>
        </div>
      </form>
    </main>
  )
}

export default LoginCard
