import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import api from '../services/api';

import '../styles/pages/delete.css';

interface Orphanage {
  name: string;
}

interface OrphanageParams {
  id: string;
}

export default function Delete() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();

  useEffect(() => {
    api.get(`delete/${params.id}`).then(response => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  async function handleDeleteOrphanage(id: string) {
    await api.delete(`/orphanages/delete/${id}`);
  }

  return (
    <div id="page-delete">
      <div className="content-wrapper">

        <main>
          <h2>Excluir!</h2>
          <p>Tem certeza que quer excluir {orphanage?.name}?</p>
        </main>

        <div className="buttons-container">
          <button onClick={() => handleDeleteOrphanage(params.id)}>
            <span className="enterAppText">Sim</span>
          </button>
          <Link to="/dashboard/registered" className="enter-app">
            <span className="enterAppText">Voltar para o Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
