import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  published: boolean;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const pending = orphanages.filter(function(orphanages){
    return orphanages.published === true;
  })

  useEffect(() => {
    api.get('orphanages').then(response => {

      if(response.data) {
        setOrphanages(response.data);
      }

    });

    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

  }, [orphanages]);

  return (
    <div id="page-map">
      <aside>
        <header>
          <Link to='/'>
            <img src={mapMarkerImg} alt="Happy"/>
          </Link>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Brasília</strong>
          <span>Distrito Federal</span>
        </footer>
      </aside>

      <Map
        center={[latitude, longitude]}
        zoom={12.5}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.length !== 0
        && (
          orphanages.map((orphanage, index) => {
            return (
              <div>
                {orphanage.published
                  ?
                  (
                    <Marker
                      key={orphanage.id}
                      icon={mapIcon}
                      position={[orphanage.latitude, orphanage.longitude]}
                    >
                      <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                          <FiArrowRight size={20} color="#fff" />
                        </Link>
                      </Popup>
                    </Marker>
                  )
                  : null
                }
              </div>
            )
          })
        )}
      </Map>

      {orphanages.length !== 0
        ? (
          <div className="footer">
            <span className="footerText">{pending.length} orfanatos encontrados</span>
          </div>
        ) : (
          <div className="footer">
            <span className="footerText">Nenhum orfanato encontrados</span>
          </div>
        )
      }
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
// <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
