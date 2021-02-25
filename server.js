var hypercore = require('hypercore')
var net = require('net')

var feed = hypercore('./products', {valueEncoding: 'json'})

feed.on('ready', () => {
    console.log(feed.key.toString('hex'))
})

process.stdin.on('data', (data) => { 
    // Nombre precio
    let [price, ...nameParts] = data.toString().split(" ")
    const name = nameParts.join(" ")

    feed.append({
        name,
        price
    })
})

var server = net.createServer(function (socket) {
    socket.pipe(feed.replicate(false, { live: true })).pipe(socket)
})

const port = 8000

server.listen(port, () => {
    console.log(`listening on localhost:${port}`)
})