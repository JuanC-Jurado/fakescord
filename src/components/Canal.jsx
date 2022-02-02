import React from 'react';
import styles from './Canal.module.css'

function Canal({canalData, setCanalActivo}) {
  return (
    <div onClick={() => setCanalActivo(canalData)} className={styles.canal}>
      <p><span className={styles.hash}>#</span>{canalData.nombre}</p>
    </div>
  );
}

export default Canal;