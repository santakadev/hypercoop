const http = require('http');
const feed = require('./hypercore-server')

const requestListener = function (req, res) {
    // Protocol API

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Accept', 'application/json');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }


    let chunks = [];
    req.on('data', chunk => {
        chunks.push(chunk);
    })
    req.on('end', () => {
        body = Buffer.concat(chunks).toString();

        feed.append(JSON.parse(body)) // Possible abstracion: Command Bus
        console.log(body)

        res.writeHead(200);
        res.end(body);
    })
  }
  
  // HTTP Server
  const server = http.createServer(requestListener);
  server.listen(8080, () => {
    console.log(`listening on localhost:8080`)
});
  