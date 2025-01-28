
# Weather Analytics Application

A full-stack weather application that allows users to fetch and store weather data using the OpenWeatherMap API.

## Features

- Fetch current weather data using coordinates (latitude/longitude)
- Save weather records to the database
- Perform CRUD operations on weather records
- Redux state management with Redux Saga
- Custom React hooks for data operations
- H2 in-memory database for development

## Technologies Used

### Backend

- **Spring Boot 3**
- **Spring Data JPA**
- **H2 Database**
- **WebClient** for API calls
- **Lombok** for boilerplate reduction
- **Jakarta Validation**

### Frontend

- **React**
- **Redux Toolkit**
- **Redux Saga**
- **Custom React Hooks**

## Setup Instructions

### Backend Setup

1. Clone the repository.
2. Configure `application.properties`:

```properties
# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:weatherdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# OpenWeatherMap API Configuration
weather.api.key=your_api_key_here
weather.api.base-url=https://api.openweathermap.org
```

3. Run the Spring Boot application.

### Frontend Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

## API Endpoints

### Weather Operations

- **GET** `/api/weather/current?lat={lat}&lon={lon}` - Get current weather
- **POST** `/api/weather/records` - Create weather record
- **GET** `/api/weather/records/{id}` - Get weather record by ID
- **PUT** `/api/weather/records/{id}` - Update weather record
- **DELETE** `/api/weather/records/{id}` - Delete weather record

## Database Access

- Access H2 Console at [http://localhost:8080/h2-console](http://localhost:8080/h2-console) with:
  - **JDBC URL**: `jdbc:h2:mem:weatherdb`
  - **Username**: `sa`
  - **Password**: (leave empty)

## Project Structure

```plaintext
src/
├── main/
│   ├── java/
│   │   └── com/weatheranalytics/
│   │       ├── config/
│   │       │   └── WebClientConfig.java
│   │       ├── controller/
│   │       │   └── WeatherController.java
│   │       ├── dto/
│   │       │   ├── WeatherData.java
│   │       │   └── WeatherRecordRequest.java
│   │       ├── model/
│   │       │   └── WeatherRecord.java
│   │       ├── repository/
│   │       │   └── WeatherRepository.java
│   │       └── service/
│   │           └── WeatherService.java
│   └── resources/
│       └── application.properties
```

## Custom React Hooks

- `useCurrentWeather` - Fetch current weather data
- `useCreateWeather` - Create new weather records
- `useWeatherRecord` - Fetch specific weather records
- `useUpdateWeather` - Update existing weather records
- `useDeleteWeather` - Delete weather records
