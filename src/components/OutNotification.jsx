import React from "react";
import styles from "./OutNotification.module.css";

function OutNotification({ messaggeData }) {
  return (
    <div className={styles.outNotification__card}>
      <div className={styles.card__photoContainer}>
        <img src={messaggeData.foto} alt="" />
      </div>
      <p><span>{messaggeData.usuario}</span> ha abandonado el canal</p>
    </div>
  );
}

export default OutNotification;
