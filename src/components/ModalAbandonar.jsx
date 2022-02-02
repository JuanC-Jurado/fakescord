import { deleteDoc, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React from 'react';
import firebaseApp from '../credenciales';
import styles from './ModalAbandonar.module.css'

const db = getFirestore(firebaseApp);

function ModalAbandonar({ setMostrarModal, canalActivo, usuario, setCanalActivo }) {

  async function abandonarCanal() {
    const docuRef = doc(db, `usuarios/${usuario.uid}`);
    const snapshot = await getDoc(docuRef);
    
    const nuevaListaCanales = snapshot.data().canales.filter((canal) => {
      return canal.id !== canalActivo.id;
    })
    
    updateDoc(docuRef, {
      canales: nuevaListaCanales
    })

    setCanalActivo(null)
    setMostrarModal(false)
  }

  return (
    <>
    <div className={styles.overlay}>
      <div className={styles.modalCard}>
        <div className={styles.header}>
          <h4>Abandonar Canal</h4>
        </div>
        <div>
          <p>{`¿Estas seguro que quieres abandonar el canal #${canalActivo.nombre}`}</p>
          <div className={styles.buttonsContainer}>
            <button onClick={() => setMostrarModal(false)} className={styles.no}>No</button>
            <button onClick={abandonarCanal} className={styles.yes}>Si</button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default ModalAbandonar;
