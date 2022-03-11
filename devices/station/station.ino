//station on Mars
#include <WiFi.h>

#include <DHT.h>
#include <Adafruit_BMP085.h>

#include "NetCredentials.h"

#define DHTPIN 14
#define SOUNDPIN 35
#define LIGHTPIN 33

DHT dht(DHTPIN, DHT11);
Adafruit_BMP085 bmp;

//Get timestamp
long int timestamp = millis();

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

  //Start sensor for temperature and humidity
  dht.begin();

  //Start sensor for pressure
  bmp.begin();
}

void loop() {  
  //DHT sensor
  float humidity = dht.readHumidity();
  // Read temperature as Celsius
  float temperature = dht.readTemperature();
  // Compute heat index in Celsius (isFahreheit = false)
  float heat_index = dht.computeHeatIndex(temperature, humidity, false);

  //Sound sensor
  uint16_t sound = analogRead(SOUNDPIN);
  if (sound > 800) Serial.println(sound);

  uint16_t light = analogRead(LIGHTPIN);
  
  if (millis() > timestamp + 2000) {
    Serial.print("light: ");
    Serial.print(light);
    Serial.print(" Temperature = ");
    Serial.print(bmp.readTemperature());
    Serial.println(" *C");
      
    Serial.print("Pressure = ");
    Serial.print(bmp.readPressure());
    Serial.println(" Pa");
    timestamp = millis();
  }
}
