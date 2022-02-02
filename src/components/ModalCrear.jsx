import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import firebaseApp from '../credenciales';
import styles from './ModalCrear.module.css'

const db = getFirestore(firebaseApp);

function ModalCrear({ setMostrarModal, usuario, obtenerListaCanales  }) {

  async function crearCanal(e) {
    e.preventDefault()

    const id = Math.floor(Math.random() * 999999);
    
    const nuevoCanal = {
      id: id,
      nombre: e.target.elements.nombreCanal.value,
      mensajes: []
    }

    await setDoc(doc(db, 'canales', `${id}`), nuevoCanal);

    const agregarCanal = {
      id: id,
      nombre: e.target.elements.nombreCanal.value,
    }

    await updateDoc(doc(db, `usuarios/${usuario.uid}`), {
      canales: arrayUnion(agregarCanal)
    })

    setMostrarModal(false)
    obtenerListaCanales(usuario.uid)
  }

  return (
    <>
    <div className={styles.overlay}>
      <div className={styles.modalCard}>
        <div className={styles.header}>
          <h4>Crear Nuevo Canal</h4>
          <button onClick={() => setMostrarModal(false)} className={styles.close}><i className="fas fa-times-circle"></i></button>
        </div>
        <form onSubmit={crearCanal}>
          <div>
            <label htmlFor="nombreCanal">Nombre del Canal</label>
            <input type="text" id='nombreCanal' name='nombreCanal' autoComplete='off' autoFocus />
          </div>
          <button className={styles.send}>Crear</button>
        </form>
      </div>
    </div>
  </>
  );
}

export default ModalCrear;
