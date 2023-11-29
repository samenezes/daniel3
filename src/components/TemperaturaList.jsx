import React from 'react';

export function TemperaturaList({ temperaturas, page, toggleTemperatura, deleteTemperatura }) {
  const filteredTemperaturas = page === 'ativos' ? temperaturas.filter((temperatura) => !temperatura.completed) : temperaturas.filter((temperatura) => temperatura.completed);

  return (
    <ul>
      {filteredTemperaturas.map((temperatura) => (
        <li key={temperatura.id}>
          <input
            type="checkbox"
            checked={temperatura.completed}
            onChange={() => toggleTemperatura(temperatura.id)}
          />
          <span style={{ textDecoration: temperatura.completed ? 'line-through' : 'none' }}>
            {temperatura.text}
          </span>
          <button onClick={() => deleteTemperatura(temperatura.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}