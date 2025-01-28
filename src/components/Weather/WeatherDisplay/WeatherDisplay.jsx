import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const WeatherDisplay = ({ weatherData, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [temp, setTemp] = useState(weatherData?.temperature || '');
    const [humidity, setHumidity] = useState(weatherData?.humidity || '');
    const [conditions, setConditions] = useState(weatherData?.conditions || '');

    useEffect(() => {
        if (weatherData) {
            setTemp(weatherData.temperature || '');
            setHumidity(weatherData.humidity || '');
            setConditions(weatherData.conditions || '');
        }
    }, [weatherData]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onSave({ temperature: temp, humidity: humidity, conditions: conditions });
        setIsEditing(false);
    };

    return (
        <Card style={{ marginTop: "1rem" }}>
            <Card.Body>
                <Card.Title>Weather Information</Card.Title>
                <Form>
                    <Form.Group>
                        <Form.Label>Temperature</Form.Label>
                        {isEditing ? (
                            <Form.Control
                                type="number"
                                value={temp}
                                onChange={(e) => setTemp(e.target.value)}
                            />
                        ) : (
                            <Card.Text>
                                <strong>Temperature:</strong> {temp} {temp && '°C'}
                            </Card.Text>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Humidity</Form.Label>
                        {isEditing ? (
                            <Form.Control
                                type="number"
                                value={humidity}
                                onChange={(e) => setHumidity(e.target.value)}
                            />
                        ) : (
                            <Card.Text>
                                <strong>Humidity:</strong> {humidity} {humidity && '%'}
                            </Card.Text>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Conditions</Form.Label>
                        {isEditing ? (
                            <Form.Control
                                type="text"
                                value={conditions}
                                onChange={(e) => setConditions(e.target.value)}
                            />
                        ) : (
                            <Card.Text>
                                <strong>Conditions:</strong> {conditions}
                            </Card.Text>
                        )}
                    </Form.Group>
                    <div style={{ marginTop: "1rem" }}>
                        <Button variant="success" onClick={handleSaveClick} style={{ marginRight: "1rem" }}>
                            Save Weather
                        </Button>

                        <Button variant="primary" onClick={handleEditClick}>
                            Edit Weather
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default WeatherDisplay;
