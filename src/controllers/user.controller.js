import {User} from "../models/user.model.js";

// register api bana rahe hai 
const registerUser = async (req, res) => { 
try{
    const { username , email, password } = req.body;

    // basic validation 
    
    if (!username || !email || !password){
        return res.status(400).json({message: "All fields are important!"})

    }

    //check if user already exist in the system 

    const existing = await User.findOne({email: email.toLowerCase() });
    if(existing) {
        return res.status(400).json({message: "user already exist!"});
    }

    //create user 
    
    const user = await User.create({
        username,
        email: email.toLowerCase(),
        password,
    });

    res.status(201).json({
        message: "user registered",
        user: {id: user._id,
             email: user.email,
              username: user.username}
    })


  }  catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message});

    }
};

// now we are creating a loggin api 

const loginUser = async (req, res) => {
    
    try {

    //checking if user is already exist in system 
    const {email, password} = req.body;

    const user = await User.findOne({
        email: email.toLowerCase()
    });
    
    //if user not found then we will message this 
    if(!user) return res.status(400).json({
        message: "user not found"
    });

    //comparing password 
    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(400).json({
        message: "invalid credentials"
    })
     
    res.status(200).json({
        message: "User Logged in",
        user: {
            id: user._id,
            email: user.email,
            username: user.username

       }
    })

    }catch (error){
        res.status(500).json({
            message: "internal server error"
        })

     }
  }

const logoutuser = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(400).json({
            message: "user not found"
        });

        res.status(200).json({
            message: "Logout successful"
        })
        
    } catch (error) {
          res.status(500).json({
            message: "Internal server errror", error
          });
    }
}


export{
    registerUser,
    loginUser, 
    logoutuser
};