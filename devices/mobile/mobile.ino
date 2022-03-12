#include <ESP32Tone.h>

#define BUZZERPIN 12

void setup() {
  // put your setup code here, to run once:

}

void loop() {
  // put your main code here, to run repeatedly:
  tone(BUZZERPIN, 750, 100);
//  delay(13);
  tone(BUZZERPIN, 1250, 100);
//  noTone(BUZZERPIN);
}
