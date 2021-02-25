var ram = require('random-access-memory')
var hypercore = require('hypercore')
var net = require('net')

var feed = hypercore(
    ram,
    '0f69a6c48060ad5eb9ef5be1bc46f325cfe3354d64712520f8dee31f4b59b4cb',
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