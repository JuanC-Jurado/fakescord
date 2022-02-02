import React from 'react';
import styles from './ModalUnirse.module.css'

import { arrayUnion, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import firebaseApp from '../credenciales';

const db = getFirestore(firebaseApp);

function Modal({ usuario, setMostrarModal, obtenerListaCanales }) {

  async function unirseCanal(e){
    e.preventDefault()

    const idCanal = e.target.elements.idCanal.value;

    const docuRef = doc(db, `canales/${idCanal}`);
    const snapshot = await getDoc(docuRef);

    if(snapshot.exists()){
      const datosCanal = {
        id: snapshot.data().id,
        nombre: snapshot.data().nombre
      }

      const canalesUsuarioRef = doc(db, `usuarios/${usuario.uid}`);

      await updateDoc(canalesUsuarioRef, {
        canales: arrayUnion(datosCanal)
      })

      setMostrarModal(false)
      obtenerListaCanales(usuario.uid)
    } else {
      // QUE HACER CUANDO EL CANAL NO EXISTE: ...
      console.log(snapshot.exists())
    }
  }

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modalCard}>
          <div className={styles.header}>
            <h4>Unirse a Canal</h4>
            <button onClick={() => setMostrarModal(false)} className={styles.close}><i className="fas fa-times-circle"></i></button>
          </div>
          <form onSubmit={unirseCanal}>
            <div>
              <label htmlFor="idCanal">ID del Canal</label>
              <input type="text" id='idCanal' name='idCanal' autoComplete='off' autoFocus />
            </div>
            <button className={styles.send}>Unirse</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Modal