import { Theme } from "@utils/types/theme";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

type Props = {
   theme: Theme
};

export const Container = styled.View`
   flex: 1
`;

export const Card = styled.View`
 top: ${Dimensions.get("window").height * 0.65};
 position: absolute;
 left: 0;
 right: 0;
 bottom: 0;
`;

export const Content = styled.View`
   elevation: 8;
   border-top-left-radius: 15;
   border-top-right-radius: 15;
   padding-horizontal: 16;
   padding-vertical: 16;
   flex: 1;
   background-color: ${(props: Props) => props.theme.colors.lightColor}
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

export const TextButton = styled.Text`
   text-align: center;
   color: ${(props: Props) => props.theme.colors.grayColor};
   font-family: ${(props: Props) => props.theme.fonts.fontPrimary};
   font-size: 14;
   line-height: 16;
`;

export const StationName = styled.Text`
   color: ${(props: Props) => props.theme.colors.grayColor};
   font-family: ${(props: Props) => props.theme.fonts.fontMedium};
   font-size: 20;
   line-height: 24;
   margin-vertical: 10;
`;

export const StationInfos = styled.Text`
   color: ${(props: Props) => props.theme.colors.grayColor};
   font-family: ${(props: Props) => props.theme.fonts.fontPrimary};
   font-size: 16;
   line-height: 20;
`;

export const AlignIconAndStationInfo = styled.View`
   align-items: center;
   flex-direction: row;
`;

export const AlignHorizontal = styled.View`
   flex-direction: row;
`;