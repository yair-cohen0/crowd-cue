# TurboRepo Application (React, NestJS, and Types Package)

This is a monorepo application using [TurboRepo](https://turborepo.org/) to manage a frontend in React, a backend in NestJS, and a shared types package. The app is designed for high scalability and maintainability.

## Project Structure

```
.
├── apps
│   ├── client      # React frontend application
│   └── server      # NestJS backend application
└── packages
    └── types       # Shared types package used by both 
```

## Getting Started

Make sure to fill the .env file.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or above)
- Docker (optional for containerization)

### Installation

To install dependencies across the entire monorepo, run the following command at the root of the project:

```sh
npm install
```

### Start Development Enviroment
```sh
npm run dev
```

This will start:

- The React frontend on http://localhost:5173
- The NestJS backend on http://localhost:3000

### Building Docker Image
```sh
docker build . -t crowd_cue
```

### Running Docker Image
```sh
docker run --env-file ./apps/server/.env -p 8080:3000 crowd_cue
```

This will start the container on port 8000.

