
const express= require('express')
const app = express()
require("dotenv").config();

require("./config/db.config.js");
var cookieParser = require('cookie-parser')

const port = 8000
const usersRouter =require('./app/routes/user.routes.js') ;
// const { SeedExercise } = require('./config/seed.js');
const authRouter =require('./app/routes/auth.routes.js') ;
const roleRouter =require('./app/routes/role.routes.js') ;
const permissionRouter =require('./app/routes/permission.routes.js') ;
const { CheckCookie } = require('./app/middleware/authtoken.js');
const { SeedDB } = require('./config/seed.js');


//db connnectiom



app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())


// SeedDB()
app.use('/user' ,CheckCookie,usersRouter);
app.use('/auth', authRouter);
app.use('/role', roleRouter);
app.use('/permission', permissionRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})