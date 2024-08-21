import React, {useEffect, useMemo, useRef} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import {storeSlice} from "../store/storeSlice";
import styles from './SatelliteMap.module.scss';
import {getIconBySatelliteType} from "../utils/iconsUtil";
import {formatDate} from "../utils/formatDataUtil";



// Компонент для управления картой и открытия Popup
const MapViewController: React.FC<{ highlightedSatelliteId: string | null, popupRefs: React.MutableRefObject<Record<string, L.Marker | null>> }> = ({ highlightedSatelliteId, popupRefs }) => {
    const map = useMap();
    const satellites = useAppSelector((state) => state.values.satellites);


    useEffect(() => {
        if (highlightedSatelliteId) {
            const satellite = satellites.find((sat) => sat.id === highlightedSatelliteId);
            if (satellite) {
                map.setView([satellite.coordinates.latitude, satellite.coordinates.longitude], 2, { animate: true });

                // Открываем соответствующий Popup
                const marker = popupRefs.current[satellite.id];
                if (marker) {
                    marker.openPopup(); // Открываем popup при выделении спутника
                }
            }
        }
    }, [highlightedSatelliteId, satellites, map, popupRefs]);

    return null;
};

// Компонент для обработки кликов по карте
const MapClickHandler: React.FC = () => {
    const {setHighlightedSatellite} = storeSlice.actions
    const dispatch = useAppDispatch();
    useMapEvent('click', () => {
        dispatch(setHighlightedSatellite(null)); // Обнуляем highlightedSatelliteId при клике на пустое место
    });
    return null;
};

const SatelliteMap: React.FC = () => {
    const highlightedSatelliteId = useAppSelector((state) => state.values.highlightedSatelliteId);
    const navigate = useNavigate();
    const { satellites, isLoadingSatellites, isSyncMapAndList, filteredSatellites } = useAppSelector((state) => state.values);
    const popupRefs = useRef<Record<string, L.Marker | null>>({});

    const displayedSatellites = useMemo(() => {
        return isSyncMapAndList ? filteredSatellites : satellites;
    }, [isSyncMapAndList, satellites, filteredSatellites]);

    if (isLoadingSatellites) return (
        <div className={styles.box}>
            <img src="/icons/arrow.triangle.2.circlepath.svg" alt="Loading icon" />
            <div className={styles.loading}>Загрузка спутников...</div>
        </div>
    );

    return (
        <MapContainer center={{ lat: 0, lng: 0 }} zoom={2} style={{ height: '100%', width: '100%', borderRadius: '15px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapClickHandler />
            <MapViewController highlightedSatelliteId={highlightedSatelliteId} popupRefs={popupRefs} />
            {displayedSatellites.map((satellite) => (
                <Marker
                    key={satellite.id}
                    position={[satellite.coordinates.latitude, satellite.coordinates.longitude]}
                    icon={getIconBySatelliteType(satellite.type)}
                    eventHandlers={{
                        click: (e) => {
                            e.target.openPopup(); // Открываем Popup при клике на маркер
                        },
                    }}
                    aria-label={`Satellite ${satellite.name}`}
                    ref={(marker) => {
                        if (marker) {
                            popupRefs.current[satellite.id] = marker as any;
                        }
                    }}
                >
                    <Popup>
                        <div className={styles.popup}>
                            <div className={styles.header}>
                                <strong>{satellite.id}</strong>
                                <p>{satellite.name} <strong>({satellite.type})</strong></p>
                            </div>

                            <div className={styles.status}>
                                <div style={{
                                    backgroundColor: satellite.status === 'active' ? 'green' : 'red',
                                }} className={styles.icon}></div>
                                <p>Статус: <strong>{satellite.status}</strong></p>
                            </div>

                            <div className={styles.box}>
                                <p className={styles.left}>Долгота (longitude):</p>
                                <p className={styles.right}>{satellite.coordinates.longitude.toFixed(10)} x</p>
                            </div>

                            <div className={styles.box}>
                                <p className={styles.left}>Широта (latitude):</p>
                                <p className={styles.right}>{satellite.coordinates.latitude.toFixed(10)} y</p>
                            </div>

                            <div className={styles.box}>
                                <p className={styles.left}>Высота орбиты:</p>
                                <p className={styles.right}>{satellite.orbitHeight} км</p>
                            </div>

                            <div className={styles.box}>
                                <p className={styles.left}>Скорость:</p>
                                <p className={styles.right}>{satellite.speed ? `${satellite.speed.toFixed(2)} км/с` : "(empty)"}</p>
                            </div>

                            <div className={styles.box}>
                                <p className={styles.left}>Основная система t:</p>
                                <p className={styles.right}>{satellite.temperature ? `${satellite.temperature.mainSystem.toFixed(2)} °C` : "(empty)"}</p>
                            </div>
                            <div className={styles.box}>
                                <p className={styles.left}>Коммуникационный блок t:</p>
                                <p className={styles.right}>{satellite.temperature ? `${satellite.temperature.communication.toFixed(2)} °C` : "(empty)"}</p>
                            </div>
                            <div className={styles.box}>
                                <p className={styles.left}>Блок питания t:</p>
                                <p className={styles.right}>{satellite.temperature ? `${satellite.temperature.powerUnit.toFixed(2)} °C` : "(empty)"}</p>
                            </div>

                            <div className={styles.box}>
                                <p className={styles.left}>Заряд батереи:</p>
                                <p className={styles.right}>{satellite.batteryLevel} %</p>
                            </div>

                            <p>{formatDate(satellite.lastUpdate)}</p>

                            <button
                                onClick={() => navigate(`/satellite/${satellite.id}`)}
                            >
                                Открыть
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default SatelliteMap;
