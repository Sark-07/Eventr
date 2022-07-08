const express = require("express");
const app = express();
const cors = require('cors');
const router = require('../routes/routes')
require('dotenv/config');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const cookies = require('cookie-parser')
const port = process.env.PORT || 8080;


// parsing json and url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors 
app.use(cors({
    origin: '*'
}))



app.use(cookies())
// user session
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        secure: false,
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        uri: 'mongodb+srv://Sark-07:Pritam123@cluster0.rkjsp.mongodb.net/sessions',
        collection: 'session'
      }),
}))


app.use('/Eventr/api/v1', router);



// route for not found
app.all('*', (req, res) => {

    res.status(404).json({ message: "Page not found" });

})


app.listen(port, () => console.log(`listening on port ${port}..`));