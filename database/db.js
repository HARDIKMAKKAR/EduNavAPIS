const mongoose = require('mongoose')

const connectDb  = async () => {
    try{
        await mongoose.connect('mongodb+srv://hardikmakkar2024:hardikmakkar2024@edunavigator.ul9itfu.mongodb.net/');
        console.log('Db connection successfull');
    }catch(error){
        console.log('Db connection failed : ', error);
        process.exit(1);
    }
}


module.exports = connectDb