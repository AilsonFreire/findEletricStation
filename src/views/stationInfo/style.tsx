import { Theme } from "@utils/types/theme";
import styled from "styled-components/native";

type Props = {
    theme: Theme
};

export const Container = styled.View`
   flex: 1;
   padding-horizontal: 16;
`;

export const AlignCloseButton = styled.View`
    width: 100%;
    align-items: flex-end;
    margin-top: 40
`;

export const IconButton = styled.TouchableOpacity``;

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

export const Card = styled.View`
    margin-top: 25;
`;