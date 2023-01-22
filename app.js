const express = require('express');
const app = express();
const path = require('path');
//bcrypt hashing
const bcrypt = require('bcryptjs');

const hostname = '127.0.0.1';
const port = 3000;
require("./db/loginsignup");
const student_Register = require("./registers/students_registers.js") //used in post/register
const company_Register = require("./registers/company_registers.js") //used in post/register

app.use(express.json());
app.use(express.urlencoded({extended:false}));

console.log(__dirname)

const static_path = path.join(__dirname+"/views");
app.set('view engine', 'ejs');
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
            //password hashing

            //save data to database
            const registerd = await registerUser.save();
            res.status(201).render("student_profile",{user_info:registerUser}) // 201 status code if we create something
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
                description:req.body.description,
                password:password,
                confirmpassword:cpassword
            })
            
            const registerd = await registerUser.save();
            res.status(201).render("company_profile",{user_info:registerUser}); // 201 status code if we create something
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

        const is_password_match = await bcrypt.compare(password,user_email.password);

        if(is_password_match){
            res.status(201).render("student_profile",{user_info:user_email});
            console.log(`student_email:${email} \npassword:${password} \nhashed password:${user_email.password}`);
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
        const is_password_match = await bcrypt.compare(password,user_email.password);

        if(is_password_match){
            res.status(201).render("company_profile",{user_info:user_email});
            console.log(`company_email:${email} \npassword:${password} \nhashed password:${user_email.password}`);
        }else{
            res.send('wrong password')
        }
        
    }catch(error){
        res.status(400).send("invalid Email");
    }
})

app.get("/delete_student/:id",async (req,res)=>{
    try{
        const _id = req.params.id;
        const deleteUser = await student_Register.findByIdAndDelete(_id);
        if(!_id){
            return res.status(400).send();
        }
        res.send("Account Deleted Successfully");
        console.log(`Account ${deleteUser.email} Deleted`)
    }catch(error){
        res.status(500).send(error);
    }
})
app.get("/delete_company/:id",async (req,res)=>{
    try{
        const _id = req.params.id;
        const deleteUser = await company_Register.findByIdAndDelete(_id);
        if(!_id){
            return res.status(400).send();
        }
        res.send("Account Deleted Successfully");
        console.log(`Account ${deleteUser.email} Deleted`)
    }catch(error){
        res.status(500).send(error);
    }
})

app.get("/edit_student/:id",async(req,res)=>{
    try{
        const user_id = req.params.id;
        const user_info = await student_Register.findOne({_id:user_id});
        if(!user_id){
            return res.status(400).send();
        }
        res.status(201).render("student_edit",{user_info:user_info})
    }catch(error){
        res.status(500).send(error.message);
    }
})

app.post("/edit_student/:id", async(req,res)=>{
    
    try{
        const _id = req.params.id;
        const updates = req.body; 
        const updateUser = await student_Register.findByIdAndUpdate(_id,updates);
        if(!_id){
            return res.status(400).send();
        }
        console.log(`${updateUser.id}`);
        res.render("student_profile",{user_info:updates});
        console.log(`Account ${updateUser.email} Updated`)
    }catch(error){
        console.log(error.messsage)
    }
})
app.get("/edit_company/:id",async(req,res)=>{
    try{
        const user_id = req.params.id;
        const user_info = await company_Register.findOne({_id:user_id});
    if(!user_id){
        return res.status(400).send();
    }
    res.status(201).render("company_edit",{user_info:user_info})
    }catch(error){
        res.status(500).send(error.message);
    }
})

app.post("/edit_company/:id", async(req,res)=>{

    try{
        const _id = req.params.id;
        const updates = req.body; 
        const updateUser = await company_Register.findByIdAndUpdate(_id,updates);
        if(!_id){
            return res.status(400).send();
        }
        res.status(201).render("company_profile",{user_info:updates});
        console.log(`Account ${updateUser.email} Updated`)
    }catch(error){
        console.log(error.messsage)
    }
})


app.listen(port,()=>{
    console.log('Server running at http://'+hostname+':'+port+'/');
});