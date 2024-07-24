import React from 'react'
import { useDispatch } from 'react-redux';
import { setEvaluationResults } from '../actions';

function Evaluacion() {
    const dispatch = useDispatch();

  const handleEvaluationSubmit = (results) => {
    dispatch(setEvaluationResults(results));
  };

  return (
    <div>
      <h2>Evaluación</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const results = {}; // aquí deberías capturar las respuestas
          handleEvaluationSubmit(results);
        }}
      >
        {/* Añade aquí tus preguntas de evaluación */}
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Evaluacion