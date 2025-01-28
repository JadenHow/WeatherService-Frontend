import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { fetchCurrentWeatherRequest } from 'features/weather/weatherSlice';

export default function useCurrentWeather() {
    const dispatch = useDispatch();

    const fetchCurrentWeather = useCallback(
        ({ latitude, longitude }) => {
            dispatch(fetchCurrentWeatherRequest({ latitude, longitude }));
        },
        [dispatch]
    );

    return fetchCurrentWeather;
};
