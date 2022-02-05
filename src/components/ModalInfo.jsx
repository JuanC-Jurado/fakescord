import React from "react";
import styles from "./ModalInfo.module.css";

function ModalInfo({ setMostrarModalInfo }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modalCard}>
        <div className={styles.header}>
          <h4>Acerca de la Aplicación</h4>
          <button
            onClick={() => setMostrarModalInfo(false)}
            className={styles.close}
          >
            <i className="fas fa-times-circle"></i>
          </button>
        </div>
        <div className={styles.contenido}>
          <div>
            <h5>Construido con:</h5>
            <p className={styles.react}>ReactJS <i className="fab fa-react"></i></p>
          </div>

          <div className={styles.aboutMe}>
            <p>Desarrollado por Juan Jurado</p>
            <div className={styles.socialAnchorSec}>
              <a
                className={styles.socialButton}
                href="https://github.com/JuanC-Jurado"
                target='_blank'
                rel="author"
              >
                <div>
                  <i class="fab fa-github"></i>
                </div>
              </a>
              <a
                className={styles.socialButton}
                href="https://www.instagram.com/x.juanj_02/"
                target='_blank'
                rel='author'
              >
                <div>
                  <i class="fab fa-instagram"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalInfo;
