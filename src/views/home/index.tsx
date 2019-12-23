import { Error } from "@components/index";
import { getUserLocation } from "@services/locationAPI";
import { getStations } from "@services/stationsAPI";
import { DISTANCE, INITIAL_REGION } from "@utils/contants";
import { filterStationsNearbyByDistance, markerColor } from "@utils/helpers";
import { Region } from "@utils/types/region";
import { Station } from "@utils/types/station";
import { Theme } from "@utils/types/theme";
import React, { useContext, useState } from "react";
import { Alert, Animated, Dimensions, StatusBar } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "styled-components";
import { useAsyncEffect } from "use-async-effect";
import { AlignHeaderButtons, Container, Content, HeaderButtons, IconButton } from "./style";

const Home = () => {
  const { colors: { primaryColor } } = useContext<Theme>(ThemeContext);

  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [stations, setStations] = useState<Station[]>([]);
  const [contentControl, setContentControl] = useState<string>("");
  const [showCard, setCard] = useState(false);

  const cardHeight = new Animated.Value(Dimensions.get("window").height * 0.7);

  useAsyncEffect(async () => {
    await requestStations();
  }, [region]);

  const requestLocation = async () => {
    const location = await getUserLocation();
    typeof location === "string" ? Alert.alert(location) : setRegion({
      latitude: location.coords.latitude,
      latitudeDelta: 0.035,
      longitude: location.coords.longitude,
      longitudeDelta: 0.0321,
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
      return <Error onRerty={() => requestLocation()} />;
    default:
      return (
        <Container>
          <StatusBar backgroundColor="rgba(255, 255, 255, 0.1)" barStyle="dark-content" translucent={true} />
          <MapView
            onMapReady={() => requestLocation()}
            provider={PROVIDER_GOOGLE}
            region={region}
            showsUserLocation={true}
            style={{ flex: 1 }}
          >
            {
              stations.length > 0 && stations.map((station: Station) => (
                <Marker
                  key={station.id}
                  coordinate={{ latitude: station.geo.lat, longitude: station.geo.long }}
                  pinColor={markerColor(station.status, station.canControl)}
                  onPress={() => setCard(true)}
                />
              ))
            }
          </MapView>
          {showCard && <Animated.View

            style={{ top: cardHeight, position: "absolute", left: 0, right: 0, bottom: 0 }}
          >
            <Content>
              <AlignHeaderButtons>
                <HeaderButtons>
                  <IconButton>
                    <Icon name="chevron-down" color={primaryColor} size={25} />
                  </IconButton>
                  <IconButton onPress={() => setCard(false)}>
                    <Icon name="close" color={primaryColor} size={25} />
                  </IconButton>
                </HeaderButtons>
              </AlignHeaderButtons>
            </Content>
          </Animated.View>}
        </Container >
      );
  }
};

export default Home;
