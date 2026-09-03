# TravelMate – Smart Trip Planner

TravelMate is a full-stack smart travel planning platform that helps users organize trips, optimize routes, and manage budgets efficiently.

## Core Features
- **Authentication**: JWT-based login/register with Role-Based Access (Admin, Traveler, Guide).
- **Trip Planner**: Create itineraries, add destinations, and visualize routes on an interactive map.
- **Route Optimization**: Efficient travel path suggestions based on time and distance.
- **Budget Tracking**: Real-time expense monitoring and budget analytics.
- **Destination Explorer**: Discover and save top travel spots.
- **Travel Packages**: Guided tour packages created by expert travel guides.

## Technology Stack
- **Frontend**: React, Redux Toolkit, Ant Design, Leaflet Maps, Chart.js.
- **Backend**: Spring Boot 3.x, Spring Security, JWT, JPA.
- **Database**: MySQL.

## Prerequisites
- Java 17+
- Node.js 18+
- MySQL Server

## Setup Instructions

### 1. Database Setup
- Open MySQL and create a database named `travelmate_db`.
- (Optional) Run `database_schema.sql` to initialize tables, though Spring JPA will auto-generate them.

### 2. Backend Setup
- Navigate to the `backend` folder.
- Update `src/main/resources/application.properties` with your MySQL credentials.
- Run the command:
  ```bash
  mvn spring-boot:run
  ```

### 3. Frontend Setup
- Navigate to the `frontend` folder.
- Install dependencies:
  ```bash
  npm install
  ```
- Run the application:
  ```bash
  npm start
  ```

## Role Credentials (Demo)
- **Admin**: `admin` / `admin123`
- (Register other roles via the Register Page)

## Disclaimer
"Travel costs, routes, and schedules are estimates and may vary due to real-world conditions."

---
Developed for Academic Project 2026.
