const { error } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

app.post('/user', (req, res) => {
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

app.listen(4400, function() {
    console.log('Server is running on port 4400');
});