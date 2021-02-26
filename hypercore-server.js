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

module.exports = feed