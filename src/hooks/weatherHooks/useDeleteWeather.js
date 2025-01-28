import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { deleteWeatherRequest } from 'features/weather/weatherSlice';

export default function useDeleteWeather() {
    const dispatch = useDispatch();

    const deleteWeather = useCallback(
        (id) => {
            dispatch(deleteWeatherRequest({ id }));
        },
        [dispatch]
    );

    return deleteWeather;
};
