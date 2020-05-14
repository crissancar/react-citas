import React, { Fragment, useState, useEffect } from "react";
import Form from './components/Form.js';
import Cita from './components/Cita.js';

function App() {

  //Guardar citas en localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //Array de citas
  const [citas, guardarCitas] = useState([]);

  //useEffect para realizar ciertas operaciones cuando el State cambia
  useEffect( () => {
      if(citasIniciales){
        localStorage.setItem('citas', JSON.stringify(citas));
      }else{
        localStorage.setItem('citas', JSON.stringify([]));
      }
  }, [citas, citasIniciales]);

  //Función para leer y agregar las citas
  const crearCita = cita => {
    guardarCitas([ ...citas, cita ]);
  }

  //Función que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas': 'Tus citas';

  return (
    <Fragment>
      <h1>Administrador de citas</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita 
                key={cita.id} 
                cita={cita} 
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
