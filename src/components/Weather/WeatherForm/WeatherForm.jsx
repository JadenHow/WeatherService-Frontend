import React from 'react';
import { Form, Button } from 'react-bootstrap';

const WeatherForm = ({ lat, lon, setLat, setLon, onSearch }) => {
    return (
        <Form onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
            <Form.Group className="mt-3 mb-3" controlId="latitude">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                    type="text"
                    name="latitude"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="Enter Latitude"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="longitude">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                    type="text"
                    name="longitude"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    placeholder="Enter Longitude"
                />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!lat || !lon}>
                Get Weather
            </Button>
        </Form>
    );
};

export default WeatherForm;
