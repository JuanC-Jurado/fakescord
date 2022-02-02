import React, { useEffect, useState } from "react";
import styles from "./SideBar.module.css";
import Canal from "../components/Canal";
import ModalUnirse from "../components/ModalUnirse";

import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../credenciales";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import ModalCrear from "../components/ModalCrear";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function SideBar({ usuario, setCanalActivo, canalActivo }) {
  const [listaCanales, setListaCanales] = useState(null);
  const [mostrarModalUnirse, setMostrarModalUnirse] = useState(false);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    obtenerListaCanales(usuario.uid);
  }, [canalActivo]); //eslint-disable-line

  async function obtenerListaCanales(uid) {
    
    const docuRef = await getDoc(doc(db, `usuarios/${uid}`));
    setListaCanales(docuRef.data().canales);
  }

  return (
    <div className={styles.sidebar} style={mostrar ? {
      left: 0,
      transition: 'linear 300ms'
      } : {
        transition: 'linear 300ms'
      }}>
      <div className={styles.sidebar__header}>
        <h1 className={styles.sidebar__headerTitle}>Fakescord</h1>
        <div onClick={() => setMostrar(!mostrar)} className={styles.mobileButton}>
          <i className="fas fa-chevron-circle-down" style={mostrar ? {
            transform: 'rotate(-270deg)'
      } : {
        transition: 'linear 300ms',
        transform: 'rotate(270deg)'
      }}></i>
        </div>
      </div>

      <div className={styles.sidebar__channels}>
        <div
          onClick={() => setMostrarModalUnirse(true)}
          className={styles.sidebar__channelAdd}
        >
          <p>Unirse a Canal</p>
          <div>
            <i className="fas fa-search-plus"></i>
          </div>
        </div>
        {/* Lista de Canales */}
        {listaCanales
          ? listaCanales.map((canal) => {
              return (
                <Canal
                  setMostrar={setMostrar}
                  setCanalActivo={setCanalActivo}
                  key={canal.id}
                  canalData={canal}
                ></Canal>
              );
            })
          : null}
      </div>

      <div className={styles.sidebar__botton}>
        {/* Nombre, id y foto del usuario sección para Cerrar Sesión */}
        <div className={styles.sidebar__bottonUserInfo}>
          <div className={styles.sidebar__userInfoAvatar}>
            <img src={usuario.photoURL} alt="" />
          </div>
          <div className={styles.userText}>
            <h4 className={styles.userName}>{usuario.displayName}</h4>
            <p className={styles.sidebar__uid}>
              {usuario.uid.substring(0, 10)}
            </p>
          </div>
        </div>

        <div className={styles.iconButtons}>
          <div>
            {/* AQUI ESTA EL BOTON DE CREAR */}
            <button title="Crear Canal" className={styles.createChannel} onClick={() => setMostrarModalCrear(true)} > 
              <i className="fas fa-folder-plus"></i>
            </button>
          </div>
          <div>
            <button title="Cerrar Sesión" className={styles.signOut} onClick={() => signOut(auth)}>
              <i className="fas fa-power-off"></i>
            </button>
          </div>
        </div>
      </div>

      {mostrarModalUnirse ? (
        <ModalUnirse
          obtenerListaCanales={obtenerListaCanales}
          usuario={usuario}
          setMostrarModal={setMostrarModalUnirse}
        />
      ) : null}

      {
        mostrarModalCrear ? (
          <ModalCrear
            setMostrarModal={setMostrarModalCrear}
            usuario={usuario}
            obtenerListaCanales={obtenerListaCanales}
          />
        ) : null
      }
    </div>
  );
}

export default SideBar;
