import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TemperaturaList } from './TemperaturaList';

function TemperaturaApp() {
  const [temperaturas, setTemperaturas] = useState([]);
  const [page, setPage] = useState('ativos'); // Página inicial

  const addTemperatura = (text) => {
    const newTemperatura = { id: Date.now(), text, completed: false };
    setTemperaturas([...temperaturas, newTemperatura]);
  };

  const toggleTemperatura = (id) => {
    const updatedTemperaturas = temperaturas.map((temperatura) =>
      temperatura.id === id ? { ...temperatura, completed: !temperatura.completed } : temperatura
    );
    setTemperaturas(updatedTemperaturas);
  };

  const deleteTemperatura = (id) => {
    const updatedTemperaturas = temperaturas.filter((temperatura) => temperatura.id !== id);
    const updatedTemperaturas2 = temperaturas.map((temperatura) =>
      temperatura.id === id ? { ...temperatura, completed: !temperatura.completed } : temperatura
    );
    setTemperaturas(updatedTemperaturas);
    setTemperaturas(updatedTemperaturas2);
  };


  useEffect(() => {
    const storedTemperaturas = JSON.parse(localStorage.getItem('temperaturas')) || [];
    setTemperaturas(storedTemperaturas);
  }, []);

  useEffect(() => {
    localStorage.setItem('temperaturas', JSON.stringify(temperaturas));
  }, [temperaturas]);

 
  const filteredTemperaturas = temperaturas.filter((temperatura) => {
    if (page === 'ativos') {
      return !temperatura.completed;
    } else if (page === 'excluidas') {
      return temperatura.completed;
    }
    return true; 
  });

  const handleAddTemperatura = (e) => {
    e.preventDefault();
    const temperaturaText = e.target.temperaturaText.value;
    addTemperatura(temperaturaText);
    e.target.temperaturaText.value = '';
  };

  return (
    <div>
      <h1>Lista de Temperaturas</h1>
      <Link to="/ativos">
        <button onClick={() => setPage('ativos')}>Temperaturas Ativas</button>
      </Link>
      <Link to="/excluidas">
        <button onClick={() => setPage('excluidas')}>Temperaturas excluidas</button>
      </Link>
      <TemperaturaList temperaturas={filteredTemperaturas} page={page} toggleTemperatura={toggleTemperatura} deleteTemperatura={deleteTemperatura} />
      <form onSubmit={handleAddTemperatura}>
        <input type="text" name="temperaturaText" />
        <button type="submit">Adicionar Temperatura</button>
      </form>
    </div>
  );
}

export default TemperaturaApp;
