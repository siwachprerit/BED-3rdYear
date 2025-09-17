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
// addUser("preritbjp@gmail.com", "Prerit", "1234")
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     })

async function addTweet(content,userId){
    await prisma.tweet.create({
        data:{
            content:content,
            userId:userId
        }
        
    })
}
// addTweet("my first tweet",1)
// .then(()=> console.log("tweet added successfully"))
// .catch((err)=>console.log(err.message));

//find all tweet by user who's id is 1;
async function getUserTweet(userId){
    let tweets =await prisma.tweet.findMany({
        where:{
            userId:Number(userId)
        }
    
    })
    return tweets;
}
// getUserTweet(1)
// .then((data)=>console.log(data))
// .catch((err)=>console.log(err.message));

async function updateTweet(tweetid,userId,updatedContent){
    let tweet=await prisma.tweet.findUnique({
        where : {id:Number(tweetid)}
    })
    if(!tweet){
        return "tweet doesnot exit"
    }
    if(tweet.userId!=Number(userId)){
        return "user can not update this tweet"
    }

    await prisma.tweet.update({
        where:{
            id:Number(tweetid)
        },
        data:{
            content:updatedContent
        }
    })
}

// updateTweet("1","1","update tweet")
// .then(()=>{
//     console.log("tweet is updated")
// })

//create a function to delete user by id;
//create a function to delete user by id;
async function deleteUser(userId) {
    const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
    });
    if (!user) {
        return "user not found";
    }
    await prisma.tweet.deleteMany({
        where: { userId: Number(userId) }
    });
    await prisma.user.delete({
        where: { id: Number(userId) }
    });
    return "User deleted successfully";
    
}
// deleteUser(1)
// .then((data)=>console.log(data))
// .catch((err)=>console.log(err.message))

async function getUsers(){
    let allusers=await prisma.user.findMany({
        select:{
            name:true,
            email:true
        }

    })
    return allusers;
}
getUsers()
.then((data)=>console.log(data))