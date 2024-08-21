import React from 'react';
import styles from './SatelliteRow.module.scss';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../store/hooks";
import {Satellite} from "../model/Satellite";
import {storeSlice} from "../store/storeSlice";
import {formatDate} from "../utils/formatDataUtil";
import {getBatteryIcon, getSpeedIcon, getTemperatureIcon} from "../utils/iconsUtil";

interface SatelliteRowProps {
    satellite: Satellite;
    hasButtons: boolean
}


const SatelliteRow: React.FC<SatelliteRowProps> = React.memo(({ satellite, hasButtons }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {setHighlightedSatellite} = storeSlice.actions

    const handleFindOnMap = () => {
        // Вызываем action, который подсветит спутник на карте
        dispatch(setHighlightedSatellite(satellite.id));
    };

    const handleOpenDetails = () => {
        // Переходим на страницу деталей спутника
        navigate(`/satellite/${satellite.id}`);
    };

    return (
        <div className={styles.satelliteRow}>
            <div className={styles.header}>
                <div className={styles.status}>
                    <div
                        className={styles.statusIndicator}
                        style={{backgroundColor: satellite.status === 'active' ? 'green' : 'red'}}
                    ></div>
                    <img src={`/icons/${satellite.type}.svg`} alt="Satellite Icon" className={styles.satelliteIcon}/>
                </div>
                <div className={styles.info}>
                    <h2 className={styles.satelliteId}>{satellite.id}</h2>
                    <h3 className={styles.satelliteName}>{satellite.name} <strong>({satellite.type})</strong></h3>
                </div>
                <div className={styles.battery}>
                    <p>{satellite.batteryLevel} %</p>
                    <img src={getBatteryIcon(satellite.batteryLevel)} alt="Battery Level"/>
                </div>
                {
                    hasButtons &&
                        <div className={styles.actions}>
                            <button onClick={handleFindOnMap}>Найти на карте</button>
                            <button onClick={handleOpenDetails}>Открыть</button>
                        </div>
                }
            </div>

            <div className={styles.lastUpdate}>
                <p>{satellite.status} {formatDate(satellite.lastUpdate)}</p>
            </div>

            <div className={styles.details}>
                <div className={styles.box}>
                    <div className={styles.header}>
                        <img src={`/icons/location.svg`} alt="Coordinates"/>
                        <h3>Координаты</h3>
                    </div>
                    <div className={styles.body}>
                        <p className={styles.left}>Долгота (longitude): </p>
                        <p className={styles.right_c}>{satellite.coordinates.longitude.toFixed(10)} x</p>
                    </div>
                    <div className={styles.body}>
                        <p className={styles.left}>Широта (latitude): </p>
                        <p className={styles.right_c}>{satellite.coordinates.latitude.toFixed(10)} y</p>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.header}>
                        <img src={`/icons/arrow.up.and.down.svg`} alt="Orbit Height"/>
                        <h3>Высота орбиты</h3>
                    </div>
                    <div className={styles.body}>
                        <p className={styles.left}>До земли: </p>
                        <p className={styles.right}>{satellite.orbitHeight} км</p>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.header}>
                        <img src={`/icons/globe.central.south.asia.fill.svg`} alt="Speed"/>
                        <h3>Скорость</h3>
                    </div>
                    <div className={styles.body}>
                        <p className={styles.left}>Орбитальная: </p>
                        <img src={getSpeedIcon(satellite.speed)} alt=""/>
                        <p className={styles.right}>{satellite.speed ? `${satellite.speed.toFixed(2)} км/с` : "(empty)"}</p>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.header}>
                        <img src={`/icons/t.square.svg`} alt="Temperature"/>
                        <h3>Температура</h3>
                    </div>

                    <div className={styles.body}>
                        <p className={styles.left}>Основная система (mainSystem): </p>
                        <img src={getTemperatureIcon(satellite.temperature?.mainSystem)} alt="Temperature Main System"/>
                        <p className={styles.right}>{satellite.temperature ? `${satellite.temperature.mainSystem.toFixed(2)} °C` : "(empty)"}</p>
                    </div>
                    <div className={styles.body}>
                        <p className={styles.left}>Коммуникационный блок (communication): </p>
                        <img src={getTemperatureIcon(satellite.temperature?.communication)} alt="Temperature Communication"/>
                        <p className={styles.right}>{satellite.temperature ? `${satellite.temperature.communication.toFixed(2)} °C` : "(empty)"}</p>
                    </div>
                    <div className={styles.body}>
                        <p className={styles.left}>Блок питания (powerUnit): </p>
                        <img src={getTemperatureIcon(satellite.temperature?.powerUnit)} alt="Temperature Power Unit"/>
                        <p className={styles.right}>{satellite.temperature ? `${satellite.temperature.powerUnit.toFixed(2)} °C` : "(empty)"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default SatelliteRow;
