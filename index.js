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
        arduino.setSpeed(val)
    })

    socket.on('left', (val) => {
        if (val) {
            console.log('Left motor started')
            arduino.leftMotor.turnOn()
        } else {
            console.log('Left motor stopped')
            arduino.leftMotor.trunOff()
        }
    })
    socket.on('right', (val) => {
        if (val) {
            console.log('Right motor started')
            arduino.rightMotor.turnOn()
        } else {
            console.log('Right motor stopped')
            arduino.rightMotor.trunOff()
        }
    })

    socket.on('led', (val) => {
        if (val) {
            console.log('Turning led on')
            arduino.led.turnOn()
        } else {
            console.log('Turning led off')
            arduino.led.turnOff()
        }
    })
})

//Handle serial communication
const serialport = require('serialport')
const port = new serialport('/dev/ttyUSB0', {
  baudRate: 9600
})

//mock port
// const port = {
//     write: function (data) {
//         console.log('Sending to port: ' + data)
//     }
// }

const Arduino = require('./src/arduino')
const arduino = new Arduino(port)
