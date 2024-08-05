import {React, useState, useEffect} from 'react';
import { signOut } from 'firebase/auth';
import { auth,db } from '../firebase'; 
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { FaPrint } from 'react-icons/fa';
import PrintComponent from './PrintComponent';




const Admin = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const rowsPerPage = 5;
  const [selectedRow, setSelectedRow] = useState(null);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const studentsSnapshot = await getDocs(collection(db, 'students'));
  //       const studentsList = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  //       const evaluationsSnapshot = await getDocs(collection(db, 'evaluations'));
  //       const evaluationsList = evaluationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  //       // Combina los datos de las dos colecciones
  //       const combinedData = studentsList.map(student => {
  //         const evaluation = evaluationsList.find(evaluation => evaluation.id === student.id);
  //         return {
  //           ...student,
  //           score: evaluation ? evaluation.score : null,
  //           practical: evaluation ? evaluation.practical : null,
  //           timestamp: evaluation ? evaluation.timestamp : null,
  //         };
  //       });
  //       combinedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  //       setData(combinedData);
  //     } catch (error) {
  //       console.error('Error fetching data from Firestore:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);


  useEffect(() => {
    const unsubscribeStudents = onSnapshot(collection(db, 'students'), (studentsSnapshot) => {
      const studentsList = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const unsubscribeEvaluations = onSnapshot(collection(db, 'evaluations'), (evaluationsSnapshot) => {
        const evaluationsList = evaluationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Combina los datos de las dos colecciones
        const combinedData = studentsList.map(student => {
          const evaluation = evaluationsList.find(evaluation => evaluation.id === student.id);
          return {
            ...student,
            score: evaluation ? evaluation.score : null,
            practical: evaluation ? evaluation.practical : null,
            timestamp: evaluation ? evaluation.timestamp : null,
          };
        });
        combinedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setData(combinedData);
      });

      return () => unsubscribeEvaluations();
    });

    return () => unsubscribeStudents();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Cierre de sesión exitoso');
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // const data = [
  //   { name: 'Juan Pérez', theoretical: 90, practical: 85, date: '2024-07-30' },
  //   { name: 'María López', theoretical: 95, practical: 88, date: '2024-07-30' },
  //   { name: 'Carlos Sánchez', theoretical: 80, practical: 82, date: '2024-07-29' },
  //   { name: 'Ana García', theoretical: 92, practical: 89, date: '2024-07-28' },
  //   { name: 'Luis Fernández', theoretical: 85, practical: 87, date: '2024-07-27' },
  //   { name: 'Sofía Martínez', theoretical: 88, practical: 90, date: '2024-07-26' },
  //   // Más datos pueden ser añadidos aquí
  // ];

  // Calcula las filas a mostrar en la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // const handlePrint = (row) => {
  //   // Crea una nueva ventana
  //   const printWindow = window.open('', '_blank');
  //   if (printWindow) {
  //     printWindow.document.write('<html><head><title>Imprimir</title></head><body>');
  //     printWindow.document.write(`<h1>Detalle de la Evaluación</h1>`);
  //     printWindow.document.write(`<p><strong>Nombre:</strong> ${row.nombre} ${row.apellido}</p>`);
  //     printWindow.document.write(`<p><strong>Nota Teórica:</strong> ${row.score}</p>`);
  //     printWindow.document.write(`<p><strong>Nota Práctica:</strong> ${row.practical}</p>`);
  //     printWindow.document.write(`<p><strong>Fecha:</strong> ${row.timestamp}</p>`);
  //     printWindow.document.write('</body></html>');
  //     printWindow.document.close(); // Cierra el documento
  //     printWindow.print(); // Abre el diálogo de impresión
  //   }
  // };

  return (
    <div className='admin-container'>
      
      <h1 className='admin-title'>Administrador</h1>
      
      <table className='admin-table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nota Teórica</th>
            <th>Nota Práctica</th>
            <th>Fecha</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td className='first'>{row.nombre} {row.apellido}</td>
              <td>{row.score}</td>
              <td>{row.practical}</td>
              <td>{row.timestamp}</td>
              <td>
              <FaPrint 
                  onClick={() => { setSelectedRow(row); }}
                  className='printIcon'
                  title="Imprimir"
                /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
          className='pagination-button'
        >
          Anterior
        </button>
        <span>{currentPage} de {totalPages}</span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className='pagination-button'
        >
          Siguiente
        </button>
      </div>
      <button className='logout-button' onClick={handleLogout}>Cerrar sesión</button>

      {selectedRow && <PrintComponent row={selectedRow} />}
      
    </div>
  );
};

export default Admin;
