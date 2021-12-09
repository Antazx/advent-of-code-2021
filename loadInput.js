const fs = require('fs/promises');

function loadInput(file) {
    return new Promise(async (resolve, reject) => {
        fs.readFile(file, { encoding: 'utf-8' })
            .then(text => resolve(text.split('\n').map(n => parseInt(n))))    
            .catch(reject)
    })
}

module.exports = { loadInput };