import express from "express"
import { registerUser, loginUser} from "../controllers/authController.js" 
import {getAllUser, deleteUser, updateUser} from "../controllers/userController.js"

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
export default router;
