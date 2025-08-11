const express = require('express');
const app = express();
const PORT = 3000;
const mongoose=require('mongoose');

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send("hello")
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
//mongoose is odm.
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));