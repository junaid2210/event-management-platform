const express = require('express');
const app = express();
const {protect} = require('./middleware/auth')
//middleware
app.use(express.json());

//routes
const authRoutes = require('./routes/auth.routes');
app.use('/auth',authRoutes);

//test route
app.get('/', (req,res) => {
    res.send("API is running");
});

module.exports = app;