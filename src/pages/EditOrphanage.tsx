import React, { useState, FormEvent, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import Sidebar from "../components/Sidebar";
import InputMask from "../components/Input/inputmask";

// import noimage from '../images/noimagefound.svg';

import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/edit-orphanage.css';

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
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

export default function EditOrphanage() {
  const history = useHistory();

  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  // const [activeImageIndex, setActiveImageIndex] = useState(0);
  // const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [contact, setContact] = useState<string>('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  useEffect(() => {
    api.get(`orphanages/edit/${params.id}`).then(response => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  if(!orphanage) {
    return <p>Carregando...</p>;
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('contact', String(contact));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    })

    if(name === ''){
      setName('nome obrigatorio');
    } else if (about === '') {
      setAbout('Informe algo sobre o orfanato');
    }

    await api.post('orphanages', data);

    history.push('/done');
  }

  return (
    <div id="page-edit-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="edit-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onClick={handleMapClick}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

              {
              position.latitude !== 0
                ? (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[
                      position.latitude,
                      position.longitude
                    ]}
                  />
                )
                : (
                    <Marker
                      interactive={false}
                      icon={mapIcon}
                      position={[
                        orphanage.latitude,
                        orphanage.longitude
                      ]}
                    />
                  )
              }
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
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={orphanage.about || ''}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Número de whatsapp</label>
              <InputMask
                placeholder="00 000000000"
                type="text"
                value={orphanage.contact || ''}
                onChange={event => setContact(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {orphanage?.images.map((image, index) => {
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
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={orphanage.opening_hours || ''}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={orphanage.open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!orphanage.open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
