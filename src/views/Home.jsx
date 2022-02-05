import React, { useEffect, useState } from "react";

import SideBar from "./SideBar";
import Chat from "./Chat";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import firebaseApp from "../credenciales";

const db = getFirestore(firebaseApp);

function Home({ usuario }) {
  const [canalActivo, setCanalActivo] = useState(null);
  const [mostrarSidebar, setMostrarSidebar] = useState(false);

  useEffect(() => {
    crearDoc(usuario.uid);
  }, []); //eslint-disable-line

  async function crearDoc(uid) {
    const docuRef = doc(db, "usuarios", `${uid}`);
    const snapShotDoc = await getDoc(docuRef);

    if (!snapShotDoc.exists()) {
      setDoc(docuRef, { canales: [] });
    }
  }

  return (
    <>
      <SideBar
        usuario={usuario}
        canalActivo={canalActivo}
        setCanalActivo={setCanalActivo}
        setMostrarSidebar={setMostrarSidebar}
        mostrarSidebar={mostrarSidebar}
      />

      <Chat
        usuario={usuario}
        canalActivo={canalActivo}
        setCanalActivo={setCanalActivo}
      />

      {mostrarSidebar ? <div
        style={{
          backgroundColor: '#0000008A',
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
          backdropFilter: 'blur(2px)',
        }}
      ></div> : null}
    </>
  );
}

export default Home;
