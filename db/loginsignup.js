const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
const DB = 'mongodb+srv://Yuvraj:yuvraj3002@cluster0.pvjgjmm.mongodb.net/usersdata?retryWrites=true&w=majority';
const connectDB = async()=>{
    try{
        const con = await mongoose.connect(DB,{
    })
    console.log(`MongoDB connected:${con.connection.host}`);
    }catch(error){
        console.log('mongodb connetion failed '+error );
    }

}
connectDB();

