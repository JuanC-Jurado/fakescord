import React from "react";
import styles from "./Login.module.css";
import logo from "./fakescord.svg";
import mockup from "./mockup_image.png";

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

    if (mobile) {
      signInWithRedirect(auth, provider);
    } else {
      signInWithPopup(auth, provider);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.login__content}>
        <div className={styles.login__image}>
          <img src={mockup} alt="" />
        </div>
        <div className={styles.login__side}>
          <header className={styles.logo}>
            <img src={logo} alt="" />
            <p className={styles.slogan}>Comunícate con tus amigos</p>
          </header>
          <button className={styles.button} onClick={signIn}>
            Iniciar Sesión con Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
