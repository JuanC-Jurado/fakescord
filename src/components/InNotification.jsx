import React from "react";
import styles from "./InNotification.module.css";

function InNotification({ messaggeData }) {
  return (
    <div className={styles.inNotification__card}>
      <div className={styles.card__photoContainer}>
        <img src={messaggeData.foto} alt="" />
      </div>
      <p><span>{messaggeData.usuario}</span> se ha unido al canal</p>
    </div>
  );
}

export default InNotification;
