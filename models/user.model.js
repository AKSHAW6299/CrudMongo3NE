import mongoose from 'mongoose';
import ownMongoosePaginate from 'mongoose-paginate-v2'

// STEP1 => We are creating Schema here
// we are directly using here [Schema & model] from mongoose
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 50
        },
        age: {
            type: Number,
            required: true,
        },
        city: {
            type: String,
            required: true,
            maxlength: 50
        },
        weight: {
            type: Number,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

// For pagination
UserSchema.plugin(ownMongoosePaginate)

// STEP2 => We are creating Model using the Schema
// Model name will be "UserModel" and collection(TABLE) will be "Players"
const UserModel = mongoose.model('Players', UserSchema);

export default UserModel;
