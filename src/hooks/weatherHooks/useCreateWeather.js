import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { createWeatherRequest } from 'features/weather/weatherSlice';

export default function useCreateWeather() {
    const dispatch = useDispatch();

    const createWeather = useCallback(
        (weatherData) => {
            dispatch(createWeatherRequest(weatherData));
        },
        [dispatch]
    );

    return createWeather;
};
