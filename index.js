const http = require('http');
const app = require('./app')
const dotenv = require('dotenv');
dotenv.config();

const hostname = process.env.SERVER || '127.0.0.1';
const port = process.env.PORT || 3000;
app.get('/', (req, res) =>{
    res.send("it's working :)")
})
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
