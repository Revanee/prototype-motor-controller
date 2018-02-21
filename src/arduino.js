class Arduino {
    constructor (port) {
        this.port = port
        const self = this
        
        this.motorSpeed = 255

        this.setSpeed = (val) => {
            self.motorSpeed = val
        }
        this.leftMotor = {
            funcID: 'ml',
            turnOn: () => {
                self.sendData(self.leftMotor.funcID + self.motorSpeed)
            },
            trunOff: () => {
                self.sendData(self.leftMotor.funcID + '0')
            }
        }
        this.rightMotor = {
            funcID: 'mr',
            turnOn: () => {
                self.sendData(self.rightMotor.funcID + self.motorSpeed)
            },
            trunOff: () => {
                self.sendData(self.rightMotor.funcID + '0')
            }
        }
        this.led = {
            turnOn: () => {
                self.sendData('l1')
            },
            turnOff: () => {
                self.sendData('l0')
            }
        }
    }

    sendData(data) {
        this.port.write(data + '\n')
    }
}

module.exports = Arduino