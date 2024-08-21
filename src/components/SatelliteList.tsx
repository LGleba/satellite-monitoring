import React, {useCallback} from 'react';
import { FixedSizeList as List } from 'react-window';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import SatelliteRow from './SatelliteRow';
import styles from './SatelliteList.module.scss';
import {storeSlice} from "../store/storeSlice";
import {sortKeyType, sortOrderByType} from "../model/types";



const SatelliteList: React.FC = () => {
    const dispatch = useAppDispatch();
    const {setFilterType, setFilterStatus, setSortKey, setSortOrder, setIsSyncMapAndList} = storeSlice.actions
    const {isLoadingSatellites, filteredSatellites, isSyncMapAndList} = useAppSelector((state) => state.values);

    const handleFilterTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilterType(e.target.value || null));
    }, [dispatch, setFilterType]);

    const handleFilterStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilterStatus(e.target.value || null));
    }, [dispatch, setFilterStatus]);

    const handleSortKeyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortKey(e.target.value as sortKeyType));
    }, [dispatch, setSortKey]);

    const handleSortOrderChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortOrder(e.target.value as sortOrderByType));
    }, [dispatch, setSortOrder]);

    const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
        const satellite = filteredSatellites[index];
        return (
            <div style={style}>
                <SatelliteRow satellite={satellite} hasButtons={true} />
            </div>
        );
    }, [filteredSatellites]);

    if (isLoadingSatellites) return (
        <div></div>
    );

    return (
        <div>
            <div className={styles.filters}>
                <div>
                    <select
                        aria-label="Filter by type"
                        onChange={handleFilterTypeChange}
                    >
                        <option value="">Все типы</option>
                        <option value="communication">Связь</option>
                        <option value="navigation">Навигация</option>
                        <option value="scientific">Наука</option>
                    </select>
                    <select
                        aria-label="Фильтр по статусу"
                        onChange={handleFilterStatusChange}
                    >
                        <option value="">Все статусы</option>
                        <option value="active">Активный</option>
                        <option value="inactive">Неактивный</option>
                        <option value="maintenance">Техническое обслуживание</option>
                    </select>
                </div>

                <div className={styles.header}>
                    <p>Список спутников</p>
                    <label>
                        <input
                            type="checkbox"
                            checked={isSyncMapAndList}
                            onChange={(e) => dispatch(setIsSyncMapAndList(e.target.checked))}
                        />
                        Синхронизировать с картой
                    </label>
                </div>


                <div>
                    <select
                        aria-label="Сортировка"
                        onChange={handleSortKeyChange}
                    >
                        <option value="name">Сортировка по имени</option>
                        <option value="type">Сортировка по типу</option>
                        <option value="status">Сортировка по статусу</option>
                        <option value="orbitHeight">Сортировка по орбитальной высоте</option>
                    </select>
                    <select
                        aria-label="Направление сортировки"
                        onChange={handleSortOrderChange}
                    >
                        <option value="asc">По возрастанию</option>
                        <option value="desc">По убыванию</option>
                    </select>
                </div>
            </div>
            <List className={styles.list}
                  height={300}
                  itemCount={filteredSatellites.length}
                  itemSize={252}
                  width="100%"
            >
                {Row}
            </List>
        </div>
    );
};

export default SatelliteList;
