const fs = require('fs');
const process = require('process');
const axios = require('axios');



function handleOutput(data, out){
    if(out){
        fs.writeFile(out, data, { encoding: 'utf8', flag: 'w' }, err => {
            if (err) {
              console.log(`Couldn't write ${out}: ${err}`);
              process.exit(1);
            }
            console.log(`no output, but ${out} contains contents of ${readFile}`)
        });
    } else {
        console.log(data);
    }

}


function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        handleOutput(data, out);
    });
}


async function webCat(URL, out) {
    try {
        const response = await axios.get(URL);
        handleOutput(response.data, out);
    } catch (error) {
        console.error(`Error fetching ${URL}: ${error}`);
        process.exit(1);
    }
}


let outputFilename;
let readFile;

if (process.argv[2] == "--out" ){
    outputFilename = process.argv[3];
    readFile = process.argv[4];
} else {
    readFile = process.argv[2];
}


if(readFile.slice(0, 4) == "http"){
    webCat(readFile, outputFilename);
} else {
    cat(readFile, outputFilename);
}