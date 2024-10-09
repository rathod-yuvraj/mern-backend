const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
// const apiRoutes = require('./routes/api');  // Correct path to your routes file


const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mern-backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api', apiRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
