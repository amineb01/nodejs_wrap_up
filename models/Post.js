const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title:{ type:String, required:true },
  body: { type:String, required:true },
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User', required:true },
});

module.exports = mongoose.model('Post',PostSchema)
