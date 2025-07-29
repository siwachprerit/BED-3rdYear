const fs = require("fs");
function read(filepath){
    return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf-8", function(err, data) {
       if(err) return console.log(err);
        // console.log("Data read from file:", data[0]);
        let users = JSON.parse(data);
        resolve (users); 
    })
    });
}

function write(filepath, data){
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, JSON.stringify(data), function(err) {
            if(err) return console.log(err);
            resolve("File written successfully!");
        });
    });
}

module.exports.read = read;
module.exports.write = write;