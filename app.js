const express = require('express');
const app = express();
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
require("./db/loginsignup");
const student_Register = require("./registers/students_registers.js") //used in post/register
const company_Register = require("./registers/company_registers.js") //used in post/register

app.use(express.json());
app.use(express.urlencoded({extended:false}));

console.log(__dirname)
const static_path = path.join(__dirname,'/public');

app.use(express.static(static_path));

app.get('/',(req,res)=>{
    res.status(200).sendFile(static_path+'/home.html')
});
app.get('/company_signup',(req,res)=>{
    res.status(200).sendFile(static_path+'/company_signup.html')
});
app.get('/company_login',(req,res)=>{
    res.status(200).sendFile(static_path+'/company_login.html')
});
app.get('/student_login',(req,res)=>{
    res.status(200).sendFile(static_path+'/student_login.html')
});
app.get('/student_signup',(req,res)=>{
    res.status(200).sendFile(static_path+'/student_signup.html')
});

//SIGNUP

app.post('/student_signup_register',async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            //get data 
            const registerUser = new student_Register({
                name:req.body.name,
                email:req.body.email,
                age:req.body.age,
                gender:req.body.gender,
                cpi:req.body.cpi,
                address:req.body.address,
                password:password,
                confirmpassword:cpassword
            })
            //save data to database
            const registerd = await registerUser.save();
            res.status(201).sendFile(static_path+'/home.html'); // 201 status code if we create something
        }
        else{
            res.send("Passwords are not matching");
        }

    }catch(error){
        res.status(400).send(error);
    }
})
app.post('/company_signup_register',async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            //get data 
            const registerUser = new company_Register({
                name:req.body.name,
                email:req.body.email,
                required_age:req.body.req_age,
                required_cpi:req.body.req_cpi,
                website:req.body.website,
                position_required:req.body.position_req,
                package:req.body.package,
                desciption:req.body.description,
                password:password,
                confirmpassword:cpassword
            })
            //save data to database
            const registerd = await registerUser.save();
            res.status(201).sendFile(static_path+'/home.html'); // 201 status code if we create something
        }
        else{
            res.send("Passwords are not matching");
        }

    }catch(error){
        res.status(400).send(error);
    }
})

//LOGIN

app.post('/student_login_register',async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user_email = await student_Register.findOne({email:email});

        if(user_email.password===password){
            res.send(user_email);
            console.log(`student ${email} and password is ${password}`);
        }else{
            res.send('wrong password')
        }
        
    }catch(error){
        res.status(400).send("invalid Email");
    }
})
app.post('/company_login_register',async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        const user_email = await company_Register.findOne({email:email});
        
        if(user_email.password===password){
            res.send(user_email);
            console.log(`company ${email} and password is ${password}`);
        }else{
        res.send('wrong password')
        }
        
    }catch(error){
        res.status(400).send("invalid Email");
    }
})

app.listen(port,()=>{
    console.log('Server running at http://'+hostname+':'+port+'/');
});