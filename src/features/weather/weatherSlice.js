import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        isLoading: false,
        error: null,
        currentWeather: null
    },
    reducers: {
        fetchCurrentWeatherRequest: (state) => {
            state.isLoading = true;
        },
        fetchCurrentWeatherSuccess: (state, action) => {
            state.currentWeather = action.payload;
            state.isLoading = false;
        },
        fetchCurrentWeatherFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createWeatherRequest: (state) => {
            state.isLoading = true;
        },
        createWeatherSuccess: (state, action) => {
            state.currentWeather = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        createWeatherFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        fetchWeatherRecordRequest: (state) => {
            state.isLoading = true;
        },
        fetchWeatherRecordSuccess: (state, action) => {
            state.currentWeather = action.payload;
            state.isLoading = false;
        },
        fetchWeatherRecordFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateWeatherRequest: (state) => {
            state.isLoading = true;
        },
        updateWeatherSuccess: (state, action) => {
            state.currentWeather = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        updateWeatherFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        deleteWeatherRequest: (state) => {
            state.isLoading = true;
        },
        deleteWeatherSuccess: (state) => {
            state.currentWeather = null;
            state.error = null;
            state.isLoading = false;
        },
        deleteWeatherFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const {
    fetchCurrentWeatherRequest,
    fetchCurrentWeatherSuccess,
    fetchCurrentWeatherFailure,
    createWeatherRequest,
    createWeatherSuccess,
    createWeatherFailure,
    fetchWeatherRecordRequest,
    fetchWeatherRecordSuccess,
    fetchWeatherRecordFailure,
    updateWeatherRequest,
    updateWeatherSuccess,
    updateWeatherFailure,
    deleteWeatherRequest,
    deleteWeatherSuccess,
    deleteWeatherFailure,
    clearError
} = weatherSlice.actions;

export default weatherSlice.reducer;
