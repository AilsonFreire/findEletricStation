import { Theme } from "@utils/types/theme";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

type Props = {
    theme: Theme
};

export const Container = styled(View)`
    flex: 1;
    background-color: ${(props: Props) => props.theme.colors.lightColor};
    justify-content: center;
    align-items: center;
    padding-left: 16;
    padding-right: 16;
`;

export const ErrorImage = styled(Image)`
    height: 60;
    width: 60;
    margin-bottom: 40;
`;

export const RetryButton = styled(TouchableOpacity)`
    height: 56;
    width: 100%;
    border-radius: 100;
    background-color: ${(props: Props) => props.theme.colors.primaryColor};
`;