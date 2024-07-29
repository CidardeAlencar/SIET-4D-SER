import {React, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEvaluationResults, setStudentData } from '../actions';
import { questions, shuffleArray } from './preguntas';
import Swal from 'sweetalert2';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { format} from 'date-fns-tz';

function Evaluacion() {
  const dispatch = useDispatch();
  const studentData = useSelector((state) => state.studentData);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
  });


  useEffect(() => {
    setShuffledQuestions(shuffleArray([...questions]));

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const calculateScore = () => {
    let score = 0;
    shuffledQuestions.forEach((question) => {
      if (answers[question.id] === question.correct) {
        score += 2;
      }
    });
    return score;
  };
  const handleSubmit = async(e) => {
    const score = calculateScore();
    // const timeZone = 'America/La_Paz';
    const timestamp = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    try {
      const studentDoc = doc(db, 'evaluations', studentData.carnet);
      await setDoc(studentDoc, { answers, score, timestamp });
      Swal.fire({
        icon: 'success',
        title: 'Evaluación Completada',
        text: `Tu puntuación es: ${score}`,
        customClass: {
          confirmButton: 'custom-confirm-button'
        }
      }).then(() => {
        window.location.reload();
      });
      // dispatch(setStudentData({ ...studentData, nota: score }));
      dispatch(setEvaluationResults({ answers, score, timestamp}));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error al guardar los datos: ${error.message}`,
      });
    }
  };

  const handleEvaluationSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Estás seguro de enviar la evaluación?',
      text: "No podrás cambiar tus respuestas después de enviar.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#58ff4f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      }
    }).then(async(result) => {
      if (result.isConfirmed) {
        const score = calculateScore();
        // const timestamp = new Date().toISOString();
        const timeZone = 'America/La_Paz';
        const timestamp = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
        try {
          const studentDoc = doc(db, 'evaluations', studentData.carnet);
          await setDoc(studentDoc, { answers, score, timestamp });
          Swal.fire({
            icon: 'success',
            title: 'Evaluación Completada',
            text: `Tu puntuación es: ${score}`,
            customClass: {
              confirmButton: 'custom-confirm-button'
            }
          }).then(() => {
            window.location.reload();
          });
          // dispatch(setStudentData({ ...studentData, nota: score }));
          dispatch(setEvaluationResults({ answers, score, timestamp}));
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Error al guardar los datos: ${error.message}`,
          });
        }
      }
    });
  };

  return (
    <div className='card'>
      <h2>Evaluación</h2>
      <div className='timer'>
        Tiempo restante: {formatTime(timeLeft)}
      </div>
      <form onSubmit={handleEvaluationSubmit}>
        {shuffledQuestions.map((question) => (
          <div key={question.id} className='question'>
            <p>{question.text}</p>
            {question.options.map((option) => (
              <label key={option.value} className='custom-radio'>
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={answers[question.id] === option.value}
                  onChange={handleInputChange}
                />
                <span className="radio-button"></span>
                {option.text}
              </label>
            ))}
          </div>
        ))}
        <div className='App-button'>
          <button type="submit">Enviar</button>
        </div>
        
      </form>
    </div>
  )
}

export default Evaluacion