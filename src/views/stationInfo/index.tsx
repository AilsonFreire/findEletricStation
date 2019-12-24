import { Station } from "@utils/types/station";
import { Theme } from "@utils/types/theme";
import { AlignHorizontal, } from "@views/home/style";
import React, { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationRoute } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import { ThemeContext } from "styled-components";
import { AlignCloseButton, AlignIconAndStationInfo, Card, Container, IconButton, StationInfos, StationName } from "./style";

const StationInfo = ({ navigation }: { navigation: NavigationStackProp<NavigationRoute> }) => {
    const { colors: { primaryColor, grayColor } } = useContext<Theme>(ThemeContext);

    const [station, setStation] = useState<Station>();

    useEffect(() => {
        setStation(navigation.getParam("station", {}))
    });

    return (
        <Container>
            <AlignCloseButton>
                {/*tslint:disable-next-line: no-null-keyword */}
                <IconButton onPress={() => navigation.goBack(null)}>
                    <Icon name="close" color={primaryColor} size={25} />
                </IconButton>
            </AlignCloseButton>
            <Card>
                <StationName numberOfLines={2} ellipsizeMode="tail">
                    {station?.name}
                </StationName>
                <StationInfos>
                    {`${station?.location?.address?.street}, ${station?.location?.address?.streetNumber}`}
                </StationInfos>
                <AlignHorizontal>
                    {station?.location?.openHours ?
                        <AlignIconAndStationInfo>
                            <Icon name="calendar" color={grayColor} size={25} />
                            <StationInfos>
                                {station?.location?.openHours}
                            </StationInfos>
                        </AlignIconAndStationInfo> : undefined
                    }
                    <AlignIconAndStationInfo>
                        <Icon name="cash" color={grayColor} size={25} />
                        <StationInfos>
                            {` R$${station?.energyPrice}/kWh`}
                        </StationInfos>
                    </AlignIconAndStationInfo>
                </AlignHorizontal>
                <StationInfos>
                    {station?.location?.description}
                </StationInfos>
            </Card>
        </Container>
    );
};

export default StationInfo;
