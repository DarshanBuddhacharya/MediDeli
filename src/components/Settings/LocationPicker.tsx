import {Box, Icon, Image, Input, Text} from "native-base";
import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import MapView from "react-native-maps";
import {GoBackBtn} from "../common/GoBackBtn";
import {Container} from "../common/Container";
import Button from "../common/Button";
import {FormButton} from "../Form/FormButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const LocationPicker = () => {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation
                onRegionChangeComplete={e => console.log(e)}
                region={{
                    latitude: 27.701108,
                    longitude: 85.313475,
                    latitudeDelta: 0.0422,
                    longitudeDelta: 0.0421,
                }}></MapView>
            <GoBackBtn mt={5} />
            <Container>
                <Input
                    size="md"
                    placeholder="md Input"
                    bg={"white"}
                    shadow={5}
                    top={"14%"}
                    InputLeftElement={
                        <Icon
                            m="2"
                            ml="3"
                            size="6"
                            color="gray.400"
                            as={<MaterialIcons name="search" />}
                        />
                    }
                />
            </Container>
            <Box alignSelf={"center"} top={"42%"} position={"absolute"}>
                <Image
                    source={require("../../../assets/Images/marker.png")}
                    size={16}
                    alt={"whishlist-empty"}
                />
            </Box>
            <Box shadow={5} px={3} top={"55%"}>
                <FormButton onPress={() => console.log("hj")}>
                    Confirm Location
                </FormButton>
            </Box>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        justifyContent: "flex-start",
        alignItems: "stretch",
        position: "relative",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
