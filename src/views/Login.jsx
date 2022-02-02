import React from "react";
import styles from "./Login.module.css";

import firebaseApp from "../credenciales";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

function Login() {
  async function signIn() {
    const mobile = function isMobile() {
      return (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/BlackBerry/i)
      );
    };

    if (mobile){
      signInWithRedirect(auth, provider)
    } else {
      signInWithPopup(auth, provider);
    }

  }

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.button} onClick={signIn}>
          Iniciar Sesión con Google
        </button>
      </div>
    </div>
  );
}

export default Login;
