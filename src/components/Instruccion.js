import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Diapositiva1 from '../assets/Diapositiva1.jpg';
import Diapositiva2 from '../assets/Diapositiva2.jpg';
import Diapositiva3 from '../assets/Diapositiva3.jpg';
import Diapositiva4 from '../assets/Diapositiva4.jpg';
import Diapositiva5 from '../assets/Diapositiva5.jpg';
import Diapositiva6 from '../assets/Diapositiva6.jpg';
import Diapositiva7 from '../assets/Diapositiva7.jpg';

const Instruccion = () => {
  const images = [
    {
      src: Diapositiva1,
      alt: 'Descripción de la imagen 1',
      caption: 'Explicación o título para la imagen 1'
    },
    {
      src: Diapositiva2,
      alt: 'Descripción de la imagen 2',
      caption: 'Explicación o título para la imagen 2'
    },
    {
      src: Diapositiva3,
      alt: 'Descripción de la imagen 3',
      caption: 'Explicación o título para la imagen 3'
    },
    {
      src: Diapositiva4,
      alt: 'Descripción de la imagen 3',
      caption: 'Explicación o título para la imagen 3'
    },
    {
      src: Diapositiva5,
      alt: 'Descripción de la imagen 3',
      caption: 'Explicación o título para la imagen 3'
    },
    {
      src: Diapositiva6,
      alt: 'Descripción de la imagen 3',
      caption: 'Explicación o título para la imagen 3'
    },
    {
      src: Diapositiva7,
      alt: 'Descripción de la imagen 3',
      caption: 'Explicación o título para la imagen 3'
    },
    
  ];

  return (
    <div className="instruccion-container">
      {/* <h2 className="instruccion-title">Repaso de Temas Teóricos</h2> */}
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} />
            {/* <p className="legend">{image.caption}</p> */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Instruccion;
