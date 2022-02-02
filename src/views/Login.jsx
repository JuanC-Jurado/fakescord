import React from 'react';
import styles from './Login.module.css';

import firebaseApp from '../credenciales';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';

const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider();


function Login() {

  async function signIn(){
    signInWithPopup(auth, provider)
    .then(result => console.log(result))
  }


  return (
    <div onClick={() => console.log('hola buenas noches')} className={styles.container}>
      <div>
        <button className={styles.button} onClick={signIn}>Iniciar Sesión con Google</button>
      </div>
    </div>
  );
}

export default Login;
