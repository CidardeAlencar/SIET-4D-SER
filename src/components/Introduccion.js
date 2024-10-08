import React, { useState } from 'react'

function Introduccion({onCheckboxChange}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    onCheckboxChange(checked);
  };

  return (
    <div className='card'>
        <h2 className='card-title'>Introducción</h2>
        <p className='card-content'>Bienvenido al Sistema de Evaluación y Registro. Este aviso sirve para informar que se realizará la evaluación teórica de la asignatura de Tiro, la cual es una parte fundamental de la formación militar.</p>
        <label className='custom-checkbox'>
          ¿ Esta seguro de proceder con la evaluación ?
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <span className='checkmark'></span>
        </label>
    </div>
  )
}

export default Introduccion