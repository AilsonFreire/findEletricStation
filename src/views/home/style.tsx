import { View } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
   flex: 1
`;

export const Content = styled.View`
   border-radius: 10;
   padding-horizontal: 16;
   padding-vertical: 16;
   flex: 1
`;

export const AlignHeaderButtons = styled.View`
    width: 100%;
    align-items: flex-end;
`;

export const HeaderButtons = styled.View`
   width: 55%;
   justify-content: space-between;
   flex-direction: row;
`;

export const IconButton = styled.TouchableOpacity``;