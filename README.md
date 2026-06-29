# Doctor-Patient CRM Frontend

A modern, responsive, and beautiful hospital dashboard UI built using React, Vite, Tailwind CSS v3, Axios, and React Router.

## Project Structure

This React application acts as a separate frontend layer that consumes the REST APIs of your Spring Boot backend running on `http://localhost:8080`.

To prevent Cross-Origin Resource Sharing (CORS) errors, Vite is configured as a reverse proxy, mapping all frontend requests starting with `/api/*` to the Spring Boot endpoints.

## Features

- **Professional Aesthetics**: Hospital-themed styling (Blue, Indigo, Slate) with glassmorphism, responsive sidebar layout, and beautiful Lucide SVG icons.
- **Role-based Portals**: Tab-based unified Login and Signup pages for:
  - **Patients**: Overview stats, Doctor search list page, booking slot scheduling form, and prescription history.
  - **Doctors**: Dashboard stats, Appointment accept/reject/complete actions, and modal inputs for diagnosis and prescriptions.
  - **Admins**: UI-only KPI stats, SVG loading gauges, and interactive analytics.
- **Client-Side Auth**: Central React Context (`AuthContext`) coordinates session persistence and credential validation.

## Prerequisites

- **Node.js**: `v18.x` or higher (installed: `v18.20.8`)
- **npm**: `v10.x` or higher (installed: `10.8.2`)
- **Spring Boot Backend**: Active and running on `http://localhost:8080`

## Installation

1. Enter the frontend directory:
   ```bash
   cd doctor-patient-crm-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will start on `http://localhost:5173`.*

4. To compile the production-ready build:
   ```bash
   npm run build
   ```
# Doctor_Patient_CRM_Frontend
