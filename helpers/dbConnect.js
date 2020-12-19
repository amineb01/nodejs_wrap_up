const mongoose = require('mongoose');
let config = require('config');

const dotenv = require('dotenv');
dotenv.config();
const db_name = config.DBHost
const db_server = process.env.DB_SERVER
const db_port = process.env.DB_PORT
mongoose.connect(`mongodb://${db_server}:${db_port}/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(response => console.log(`connect01 to ${db_name} database successfully`))
    .catch(err => console.log('could not connect '+err))

module.exports = mongoose
