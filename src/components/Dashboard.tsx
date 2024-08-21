import React from 'react';
import SatelliteMap from './SatelliteMap';
import SatelliteList from './SatelliteList';
import styles from './Dashboard.module.scss';
import SatellitesStatus from "./SatellitesStatus";

const Dashboard: React.FC = () => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.content}>
                <div className={styles.status}>
                    <SatellitesStatus/>
                </div>
                <div className={styles.map}>
                    <SatelliteMap/>
                </div>
                <div className={styles.list}>
                    <SatelliteList/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
