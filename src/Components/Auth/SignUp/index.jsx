import { useState } from 'react'
// import styles from './signup.module.css'
import Toast from '../../Shared/Toast'

const SignUp = () => {
  const [error, setError] = useState(true)
  return (
    <div>
      <h1>Sign Up en desarrollo</h1>
      {error && <Toast title={"Error"} message={"Error al loguearse"} setError={setError} />}

    </div>
  )
}

export default SignUp
