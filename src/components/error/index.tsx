import { Theme } from "@utils/types/theme";
import React, { useContext } from "react";
import { StatusBar } from "react-native";
import { ThemeContext } from "styled-components";
import { Container, ErrorImage, Message, RetryButton, Typography } from "./style";

const IMAGE = require("@assets/images/error.png");

const Error = ({ onRerty }: { onRerty: () => void }) => {
    const { colors: { lightColor } } = useContext<Theme>(ThemeContext);
    return (
        <Container>
            <StatusBar backgroundColor={lightColor} barStyle="dark-content" />
            <ErrorImage source={IMAGE} />
            <Message>Error ao acessar os dados</Message>
            <RetryButton onPress={onRerty}>
                <Typography>Tentar Novamente</Typography>
            </RetryButton>
        </Container>
    );
};

export { Error };
