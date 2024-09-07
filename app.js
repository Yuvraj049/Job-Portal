require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const session = require('express-session');
const flash = require('connect-flash');
app.use(flash());
app.use(session({
    secret: 'key',   // Secret for signing the session ID
    resave: false,             // Avoid resaving session if unmodified
    saveUninitialized: true    // Save session even if it is new and unmodified
}));

const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Parses cookies and populates the req.cookies

// express default selects "views" for dynamic content files rendering
// to access all static files under /static url
const path = require('path');
app.use("/static", express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
const auth_student = require("./middlewares/auth_student.js");
const auth_company = require("./middlewares/auth_company.js");
require("./db/connection.js");

const flashMessage = require('./middlewares/flashMessage.js');



// Controllers
const studentSignup = require('./controllers/student/studentSignup.js');
const companySignup= require('./controllers/company/companySignup.js');
const studentLogin= require('./controllers/student/studentLogin.js');
const companyLogin= require('./controllers/company/companyLogin.js');
const studentProfile = require('./controllers/student/studentProfile.js');
const companyProfile = require('./controllers/company/companyProfile.js');
const studentDelete = require('./controllers/student/studentDelete.js');
const companyDelete = require('./controllers/company/companyDelete.js');
const studentViewEdit = require('./controllers/student/studentViewEdit.js');
const companyViewEdit = require('./controllers/company/companyViewEdit.js');
const studentEdit = require('./controllers/student/studentEdit.js');
const companyEdit = require('./controllers/company/companyEdit.js');
const studentLogout = require('./controllers/student/studentLogout.js');
const companyLogout = require('./controllers/company/companyLogout.js');
const eligibleCompanies = require('./controllers/student/eligibleCompanies.js');

// Routes
app.get('/', flashMessage ,(req,res) => res.status(200).render('home',{message:req.flashMessage}));
app.get('/student_signup',flashMessage , (req,res) => res.status(200).render('student_signup',{message:req.flashMessage}));
app.get('/company_signup',flashMessage,(req,res) => res.status(200).render('company_signup',{message:req.flashMessage}));
app.get('/company_login',flashMessage, (req,res) => res.status(200).render('company_login',{message:req.flashMessage}));
app.get('/student_login',flashMessage, (req,res) => res.status(200).render('student_login',{message:req.flashMessage}));

    // View Profile
app.get('/student_profile',auth_student,flashMessage,studentProfile);
app.get('/company_profile',auth_company,flashMessage,companyProfile);

    //Signup
app.post('/company_signup_register',companySignup);
app.post('/student_signup_register',studentSignup);

    //Login
app.post('/student_login_register',studentLogin);
app.post('/company_login_register',companyLogin);

    //Logout
app.get("/logout_student",auth_student,studentLogout);
app.get("/logout_company",auth_company,companyLogout);

    //Profile update
app.get("/edit_student",auth_student,flashMessage,studentViewEdit);
app.post("/edit_student",auth_student,studentEdit);
app.get("/edit_company",auth_company,flashMessage,companyViewEdit);
app.post("/edit_company",auth_company,companyEdit);

    //Eligible Companies
app.get("/eligible_company",auth_student,flashMessage,eligibleCompanies)

    //Delete
app.get("/delete_student",auth_student,studentDelete);
app.get("/delete_company",auth_company,companyDelete);

    //Default route for undefined url
app.use('*', (req, res) => {
    res.status(404).send('404: Not Found');
});

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Server running at http://127.0.0.1:${port}`);
});