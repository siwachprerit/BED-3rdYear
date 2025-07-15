const fs = require("fs");

// Read data from demo.txt
fs.readFile("../demo.txt", "utf8", (err, data1) => {
    if (err) {
        if(err) return console.log(err);
    }
    
    // Read data from demo2.txt
    fs.readFile("../demo2.txt", "utf8", (err, data2) => {
        if (err) {
            if(err) return console.log(err);
        }
        
        // Combine both data with a separator
        const combinedData = `Data from demo.txt:\n${data1}\n\nData from demo2.txt:\n${data2}`;
        
        // Write combined data to task1.txt
        fs.writeFile("../task1.txt", combinedData, "utf8", (err) => {
            if(err) return console.log(err);
            console.log("sucess!!creating taskfile");
        });
    });
});
