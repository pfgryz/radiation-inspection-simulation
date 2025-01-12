# Simulation of Inspection Rover in High Radiation Environment

This project is developed for the "Fizyka Ogólna" (General Physics) course at university.
It simulates the operation of an inspection rover in a high-radiation environment,
such as in a linear accelerator tunnel.

## Live Version

The simulation is available as a live version at https://pfgryz.github.io/radiation-inspection-simulation/.

## Functionalities

1. List of functionalities <>

## Implementation

The simulation is implemented using TypeScript, Parcel bundler, and standard web technologies 
(HTML, CSS). It models the rover's movement and environmental interactions based on physics 
principles and visualizes them in a browser. The system processes data in real time to simulate
the effects of radiation on the rover’s electronics and sensors.

### Requirements

- Node.js (>=18.0)
- pnpm package manager
- A modern browser supporting ES6 features

### Structure

The project is organized as follows:

```aiignore
│
├── src/                # Simulation source code 
│ ├── index.ts          # Main simulation entry point
│ ├── rover.ts          # something
│ │
│ ├── index.html        # Layout for simulation page (HTML)
│ └── styles/main.css   # Styles for simulation page (CSS)
│
├── docs/               # Project documentation 
│
├── tsconfig.json       # TypeScript configuration file 
├── package.json        # Node.js dependencies and scripts 
└── README.md           # Project overview and documentation
```

### Deployment & Build

**Local development deployment**

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run start
```

3. Open your browser and go to `http://localhost:1234` to see the simulation.
4. You can edit the code to see the changes

**Build**

1. Install dependencies

```bash
npm install
```

2. Run the build process

```bash
npm run build
```

3. The application will be built and the output files will be placed in the `dist/` directory.

### Technologies

- Node.js
- Parcel
- Typescript
- pure hand-made HTML & CSS

## Sources

1. https://en.wikipedia.org/wiki/Counts_per_minute
2. https://en.wikipedia.org/wiki/Dosimeter