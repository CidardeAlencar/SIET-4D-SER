import React, { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSection, setStudentData } from './actions';

import Introducción from './components/Introduccion';
import Estudiante from './components/Estudiante';
import Verificar from './components/Verificar';
import Evaluacion from './components/Evaluacion';
import Resultados from './components/Resultados';
import logo from './assets/emi.png';
// firebase
import { doc, setDoc, getDoc} from 'firebase/firestore';
import { db } from './firebase'; 
//Sweetalert2
import Swal from 'sweetalert2';

function App() {
  const section = useSelector((state) => state.section);
  const studentData = useSelector((state) => state.studentData);
  const studentType = useSelector((state) => state.studentType);
  const dispatch = useDispatch();
  const [isIntroductionChecked, setIsIntroductionChecked] = useState(false);
  const [isVerifyChecked, setIsVerifyChecked] = useState(false);

  const isFormValid = () => {
    return Object.values(studentData).every(value => value.trim() !== '');
  };

  const renderSection = () => {
    switch (section) {
      case 'Introducción':
        return <Introducción onCheckboxChange={setIsIntroductionChecked} />;
      case 'Estudiante':
        return <Estudiante />;
      case 'Verificar':
        return <Verificar onCheckboxChange={setIsVerifyChecked}/>;
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
  const nextSection = async(currentSection) => {
    if (currentSection === 'Verificar' && isVerifyChecked && studentType==='nuevo') {
      try {
        const studentDoc = doc(db, 'students', studentData.carnet);
        const docSnap = await getDoc(studentDoc);
  
        if (docSnap.exists()) {
          Swal.fire({
            icon: 'warning',
            title: 'Documento ya existe',
            text: 'Los datos del carnet ya están registrados.',
          });
          return currentSection;
        } else {
          await setDoc(studentDoc, studentData);
          Swal.fire({
            icon: 'success',
            title: 'Datos guardados',
            text: 'Los datos del estudiante se han guardado exitosamente.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error al guardar los datos: ${error.message}`,
        });
        return currentSection;
      }
    }
    if (currentSection === 'Estudiante' && studentType==='antiguo') {
      try {
        const studentDoc = doc(db, 'students', studentData.carnet);
        const docSnap = await getDoc(studentDoc);

        if (docSnap.exists()) {
          dispatch(setStudentData(docSnap.data()));
          Swal.fire({
            icon: 'success',
            title: 'Datos cargados',
            text: 'Los datos del estudiante se han cargado exitosamente.',
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'No encontrado',
            text: 'No se encontraron datos para el carnet proporcionado.',
          });
          return currentSection;
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error al buscar los datos: ${error.message}`,
        });
        return currentSection;
      }
    }
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
  const handleNextSection = async () => {
    const nextSec = await nextSection(section);
    dispatch(setSection(nextSec));
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
          {section !== 'Introducción' && section !== 'Estudiante' && section !== 'Evaluación' &&(
            <button onClick={() => dispatch(setSection(backSection(section)))}>
              Atrás
            </button>
          )}
          {section !== 'Resultados' && (
            <button 
              // onClick={() => dispatch(setSection(nextSection(section)))} 
              onClick={handleNextSection}
              disabled={
                (section === 'Introducción' && !isIntroductionChecked) ||
                (section === 'Estudiante' && !isFormValid() && studentType==='nuevo') ||
                (section === 'Estudiante' && studentType===null) ||
                (section === 'Verificar' && !isVerifyChecked)
              }>
              Siguiente
            </button>
          )}
        </div>
      </main>
    </div>
  );


}

export default App;
