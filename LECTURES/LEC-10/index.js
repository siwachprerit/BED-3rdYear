const express = require('express');
const app = express();
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const fs = require('fs');

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// app.get('/about',(req, res) => {
//     res.sendFile(__dirname + '/about.html');
// })

app.post('/users', (req, res) => {
    let username= req.body.username;
    let password= req.body.password;
    res.json({
        username,
        password
    })
    const newUser = req.body;
    console.log(newUser);
    
    fs.readFile('users.txt', 'utf-8', (err, fileData) => {
        let allusers = [];
        if (err && err.code !== 'ENOENT') {
            // If a real error occurs (not just file not found), send an error response.
             return res.status(500).json({ error: 'Failed to read user data.' });
        }
    
        if (fileData) {
             try {
                 allusers = JSON.parse(fileData);
            } catch (e) {
                return res.status(500).json({ error: 'Failed to parse user data.' });
            }
        }
    
        allusers.push(newUser);
    
        fs.writeFile('users.txt', JSON.stringify(allusers, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).send('Error writing to file');
            }
            res.send('Data written to file successfully');
        });
    });
});

app.listen(4444 , ()=> {
    console.log('Server is running on port 4444');
});