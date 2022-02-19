import React from 'react';
import styles from './ModalAbandonar.module.css'

function ModalAbandonar({ setMostrarModal, canalActivo, abandonarCanal }) {

  return (
    <>
    <div className={styles.overlay}>
      <div className={styles.modalCard}>
        <div className={styles.header}>
          <h4>Abandonar Canal</h4>
        </div>
        <div>
          <p>¿Estas seguro que quieres abandonar el canal #<span>{canalActivo.nombre}</span>?</p>
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
