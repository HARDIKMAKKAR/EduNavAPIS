const mongoose = require('mongoose')

const connectDb  = async () => {
    try{
        await mongoose.connect('your-mongodb-uri');
        console.log('Db connection successfull');
    }catch(error){
        console.log('Db connection failed : ', error);
        process.exit(1);
    }
}


module.exports = connectDb
