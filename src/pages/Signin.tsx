import React, { FormEvent, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import SidebarSigup from '../components/Sidebar-Signup';
import api from "../services/api";
import AuthContext from '../contexts/auth';

import '../styles/pages/signin.css';

interface ErrorType {
  message: string;
}

export default function Signup() {
  const history = useHistory();

  // const { dispatch: useDispatch } = useContext(AuthContext);

  const [err, setErr] = useState<ErrorType | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {

    const token = localStorage.getItem('@HappyApi:token');
    if(token) {
      history.push('/dashboard/registered');
    }

  }, [history]);

  function handleSingin(event: FormEvent) {
    event.preventDefault();

    const data = {
      "email": email,
      "password": password
    }

    api.post('auth', data).then(response => {

      const { token, user } = response.data;

      localStorage.setItem('@HappyApi:user', JSON.stringify(user.id));
      localStorage.setItem('@HappyApi:token', token);

      // useDispatch({
      //   type: 'setName',
      //   payload: {
      //       name: user.name,
      //   }
      // });

      history.push('/preload');

    }).catch((error) => {
      setErr(error.response.data.message);
    })
  }

  async function handleInputChange() {

  }

  return (
    <div id="page-signup">
      <SidebarSigup />

      <main>
        <form onSubmit={handleSingin} className="create-signup-form">
          <fieldset>
            <legend>Fazer login</legend>

            <div className="input-block">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="senha">Senha</label>
              <input
                id="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                type="password"
              />
              <span className={err !== null ? 'show-error' : 'hide-error' }>{`Atenção: ${err}`}</span>
            </div>

            <label className="checkbox-block">
              <input
                type="checkbox"
                id="lembrar"
                name="lembrar-me"
                value="Lembrar-me"
                onChange={handleInputChange}
              />
              <span>Lembrar-me</span>

              <Link to="#" className="esqueci-senha">
                Esqueci minha senha
              </Link>
            </label>

            <button className="confirm-button" type="submit">
              Entrar
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  );
}
