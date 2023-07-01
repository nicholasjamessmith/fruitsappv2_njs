require('dotenv').config();
const express = require('express');
const FruitRouter = require('./controllers/fruit');
const UserRouter = require("./controllers/user")
const methodOverride = require('method-override');
const app = express();
const session = require('express-session')
const MongoStore = require('connect-mongo');

//middleware
app.use(express.static("public"))
app.use(express.urlencoded());
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  saveUninitialized: true,
  resave: false,
}));

//will have a prefix of /fruit on top of what is defined as a path on Fruitrouter
app.use("/fruit", FruitRouter)
app.use("/user", UserRouter);

app.get('/', (req, res) => {
    res.render('index.ejs')
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))