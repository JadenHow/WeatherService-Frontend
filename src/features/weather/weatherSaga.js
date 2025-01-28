import { call, delay, put, takeEvery } from 'redux-saga/effects';
import {
    fetchCurrentWeatherFailure,
    fetchCurrentWeatherSuccess,
    createWeatherFailure,
    createWeatherSuccess,
    fetchWeatherRecordFailure,
    fetchWeatherRecordSuccess,
    updateWeatherFailure,
    updateWeatherSuccess,
    deleteWeatherFailure,
    deleteWeatherSuccess,
    clearError
} from './weatherSlice';

function* workFetchCurrentWeather(action) {
    const { latitude, longitude } = action.payload;
    try {
        const response = yield call(fetch, `http://localhost:8080/api/weather/current?lat=${latitude}&lon=${longitude}`);
        if (response.ok) {
            const currentWeather = yield response.json();
            yield put(fetchCurrentWeatherSuccess(currentWeather));
            yield delay(3000);
            yield put(clearError());
        } else {
            const errorData = yield response.text();
            yield put(fetchCurrentWeatherFailure(errorData));
            yield delay(3000);
            yield put(clearError());
        }
    } catch (error) {
        yield put(fetchCurrentWeatherFailure('Error fetching weather data'));
        yield delay(3000);
        yield put(clearError());
    }
}

function* workCreateWeather(action) {
    try {
        const { latitude, longitude, temperature, humidity, conditions } = action.payload;
        const response = yield call(fetch, 'http://localhost:8080/api/weather/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                latitude,
                longitude,
                temperature,
                humidity,
                conditions
            })
        });

        const responseBody = yield response.json();

        if (response.ok) {
            yield put(createWeatherSuccess(responseBody));
            yield delay(3000);
            yield put(clearError());
        } else {
            yield put(createWeatherFailure(responseBody));
            yield delay(3000);
            yield put(clearError());
        }
    } catch (error) {
        yield put(createWeatherFailure('Error creating weather record'));
        yield delay(3000);
        yield put(clearError());
    }
}

function* workFetchWeatherRecord(action) {
    try {
        const { weatherId } = action.payload;
        const response = yield call(fetch, `http://localhost:8080/api/weather/records/${weatherId}`);

        if (response.ok) {
            const record = yield response.json();
            yield put(fetchWeatherRecordSuccess(record));
            yield delay(3000);
            yield put(clearError());
        } else {
            const errorData = yield response.text();
            yield put(fetchWeatherRecordFailure(errorData));
            yield delay(3000);
            yield put(clearError());
        }
    } catch (error) {
        yield put(fetchWeatherRecordFailure('Error fetching weather record'));
        yield delay(3000);
        yield put(clearError());
    }
}

function* workUpdateWeather(action) {
    try {
        const { id, ...weatherData } = action.payload;
        const response = yield call(fetch, `http://localhost:8080/api/weather/records/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(weatherData)
        });

        if (response.ok) {
            const updatedRecord = yield response.json();
            yield put(updateWeatherSuccess(updatedRecord));
            yield delay(3000);
            yield put(clearError());
        } else {
            const errorData = yield response.text();
            yield put(updateWeatherFailure(errorData));
            yield delay(3000);
            yield put(clearError());
        }
    } catch (error) {
        yield put(updateWeatherFailure('Error updating weather record'));
        yield delay(3000);
        yield put(clearError());
    }
}

function* workDeleteWeather(action) {
    try {
        const { id } = action.payload;
        const response = yield call(fetch, `http://localhost:8080/api/weather/records/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            yield put(deleteWeatherSuccess(id));
            yield delay(3000);
            yield put(clearError());
        } else {
            const errorData = yield response.text();
            yield put(deleteWeatherFailure(errorData));
            yield delay(3000);
            yield put(clearError());
        }
    } catch (error) {
        yield put(deleteWeatherFailure('Error deleting weather record'));
        yield delay(3000);
        yield put(clearError());
    }
}

function* weatherSaga() {
    yield takeEvery('weather/fetchCurrentWeatherRequest', workFetchCurrentWeather);
    yield takeEvery('weather/createWeatherRequest', workCreateWeather);
    yield takeEvery('weather/fetchWeatherRecordRequest', workFetchWeatherRecord);
    yield takeEvery('weather/updateWeatherRequest', workUpdateWeather);
    yield takeEvery('weather/deleteWeatherRequest', workDeleteWeather);
}

export default weatherSaga;
