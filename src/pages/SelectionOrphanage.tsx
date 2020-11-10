import React, { useState, FormEvent, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiCheck, FiXCircle } from 'react-icons/fi';
// import { LeafletMouseEvent } from 'leaflet';

import Sidebar from "../components/Sidebar";
import InputMask from "../components/Input/inputmask";

// import noimage from '../images/noimagefound.svg';
// import noorphanage from '../images/noorphanage.svg';

import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/selection-orphanage.css';

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  published: boolean;
  contact: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

export default function SelectionOrphanage() {
  const history = useHistory();

  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  // const [activeImageIndex, setActiveImageIndex] = useState(0);

  // const [images, setImages] = useState<File[]>([]);
  // const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    api.get(`orphanages/selection/${params.id}`).then(response => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  if(!orphanage) {
    return <p>Carregando...</p>;
  }

  // function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
  //   if(!event.target.files) {
  //     return;
  //   }

  //   const selectedImages = Array.from(event.target.files);

  //   setImages(selectedImages);

  //   const selectedImagesPreview = selectedImages.map(image => {
  //     return URL.createObjectURL(image);
  //   });

  //   setPreviewImages(selectedImagesPreview);
  // }

  async function handleAcceptOrphanage(event: FormEvent) {
    event.preventDefault();

    const data = {
      "published": true
    }

    await api.put(`/orphanages/publish/${params.id}`, data);

    history.push('/app');
  }

  async function handleDeclineOrphanage() {
    history.push(`/delete/${params.id}`);
  }

  return (
    <div id="page-selection-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleAcceptOrphanage} className="selection-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="map-container">
              <Map
                center={[orphanage.latitude,orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

              <Marker interactive={false} icon={mapIcon} position={[orphanage?.latitude,orphanage?.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={orphanage.name || ''}
                disabled
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={orphanage.about || ''}
                disabled
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Número de whatsapp</label>
              <InputMask
                placeholder="00 000000000"
                type="text"
                value={orphanage.contact || ''}
                disabled
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {orphanage.images.map((image, index) => {
                  return (
                    <button
                      key={image.id}
                      // className={activeImageIndex === index ? 'active' : ''}
                      type="button"
                      // onClick={() => {
                      //   setActiveImageIndex(index);
                      // }}
                    >
                      <img src={image.url} alt={orphanage.name} />
                    </button>
                  );
                })};
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={orphanage.instructions || ''}
                disabled
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={orphanage.opening_hours || ''}
                disabled
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={orphanage.open_on_weekends ? 'active' : ''}
                  disabled
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!orphanage.open_on_weekends ? 'active' : ''}
                  disabled
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <div className="buttons-container">
            <button className="decline-button" onClick={handleDeclineOrphanage}>
              <FiXCircle size={24} color="#FFF" />
              Recusar
            </button>
            <button className="accept-button" onClick={handleAcceptOrphanage}>
              <FiCheck size={24} color="#FFF" />
              Aceitar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
