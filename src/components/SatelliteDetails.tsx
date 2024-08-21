import React, { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import {fetchSatelliteById} from "../store/actions";
import {generateRandomData} from "../utils/generateUtil";
import styles from './SatelliteDetails.module.scss'
import SatelliteRow from "./SatelliteRow";

// Регистрация компонентов Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SatelliteDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { selectedSatellite, isLoadingSatellite, satellites } = useAppSelector((state) => state.values);

    useEffect(() => {
        if (id) {
            dispatch(fetchSatelliteById({
                id: id,
                from: satellites
            }))
        }
    }, [dispatch, id, satellites]);

    // if (isLoadingSatellite) return <div>Loading...</div>;
    //
    // if (!selectedSatellite) return <div>Satellite not found</div>;

    // Настройки для графиков
    const temperatureData = generateRandomData(-50, 50);
    const batteryData = generateRandomData(0, 100);

    const chartData = (label: string, data: number[]) => ({
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
            {
                label,
                data,
                fill: false,
                borderColor: 'rgb(0,123,255)',
                tension: 0.1,
            },
        ],
    });

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={styles.content}>


            { (isLoadingSatellite || (!selectedSatellite)) &&
                <div className={styles.info}>
                    {isLoadingSatellite ?
                        <p>
                            Загрузка спутника...
                        </p>
                        :
                        <div className={styles.notFound}>
                            <p>
                                Спутник не найден
                            </p>
                            <button onClick={() => navigate(`/`)}>
                                Домой
                            </button>
                        </div>
                    }
                </div>
            }

            {
                selectedSatellite &&
                <>
                    <button className={styles.home} onClick={() => navigate(`/`)}>
                        Домой
                    </button>

                    <SatelliteRow
                        satellite={selectedSatellite}
                        hasButtons={false}
                    />

                    <div className={styles.charts}>
                        <div className={styles.chartContainer}>
                            <h3>Температура за последние 24 часа</h3>
                            <Line data={chartData('Температура (°C)', temperatureData)} options={chartOptions}/>
                        </div>

                        <div className={styles.chartContainer}>
                            <h3>Заряд батареи за последние 24 часа</h3>
                            <Line data={chartData('Заряд батареи (%)', batteryData)} options={chartOptions}/>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default SatelliteDetails;
