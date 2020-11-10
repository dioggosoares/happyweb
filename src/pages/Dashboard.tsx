import React, { useEffect, useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { useHistory } from "react-router-dom";

import SidebarDashboard from '../components/Sidebar-Dashboard';
import api from '../services/api';

import noimage from '../images/noimagefound.svg';
import noorphanage from '../images/noorphanage.svg';

import '../styles/pages/dashboard.css';

interface Orphanage {
  id: number;
  name: string;
  published: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function Dashboard() {
  const history = useHistory();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {

      if(response.data) {
        setOrphanages(response.data);
      }

    });

    const token = localStorage.getItem('@HappyApi:token');
    if(!token) {
      history.push('/signin');
    }

  }, [orphanages, history]);

  function handleEditOrphanage(id: number) {
    history.push(`/orphanages/edit/${id}`);
  }

  async function handleDeleteOrphanage(id: number) {
    history.push(`/delete/${id}`);
  }

  return (
    <div id="page-dashboard">
      <SidebarDashboard
        pending={orphanages.filter(publish => publish.published === false).length}
        active={1}
      />

      <main>
        <div className="orphanage-registered">

          <div className="title-container">
            <div className="title">
              <p>Orfanatos Cadastrados</p>
              <span>{orphanages.length} Orfanatos</span>
            </div>
          </div>

          <div className="orphanages-container">

            {orphanages.length !== 0
              ? (
                orphanages.map((orphanage, index) => {
                  return (
                    <div className="orphanages" key={orphanage.id}>
                      <div className="image-orphanage">
                        {orphanage.images.length !== 0
                          ? (
                            <img src={orphanage.images[1].url} alt=""/>
                          )
                          : (
                            <img src={noimage} alt=""/>
                          )
                        }
                      </div>
                      <div className="manager-menu">
                        <p>{orphanage.name}</p>

                        <div className="buttons-container">
                          <button type="button" onClick={() => handleEditOrphanage(orphanage.id)}>
                            <FiEdit3 size={24} color="#15C3D6"/>
                          </button>
                          <button type="button" onClick={() => handleDeleteOrphanage(orphanage.id)}>
                            <FiTrash size={24} color="#15C3D6"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              )
              : (
                <div className="no-orphanage">
                  <img src={noorphanage} alt="" />
                </div>
              )
            }
          </div>
        </div>
      </main>
    </div>
  );
}
