import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config/config.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
        type: String, 
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
        minLength: [8, "Password must be at least 8 characters"]
    },
    role: {
        type: String,
        default: "Student",
        enum : ["Student", "Teacher", "Admin"]
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    department: {
        type: String,
        trim: true,
        default: null,
    },
    expertise: {
        type: [String],
        default: [],
    },
    maxStudents: {
        type: Number,
        default: 10,
        min: [1, "Min Students must be at least 1"],
    },
    assignedStudents: [
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
       },
    ],
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        default: null,
    },
    bio: {
        type: String,
        maxLength: [500, "Bio cannot exceed 500 characters"],
        default: "",
    },
    portfolioUrl: {
        type: String,
        trim: true,
        default: "",
    },
  }, 
  {
    timestamps: true,

  }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateToken = function (){
    return jwt.sign({id: this._id}, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRE,
    });
};

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.hasCapacity = function (){
    if(this.role !== "Teacher") return false;
    return this.assignedStudents.length < this.maxStudents;
};

userSchema.methods.getResetPasswordToken = function (){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}
export const User = mongoose.models.User || mongoose.model("User", userSchema);