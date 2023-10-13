const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(URL) {
    try {
        const response = await axios.get(URL);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching ${URL}: ${error}`);
        process.exit(1);
    }
}


if(process.argv[2].slice(0, 4) == "http"){
    webCat(process.argv[2]);
} else {
    cat(process.argv[2]);
}