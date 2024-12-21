import User from "../models/User.js";

export const getAllUser =async(req, res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch{
        res.status(404).json({message:"No users found"});
    }
}
export const deleteUser =async(req, res)=>{
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({message: "user not found"});
        }
        res.status(200).json({message: "user deleted successfully"});
    }
    catch{
        res.status(404).json({message:"No users found"});
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: "Error updating user", error });
    }
}


// module.exports ={
//     getAllUser
// } 