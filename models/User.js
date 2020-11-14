const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:{ type:String, required:true },
  email: { type:String, required:true },
  password: { type:String, required:true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

UserSchema.path('email').validate(async (value) => {
  const emailCount = await mongoose.models.User.countDocuments({email: value });
  return !emailCount;
}, 'Email already exists');



module.exports = mongoose.model('User',UserSchema)
