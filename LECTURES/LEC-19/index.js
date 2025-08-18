const express = require('express');
const PORT = 3000;
const app = express();
const mongoose=require('mongoose');
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const blogRoute = require("./routes/blogRoutes");
app.use('/api/blogs',blogRoute);
const userRoutes = require("./routes/userRoutes");
app.use('/api/users',userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
//mongoose is odm.
mongoose.connect('mongodb://127.0.0.1:27017/g26DB')
  .then(() => console.log('Connected!'));