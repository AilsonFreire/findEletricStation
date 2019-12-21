import { getUserLocation } from "@services/locationAPI";
import { getStations } from "@services/stationsAPI";
import { INITIAL_REGION } from "@utils/contants";
import { Region } from "@utils/types/region";
import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useAsyncEffect } from "use-async-effect";
import { Container } from "./style";

const Home = () => {
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  // useAsyncEffect(async () => {
  //   const response = await getUserLocation();
  //   // const response = await getStations();
  //   console.log(response)
  // });


  return (
    <Container>
      <StatusBar backgroundColor="rgba(255, 255, 255, 0.1)" barStyle="dark-content" translucent={true} />
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{ flex: 1 }}
        region={region}
      />
    </Container>

  );
};

export default Home;
