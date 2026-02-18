const express = require('express');
const app = express();
const {protect} = require('./middleware/auth')
//middleware
app.use(express.json());

//routes
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const registerationRoutes = require('./routes/registeration.routes')
app.use('/auth',authRoutes);
app.use('/events',eventRoutes);
app.use('/',registerationRoutes);

//test route
app.get('/', (req,res) => {
    res.send("API is running");
});

module.exports = app;