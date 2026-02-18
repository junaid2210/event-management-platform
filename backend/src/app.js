const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {protect} = require('./middleware/auth')
//middleware

app.use(express.json());
app.use(cookieParser());

//routes
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const registerationRoutes = require('./routes/registeration.routes')
app.use('/auth',authRoutes);
app.use('/events',eventRoutes);
app.use('/',registerationRoutes);

app.set("trust proxy", 1);

//test route
app.get('/', (req,res) => {
    res.send("API is running");
});

module.exports = app;