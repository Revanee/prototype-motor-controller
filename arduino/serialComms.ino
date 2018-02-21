#include <Arduino.h>

bool debug = true;

#define velocity 10

int motor1_pin = A1;
int motor2_pin = A2;

int led_pin = 13;

void setMotors(String data) {
  int pin;
  if (data[1] == 'l') pin = motor1_pin;
  if (data[1] == 'r') pin = motor2_pin;

  char buff[3];
  buff[0] = data[2];
  buff[1] = data[3];
  buff[2] = data[4];
  int power = atoi(buff);
  if (power > 255) power = 255;
  if (power < 0) power = 0;

  if (debug) {
    String debugMessage = "";
    debugMessage += "Setting motor at pin ";
    debugMessage += pin;
    debugMessage += " to ";
    debugMessage += power;
    Serial.println(debugMessage);
  }

  analogWrite(pin, power);
}

void setLed(String data) {
  int pin = led_pin;

  bool state;
  if (data[1] == '0') state = false;
  if (data[1] == '1') state = true;

  digitalWrite(pin, state);
}

void setup() {
  pinMode(motor1_pin, OUTPUT);
  pinMode(motor2_pin, OUTPUT);
  pinMode(led_pin, OUTPUT);
  Serial.begin(9600);
}

void loop() {

  if (Serial.available() > 0) {
    String str = Serial.readStringUntil('\n');

    switch (str[0]) {
      case 'm':
        setMotors(str);
        break;
      case 'l':
        setLed(str);
        break;
    }
  }
}

