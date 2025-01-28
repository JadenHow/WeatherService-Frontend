import { useSelector } from 'react-redux';

export default function useWeather() {
    const { isLoading, error, currentWeather } = useSelector((state) => state.weather);
    return { isLoading, error, currentWeather };
}