var server = require('http').createServer()
var io = require('socket.io')(server)

server.listen(5150);
console.log("server started")

// allow cors
//io.set('origins', 'http://yourdomain.com:80')

io.on('connection', function (socket) {
    //socket.emit('news', { hello: 'world' })

    socket.on('image/to_server', function (img) {
        console.log("image received")
        socket.broadcast.emit('image/from_server',img)
    })
})