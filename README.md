# Project Setup Guide

## Prerequisites
Make sure you have the following tools installed on your machine:
- [Node.js](https://nodejs.org) (LTS version recommended)
- [npm](https://www.npmjs.com/), which comes with Node.js
- [Docker](https://www.docker.com/)
- [Composer](https://getcomposer.org/)
- [PHP](https://www.php.net/) (version 8.2 or higher)

## Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:8085`. You should see the default React app.

## Backend Setup
1. Ensure you have Composer installed.
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. If not already installed, manually add Guzzle (HTTP client):
   ```bash
   composer require guzzlehttp/guzzle
   ```
4. Start the backend server using Docker:
   ```bash
   docker compose build && docker compose up -d
   ```
5. Open your browser and navigate to `http://localhost:5150`. You should see "Hello World!".

## API Usage
This project sends a POST request to the following endpoint:
```plaintext
https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/vyhledat
```

## Dependencies
### Frontend
The following libraries are used in this project:
- `@emotion/react`
- `@emotion/styled`
- `@mui/icons-material`
- `@mui/material`
- `@reduxjs/toolkit`
- `react`
- `react-dom`
- `react-redux`
- `axios`
- `notistack`
- `papaparse`
- `xlsx`

### Frontend Dev Dependencies
- `css-loader`
- `sass`
- `sass-loader`
- `style-loader`

### Backend
The backend is built with PHP and uses the following libraries:
- `guzzlehttp/guzzle`
- `ramsey/uuid`

Ensure these dependencies are installed via Composer.

## Running the Project
To launch the full project, follow these steps:
1. Build and start Docker containers:
   ```bash
   docker compose build && docker compose up -d
   ```
2. Navigate to the `frontend` directory and start the frontend server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Verify the setup:
   - Backend: Visit `http://localhost:5150` to see "Hello World!".
   - Frontend: Visit `http://localhost:8085` to see the React app.

