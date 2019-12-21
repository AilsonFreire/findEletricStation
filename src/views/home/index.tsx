import { Error } from "@components/index";
import { getUserLocation } from "@services/locationAPI";
import { getStations } from "@services/stationsAPI";
import { INITIAL_REGION } from "@utils/contants";
import { Region } from "@utils/types/region";
import React, { useEffect, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useAsyncEffect } from "use-async-effect";
import { Container } from "./style";

const Home = () => {
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [contentControl, setContentControl] = useState<string>("");

  const requestLocation = async () => {
    const location = await getUserLocation();
    typeof location === "string" ? Alert.alert(location) : setRegion({
      latitude: location.coords.latitude,
      latitudeDelta: 0.015,
      longitude: location.coords.longitude,
      longitudeDelta: 0.0121,
    });
  };

  const listStations = async () => {
    const response = await getStations();
    if (response.ok) {
      setContentControl("error");
    }
  };

  switch (contentControl) {
    case "error":
      return <Error />;
    default:
      return (
        <Container>
          <StatusBar backgroundColor="rgba(255, 255, 255, 0.1)" barStyle="dark-content" translucent={true} />
          <MapView
            onMapReady={() => { requestLocation(), listStations(); }}
            provider={PROVIDER_GOOGLE}
            region={region}
            showsUserLocation={true}
            style={{ flex: 1 }}
          />
        </Container>
      );
  }
};

export default Home;
