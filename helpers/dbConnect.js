const mongoose = require('mongoose');
let config = require('config');
const db_name = config.DBHost
const db_server = 'localhost'

mongoose.connect(`mongodb://${db_server}/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(response => console.log(`connect to ${db_name} database successfully`))
    .catch(err => console.log('could not connect '+err))

module.exports = mongoose
