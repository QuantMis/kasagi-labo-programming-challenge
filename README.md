# Kasagi Labo Programming Challenge

This repository contains solutions for the Kasagi Labo programming challenge

## Project Structure

```
.
├── README.md
├── challenge_a.js
├── challenge_b.js
├── Dockerfile
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

### Challenge A Solution

```bash
node challenge_a.js
```
This will create `data.txt` in the current directory containing the random objects.

### Challenge B Solution

```bash
node challenge_b.js
```
This will read `data.txt` and create `output.txt` with the analysis results.

### Challenge C Solution

1. Build the Docker image:
```bash
docker build -t kasagi-challenge-b .
```
This will create a kasagi-challenge-b image

2. Run the container:
```bash
docker run --rm -v "$(pwd)":/usr/src/app kasagi-challenge-b 
```

This will create a container and run challenge_b.js script and create an `output.txt` inside the container and map it to the host machine.
To test this please delete `output.txt` when you run the challenge_b.js directly without using Docker.

