import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Form, Modal } from 'react-bootstrap';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import WeatherHooks from 'hooks/weatherHooks';

const WeatherContainer = () => {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [weatherId, setWeatherId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const { isLoading, error, currentWeather } = WeatherHooks.useWeather();
    const fetchWeather = WeatherHooks.useCurrentWeather();
    const createWeather = WeatherHooks.useCreateWeather();
    const updateWeather = WeatherHooks.useUpdateWeather();
    const deleteWeather = WeatherHooks.useDeleteWeather();
    const fetchWeatherById = WeatherHooks.useWeatherRecord();

    const handleFetchCurrentWeather = () => {
        if (lat && lon) {
            fetchWeather({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
        } else {
            setErrorMessage('Please enter both latitude and longitude.');
        }
    };

    const handleFetchWeatherById = () => {
        if (weatherId) {
            fetchWeatherById({ weatherId });
        } else {
            setErrorMessage('Please enter a valid weather ID.');
        }
    };

    const handleDeleteWeather = () => {
        if (weatherId) {
            deleteWeather(weatherId);
            setWeatherData(null);
        } else {
            setErrorMessage('Please enter a valid weather ID to delete.');
        }
    };

    const handleSaveWeather = ({ temperature, humidity, conditions }) => {
        if (weatherData) {
            if (weatherData.id) {
                updateWeather({ id: weatherData.id, ...weatherData, temperature, humidity, conditions });
                setWeatherData(weatherData);
            } else {
                createWeather(weatherData);
                setWeatherData(weatherData);
            }
        } else {
            setErrorMessage('No weather data to save.');
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        if (isLoading) {
            setErrorMessage('');
        } else {
            if (error) {
                setErrorMessage(error);
            } else if (currentWeather) {
                setWeatherData(currentWeather);
            }
        }

        // Reset error message after 3 seconds
        const timer = setTimeout(() => {
            setErrorMessage('');
        }, 3000);

        return () => clearTimeout(timer);
    }, [isLoading, error, currentWeather]);

    return (
        <Container>
            <Row>
                <h3 style={{ marginTop: '1rem' }}>Wei Zhong (Jaden) How's Weather Service</h3>
                <Button 
                    variant="info" 
                    style={{ marginLeft: '1rem' }} 
                    onClick={handleShowModal}
                >
                    Info
                </Button>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>PM Accelerator Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.
                    <br /><br />
                    Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col md={6}>
                    <WeatherForm
                        lat={lat}
                        lon={lon}
                        setLat={setLat}
                        setLon={setLon}
                        onSearch={handleFetchCurrentWeather}
                    />
                </Col>
                <Col md={6}>
                    <Form.Group controlId="weatherId" className="mt-3">
                        <Form.Label>Fetch Weather by ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Weather ID"
                            value={weatherId}
                            onChange={(e) => setWeatherId(e.target.value)}
                        />
                        <Button
                            variant="outline-primary"
                            className="mt-2"
                            onClick={handleFetchWeatherById}
                        >
                            Fetch Weather by ID
                        </Button>
                    </Form.Group>

                    <Button
                        variant="outline-danger"
                        className="mt-3 ml-2"
                        onClick={handleDeleteWeather}
                    >
                        Delete Weather Data
                    </Button>
                </Col>
            </Row>
            <Row>
                {weatherData && (
                    <WeatherDisplay
                        weatherData={weatherData}
                        onSave={handleSaveWeather}
                    />
                )}
            </Row>
            <Row>
                {errorMessage && (
                    <Alert variant="danger" dismissible>
                        {errorMessage}
                    </Alert>
                )}
            </Row>
        </Container>
    );
};

export default WeatherContainer;
