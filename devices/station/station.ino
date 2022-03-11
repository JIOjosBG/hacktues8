//station on Mars
#include <WiFi.h>

#include <DHT.h>

#include "NetCredentials.h"

#define DHTPIN 14

DHT dht(DHTPIN, DHT11);

void setup() {
  Serial.begin(115200);
  delay(10);

  //Connect to WiFi
  
  Serial.print("\n\nConnecting to \n");
  Serial.println(NET_SSID);

  WiFi.begin(NET_SSID, NET_PASS);

  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }

  Serial.println("\nWiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  //Read temperature and humidity
  dht.begin();
}

void loop() {
  // Wait a few seconds between measurements.
  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  // Compute heat index in Celsius (isFahreheit = false)
  float hi = dht.computeHeatIndex(t, h, false);

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));
  Serial.print(F("°F  Heat index: "));
  Serial.print(hi);
  Serial.println(F("°C "));
}
