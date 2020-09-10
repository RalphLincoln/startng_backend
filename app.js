// REQUIRING MY NPM MODULES
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// SETTING MY APP
const app = express();


// GETTING MY ROUTERS
const mentorsRoutes = require('./api/routes/mentors-route');
const coursesRoutes = require('./api/routes/courses.route');
const faqsRoutes = require('./api/routes/faq-route');
// const usersRoutes = require('./api/routes/users-route');

mongoose.connect("mongodb+srv://admin-Ralph:remaining@cluster0-rre55.mongodb.net/startngDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })



// HANDLING MY MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// HANDLING CORS ERRORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Method", "POST, PATCH, DELETE, GET");
        return res.status(200).json({})
    }
    next();
})



// TARGET ROUTES
app.use('/mentors', mentorsRoutes);
app.use('/courses', coursesRoutes);
app.use('/faqs', faqsRoutes);



// HANDLING ERRORS FOR MISPLACED ROUTES
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


// HANDLING ANY OTHER ERRORS
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Running on port 3000.........");
})