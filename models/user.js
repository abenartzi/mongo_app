const mongoose = require('mongoose');

mongoose.model('User', {
    name:{
        type:String,
        required:true,
        unique:true,
        validate(value) {
            return value.length >= 2;
        }
    },
    username:String,
    password:String,
    birthDate:Date,
    gender: {
        type:String,
        enum:['f','m']
    },
    githubLink:String,
    about:String,
    created: {
        type:Date,
        default:Date.now

    }
});