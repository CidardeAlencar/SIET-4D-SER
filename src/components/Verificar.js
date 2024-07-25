import React, {useState} from 'react'
import { useSelector } from 'react-redux';

function Verificar({onCheckboxChange}) {

  const [isChecked, setIsChecked] = useState(false);
  const studentData = useSelector((state) => state.studentData);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    onCheckboxChange(checked);
  };

  return (
    <div className='card'>
        <h2>Verificar</h2>
        {/* <pre>{JSON.stringify(studentData, null, 2)}</pre> */}
        <div className='student-data'>
          <p><strong>Nombre:</strong> {studentData.nombre}</p>
          <p><strong>Apellido:</strong> {studentData.apellido}</p>
          <p><strong>Carnet de Identidad:</strong> {studentData.carnet}</p>
          <p><strong>Código Saga:</strong> {studentData.saga}</p>
          <p><strong>Carrera:</strong> {studentData.carrera}</p>
        </div>
        <label className='custom-checkbox'>
          Confirmo que estos datos son correctos
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/> 
          <span className='checkmark'></span>
        </label>
    </div>
  )
}

export default Verificar