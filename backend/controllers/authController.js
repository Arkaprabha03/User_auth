import User from "../models/User.js";

export const registerUser = async(req, res) => {
    const {name, email, password} = req.body;
    try {
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json("User already exists");
        }
        const user = await User.create({ name, email, password });
        return res.status(201).json({ message: "Registration successful!", user });

    }
    catch{
        return res.status(500).json("Error creating user");
    }
}
export const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user && user.password === password){
            return res.status(200).json("welcome user");
        }
        else{
            return res.status(400).json("Invalid email or password");
        }
    }
    catch{
        return res.status(400).json("invalid login");
    }
}