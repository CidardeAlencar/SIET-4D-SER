import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

import Diapositiva1 from '../assets/Diapositiva1.jpg';
import Diapositiva2 from '../assets/Diapositiva2.jpg';
import Diapositiva3 from '../assets/Diapositiva3.jpg';
import Diapositiva4 from '../assets/Diapositiva4.jpg';
import Diapositiva5 from '../assets/Diapositiva5.jpg';
import Diapositiva6 from '../assets/Diapositiva6.jpg';
import Diapositiva7 from '../assets/Diapositiva7.jpg';
import Video1 from '../assets/Video1.mp4';
import Video2 from '../assets/Video2.mp4';
import Video3 from '../assets/Video3.mp4';

const isVideo = (title) => {
  const videoExtensions = ['mp4', 'webm', 'ogg'];
  const fileExtension = title.split('.').pop().toLowerCase();
  return videoExtensions.includes(fileExtension);
};

const Instruccion = () => {
  const [firebaseSlides, setFirebaseSlides] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'multimedia'), (snapshot) => {
      const multimediaData = snapshot.docs.map(doc => {
        const title = doc.data().title;
        return {
          id: doc.id,
          type: isVideo(title) ? 'video' : 'image',
          src: doc.data().url,
          alt: doc.data().title,
          caption: doc.data().title
        };
      });
      setFirebaseSlides(multimediaData);
    });
    return () => unsubscribe();
  }, []);

  const slides = [
    {
      type: 'video',
      src: Video3,
      alt: 'Descripción del video 1',
      caption: 'Explicación o título para el video 1'
    },
    {
      type: 'image',
      src: Diapositiva1,
      alt: 'Descripción de la imagen 1',
      caption: 'Explicación o título para la imagen 1'
    },
    {
      type: 'image',
      src: Diapositiva2,
      alt: 'Descripción de la imagen 2',
      caption: 'Explicación o título para la imagen 2'
    },
    {
      type: 'video',
      src: Video1,
      alt: 'Descripción del video 1',
      caption: 'Explicación o título para el video 1'
    },
    {
      type: 'image',
      src: Diapositiva3,
      alt: 'Descripción de la imagen 3',
      caption: 'Explicación o título para la imagen 3'
    },
    {
      type: 'image',
      src: Diapositiva4,
      alt: 'Descripción de la imagen 4',
      caption: 'Explicación o título para la imagen 4'
    },
    {
      type: 'image',
      src: Diapositiva5,
      alt: 'Descripción de la imagen 5',
      caption: 'Explicación o título para la imagen 5'
    },
    {
      type: 'image',
      src: Diapositiva6,
      alt: 'Descripción de la imagen 6',
      caption: 'Explicación o título para la imagen 6'
    },
    {
      type: 'image',
      src: Diapositiva7,
      alt: 'Descripción de la imagen 7',
      caption: 'Explicación o título para la imagen 7'
    },
    {
      type: 'video',
      src: Video2,
      alt: 'Descripción del video 1',
      caption: 'Explicación o título para el video 1'
    }
  ];

  return (
    <div className="instruccion-container">
      <Carousel showThumbs={false} autoPlay={false} infiniteLoop>
        {slides.map((slide, index) => (
          <div key={index}>
            {slide.type === 'image' ? (
              <img src={slide.src} alt={slide.alt} />
            ) : (
              <video controls autoPlay loop muted style={{ width: '100%' }}>
                <source src={slide.src} type="video/mp4" />
                Tu navegador no sporta el video.
              </video>
            )}
            {/* Puedes descomentar la línea de abajo si quieres incluir captions */}
            {/* <p className="legend">{slide.caption}</p> */}
          </div>
        ))}
        {/* Agregar multimedia de Firebase */}
        {firebaseSlides.map((slide, index) => (
          <div key={`firebase-${index}`}>
            {slide.type === 'image' ? (
              <img src={slide.src} alt={slide.alt} />
            ) : (
              <video controls autoPlay loop muted style={{ width: '100%' }}>
                <source src={slide.src} type="video/mp4" />
                Tu navegador no soporta el video.
              </video>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Instruccion;
