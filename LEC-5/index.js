let users = [
    {
        id: 1,
        name: "Sharma",
        age: 20
    },
    {
        id: 2,
        name: "yoyo",
        age: 15
    }
];

function getUserById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.id === id);
            if (!user) {
                reject("No User Found");
            } else {
                resolve(user);
            }
        }, 1000); 
    });
}

function isAllowed(id) {
    getUserById(id)
        .then((user) => {
            console.log(user);
            if (user.age < 18) {
                console.log("Not Eligible to vote");
            } else {
                console.log("Eligible to vote");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

isAllowed(1); 
console.log("TCTC");
console.log("meow");