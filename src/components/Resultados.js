import React from 'react'
import { useSelector } from 'react-redux';

function Resultados() {
    const evaluationResults = useSelector((state) => state.evaluationResults);
  return (
    <div className='card'>
        <h2>Resultado</h2>
        <pre>{JSON.stringify(evaluationResults, null, 2)}</pre>
    </div>
  )
}

export default Resultados