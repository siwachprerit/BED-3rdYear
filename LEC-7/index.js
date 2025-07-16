let users=[{
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

const fs=require("fs");
// fs.writeFile("users.txt",users.toString(),function(err){
//     if(err) return console.log(err);
//     console.log("Users Data Written Sucessfully ! ");
// }) will show buffers coz can't read json data 

fs.writeFile("users.txt",JSON.stringify(users),function(err){
    if(err) return console.log(err);
    console.log("Users Data Written Sucessfully ! ");
})

fs.readFile("users.txt","utf-8",function(err,data){
    if(err) return console.log(err);
    // console.log("DATA : ",data[0]);
    //kyonki data list se hamne stringify krke bheja tha to 1st element ki jgah string
    //ka 1st index aajega like [ so use json method for converting again to list
    let users=JSON.parse(data);
    console.log(users[0]);
})