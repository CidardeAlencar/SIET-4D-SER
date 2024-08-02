//app
import React, { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSection, setStudentData } from './actions';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

//secciones
import Introducción from './components/Introduccion';
import Estudiante from './components/Estudiante';
import Verificar from './components/Verificar';
import Evaluacion from './components/Evaluacion';
import Resultados from './components/Resultados';
import Login from './components/Login';

//assets
import logo from './assets/emi.png';
import { FaSignInAlt } from 'react-icons/fa';

// firebase
import { doc, setDoc, getDoc} from 'firebase/firestore';
import { db } from './firebase'; 

//Sweetalert2
import Swal from 'sweetalert2';
import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/authContext';


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
            customClass: {
              confirmButton: 'custom-warning-button'
            }
          });
          return currentSection;
        } else {
          await setDoc(studentDoc, studentData);
          Swal.fire({
            icon: 'success',
            title: 'Datos guardados',
            text: 'Los datos del estudiante se han guardado exitosamente.',
            customClass: {
              confirmButton: 'custom-confirm-button'
            }
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error al guardar los datos: ${error.message}`,
          customClass: {
            confirmButton: 'custom-error-button'
          }
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
    <AuthProvider>
    <Router>
    <div className="App">
      <header className="App-header">     
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className='title'>Formulario de Evaluación y Registro</h3>
        <Link to="/login" className="login-icon">
          <FaSignInAlt size={20} />
        </Link>
        {/* Solucionar cerrar sesion en el Admin al presionar el login */}
        {/* <nav>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </nav> */}
      </header>
      <main>
        <Routes>
          <Route path="/" element={
          <div className='App-main'>
            {renderSection()}
            <div className='App-button'>
              {section !== 'Introducción' && section !== 'Estudiante' && section !== 'Evaluación' &&(
                <button onClick={() => dispatch(setSection(backSection(section)))}>
                  Atrás
                </button>
              )}
              {section !== 'Resultados' && section !== 'Evaluación' &&(
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
          </div>
         } />
         <Route path="/login" element={
            <div className='App-admin'>
              <Login />
            </div>
          } />
          {/* <Route path="/admin" element={
            <div className='App-admin'>
              <Admin/>
            </div>
          } /> */}
          <Route path="/admin" element={<ProtectedRoute element={
            <div className='App-admin'>
              <Admin/>
            </div>
            } />} />
         <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
      </main>
    </div>
    </Router>
    </AuthProvider>
  );


}

export default App;
