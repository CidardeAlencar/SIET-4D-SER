import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const NotePopup = ({ onClose, onSubmit }) => {
  const [instruido, setInstruido] = useState('');
  const [instructor, setInstructor] = useState('');
  const [recomendacion, setRecomendacion] = useState('');

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Título principal
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text('Revisión y Balance de los Resultados', pageWidth / 2, 20, null, null, 'center');

    // Línea separadora
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(20, 25, pageWidth - 20, 25);

    // Información del Instruido
    doc.setFontSize(16);
    doc.setFont('Helvetica', 'normal');
    doc.text('Instruido:', 20, 40);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text(instruido || 'N/A', pageWidth / 2, 40, null, null, 'center');

    // Información del Instructor
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Instructor:', 20, 50);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text(instructor || 'N/A', pageWidth / 2, 50, null, null, 'center');

    // Recomendaciones
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Recomendación:', 20, 65);
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(recomendacion || 'Sin recomendaciones.', pageWidth / 2, 75, { maxWidth: pageWidth - 40, align: 'center', lineHeightFactor: 1.5 });

    // Marca de agua
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(50);
    doc.setFont('Helvetica', 'bold');
    doc.text('RESERVADO', pageWidth / 2, 150, null, null, 'center');

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Documento generado por SIET-4D', pageWidth / 2, 290, null, null, 'center');

    // Guardar el PDF
    doc.save(`${instruido}.pdf`);
  };

  const isFormComplete = instruido && instructor && recomendacion;

  return (
    <div className='note-popup'>
      <div className='note-popup-content'>
        <h2>Revisión y Balance de los Resultados</h2>
        <form>
          <div className='form-group'>
            <label>Instruido:</label>
            <input 
              type='text' 
              value={instruido} 
              onChange={(e) => setInstruido(e.target.value)} 
              required 
            />
          </div>
          <div className='form-group'>
            <label>Instructor:</label>
            <input 
              type='text' 
              value={instructor} 
              onChange={(e) => setInstructor(e.target.value)} 
              required 
            />
          </div>
          <div className='form-group'>
            <label>Recomendación:</label>
            <textarea 
              value={recomendacion} 
              onChange={(e) => setRecomendacion(e.target.value)} 
              required 
              className='full-width'
            />
          </div>
          <div className='form-group'>
            <div className="popup-buttons">
              <button type='button' onClick={onClose} className="logout-button">Atrás</button>
              <button 
                type='button' 
                onClick={handleDownload} 
                className="pagination-button"
                disabled={!isFormComplete} // Deshabilita el botón si el formulario no está completo
              >
                Descargar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotePopup;
