const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
mongoose.connect('mongodb://127.0.0.1:27017/usersdata',{

}).then(()=>{
    console.log('mongodb connected successfully')
}).catch((error)=>{
    console.log('mongodb connetion failed '+error );
});
