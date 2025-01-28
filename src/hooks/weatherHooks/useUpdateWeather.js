import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { updateWeatherRequest } from 'features/weather/weatherSlice';

export default function useUpdateWeather() {
    const dispatch = useDispatch();

    const updateWeather = useCallback(
        ({ id, ...weatherData }) => {
            dispatch(updateWeatherRequest({ id, ...weatherData }));
        },
        [dispatch]
    );

    return updateWeather;
};
