const express = require('express')
const app = express()

//Serve files
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.get('/socket.js', (req, res) => res.sendFile(__dirname + '/dep/socket.io.js'))

//Launch server
const http = require('http').Server(app)
http.listen(3000, () => {
    console.log('Listening...')
})

//Handle socketio
const io = require('socket.io')(http)
io.on('connection', function(socket) {
    console.log('connected')
    socket.emit('hi')

    socket.on('speed', (val) => {
        console.log('Slider value: ' + val)
        sendToSerial(val)
    })

    socket.on('left', (val) => {
        if (val) console.log('Left motor started')
        else console.log('Left motor stopped')
    })
    socket.on('right', (val) => {
        if (val) console.log('Right motor started')
        else console.log('Right motor stopped')
    })
})

//Handle serial communication
const serialport = require('serialport')
const port = new serialport('COM10', {
  baudRate: 38400
})

function sendToSerial(data) {
    port.write(data)
}
