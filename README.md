# Kasagi Labo Programming Challenge

This repository contains solutions for the Kasagi Labo programming challenge, which consists of three interconnected challenges focused on random data generation, analysis, and containerization.

## Project Structure

```
.
├── README.md
├── challenge_a.js
├── challenge_b.js
├── Dockerfile
└── data/
```

## Requirements

- Node.js (v18 or higher)
- Docker (for Challenge C)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd kasagi-labo-challenge
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Challenge A

```bash
node challenge_a.js
```
This will create `output.txt` in the current directory containing the random objects.

### Challenge B

```bash
node challenge_b.js
```
This will read `output.txt` and create `analysis_output.txt` with the analysis results.

### Challenge C

1. Build the Docker image:
```bash
docker build -t kasagi-challenge .
```

2. Run the container:
```bash
docker run -v $(pwd)/data:/usr/src/app/data kasagi-challenge
```

Make sure the input file is placed in the `./data` directory before running the container.
