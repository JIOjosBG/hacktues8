//station on Mars

//Arduino libraries
#include <Arduino_JSON.h>
//ESP32 libraries from espressif
#include <WiFi.h>
#include <HTTPClient.h>
//Installed libraries from library manager
#include <DHT.h>
#include <Adafruit_BMP085.h>
//Local files
#include "NetCredentials.h"

#define DHTPIN 14
#define SOUNDPIN 35
#define LIGHTPIN 33

#define MEASUREMENT_DELAY 600000
#define AP_SSID "SPIM"
#define AP_PASS "AH^Bj7*?LE]h==@h=_.Y;E$kM?~FdL]TvzY8^9aFxh&W%-%hux"

DHT dht(DHTPIN, DHT11);
Adafruit_BMP085 bmp;
HTTPClient http;
WiFiServer server(8001);

//Get timestamp
long int timestamp = millis();


void connect_to_wifi() {
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
  delay(10);
}


void send_measurements() {
  //DHT sensor
  float humidity = dht.readHumidity();
  // Read temperature as Celsius
  float temperature = dht.readTemperature();
  // Compute heat index in Celsius (isFahreheit = false)
  float heat_index = dht.computeHeatIndex(temperature, humidity, false);

  //Sound sensor
  uint16_t sound = analogRead(SOUNDPIN);
  if (sound > 800) Serial.println(sound);

  //Light sensor
  uint16_t light = analogRead(LIGHTPIN);

  //Air pressure sensor
  uint32_t pressure = bmp.readPressure();
  
  Serial.print("light: ");
  Serial.print(light);
  Serial.print(" Temperature = ");
  Serial.print(temperature);
  Serial.println(" *C");
  Serial.print("sound: ");
  Serial.print(sound);
  Serial.print(" Pressure = ");
  Serial.print(pressure);
  Serial.println(" Pa");

  if (WiFi.status() != WL_CONNECTED) {
    connect_to_wifi();
  }

  JSONVar object;
  object["temperature"] = temperature;
  object["humidity"] = humidity;
  object["light"] = light;
  object["wind"] = int(sound > 800);
  object["pressure"] = (int)pressure;
  object["base"] = 1;
  http.begin((String)SERVER_URL + "/api/measurement-create/");
  http.addHeader("Content-Type", "application/json");
  if (int code = http.POST(JSON.stringify(object)) > 0) {
    Serial.println(http.getString());
  }
  else Serial.println(code);
  http.end();
}


void setup() {
  Serial.begin(115200);
  connect_to_wifi();
  
  //Start sensor for temperature and humidity
  dht.begin();
  //Start sensor for pressure
  bmp.begin();

  //Start WiFi Access Point
  WiFi.softAP(AP_SSID, AP_PASS);
  Serial.println(WiFi.softAPIP());
  server.begin();

  //Send the first measurements
  send_measurements();
}

void loop() {  
  if (millis() > timestamp + MEASUREMENT_DELAY) {
    send_measurements();
    timestamp = millis();
  }
//  uint16_t sound = analogRead(SOUNDPIN);
//  Serial.println(sound);
}
