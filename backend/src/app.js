const express = require('express');
const helmet = require('helmet');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minuters
    max: 100, //Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, //return rate limit info
    legacyHeaders: false,
});

//middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use('/auth', limiter);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-type', 'Authorization']
}));

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