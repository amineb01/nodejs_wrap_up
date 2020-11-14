const bcrypt = require('bcrypt');
const saltRounds = 10;

const generatePassword = async (myPlaintextPassword) => {
  let hashedPsswd = await bcrypt.hash(myPlaintextPassword, saltRounds)
  return hashedPsswd;
}

const verifyPassword = async (myPlaintextPassword, hash) => {
  let hashedPsswd = await bcrypt.compare(myPlaintextPassword, hash)
  return hashedPsswd;
}


module.exports = {generatePassword, verifyPassword}
