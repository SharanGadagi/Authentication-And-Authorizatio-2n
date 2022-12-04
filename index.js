const express = require('express');
const bodyParser = require('body-parser');
// require('./connection/db')
// const User=require('./models/user')

const dotenv = require('dotenv').config();

require('./connection/db')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRouter')



const app = express();
const PORT=process.env.PORT;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send("Sequelize ORM");
})

// User.sync({force:true});
// Contact.sync({force:true})
// User.drop();



app.listen(PORT, () => {
    console.log(`port listening on http://localhost:${PORT} `);
})