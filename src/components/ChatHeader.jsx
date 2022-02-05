import React from "react";
import styles from "./Chatheader.module.css";

function ChatHeader({ canalActivo, setMostrarModalAbandonar }) {
  return (
    <div className={styles.chat__header}>
      {/* Nombre del Canal */}
      <div className={styles.headerInnerContainer}>
        <h2 className={styles.chat__headerName}>
          <span className={canalActivo && styles.channelHashActive}>#</span>
          {canalActivo ? canalActivo.nombre : null}
        </h2>
      </div>
      {canalActivo ? (
        <>
          <div className={styles.channelInfoContainer}>
            <p className={styles.idChannel}>{`ID: ${canalActivo.id}`}</p>
          </div>
          <div className={styles.containerOutButton}>
            <button
              onClick={() => setMostrarModalAbandonar(true)}
              className={styles.getOutButton}
              title="Abandonar Canal"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </>
      ) : null}

      
    </div>
  );
}

export default ChatHeader;
