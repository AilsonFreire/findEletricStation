import { Error } from "@components/index";
import { getUserLocation } from "@services/locationAPI";
import { getStations } from "@services/stationsAPI";
import { DISTANCE, INITIAL_REGION } from "@utils/contants";
import { filterStationsNearbyByDistance, markerColor } from "@utils/helpers";
import { Region } from "@utils/types/region";
import { Station } from "@utils/types/station";
import { Theme } from "@utils/types/theme";
import React, { useContext, useState } from "react";
import { Alert, StatusBar } from "react-native";
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationRoute } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import { ThemeContext } from "styled-components";
import { useAsyncEffect } from "use-async-effect";
import { AlignHeaderButtons, AlignIconAndStationInfo, Card, Container, Content, HeaderButtons, IconButton, StationInfos, StationName, TextButton } from "./style";

const Home = ({ navigation }: { navigation: NavigationStackProp<NavigationRoute> }) => {
  const { colors: { primaryColor, grayColor } } = useContext<Theme>(ThemeContext);

  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [stations, setStations] = useState<Station[]>([]);
  const [oneStation, setSation] = useState<Station>();
  const [contentControl, setContentControl] = useState<string>("");
  const [showCard, setCard] = useState(false);

  useAsyncEffect(async () => {
    await requestStations();
  }, [region]);

  const requestLocation = async () => {
    setContentControl("");
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

  const openCard = (e: MapEvent, mapStation: Station) => {
    const { nativeEvent: { coordinate: { latitude, longitude } }
    } = e;
    setRegion({
      latitude,
      latitudeDelta: 0.035,
      longitude,
      longitudeDelta: 0.0321,
    });
    setCard(true);
    setSation(mapStation);
  };

  const closeCard = async () => {
    await requestLocation();
    setCard(false);
  };

  switch (contentControl) {
    case "error":
      return <Error onRerty={() => requestLocation()} />;
    default:
      return (
        <Container>
          <StatusBar backgroundColor="rgba(255, 255, 255, 0.1)" barStyle="dark-content" translucent={true} />
          <MapView
            onMapReady={requestLocation}
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
                  onPress={(e) => openCard(e, station)}
                />
              ))
            }
          </MapView>
          {showCard && <Card>
            <Content>
              <AlignHeaderButtons>
                <HeaderButtons>
                  <IconButton onPress={() => navigation.navigate("StationInfo", { station: oneStation })}>
                    <Icon name="chevron-up" color={primaryColor} size={25} />
                  </IconButton>
                  <IconButton onPress={closeCard}>
                    <Icon name="close" color={primaryColor} size={25} />
                  </IconButton>
                </HeaderButtons>
              </AlignHeaderButtons>
              <TextButton>Mais informações</TextButton>
              <StationName numberOfLines={2} ellipsizeMode="tail">
                {oneStation?.name}
              </StationName>
              <StationInfos>
                {`${oneStation?.location?.address?.street}, ${oneStation?.location?.address?.streetNumber}`}
              </StationInfos>
              <StationInfos>
                {oneStation?.location?.address?.city}
              </StationInfos>
              <AlignIconAndStationInfo>
                <Icon name="cash" color={grayColor} size={25} />
                <StationInfos>
                  {` R$${oneStation?.energyPrice}/kWh`}
                </StationInfos>
              </AlignIconAndStationInfo>
            </Content>
          </Card>}
        </Container >
      );
  }
};

export default Home;
