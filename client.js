var ram = require('random-access-memory')
var hypercore = require('hypercore')
var net = require('net')

var feed = hypercore(
    ram,
    'e0878bd195da4bec33675b76231f22f691c69065170b0a1b2da1d6015393fcee',
    {valueEncoding: 'utf-8'}
)

feed.on('ready', () => {
    
    var stream = feed.createReadStream({'live': true})

    stream.on('data', (data) => {
        console.log(data.toString())
    })
})

var socket = net.connect({ port: 8000 }, () => {
    console.log('connected to server')
})

socket.pipe(feed.replicate(true, { live: true })).pipe(socket)