const http = require('http');
const hyperswarm = require('hyperswarm')
const crypto = require('crypto')
var hypercore = require('hypercore')

var feed = hypercore('./products', {valueEncoding: 'json'})

feed.on('ready', () => {
    console.log(feed.key.toString('hex'))

    // Hypercore Server
    const swarm = hyperswarm()

    const topic = crypto.createHash('sha256')
    .update('hypercoop')
    .digest()

    swarm.join(topic, {
        lookup: true, // find & connect to peers
        announce: true // optional- announce self as a connection target
    })

    swarm.on('connection', (socket, info) => {
        console.log('new connection!')
        console.log(`client: ${info.client}`)
        console.log(socket.remotePort)
        socket.pipe(feed.replicate(info.client, { live: true })).pipe(socket)
    })
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
  
  // HTTP Server
  const server = http.createServer(requestListener);
  server.listen(8080, () => {
    console.log(`listening on localhost:8080`)
});
  