import React, { useEffect, useState } from "react";
import { AES } from "crypto-js";

import styles from "./Chat.module.css";
import Mensaje from "../components/Mensaje";
import ModalAbandonar from "../components/ModalAbandonar";

import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import firebaseApp from "../credenciales";

const db = getFirestore(firebaseApp);

function Chat({ usuario, canalActivo, setCanalActivo }) {
  const [mensajes, setMensajes] = useState(null);
  const [mostrarModalAbandonar, setMostrarModalAbandonar] = useState(false);

  if (canalActivo) {
    onSnapshot(doc(db, `canales/${canalActivo.id}`), (doc) => {
      if (mensajes) {
        if (mensajes.length !== doc.data().mensajes.length) {
          setMensajes(doc.data().mensajes);
        }
      }
    });
  }

  useEffect(() => {
    if (canalActivo) obtenerMensajes(canalActivo.id);
  }, [canalActivo]); //eslint-disable-line

  async function obtenerMensajes(canal) {
    if (canalActivo) {
      const docuRef = await getDoc(doc(db, `canales/${canal}`));
      setMensajes(docuRef.data().mensajes);
    }
  }

  async function enviarMensaje(e) {
    e.preventDefault();

    if(e.target.elements.contenidoMensaje.value === '') return

    const nuevoMensaje = {
      id: +new Date(),
      usuario: usuario.displayName,
      foto: usuario.photoURL,
      mensaje: AES.encrypt(
        e.target.elements.contenidoMensaje.value,
        "@fakeKey"
      ).toString(),
    };

    const docuRef = doc(db, `canales/${canalActivo.id}`);
    await updateDoc(docuRef, {
      mensajes: arrayUnion(nuevoMensaje),
    });

    e.target.elements.contenidoMensaje.value = "";
    obtenerMensajes(canalActivo.id);
  }

  return (
    <div className={styles.chat}>
      <div className={styles.chat__header}>
        {/* Nombre del Canal */}
        <div className={styles.headerInnerContainer}>
          <h2 className={styles.chat__headerName}>
            <span className={styles.channelHash}>#</span>
            {canalActivo ? canalActivo.nombre : null}
          </h2>
        </div>
        {canalActivo ? (
          <div className={styles.channelInfoContainer}>
            <p className={styles.idChannel}>{`ID: ${canalActivo.id}`}</p>
            <div>
              <button onClick={() => setMostrarModalAbandonar(true)} className={styles.getOutButton} title="Abandonar Canal"><i className="fas fa-sign-out-alt"></i></button>
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.chat__mesagges}>
        {mensajes
          ? mensajes.map((mensaje) => {
              return <Mensaje key={mensaje.id} messaggeData={mensaje} />;
            })
          : null}
      </div>

      <div className={styles.chat__input}>
        {/* Input para escribir y enviar mensajes */}
        <form onSubmit={enviarMensaje} className={styles.chat__inputForm}>
          <div className={styles.chatInputContainer}>
            <input
              className={styles.chatInput}
              autoComplete="off"
              type="text"
              id="contenidoMensaje"
              name="contenidoMensaje"
              placeholder={`Enviar mensaje a #${
                canalActivo ? canalActivo.nombre : ""
              }`}
              disabled={canalActivo ? false : true}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={canalActivo ? false : true}
              className={styles.chat__sendButton}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>

      {
        mostrarModalAbandonar && canalActivo ? 
        <ModalAbandonar
          setMostrarModal={setMostrarModalAbandonar}
          canalActivo={canalActivo}
          usuario={usuario}
          setCanalActivo={setCanalActivo}
        /> :
        null
      }
    </div>
  );
}

export default Chat;
