const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title:{ type:String, required:true },
  body: { type:String, required:true },
  date: Date,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Post',PostSchema)
