require('dotenv').config();
require('express-async-errors');

const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handlers');
const mainRoute = require('./routes/main');

const app = express();

//middlewares
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRoute);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8008;

const start = async () => {
    try {
        app.listen(port, console.log(`Server is listening on PORT ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();
