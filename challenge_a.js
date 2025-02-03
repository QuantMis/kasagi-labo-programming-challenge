const fs = require("fs");

class Generator {
  #getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateAlphabetical() {
    const length = this.#getRandomInt(5, 15);
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      result += alphabet[randomIndex];
    }

    return result;
  }

  generateRealNumber() {
    const value = Math.random() * 1000;
    const decimals = this.#getRandomInt(1, 6);
    return value.toFixed(decimals);
  }

  generateInteger() {
    return this.#getRandomInt(-1000, 1000).toString();
  }

  generateAlphanumeric() {
    const alphanumeric =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = this.#getRandomInt(5, 15);
    let value = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumeric.length);
      value += alphanumeric[randomIndex];
    }

    const beforeSpaces = " ".repeat(this.#getRandomInt(0, 5));
    const afterSpaces = " ".repeat(this.#getRandomInt(0, 5));
    return `${beforeSpaces}${value}${afterSpaces}`;
  }

  throwDice() {
    const dice = this.#getRandomInt(0, 3);

    switch (dice) {
      case 0:
        return this.generateAlphabetical();
      case 1:
        return this.generateRealNumber();
      case 2:
        return this.generateInteger();
      case 3:
        return this.generateAlphanumeric();
      default:
        throw new Error("Invalid dice value");
    }
  }

  async generateFile() {
    let filename = "data.txt";
    let targetSizeBytes = 10 * 1024 * 1024;
    const writeStream = fs.createWriteStream(filename);
    let currentSize = 0;
    let first = true;

    return new Promise((resolve, reject) => {
      const writeNextChunk = () => {
        const chunkSize = 8192;
        let chunk = "";

        while (chunk.length < chunkSize && currentSize < targetSizeBytes) {
          if (!first) {
            chunk += ",";
            currentSize += 1; // 1 byte for comma
          }
          const obj = this.throwDice();
          chunk += obj;
          currentSize += obj.length;
          first = false;
        }

        if (chunk.length > 0) {
          if (!writeStream.write(chunk)) {
            writeStream.once("drain", writeNextChunk);
          } else {
            process.nextTick(writeNextChunk);
          }
        } else {
          writeStream.end();
        }
      };

      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
      writeNextChunk();
    });
  }
}

const generator = new Generator();
generator.generateFile().then(() => console.log("Generation complete"));
