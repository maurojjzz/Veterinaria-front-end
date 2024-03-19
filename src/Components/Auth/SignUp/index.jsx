import React from 'react'
import styles from './signup.module.css'
import Toast from '../../Shared/Toast'

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up en desarrollo</h1>
      <Toast title={"Error"} message={"Error al loguearse"} />
      <Toast title={"Success"} message={"Usuario creado"} />
      <Toast title={"Warning"} message={"Ingresar contraseña"} />
      <Toast title={"Info"} message={"Se ha informado al veterinario"} />
    </div>
  )
}

export default SignUp
