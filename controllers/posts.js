const postController = (express) =>{
  const router = express.Router();

  router.get('/', function(req, res) {
    res.send('Hello from APIv1 root route.');
  });

  router.post('/', function(req, res) {
    res.send('List of APIv1 posts.');
  });


  const router
}



module.exports = postController;
