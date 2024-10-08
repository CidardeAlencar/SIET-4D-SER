// PrintComponent.js
import { useEffect } from 'react';
import logo from '../assets/emi.png'; // Ajusta la ruta según la ubicación de tu componente

const PrintComponent = ({ row }) => {
  useEffect(() => {
    if (row) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir</title>
            <link rel="stylesheet" href="../App.css">
            <style>
              @media print {
                body {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                    sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                    background-color: #e0e0e0a8;
                }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; }
                th { background-color: #f2f2f2; }
                .App-logo {
                  height: 15vmin;
                  pointer-events: none;
                  margin: 3vmin;
                }
                .App { 
                  text-align: center; 
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                }
                .App-header {
                  background-color: #282c34;
                  min-height: 10vh;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  font-size: calc(10px + 2vmin);
                  color: white;
                  border-bottom: #1360fc 7px solid;
                }
                .App-header .title{
                  margin: 0 0 2vmin 0;
                }
                .admin-container {
                  width: 100%;
                  max-width: 500px;
                  padding: 20px;
                  box-shadow: 25px 25px 40px 10px rgba(0, 0, 0, 0.5);
                  border-radius: 8px;
                  background-color: #fff;
                  margin: 50px 0;
                }
                .admin-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
                }

                .admin-table th, .admin-table td {
                  padding: 12px 0;
                  text-align: center;
                  border-bottom: 1px solid #ddd;
                }

                .status {
                  font-weight: bold;
                  padding-left: 10px;
                }
                .status.aprobado {
                  color: green;
                }
                .status.reprobado {
                  color: red;
                }
                .course-details p{
                  margin: 2px;
                }
                .signature-container {
                  text-align: center;
                  margin-top: 70px;
                }

                .signature-line {
                  width: 200px;
                  margin: 10px auto;
                  border-bottom: 1px solid #000;
                }

              }

            </style>
          </head>
          <body>
            <div class="App">
                <header class="App-header">
                    <img src="${logo}" class="App-logo" alt="logo" />
                      <div class="course-details">
                        <p><strong>Nombre:</strong> ${row.nombre} ${row.apellido}</p>
                        <p><strong>Carrera:</strong> ${row.carrera}</p>
                        <p><strong>Asignatura:</strong> Materia de Tiro</p>
                        <p><strong>Código:</strong> ${row.saga}</p>
                        <p><strong>Fecha:</strong> ${row.timestamp[0]}</p>
                      </div>
                </header>
                <main class='Admin-container'>
                  <h1>Datos del Estudiante</h1>
                  <table class='admin-table'>
                    <tr>
                      <th>Nota Teórica</th>
                      <td>${row.score && row.score.length > 0 ? row.score[row.score.length - 1] : 0}
                      <span class="status ${row.score && row.score.length > 0 ? (row.score[row.score.length - 1] > 5 ? 'aprobado' : 'reprobado') : 'reprobado'}">
                        ${row.score && row.score.length > 0 ? (row.score[row.score.length - 1] > 5 ? 'APROBÓ' : 'NO APROBÓ') : 'NO APROBÓ'}
                      </span></td>
                    </tr>
                    <tr>
                      <th>Nota Práctica</th>
                      <td>${row.practical && row.practical.length > 0 ? row.practical[row.practical.length - 1] : 0}
                      <span class="status ${row.practical && row.practical.length > 0 ? (row.practical[row.practical.length - 1] > 17 ? 'aprobado' : 'reprobado') : 'reprobado'}">
                        ${row.practical && row.practical.length > 0 ? (row.practical[row.practical.length - 1] > 17 ? 'APROBÓ' : 'NO APROBÓ') : 'NO APROBÓ'}
                      </span></td>
                    </tr>
                    <tr>
                      <th>Posición de pie</th>
                      <td>${row.pospie && row.pospie.length > 0 ? row.pospie[row.pospie.length - 1] : 0}
                      <span class="status ${row.pospie && row.pospie.length > 0 ? (row.pospie[row.pospie.length - 1] > 0 ? 'aprobado' : 'reprobado') : 'reprobado'}">
                        ${row.pospie && row.pospie.length > 0 ? (row.pospie[row.pospie.length - 1] > 0 ? 'APROBÓ' : 'NO APROBÓ') : 'NO APROBÓ'}
                      </span></td>
                    </tr>
                    <tr>
                      <th>Posición de rodilla</th>
                      <td>${row.posrod && row.posrod.length > 0 ? row.posrod[row.posrod.length - 1] : 0}
                      <span class="status ${row.posrod && row.posrod.length > 0 ? (row.posrod[row.posrod.length - 1] > 0 ? 'aprobado' : 'reprobado') : 'reprobado'}">
                        ${row.posrod && row.posrod.length > 0 ? (row.posrod[row.posrod.length - 1] > 0 ? 'APROBÓ' : 'NO APROBÓ') : 'NO APROBÓ'}
                      </span></td>
                    </tr>
                    <tr>
                      <th>Fecha de Evaluación</th>
                      <td>${row.timestamp && row.timestamp.length > 0 ? row.timestamp[row.timestamp.length - 1] : '-'}</td>
                    </tr>
                  </table>
                </main>
                <div class="signature-container">
                    <div class="signature-line"></div>
                    <p>Firma del Estudiante</p>
                  </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }, [row]);

  return null;
};

export default PrintComponent;
