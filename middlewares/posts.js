var Post = require('../models/Post')
var Q = require('q');
var deferred

const getPosts = (req, res) => {
  deferred = Q.defer();
  Post.find({ user: req.headers.id })
  .select('_id title body user_id ')
  .populate('user', 'name')
  .then(results => {
    deferred.resolve( {
       posts: results,
       count: results.length
     });
 })
  .catch(error => {
    deferred.reject(error);
  })
    return deferred.promise;
}

const setPost = (req, res) => {
  deferred = Q.defer();
  let post = new Post({
    title: req.body.title,
    body: req.body.body,
    user: req.body.user,
    image: req.file.path,
  })

  post.save()
      .then(result => {
        deferred.resolve(result)
      })
      .catch(error => {
        deferred.reject(error.message);
      })

  return deferred.promise;
}

const getOnePost = (req, res) => {
  deferred = Q.defer();

  Post.findById(req.params.id)
  .then(result => {    deferred.resolve(result) })
  .catch(error => {
    deferred.reject(error.message);
  })
  return deferred.promise;
}

module.exports = {getPosts, setPost, getOnePost}
