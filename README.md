# Yoga Session Scheduling Application

This project is a full-stack application for scheduling yoga sessions. It includes a Spring Boot backend and an Angular frontend.

## Getting Started

### Prerequisites

- Java 11 or higher
- Node.js and npm
- MySQL

### Backend Setup

1.  **Create and Populate the MySQL Database:**
    Create a database named `yoga_app` and then populate it using the provided SQL script.

    ```sql
    CREATE DATABASE yoga_app;
    ```
    From the project root, run:
    ```bash
    mysql -u YOUR_USERNAME -p yoga_app < ressources/sql/script.sql
    ```
    > **Note:** Replace `YOUR_USERNAME` with your actual MySQL username. You will be prompted for your password.

2.  **Configure Environment Variables:**
    The application uses environment variables to connect to the database. Please set the following variables:
    - `DB_USER`: Your MySQL username.
    - `DB_PASSWORD`: Your MySQL password.

3.  **Configure `application.properties`:**
    Open the `back/src/main/resources/application.properties` file and ensure the `spring.datasource.url` is configured for your environment. The default is:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/yoga_app?allowPublicKeyRetrieval=true
    ```

### Frontend Setup

Navigate to the `front` directory and install the dependencies:

```bash
cd front
npm install
```

## Running the Application

### Backend

From the `back` directory, run the application using Maven:

```bash
cd back
mvn spring-boot:run
```

The backend will be running on `http://localhost:8080`.

### Frontend

From the `front` directory, start the development server:

```bash
cd front
npm run start
```

The frontend will be available at `http://localhost:4200`.

## Running Tests

### Backend Unit & Integration Tests

To run all backend tests, execute the following command from the `back` directory:

```bash
cd back
mvn clean test
```

The test report is generated at `back/target/site/jacoco/index.html`.

### Frontend Unit Tests (Jest)

Navigate to the `front` directory to run the Jest unit tests.

- **Run all tests once:**
  ```bash
  cd front
  npm run test
  ```

- **Run tests with coverage:**
  ```bash
  cd front
  npm test -- --coverage
  ```

### End-to-End Tests (Cypress)

To run the e2e tests, ensure your database is running and the backend application is started.

- **Open the Cypress Test Runner UI:**
  This allows you to run tests interactively.
  ```bash
  cd front
  npm run e2e
  ```

- **Run tests in the terminal and see coverage:**
  ```bash
  cd front
  npm run e2e:coverage
  ```

- **Run all e2e tests in the terminal (headless):**
  ```bash
  cd front
  npx cypress run --e2e
  ```

The coverage report for the e2e tests is located at `front/coverage/lcov-report/index.html`.
