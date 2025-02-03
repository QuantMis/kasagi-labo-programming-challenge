FROM node:18-alpine
WORKDIR /usr/src/app
COPY challenge_b.js .
COPY data.txt .
CMD ["node", "challenge_b.js"]

