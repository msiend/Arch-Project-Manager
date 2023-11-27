const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
require('dotenv').config()
const PORT = process.env.PORT || 8000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const LokiStore = require('connect-loki')(session);
const { errHandler } = require('./middleware/error')
let LokiConf = {path:'./sessions/loginAuth.db'}

app.use(session({
    store: new LokiStore(LokiConf),
    secret: "secrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false, },
    resave: false,
}));


// Administrator 
const auth = require('./controllers/adminAuth')
<<<<<<< HEAD
const tasks = require('./controllers/subdetails')
const indexRoutes = require('./routes/admin/indexRoutes.js')
const userManager = require('./routes/admin/userManager.crud.js')
=======
<<<<<<< HEAD
const Employeeauth = require('./routes/employee/auth.js')
const adminPage = require('./routes/admin/projectsRoute.js')
=======
const indexRoutes = require('./routes/employee/auth.js')
>>>>>>> 6674f72b2fe768155f77a8db6a9c267317f44dc9

>>>>>>> 8068af50c41661ca227709e95683337a09fde031

// Employees
const EmployeeAuth = require('./routes/employee/auth.js')



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))
app.set('views', __dirname + '/views')
app.set('view engine', ejs)
app.use(cookieParser());



// For Admin
app.use('/admin', auth)
app.use('/admin', indexRoutes)
app.use('/admin', userManager)
app.use('/apiV1', tasks)
app.use('/page', adminPage)

// For Employees
app.use('/', EmployeeAuth)



app.get('*',(req,res)=>{ 
    res.render('../views/errorPage.ejs');
    })
app.use(errHandler);
app.listen(PORT,
    () => {
        console.log(`working at port ${PORT}`);
    }
)