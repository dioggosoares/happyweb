import React, { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useHistory } from "react-router-dom";

import SidebarDashboard from '../components/Sidebar-Dashboard';
import api from '../services/api';

import noimage from '../images/noimagefound.svg';
import noorphanage from '../images/noorphanage.svg';

import '../styles/pages/orphanages-pending.css';

interface Orphanage {
  id: number;
  name: string;
  published: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function OrphanagePending() {
  const history = useHistory();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const pending = orphanages.filter(function(orphanages){
    return orphanages.published === false;
  })

  useEffect(() => {
    api.get('orphanages').then(response => {

      if(response.data) {
        setOrphanages(response.data);
      }
    });

  }, [orphanages]);

  function handleApproveOrphanage(id: number) {
    history.push(`/orphanages/selection/${id}`);
  }

  return (
    <div id="page-orphanage-pending">
      <SidebarDashboard
        pending={pending.length}
        active={2}
      />

      <main>
        <div className="orphanage-pending">

          <div className="title-container">
            <div className="title">
              <p>Cadastros Pendentes</p>
              {
                pending.length !== 0
                ? (
                    pending.length === 1
                    ? (
                        <span>{pending.length} Orfanato</span>
                      )
                    : (
                        <span>{pending.length} Orfanatos</span>
                      )
                  )
                : (
                    <span>Nenhum orfanato</span>
                  )
              }
            </div>
          </div>

          <div className="orphanages-pending-container">
            {
              orphanages.filter(publish => publish.published === false).length > 0
              ? (
                  pending.map(orphanage => {
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
                            <button type="button" onClick={() => handleApproveOrphanage(orphanage.id)}>
                              <FiArrowRight size={24} color="#15C3D6"/>
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
