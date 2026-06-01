import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema (
{
    username: {
        type: String,
        required: true,
        uniqe: true,
        lowercase: true,
        trim: true,
        minLength: 1,
        maxLenght: 30,
    },
     
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLenght: 50,
    },
      
    email: {
        type: String,
        required: true,
        uniqe: true, 
        trim: true,
        lowercase: true
    },

},

    {  timestamps: true

    }

)

// before saving any password we need to hash it (if we hash it nobody can see our passwords like we are able see now in mongodb atals user data)
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
}); 

// campare passwords 
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
    

}
export const User = mongoose.model("User",userSchema)