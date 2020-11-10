import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/done.css';

export default function Done() {
  return (
    <div id="page-done">
      <div className="content-wrapper">

        <main>
          <h2>Ebaaa!</h2>
          <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</p>
        </main>

        <Link to="/app" className="enter-app">
          <span className="enterAppText">Voltar para o mapa</span>
        </Link>
      </div>
    </div>
  );
}
