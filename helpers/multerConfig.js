var multer = require('multer')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const limit = {
  limits: {
    fileSize: 1024 * 1024 * 5
  }
}

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
    cb(null,true)
  }else{
    cb(new Error('file should be jpeg or png'),false)
  }

}



module.exports = multer({
  storage: storage,
  limit: limit,
  fileFilter: fileFilter
});
