import React, { useEffect, useState } from 'react';

import SideBar from './SideBar';
import Chat from './Chat';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseApp from '../credenciales';

const db = getFirestore(firebaseApp)

function Home({ usuario }) {
  
  const [canalActivo, setCanalActivo] = useState(null);

  useEffect(() => {
    crearDoc(usuario.uid)
  }, [])


  async function crearDoc(uid){
    const docuRef = doc(db, "usuarios", `${uid}`);
    const snapShotDoc = await getDoc(docuRef);

    if(!snapShotDoc.exists()){
      setDoc(docuRef, {canales: []})
    }
  }

  return (
    <div>
      <SideBar usuario={usuario} canalActivo={canalActivo} setCanalActivo={setCanalActivo} />
      <Chat usuario={usuario} canalActivo={canalActivo} setCanalActivo={setCanalActivo} />
    </div>
  )
}

export default Home;
