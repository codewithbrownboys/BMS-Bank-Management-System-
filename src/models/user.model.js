const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"email is required"],
        trim: true,
        lowercase: true,
        unique: [true,"email is already registered"]
    },

    name: {
        type: String,
        required: [true,"name is required"]
    },
    
    password: {
        type: String,
        required: [true,"password is required"],
        minlength: [6,"password must be at least 6 characters long"],
        select: false
    } ,
   
})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        return 
    }

    const hash = await bcrypt.hash(this.password,10)
    this.password = hash

    return

})


userSchema.methods.comparePassword = async function(password){
    console.log(this.password,password);
    return await bcrypt.compare(password,this.password)
}

const user = mongoose.model("User",userSchema)
module.exports = user