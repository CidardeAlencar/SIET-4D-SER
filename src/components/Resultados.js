import React from 'react'
import { useSelector } from 'react-redux';

function Resultados() {
    const evaluationResults = useSelector((state) => state.evaluationResults);
  return (
    <div>
        <h2>Resultados</h2>
        <pre>{JSON.stringify(evaluationResults, null, 2)}</pre>
    </div>
  )
}

export default Resultados