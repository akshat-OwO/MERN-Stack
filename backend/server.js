require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts.js');

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'});
});
app.use('/api/workouts', workoutRoutes);

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });