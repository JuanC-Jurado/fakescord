import React from "react";
import styles from "./Mensaje.module.css";
import { AES, enc } from "crypto-js";

function Mensaje({ messaggeData, usuario }) {
  return (
    <div className={usuario.uid === messaggeData.uid ? styles.messaggeContainerActual : styles.messaggeContainer}>
      <div className={styles.pictureContainer} title={messaggeData.usuario}>
        <img src={messaggeData.foto} alt='' />
      </div>
      <div className={usuario.uid === messaggeData.uid ? styles.textContainerActual : styles.textContainer}>
        <p className={styles.nombreUsuario}>{messaggeData.usuario}</p>
        <p className={styles.mensaje}>
          {AES.decrypt(messaggeData.mensaje, "@fakeKey").toString(enc.Utf8)}
        </p>
      </div>
    </div>
  );
}

export default Mensaje;
