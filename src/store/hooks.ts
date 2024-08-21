import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>(); // для const dispatch и в него результаты от actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Получить данные из store. const { selectedSatellite, isLoadingSatellites } = useAppSelector((state) => state.values);
