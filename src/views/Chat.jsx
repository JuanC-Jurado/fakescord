import React, { useEffect, useRef, useState } from "react";
import { AES } from "crypto-js";

import styles from "./Chat.module.css";
import Mensaje from "../components/Mensaje";
import ModalAbandonar from "../components/ModalAbandonar";
import ChatHeader from "../components/ChatHeader";

import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import firebaseApp from "../credenciales";
import OutNotification from "../components/OutNotification";
import InNotification from "../components/InNotification";

const db = getFirestore(firebaseApp);

function Chat({ usuario, canalActivo, setCanalActivo }) {
  const [mensajes, setMensajes] = useState(null);
  const [mostrarModalAbandonar, setMostrarModalAbandonar] = useState(false);

  const bottom = useRef();

  if (canalActivo) {
    onSnapshot(doc(db, `canales/${canalActivo.id}`), (doc) => {
      if (mensajes) {
        if (mensajes.length !== doc.data().mensajes.length) {
          setMensajes(doc.data().mensajes);
        }
      }
    });
  } else {
    if (mensajes) {
      setMensajes(null);
    }
  }

  useEffect(() => {
    if (canalActivo) {
      obtenerMensajes(canalActivo.id);
    }
  }, [canalActivo]); //eslint-disable-line

  async function obtenerMensajes(canal) {
    if (canalActivo) {
      const docuRef = await getDoc(doc(db, `canales/${canal}`));
      await setMensajes(docuRef.data().mensajes);
      bottom.current.scrollIntoView({ behavior: "auto" });
    }
  }

  async function enviarMensaje(e) {
    e.preventDefault();

    if (e.target.elements.contenidoMensaje.value === "") return;

    const nuevoMensaje = {
      id: +new Date(),
      usuario: usuario.displayName,
      mensaje: AES.encrypt(
        e.target.elements.contenidoMensaje.value,
        "@fakeKey"
      ).toString(),
      tipo: "texto",
      foto: usuario.photoURL,
      uid: usuario.uid,
    };

    const docuRef = doc(db, `canales/${canalActivo.id}`);
    await updateDoc(docuRef, {
      mensajes: arrayUnion(nuevoMensaje),
    });

    e.target.elements.contenidoMensaje.value = "";
    obtenerMensajes(canalActivo.id);
  }

  async function abandonarCanal() {
    const docuRef = doc(db, `usuarios/${usuario.uid}`);
    const snapshot = await getDoc(docuRef);

    const nuevaListaCanales = snapshot.data().canales.filter((canal) => {
      return canal.id !== canalActivo.id;
    });

    updateDoc(docuRef, {
      canales: nuevaListaCanales,
    });

    setCanalActivo(null);
    setMostrarModalAbandonar(false);

    enviarNotificacionOut();
  }

  async function enviarNotificacionOut() {
    const nuevaNotificacionOut = {
      id: +new Date(),
      usuario: usuario.displayName,
      tipo: "notificacionOut",
      foto: usuario.photoURL,
    };

    const docuRef = doc(db, `canales/${canalActivo.id}`);
    await updateDoc(docuRef, {
      mensajes: arrayUnion(nuevaNotificacionOut),
    });

    setMensajes(null);
    setCanalActivo(null);
  }

  return (
    <div className={styles.chat}>
      <ChatHeader
        setMostrarModalAbandonar={setMostrarModalAbandonar}
        canalActivo={canalActivo}
      />

      {canalActivo ? (
        <div className={styles.chat__mesagges}>
          {mensajes
            ? mensajes.map((mensaje) => {
                if (mensaje.tipo === "notificacionOut") {
                  return (
                    <OutNotification key={mensaje.id} messaggeData={mensaje} />
                  );
                } else if (mensaje.tipo === "notificacionIn") {
                  return (
                    <InNotification key={mensaje.id} messaggeData={mensaje} />
                  );
                } else {
                  return (
                    <Mensaje
                      key={mensaje.id}
                      messaggeData={mensaje}
                      usuario={usuario}
                    />
                  );
                }
              })
            : null}
          <div ref={bottom}></div>
        </div>
      ) : (
        <div className={styles.chat__noMesagges}>
          <p>Crea <i className="fas fa-folder-plus"></i> o únete <i className="fas fa-search-plus"></i> a un canal </p>
        </div>
      )}

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

      {mostrarModalAbandonar && canalActivo ? (
        <ModalAbandonar
          abandonarCanal={abandonarCanal}
          setMostrarModal={setMostrarModalAbandonar}
          canalActivo={canalActivo}
        />
      ) : null}
    </div>
  );
}

export default Chat;
