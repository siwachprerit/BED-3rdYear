let students=[{
    name:"James",
    age:"18",
    address:"CHD"
},
{
    name:"John",
    age:"21",
    address:"PKL"
},
{
    name:"Gordon",
    age:"43",
    address:"Mohali"
}]

let teachers=[{
    name:"Shilpa",
    age:"34",
    address:"Barnala"
},
{
    name:"Sunita",
    age:"28",
    address:"Rajpura"
},
{
    name:"Shalini",
    age:"38",
    address:"Patiala"
}]

const fs=require("fs");
// fs.writeFile("users.txt",users.toString(),function(err){
//     if(err) return console.log(err);
//     console.log("Users Data Written Sucessfully ! ");
// }) will show buffers coz can't read json data 

fs.writeFile("students.txt",JSON.stringify(students),function(err){
    if(err) return console.log(err);
    console.log("Users Data Written Sucessfully ! ");
})

fs.writeFile("teachers.txt",JSON.stringify(teachers),function(err){
    if(err) return console.log(err);
    console.log("Users Data Written Sucessfully ! ");
})

fs.readFile('students.txt',"utf-8",function(err,data1) {
    if(err) return console.log(err);
    let printer1=JSON.parse(data1);
    
    
    fs.readFile('teachers.txt',"utf-8",function(err,data2) {
        if(err) return console.log(err);
        let printer2=JSON.parse(data2);
        
        
        //Method 1
        //Using concat
        let dataaa = printer1.concat(printer2);

        //Method 2
        //using spread operator
        //let dataaa=[...printer1,...printer2];
        
        
        fs.writeFile('taskoutput.txt', JSON.stringify(dataaa,null,2), function(err,data) {
            if(err) return console.log(err);
            console.log("all users written");
        })
    })
})