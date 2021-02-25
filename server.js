var hypercore = require('hypercore')
var net = require('net')

var feed = hypercore('./products', {valueEncoding: 'utf-8'})

feed.on('ready', () => {
    console.log(feed.key.toString('hex'))
})

process.stdin.on('data', (data) => {
    feed.append(data.toString())
})

var server = net.createServer(function (socket) {
    socket.pipe(feed.replicate(false, { live: true })).pipe(socket)
})

const port = 8000

server.listen(port, () => {
    console.log(`listening on localhost:${port}`)
})