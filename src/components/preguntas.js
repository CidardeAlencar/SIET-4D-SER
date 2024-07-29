export const questions = [
    {
      id: 'q1',
      text: '¿Cuáles son los fundamentos de la puntería?',
      options: [
        { value: 'a', text: 'Mantener el equilibrio, Contacto visual, Fijación del objetivo, Coordinación del dedo' },
        { value: 'b', text: 'Ajuste del equipamiento, Visualización mental, Control del cuerpo, Estabilidad de la mano' },
        { value: 'c', text: 'Adoptar una buena posición, Contacto de la cara con el fusil, Alineación alza, guion y blanco, Control de la respiración, Control de la cola del disparador (RESPUESTA)' },
        { value: 'd', text: 'Conocimiento del entorno, Ajuste del objetivo, Concentración, Sincronización del disparo' },
      ],
      correct: 'c',
    },
    {
      id: 'q2',
      text: '¿Cuáles son las posiciones del tirador?',
      options: [
        { value: 'a', text: 'Sentado, Acostado, De pie' },
        { value: 'b', text: 'Tendido, Pie, Rodilla (RESPUESTA)' },
        { value: 'c', text: 'Agachado, Sentado, De pie' },
        { value: 'd', text: 'De pie, Acostado, De lado' },
      ],
      correct: 'b',
    },
  ];
  
  export const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  };