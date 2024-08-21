import React, {lazy, Suspense, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';
import {useAppDispatch, useAppSelector} from "./store/hooks";
import config from "./config";
import {fetchSatellites, fetchUpdateSatelliteData} from "./store/actions";

const SatelliteDetails = lazy(() => import('./components/SatelliteDetails'));

function App() {
    const dispatch = useAppDispatch();
    const { satellites } = useAppSelector((state) => state.values)

    useEffect(() => {
        dispatch(fetchSatellites(satellites));

        const interval = setInterval(() => {
            dispatch(fetchUpdateSatelliteData());
        }, config.timeIntervalUpdateSatellites);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Router>
            <Suspense fallback={
                <div style={{
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(10px)",
                }}>
                    <div>Загрузка...</div>
                </div>
            }>
            <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/satellite/:id" element={<SatelliteDetails />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;