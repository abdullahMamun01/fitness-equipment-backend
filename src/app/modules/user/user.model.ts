import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { hashedPassword } from './user.utils';


// Create the Mongoose schema
const userSchema = new Schema<TUser>(
  {
    fullName : {
      type: String,
      required: true,

    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true,
    },

  },
  {
    timestamps: true,
  },
);

userSchema.pre('save' , async function(next){
  this.password = await hashedPassword(this.password)
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});




// Create the Mongoose model
const UserModel = model<TUser>('User', userSchema);

export default UserModel;
