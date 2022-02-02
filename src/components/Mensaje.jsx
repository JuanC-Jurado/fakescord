import React from 'react';
import styles from './Mensaje.module.css'
import { AES, enc } from 'crypto-js';

function Mensaje({messaggeData}) {
  return (
    <div className={styles.messaggeContainer}>
      <div className={styles.pictureContainer}>
        <img src={messaggeData.foto} alt="" />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.nombreUsuario}>{messaggeData.usuario}</p>
        <p className={styles.mensaje}>{AES.decrypt(messaggeData.mensaje, '@fakeKey').toString(enc.Utf8)}</p>
      </div>
    </div>
  );
}

export default Mensaje;
