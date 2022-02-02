import { useState } from "react";
import Home from "./views/Home";
import Login from "./views/Login";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "./credenciales";

const auth = getAuth(firebaseApp);

function App() {
  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if(userFirebase){
      setUsuario(userFirebase)
    } else {
      setUsuario(null)
    }

  })

  return (
    <div className="App">
      {usuario ? <Home usuario={usuario} /> : <Login />}
    </div>
  );
}

export default App;
