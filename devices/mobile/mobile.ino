//pocket device

//ESP32 libraries from espressif
#include <WiFi.h>
//Arduino libraries
#include <ESP32Tone.h>

#define BUZZERPIN 12
#define LEDPIN 25
#define BTNPIN 33

#define AP_SSID "SPIM"
#define AP_PASS "AH^Bj7*?LE]h==@h=_.Y;E$kM?~FdL]TvzY8^9aFxh&W%-%hux"
#define HEALTH_TIMER 60000
#define TCP_PORT 8088

bool safe = true;
long int timestamp = millis();
WiFiServer server(TCP_PORT);


void connect_to_wifi() {
  Serial.print("\n\nConnecting to \n");
  Serial.println(AP_SSID);

  WiFi.begin(AP_SSID, AP_PASS);

  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }

  Serial.println("\nWiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  delay(10);
}


void setup() {
  Serial.begin(115200);
  //Connect to station ESP32
  connect_to_wifi();
  server.begin();
  pinMode(LEDPIN, OUTPUT);
  pinMode(BTNPIN, INPUT);
}

void loop() {
  if (millis() > timestamp + HEALTH_TIMER) {
    digitalWrite(LEDPIN, LOW);
    if (WiFi.status() != WL_CONNECTED) connect_to_wifi();
    WiFiClient client = server.available();
    if (client.connected() && client.available()) {
      Serial.println(client.read());
      safe = false;
    }
  }
  if (!safe){
    tone(BUZZERPIN, 750, 100);
    tone(BUZZERPIN, 1250, 100);
    digitalWrite(LEDPIN, HIGH);
  }
  if (digitalRead(BTNPIN)) safe = true;
}
