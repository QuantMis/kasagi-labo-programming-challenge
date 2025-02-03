const fs = require('fs');

class Transformer {
    isAlphabetical(str) {
        return /^[a-zA-Z]+$/.test(str);
    }

    isInteger(str) {
        return /^-?\d+$/.test(str);
    }

    isRealNumber(str) {
        return /^-?\d+\.\d+$/.test(str);
    }

    isAlphanumeric(str) {
        return /^\s*[a-zA-Z0-9]+\s*$/.test(str);
    }

    determineType(obj) {
        const trimmed = obj.trim();
        
        if (this.isAlphabetical(trimmed)) {
            return 'Alphabetical String';
        } else if (this.isInteger(trimmed)) {
            return 'Integer';
        } else if (this.isRealNumber(trimmed)) {
            return 'Real Number';
        } else if (this.isAlphanumeric(obj)) {
            return 'Alphanumeric';
        } else {
            return 'Unknown Type';
        }
    }

    async processFile(inputFile, outputFile) {
        const fileStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
        const writeStream = fs.createWriteStream(outputFile);
        
        let buffer = '';
        
        return new Promise((resolve, reject) => {
            fileStream.on('data', (chunk) => {
                buffer += chunk;
                let startIndex = 0;
                
                for (let i = 0; i < buffer.length; i++) {
                    if (buffer[i] === ',') {
                        const obj = buffer.slice(startIndex, i);
                        const type = this.determineType(obj);
                        const output = `Object: "${obj}" - Type: ${type}\n`;
                        writeStream.write(output);
                        startIndex = i + 1;
                    }
                }
                
                buffer = buffer.slice(startIndex);
            });

            fileStream.on('end', () => {
                if (buffer.length > 0) {
                    const type = this.determineType(buffer);
                    const output = `Object: "${buffer}" - Type: ${type}\n`;
                    writeStream.write(output);
                }
                writeStream.end();
                resolve();
            });

            fileStream.on('error', reject);
            writeStream.on('error', reject);
        });
    }
}

const transformer = new Transformer();
transformer.processFile('data.txt', 'output.txt')
    .then(() => console.log('Transformation complete'))
 
