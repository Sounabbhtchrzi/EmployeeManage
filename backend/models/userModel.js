import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { roles } from '../utils/constants.js'; 

// User Schema
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            index: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`,
            },
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(v);
                },
                message: 'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.',
            },
        },
        role: {
            type: [String],
            enum: Object.values(roles),
            default: [roles.client],
        },
        actions: {
            type: [String],
            enum: ['WARNING', 'SUSPENSION', 'BAN'],
            default: [],
        },
    },
    { timestamps: true }
);

// Add unique collation index for email
UserSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

// Hash password before saving
UserSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;

            // Automatically assign admin role if email matches admin email
            if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
                this.role = [roles.admin];
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to validate password
UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw createHttpError.InternalServerError(error.message);
    }
};

// Export User model
const User = mongoose.model('user', UserSchema);
export default User;
