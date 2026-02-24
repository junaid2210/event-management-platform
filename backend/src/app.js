const express = require('express');
const helmet = require('helmet');
const app = express();
const cookieParser = require('cookie-parser');
const {protect} = require('./middleware/auth')
//middleware

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

//routes
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const registrationRoutes = require('./routes/registration.routes')
app.use('/auth',authRoutes);
app.use('/events',eventRoutes);
app.use('/',registrationRoutes);

app.set("trust proxy", 1);

//test route
app.get('/', (req,res) => {
    res.send("API is running");
});

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;