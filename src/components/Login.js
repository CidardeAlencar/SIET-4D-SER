import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(parseInt(localStorage.getItem('loginAttempts')) || 0);
  const [isBlocked, setIsBlocked] = useState(JSON.parse(localStorage.getItem('isBlocked')) || false);
  const [blockMessage, setBlockMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isBlocked) {
      const blockTime = localStorage.getItem('blockTime');
      const currentTime = new Date().getTime();

      if (currentTime - blockTime > 180000) { // 3 minutos en milisegundos
        setIsBlocked(false);
        setAttempts(0);
        setBlockMessage('');
        localStorage.removeItem('isBlocked');
        localStorage.removeItem('blockTime');
        localStorage.setItem('loginAttempts', 0);
      } else {
        const remainingTime = 180000 - (currentTime - blockTime);
        setBlockMessage(`Demasiados intentos fallidos. Inténtelo de nuevo en ${Math.ceil(remainingTime / 60000)} minuto(s).`);
      }
    }
  }, [isBlocked]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, username, password);
      navigate('/Admin');
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('loginAttempts', newAttempts);

      if (newAttempts >= 3) {
        const blockTime = new Date().getTime();
        setIsBlocked(true);
        localStorage.setItem('isBlocked', true);
        localStorage.setItem('blockTime', blockTime);
        setBlockMessage('Demasiados intentos fallidos. Inténtelo de nuevo en 3 minutos.');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Correo o contraseña incorrectos',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'custom-error-button'
          }
        });
      }
      
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        {isBlocked && <p style={{ color: 'red' }}>{blockMessage}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Correo:</label>
            <input 
              type="text" 
              id="username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              disabled={isBlocked}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"}
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                disabled={isBlocked}
                style={{ paddingRight: '10px' }}
              />
              <span 
                onClick={togglePasswordVisibility} 
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="login-button" disabled={isBlocked}>Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
