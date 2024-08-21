import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {fetchSatellitesStatus} from "../store/actions";
import styles from './SatellitesStatus.module.scss'

const SatellitesStatus: React.FC = () => {
    const {statusCounts, isLoadingStatus, error} = useAppSelector((state) => state.values)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSatellitesStatus());
    }, [dispatch]);

    const tryAgain = () => {
        dispatch(fetchSatellitesStatus());
    }

    return (
        <div className={styles.success}>
            <h2>Количество спутников</h2>

            <div className={styles.row}>
                <p className={styles.left}>Активные: </p>
                <p className={styles.right}>{statusCounts ? statusCounts['active'] || "0" : "0"}</p>
            </div>
            <div className={styles.row}>
                <p className={styles.left}>Неактивные: </p>
                <p className={styles.right}>{statusCounts ? statusCounts['inactive'] || "0" : "0"}</p>
            </div>
            <div className={styles.row}>
                <p className={styles.left}>Техническое обслуживание: </p>
                <p className={styles.right}>{statusCounts ? statusCounts['maintenance'] || "0" : "0"}</p>
            </div>

            <button onClick={() => {
                if (!isLoadingStatus) {
                    tryAgain()
                }
            }}>
                {isLoadingStatus ? "Подождите..." : "Обновить"}
            </button>

            {error ?
                <div className={styles.error}>
                    <h3>{error ? "Ошибка" : ""}</h3>
                    <p>{error}</p>
                </div>
                :
                <></>
            }
        </div>
    );
};

export default SatellitesStatus;