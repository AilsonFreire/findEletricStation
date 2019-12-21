import { getStations } from "@services/stationsAPI";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useAsyncEffect } from "use-async-effect";

// import { Container } from './styles';
const Home = () => {
  useAsyncEffect(async () => {
    const response = await getStations();
    console.log(response)
  });


  return (
    <View />
  );
};

export default Home;
