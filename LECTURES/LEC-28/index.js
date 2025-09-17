const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient()
async function addUser(email, name, password) {
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password
        }
    })
    return user
}
addUser("preritbjp@gmail.com", "Prerit", "1234")
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err.message);
    })

async function getAllUser(){
    let allUser=await prisma.user.findMany();

    return allUser;
}
getAllUser()
.then((data)=>{
    console.log(data);
})