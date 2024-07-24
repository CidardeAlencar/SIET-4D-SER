import React, { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSection } from './actions';
import Introducción from './components/Introduccion';
import Estudiante from './components/Estudiante';
import Verificar from './components/Verificar';
import Evaluacion from './components/Evaluacion';
import Resultados from './components/Resultados';
import logo from './assets/emi.png';

function App() {
  const section = useSelector((state) => state.section);
  const dispatch = useDispatch();
  const [isIntroductionChecked, setIsIntroductionChecked] = useState(false);

  const renderSection = () => {
    switch (section) {
      case 'Introducción':
        return <Introducción onCheckboxChange={setIsIntroductionChecked} />;
      case 'Estudiante':
        return <Estudiante />;
      case 'Verificar':
        return <Verificar />;
      case 'Evaluación':
        return <Evaluacion />;
      case 'Resultados':
        return <Resultados />;
      default:
        return <Introducción onCheckboxChange={setIsIntroductionChecked} />;
    }
  };

  const backSection = (currentSection) => {
    switch (currentSection) {
      case 'Estudiante':
        return 'Introducción';
      case 'Verificar':
        return 'Estudiante';
      case 'Evaluación':
        return 'Verificar';
      case 'Resultados':
        return 'Evaluación';
      default:
        return 'Introducción';
    }
  };
  const nextSection = (currentSection) => {
    switch (currentSection) {
      case 'Introducción':
        return 'Estudiante';
      case 'Estudiante':
        return 'Verificar';
      case 'Verificar':
        return 'Evaluación';
      case 'Evaluación':
        return 'Resultados';
      default:
        return 'Introducción';
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className='title'>Formulario de Evaluación y Registro</h3>
      </header>
      <main className='App-main'>
        {renderSection()}
        <div className='App-button'>
          {section !== 'Introducción' && (
            <button onClick={() => dispatch(setSection(backSection(section)))}>Atrás</button>
          )}
          {section !== 'Resultados' && (
            <button onClick={() => dispatch(setSection(nextSection(section)))} disabled={section === 'Introducción' && !isIntroductionChecked}>Siguiente</button>
          )}
        </div>
      </main>
    </div>
  );


}

export default App;
