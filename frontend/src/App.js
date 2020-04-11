import React from 'react';
import './App.css';
import NewUser from './components/NewUser';

function App() {
  return (
    <div className="container-fluid">
      <header>
        <h1 className="text-center">Preencha o Formulário</h1>

        <NewUser />
      </header>
    </div>
  );
}

export default App;
