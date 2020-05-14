import React, { Fragment, useState } from 'react';
import {v4 as uuid} from "uuid";
import PropTypes from 'prop-types';

const Form = ({crearCita}) => {

    //State para agregar citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //State para comprobar si hay errores
    const [ error, actualizarError ] = useState(false)

    //Extraer valores 
    /* 
        ##########
        Destructuración del objecto cita:
        De esta forma accedo directamente a las propiedades del objeto

        Ejemplo:
        antes: cita.macota
        ahora: mascota
        ##########
    */ 
    //destructuración de objeto cita: de esta forma no tengo que escribir cita.mascota, tengo acceso a la propiedad directamente
    const { mascota, propietario, fecha, hora, sintomas} = cita;

    //Función que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value 
        })
    }

    //Función que se ejecuta cuando el usuario presiona en el boón Agregar cita
    const submitCita = e => {
        //Prevenir la acción por defecto, ya que pasa los datos por GET
        e.preventDefault();
        //Validar datos
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
            actualizarError(true);
            return;
        }
        //Eliminar mensaj de error previo
        actualizarError(false);
        //Asignar un ID
        cita.id = uuid();
        //Crear la cita
        crearCita(cita);
        //Reiniciar form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
        e.currentTarget.reset();
    }

    return (
      <Fragment>
        <h2>Crear cita</h2>

        {/*Mostrar mensaje de error si es true*/}
        { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }

        <form
            onSubmit={submitCita}
        >
          <label>Nombre de la mascota</label>
          <input
            type="text"
            name="mascota"
            className="u-full-width"
            placeholder="Nombre mascota"
            onChange={actualizarState}
            vale={mascota}
          />

          <label>Nombre del dueño</label>
          <input
            type="text"
            name="propietario"
            className="u-full-width"
            placeholder="Nombre dueño"
            onChange={actualizarState}
            vale={propietario}
          />

          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            className="u-full-width"
            onChange={actualizarState}
            vale={fecha}
          />

          <label>Hora</label>
          <input
            type="time"
            name="hora"
            className="u-full-width"
            onChange={actualizarState}
            vale={hora}
          />

          <label>Síntomas</label>
          <textarea
            className="u-full-width"
            name="sintomas"
            onChange={actualizarState}
            vale={sintomas}
          ></textarea>

          <button type="submit" className="u-full-width button-primary">
            Agregar cita
          </button>
        </form>
      </Fragment>
    );
}

//Documentar componente
Form.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Form;