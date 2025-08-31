import mongoose, {Schema} from "mongoose";
import validator from "validator";

const userSchema =  new Schema({
    firstName : {
        type: String,
        required: true,
        maxLength: 100,
    },
    lastName : {
        type: String,
        maxLength: 100,
    },
    email : {
        type: String, 
        required: true, 
        unique: true, 
        trim: true,
        lowercase: true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error("Email is invalid" + email);
            }
        }
    },
    password : {
        type: String, 
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough please weite password with 1 uppercase, 1 lowercase, 1 number and 1 symbol");
            }
        }
    },
    age : {
        type: Number,
        min :18
    },
    
    gender: {
        type: String ,
        validate(value){
                const genderOptions = ["M", "F", "O"];
                if(!genderOptions.includes(value)){
                throw new Error("Please select a valid gender");
                }
            }
        
    },

    photoUrl: {
        type: String,
        validate(url){
            if(!validator.isURL(url)){
                throw new Error("Photo URL is invalid");
            }
        }
    },
    skills: {
        type: [String],
        validate(skills){
            if(skills.length > 20 ){
                throw new Error("You can add maximum 20 skills and minimum 3 skill is required");
            }
        }
    }

}, {timestamps: true});


export const User = mongoose.model("User", userSchema);