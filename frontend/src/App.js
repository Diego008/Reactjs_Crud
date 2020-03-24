import React from 'react';
import './App.css';
import Home from './components/home';

function App() {
  return (
    <div className="container-fluid">
      <header>
        <h1 className="text-center">Preencha o Formulário</h1>

        <Home />
      </header>
    </div>
  );
}

export default App;
