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

export const ErrorImage = styled.Image`
    height: 60;
    width: 60;
    margin-bottom: 40;
`;

export const RetryButton = styled.TouchableOpacity`
    height: 56;
    width: 100%;
    border-radius: 100;
    background-color: ${(props: Props) => props.theme.colors.primaryColor};
    justify-content: center
`;

export const Typography = styled.Text`
    font-size: 16;
    font-family: ${(props: Props) => props.theme.fonts.fontMedium};
    color:${(props: Props) => props.theme.colors.lightColor};
    line-height: 20;
    text-align: center
`;

export const Message = styled(Typography)`
    color: ${(props: Props) => props.theme.colors.terciaryColor};
    font-family: ${(props: Props) => props.theme.fonts.fontPrimary};
    margin-bottom: 25;
`;