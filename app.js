const express = require('express');
const router = require('./src/routers/admin');
const path = require('path');
const bodyParser = require('body-parser');
const connectToDB = require('./src/config/admin');

const app = express();
connectToDB();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
const emailRoutes = require('./routes/emailRoutes');
app.use('/', emailRoutes);
app.use(router);
app.listen(3000, () => {
    console.log("server is running ");
});