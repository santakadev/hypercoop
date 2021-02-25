const http = require('http');
var hypercore = require('hypercore')
var net = require('net')

var feed = hypercore('./products', {valueEncoding: 'json'})

feed.on('ready', () => {
    console.log(feed.key.toString('hex'))
})

var hypercoreServer = net.createServer(function (socket) {
    socket.pipe(feed.replicate(false, { live: true })).pipe(socket)
})

const port = 8000

hypercoreServer.listen(port, () => {
    console.log(`listening on localhost:${port}`)
})

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

        feed.append(JSON.parse(body))
        console.log(body)

        res.writeHead(200);
        res.end(body);
    })
  }
  
  const server = http.createServer(requestListener);
  server.listen(8080, () => {
    console.log(`listening on localhost:8080`)
});
  