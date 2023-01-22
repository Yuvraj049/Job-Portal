const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

const connectDB = async()=>{
    try{
        const con = await mongoose.connect('mongodb://127.0.0.1:27017/usersdata',{
    })
    console.log(`MongoDB connected:${con.connection.host}`);
    }catch(error){
        console.log('mongodb connetion failed '+error );
    }

}
connectDB();

