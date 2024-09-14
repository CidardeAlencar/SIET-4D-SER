import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { collection, onSnapshot, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL,deleteObject  } from 'firebase/storage';

const MultimediaPopup = ({ onClose }) => {
  const [multimedia, setMultimedia] = useState([]);
  const [file, setFile] = useState(null);

  // Obtener multimedia de Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'multimedia'), (snapshot) => {
      const multimediaList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMultimedia(multimediaList);
    });
    return () => unsubscribe();
  }, []);

  // Manejar la eliminación de multimedia
  const handleDelete = async (id, fileUrl) => {
    try {
        const storageRef = ref(storage, fileUrl);
        await deleteObject(storageRef);
        await deleteDoc(doc(db, 'multimedia', id));
        console.log('Multimedia eliminada');
    } catch (error) {
      console.error('Error al eliminar multimedia:', error);
    }

  };

  // Manejar la adición de nueva multimedia
//   const handleAddMultimedia = async () => {
//     try {
//       // Agregar nueva multimedia, aquí se puede ajustar la lógica para cargar un archivo
//       await addDoc(collection(db, 'multimedia'), { url: 'new_url', title: 'Nueva Multimedia' });
//       console.log('Nueva multimedia agregada');
//     } catch (error) {
//       console.error('Error al agregar multimedia:', error);
//     }
//   };
const handleAddMultimedia = async () => {
    if (!file) {
      console.error("No se ha seleccionado ningún archivo");
      return;
    }

    try {
      const storageRef = ref(storage, `multimedia/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Opcional: aquí puedes manejar el progreso de la subida si es necesario
        },
        (error) => {
          console.error("Error al subir archivo:", error);
        },
        async () => {
          // Obtener la URL del archivo una vez subido
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Guardar la URL en Firestore
          await addDoc(collection(db, 'multimedia'), {
            url: downloadURL,
            title: file.name,
          });
          console.log("Nueva multimedia agregada");

          // Limpiar el archivo seleccionado
          setFile(null);
        }
      );
    } catch (error) {
      console.error('Error al agregar multimedia:', error);
    }
  };

  // Manejar la selección del archivo
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  return (
    <div className="note-popup">
      <div className="note-popup-content">
        <h2>Multimedia</h2>
        {multimedia.length === 0 ? (
          <p>No se ha agregado multimedia.</p>
        ) : (
          <ul className="multimedia-list">
            {multimedia.map((item) => (
              <li key={item.id} className="multimedia-item">
                <img src={item.url} alt={item.title} className="multimedia-thumbnail" />
                <span>{item.title}</span>
                <FaTrash className="delete-icon" onClick={() => handleDelete(item.id, item.url)} />
              </li>
            ))}
          </ul>
        )}
        <div className="popup-footer">
            <div className='file-select'>
                <input className="" type="file" onChange={handleFileChange} />
                <button onClick={handleAddMultimedia} className="pagination-button">Agregar Multimedia</button>
            </div>
        
        <button onClick={onClose} className="logout-button">Atrás</button>
        </div>
      </div>
    </div>
  );
};

export default MultimediaPopup;
