const fs = require("fs");
fs.writeFile("../demo.txt","g26 hello",function(err){
    if(err) return console.log(err);
    console.log("sucess!!1");
})

fs.writeFile("../demo2.txt","Kisi din bada coder banunga fir vscode ki jgah tgda IDE bnaunga jisko saare chalaenge",function(err){
    if(err) return console.log(err);
    console.log("sucess!!2");
})