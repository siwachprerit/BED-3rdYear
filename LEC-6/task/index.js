const fs = require('fs');

fs.readFile('../demo.txt',"utf-8",function(err,data1) {
    if(err) return console.log(err);
    console.log(data1);
    
    fs.readFile('../demo2.txt',"utf-8",function(err,data2) {
        if(err) return console.log(err);
        console.log(data2);
        
        const data = data1 + "\n" + data2;
        
        fs.writeFile('../task1.txt',data,function(err) {
            if(err) return console.log(err);
            console.log("success!!!!");
        })
    })
})