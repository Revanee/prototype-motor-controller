class Arduino {
    constructor (port) {
        this.port = port
        const arduino = this
        
        this.motorSpeed = 255

        this.setSpeed = (val) => {
            arduino.motorSpeed = val
        }
        this.leftMotor = {
            funcID: 'ml',
            turnOn: () => {
                arduino.sendData(arduino.leftMotor.funcID + arduino.motorSpeed)
            },
            trunOff: () => {
                arduino.sendData(arduino.leftMotor.funcID + '0')
            }
        }
        this.rightMotor = {
            funcID: 'mr',
            turnOn: () => {
                arduino.sendData(arduino.rightMotor.funcID + arduino.motorSpeed)
            },
            trunOff: () => {
                arduino.sendData(arduino.rightMotor.funcID + '0')
            }
        }
        this.led = {
            turnOn: () => {
                arduino.sendData('l1')
            },
            turnOff: () => {
                arduino.sendData('l0')
            }
        }
    }

    sendData(data) {
        this.port.write(data + '\n')
    }
}

module.exports = Arduino