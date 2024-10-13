import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/menu');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>YUUGEN</h1>
      <button onClick={handleRedirect} style={styles.button}>
        Adicionar Itens ao Menu
      </button>
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    marginTop: '20px'
  }
};

export default HomePage;