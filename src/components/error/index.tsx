import React from "react";
import { Container, ErrorImage, RetryButton } from "./style";

const IMAGE = require("@assets/images/error.png");

const Error = () => {
    return (
        <Container>
            <ErrorImage source={IMAGE} />
            <RetryButton />
        </Container>
    );
};

export { Error };
