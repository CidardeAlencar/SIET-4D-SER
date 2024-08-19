import React, { useRef } from 'react';
import logo from '../assets/emi.png';

const DetailsPopup = ({ row, onClose, onPrint }) => {
  const contentRef = useRef();

  const handlePrint = () => {
    const printContents = contentRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={contentRef}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3 className="title">Seguimiento del Estudiante</h3>
        </header>
        <div className="table-container">
          <table className="admin-table">
            <tbody>
              <tr>
                <td><b>Nombre:</b></td>
                <td>{row.nombre} {row.apellido}</td>
              </tr>
              <tr>
                <td><b>Nota Teórica:</b></td>
                <td>
                  {row.score ? (
                    row.score.map((score, index) => (
                      <span key={index}>
                        {score}
                        {index < row.score.length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    'No disponible'
                  )}
                </td>
              </tr>
              <tr>
                <td><b>Nota Práctica:</b></td>
                <td>
                  {row.practical ? (
                    row.practical.map((practical, index) => (
                      <span key={index}>
                        {practical}
                        {index < row.practical.length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    'No disponible'
                  )}
                </td>
              </tr>
              <tr>
                <td><b>Posición de pie:</b></td>
                <td>
                  {row.pospie ? (
                    row.pospie.map((pospie, index) => (
                      <span key={index}>
                        {pospie}
                        {index < row.pospie.length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    'No disponible'
                  )}
                </td>
              </tr>
              <tr>
                <td><b>Posición de rodilla:</b></td>
                <td>
                  {row.posrod ? (
                    row.posrod.map((posrod, index) => (
                      <span key={index}>
                        {posrod}
                        {index < row.posrod.length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    'No disponible'
                  )}
                </td>
              </tr>
              <tr>
                <td><b>Fecha de Evaluación:</b></td>
                <td>
                  {row.timestamp ? (
                    row.timestamp.map((time, index) => (
                      <span key={index}>
                        {time}
                        {index < row.timestamp.length - 1 && <br />}
                      </span>
                    ))
                  ) : (
                    'No disponible'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="popup-buttons">
          <button onClick={onClose} className="logout-button">Atrás</button>
          <button onClick={handlePrint} className="pagination-button">Imprimir</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPopup;
