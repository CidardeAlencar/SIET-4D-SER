export const questions = [
    {
      id: 'q1',
      text: '¿Cuáles son los fundamentos de la puntería?',
      options: [
        { value: 'a', text: 'Mantener el equilibrio, Contacto visual, Fijación del objetivo, Coordinación del dedo' },
        { value: 'b', text: 'Ajuste del equipamiento, Visualización mental, Control del cuerpo, Estabilidad de la mano' },
        { value: 'c', text: 'Adoptar una buena posición, Contacto de la cara con el fusil, Alineación alza, guion y blanco, Control de la respiración, Control de la cola del disparador' },
        { value: 'd', text: 'Conocimiento del entorno, Ajuste del objetivo, Concentración, Sincronización del disparo' },
      ],
      correct: 'c',
    },
    {
      id: 'q2',
      text: '¿Cuáles son las posiciones del tirador?',
      options: [
        { value: 'a', text: 'Sentado, Acostado, De pie' },
        { value: 'b', text: 'Tendido, Pie, Rodilla' },
        { value: 'c', text: 'Agachado, Sentado, De pie' },
        { value: 'd', text: 'De pie, Acostado, De lado' },
      ],
      correct: 'b',
    },
    {
      id: 'q3',
      text: '¿Qué es la alineación de miras o puntería?',
      options: [
        { value: 'a', text: 'Ajustar el objetivo en el centro de la mira' },
        { value: 'b', text: 'Alinear el ojo del tirador con el objetivo' },
        { value: 'c', text: 'Es hacer coincidir el ojo del tirador, mira y el guion' },
        { value: 'd', text: 'Coordinar la respiración con el disparo' },
      ],
      correct: 'c',
    },
    {
      id: 'q4',
      text: '¿Cuáles son las líneas que existen en el polígono de tiro?',
      options: [
        { value: 'a', text: 'Línea de espera, Línea de salida, Línea de seguridad' },
        { value: 'b', text: 'Línea de entrada, Línea de preparación, Línea de disparo' },
        { value: 'c', text: 'Línea de espera, Línea de preparación y línea de fuego' },
        { value: 'd', text: 'Línea de espera, Línea de lanzamiento, Línea de control' },
      ],
      correct: 'c',
    },
    {
      id: 'q5',
      text: '¿Cuál es el calibre del fusil FAL?',
      options: [
        { value: 'a', text: 'Calibre 5.56x45mm' },
        { value: 'b', text: 'Calibre 7.62x51mm' },
        { value: 'c', text: 'Calibre 9mm' },
        { value: 'd', text: 'Calibre 12.7x99mm' },
      ],
      correct: 'b',
    },
    {
      id: 'q6',
      text: '¿Qué no se debe hacer como norma de seguridad?',
      options: [
        { value: 'a', text: 'Manipular el arma, Quitarse el casco, Manos sobre el cañón' },
        { value: 'b', text: 'Apuntar hacia una zona segura, Mantener el dedo fuera del gatillo, Mantener la boca del cañón hacia abajo' },
        { value: 'c', text: 'Respetar las órdenes de seguridad, Usar siempre protección auditiva, Cargar el arma solo en la línea de fuego' },
        { value: 'd', text: 'Mantener el área libre de obstáculos, Mantener el control del arma en todo momento, Comprobar que el arma está descargada' },
      ],
      correct: 'a',
    }    
  ];
  
  export const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array.slice(0, 5);
  };