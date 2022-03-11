//station on Mars
#include <WiFi.h>

#include "NetCredentials.h"

void setup() {
  Serial.begin(115200);
  delay(10);

  //Connect to WiFi
  
  Serial.println();
  Serial.println();
  Serial.print("\n\nConnecting to \n");
  Serial.println(NET_SSID);

  WiFi.begin(NET_SSID, NET_PASS);

  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

}

void loop() {
  // put your main code here, to run repeatedly:

}
