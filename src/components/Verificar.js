import React from 'react'
import { useSelector } from 'react-redux';

function Verificar() {
    const studentData = useSelector((state) => state.studentData);
  return (
    <div className='card'>
        <h2>Verificar</h2>
        <pre>{JSON.stringify(studentData, null, 2)}</pre>
        <label>
        <input type="checkbox" /> Confirmo que estos datos son correctos
        </label>
    </div>
  )
}

export default Verificar