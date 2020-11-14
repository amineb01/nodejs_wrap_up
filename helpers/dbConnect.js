const mongoose = require('mongoose');

const db_name = 'nodeWrapUp'
const db_server = 'localhost'

mongoose.connect(`mongodb://${db_server}/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(response => console.log(`connect to ${db_name} database successfully`))
    .catch(err => console.log('could not connect '+err))

module.exports = mongoose
