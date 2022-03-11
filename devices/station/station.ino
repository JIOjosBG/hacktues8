//station on Mars
#include <WiFi.h>

#include <DHT.h>

#include "NetCredentials.h"

#define DHTPIN 14
#define SOUNDPIN 35

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
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float humidity = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float temperature = dht.readTemperature();

  // Compute heat index in Celsius (isFahreheit = false)
  float heat_index = dht.computeHeatIndex(temperature, humidity, false);

  uint16_t sound = analogRead(SOUNDPIN);
  if (sound > 1200) Serial.println(sound);
  /*
  Serial.print("sound: ");
  Serial.print(sound);
  Serial.print(" temperature: ");
  Serial.print(temperature);
  Serial.print(" C humidity: ");
  Serial.println(humidity);
  */
}
