# Medicare AI

A healthcare-focused web application designed to provide secure clinical access, prescription document ingestion, and AI-assisted medical workflows.

## Overview

Medicare AI provides a structured environment for healthcare professionals and patients to interact with medical documents through a secure authentication system. The application includes role-based access, prescription upload capabilities, drag-and-drop file handling, and an OCR-ready architecture for future AI-powered analysis.

## Features

### Authentication & Access Control

* Secure login interface for clinical users
* Role-based access selection
* Support for physician, administrator, and outpatient profiles
* Session-aware user management
* Logout functionality with immediate session invalidation

### Clinical Profiles

The system currently includes predefined access profiles for:

* Family Medicine
* Gynecology
* Pediatrics
* Cardiology
* Orthopedics
* System Administration
* Outpatient Access

### Prescription Document Upload

Users can upload medical documents using:

* Drag and drop
* Local file selection
* PDF files
* Text files
* Medical images

### OCR Simulation

A simulated OCR workflow has been implemented to demonstrate future prescription parsing and document analysis capabilities.

### User Experience

* Responsive interface
* Drag-and-drop upload zone
* Visual upload feedback
* Clean healthcare-oriented design

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* HTML5
* CSS

### Development Tools

* Node.js
* npm
* TypeScript Compiler
* ESLint

## Project Structure

```text
src/
├── App.tsx
├── main.tsx
├── mockData.ts
├── types.ts
└── index.css

assets/
server.ts
vite.config.ts
tsconfig.json
package.json
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```



## Author

Abhishodh NK

Master of Computer Applications (MCA)
