import { React, useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase'; 
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { FaPrint, FaEye, FaFileSignature } from 'react-icons/fa';
import PrintComponent from './PrintComponent';
import DetailsPopup from './DetailsPopup';
import NotePopup from './NotePopup';

const Admin = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const rowsPerPage = 5;
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowForDetails, setSelectedRowForDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showNotePopup, setShowNotePopup] = useState(false);

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
            pospie: evaluation ? evaluation.pospie : null,
            posrod: evaluation ? evaluation.posrod : null,
            timestamp: evaluation ? evaluation.timestamp : null,
          };
        });
        // combinedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        combinedData.sort((a, b) => {
          const aLastTimestamp = a.timestamp && a.timestamp.length > 0 ? new Date(a.timestamp[a.timestamp.length - 1]) : new Date(0);
          const bLastTimestamp = b.timestamp && b.timestamp.length > 0 ? new Date(b.timestamp[b.timestamp.length - 1]) : new Date(0);
          return bLastTimestamp - aLastTimestamp;
        });
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

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleViewDetails = (row) => {
    setSelectedRowForDetails(row);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    
    // Sincroniza `selectedRow` si la fila seleccionada para detalles es la misma
    if (selectedRowForDetails === selectedRow) {
      setSelectedRow(null);
    }
  };

  const handlePrint = (row) => {
    setSelectedRow(row);
    // Aquí puedes implementar la lógica de impresión
  };

  const handleCreateNote = () => {
    setShowNotePopup(true);
  };

  const handleCloseNotePopup = () => {
    setShowNotePopup(false);
  };

  const handleSubmitNote = (noteData) => {
    console.log('Nota guardada:', noteData);
    setShowNotePopup(false);
  };

  return (
    <div className='admin-container'>
      <h1 className='admin-title'>ADMINISTRACIÓN</h1>
      <FaFileSignature size={25} className='note-icon' title="Crear Nota" onClick={handleCreateNote}/>
      <div className='table-responsive'>
        <table className='admin-table'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nota Teórica</th>
              <th>Nota Práctica</th>
              <th>Posición de pie</th>
              <th>Posición de rodilla</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td className='first'>{row.nombre} {row.apellido}</td>
                <td>{row.score && row.score.length > 0 ? row.score[row.score.length - 1] : 0} / 10</td>
                <td>{row.practical && row.practical.length > 0 ? row.practical[row.practical.length - 1] : 0} / 30</td>
                <td>{row.pospie && row.pospie.length > 0 ? row.pospie[row.pospie.length - 1] : 0} / 10</td>
                <td>{row.posrod && row.posrod.length > 0 ? row.posrod[row.posrod.length - 1] : 0} / 10</td>
                <td>{row.timestamp && row.timestamp.length > 0 ? row.timestamp[row.timestamp.length - 1] : 0}</td>
                {/* <td>{row.timestamp}</td> */}
                <td>
                  <FaPrint 
                    onClick={() => handlePrint(row)}
                    className='printIcon'
                    title="Imprimir"
                  />
                  <FaEye 
                    onClick={() => handleViewDetails(row)}
                    className='viewIcon'
                    title="Ver más detalles"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

      {showPopup && 
        <DetailsPopup
          row={selectedRowForDetails} 
          onClose={handleClosePopup} 
          onPrint={() => handlePrint(selectedRowForDetails)} 
        />}

      {showNotePopup && 
        <NotePopup 
          onClose={handleCloseNotePopup} 
          onSubmit={handleSubmitNote} 
        />}

    </div>
  );
};

export default Admin;
