var hypercore = require('hypercore')
const hyperswarm = require('hyperswarm')
const crypto = require('crypto')

id = process.argv[process.argv.length - 1]

var feed = hypercore(
    `./products-client-${id}`,
    'fb179783fb2bb665e5e93718efb90220cbaea4097a43ce91ebbcf544b60f9e8a',
    {valueEncoding: 'utf-8'}
)

feed.on('ready', () => {

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
    
    var stream = feed.createReadStream({'live': true})

    stream.on('data', (data) => {
        console.log(data.toString())
    })
})