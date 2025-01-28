import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { fetchWeatherRecordRequest } from 'features/weather/weatherSlice';

export default function useWeatherRecord() {
    const dispatch = useDispatch();

    const fetchWeatherRecordById = useCallback(
        ({ weatherId }) => {
            dispatch(fetchWeatherRecordRequest({ weatherId }));
        },
        [dispatch]
    );

    return fetchWeatherRecordById;
};
