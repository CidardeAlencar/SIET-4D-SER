import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setStudentType, setStudentData } from '../actions';

import nuevo from '../assets/nuevo.png';
import antiguo from '../assets/antiguo.png';

const carreras = [
  'Ingeniería de Sistemas',
  'Ingeniería Civil',
  'Ingeniería Industrial',
  'Ingeniería Electrónica',
  'Ingeniería Mecátronica'
];

function Estudiante() {

    const dispatch = useDispatch();
    const studentType = useSelector((state) => state.studentType);

    const handleStudentTypeChange = (e) => {
        dispatch(setStudentType(e.target.value));
    };

    const handleInputChange = (e) => {
        dispatch(setStudentData({ [e.target.name]: e.target.value }));
    };

  return (
    <div className='card'>
      <h2>Estudiante</h2>
      {!studentType && (
      <div className='card-pictures'>
        <label className='card-option'>
          <input
            className='radio'
            type="radio"
            value="nuevo"
            checked={studentType === 'nuevo'}
            onChange={handleStudentTypeChange}
          />
          <img
            src={nuevo}
            alt="Estudiante Nuevo"
            onClick={() => setStudentType('nuevo')}
            style={{
              border: studentType === 'nuevo' ? '2px solid blue' : '2px solid transparent',
              cursor: 'pointer',
              width: '150px'
            }}
          />
          Estudiante Nuevo
        </label>
        
        <label className='card-option'>
          <input
            className='radio'
            type="radio"
            value="antiguo"
            checked={studentType === 'antiguo'}
            onChange={handleStudentTypeChange}
          />
          <img
            src={antiguo}
            alt="Estudiante Antiguo"
            onClick={() => setStudentType('antiguo')}
            style={{
              border: studentType === 'antiguo' ? '2px solid red' : '2px solid transparent',
              cursor: 'pointer',
              width: '150px'
            }}
          />
          Estudiante Antiguo
        </label>
      </div>
      )}
      {studentType === 'nuevo' && (
        <form className='form'>
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleInputChange} />
          <input type="text" name="apellido" placeholder="Apellido" onChange={handleInputChange} />
          <input type="text" name="carnet" placeholder="Carnet de Identidad" onChange={handleInputChange} />
          <input type="text" name="saga" placeholder="Codigo Saga" onChange={handleInputChange} />
          {/* <input type="text" name="carrera" placeholder="Carrera" onChange={handleInputChange} /> */}
          <select name="carrera" onChange={handleInputChange}>
            <option value="">Selecciona una carrera</option>
            {carreras.map((carrera, index) => (
              <option key={index} value={carrera}>{carrera}</option>
            ))}
          </select>
        </form>
      )}
      {studentType === 'antiguo' && (
        <form className='form'>
          <input type="text" name="carnet" placeholder="Buscar por Carnet de Identidad" onChange={handleInputChange} />
        </form>
      )}
    </div>
  )
}

export default Estudiante