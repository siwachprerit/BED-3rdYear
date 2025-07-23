const express = require('express');
const app =express();
const fs=require('fs');
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello World !");
})

app.post('/end',(req,res)=>{
    res.send("End Point Reached !");
    console.log(req.body);
    let data=req.body;
    // fs.writeFile('data.txt',JSON.stringify(data,null,2),(err)=>{
    //     if(err){
    //         console.error('Error writing to file',err);
    //     }else{
    //         console.log('Data Written sucessfully');
    //     }
    // }) //for single time write
    fs.appendFile('users.txt',JSON.stringify(data,null,2),(err)=>{
        if(err){
            console.error('Error writing to file',err);
        }else{
            console.log('Data Written sucessfully');
        }
    })
})

app.listen(4000),function(){
    console.log("SERVER IS RUNNING ON PORT 4000 ");
}
