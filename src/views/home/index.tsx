import { Error } from "@components/index";
import { getUserLocation } from "@services/locationAPI";
import { getStations } from "@services/stationsAPI";
import { DISTANCE, INITIAL_REGION } from "@utils/contants";
import { filterStationsNearbyByDistance, mapObjectToArray, markerColor } from "@utils/helpers";
import { Region } from "@utils/types/region";
import { Station } from "@utils/types/station";
import React, { useEffect, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Container } from "./style";

const Home = () => {
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [stations, setStations] = useState<Station[]>([]);
  const [contentControl, setContentControl] = useState<string>("");

  useEffect(() => {
    console.log(stations);
  }, [stations]);

  const requestLocation = async () => {
    const location = await getUserLocation();
    typeof location === "string" ? Alert.alert(location) : setRegion({
      latitude: location.coords.latitude,
      latitudeDelta: 0.015,
      longitude: location.coords.longitude,
      longitudeDelta: 0.0121,
    });
  };

  const requestStations = async () => {
    const response = await getStations();
    if (!response.ok) {
      setContentControl("error");
    } else {
      const { data } = response;
      setStations(filterStationsNearbyByDistance(region, data.data, DISTANCE));
    }
  };

  switch (contentControl) {
    case "error":
      return <Error onRerty={() => { requestLocation(), requestStations(); }} />;
    default:
      return (
        <Container>
          <StatusBar backgroundColor="rgba(255, 255, 255, 0.1)" barStyle="dark-content" translucent={true} />
          <MapView
            onMapReady={() => { requestLocation(), requestStations(); }}
            provider={PROVIDER_GOOGLE}
            region={region}
            showsUserLocation={true}
            style={{ flex: 1 }}
          >
            {
              stations.length > 0 && stations.map((station: Station, index: number) => (
                <Marker
                  key={index}
                  coordinate={{ latitude: station.geo.lat, longitude: station.geo.long }}
                  pinColor={markerColor(station.status, station.canControl)}
                // title={marker.title}
                // description={marker.description}
                />
              ))
            }
          </MapView>
        </Container>
      );
  }
};

export default Home;
