import {Box, Icon, Image, Input, useToast} from "native-base";
import React, {useState} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import MapView from "react-native-maps";
import {GoBackBtn} from "../common/GoBackBtn";
import {Container} from "../common/Container";
import {FormButton} from "../Form/FormButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useAppDispatch, useAppSelector} from "../../features/hooks";
import {accountUpdate} from "../../features/account/accountSlice";
import {useLatLng} from "../../../utils/useLatLng";
import {useNavigation} from "@react-navigation/native";
import {ToastAlert} from "../common/ToastAlert";

export const LocationPicker = () => {
    const accountData = useAppSelector(state => state.account);

    const navigation: any = useNavigation();

    const toast = useToast();

    const {latitude, longitude, deltalatitude, deltalongitude} = useLatLng(
        accountData?.account?.address ?? "",
    );
    const userId = useAppSelector(state => state.auth.user?.user.id);

    const [location, setLocation] = useState<string | undefined>(
        accountData?.account?.address,
    );

    const dispatch = useAppDispatch();
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation
                onRegionChangeComplete={e => {
                    setLocation(
                        `lat:${e.latitude}, lng:${e.longitude}, delLat:${e.latitudeDelta}, delLng:${e.longitudeDelta}`,
                    );
                }}
                region={{
                    latitude: latitude ?? 27.701108,
                    longitude: longitude ?? 85.313475,
                    latitudeDelta: deltalatitude ?? 0.0422,
                    longitudeDelta: deltalongitude ?? 0.0421,
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
                <FormButton
                    onPress={() => {
                        dispatch(
                            accountUpdate({
                                id: userId ?? 0,
                                data: {address: location},
                            }),
                        );
                        if (accountData?.isSuccess) {
                            toast.show({
                                render: () => {
                                    return (
                                        <ToastAlert
                                            status={"success"}
                                            title={"Location Updated"}
                                            description={
                                                "Location successfully updated"
                                            }
                                        />
                                    );
                                },
                            });
                            navigation.navigate("AccountScreen");
                        } else {
                            toast.show({
                                render: () => {
                                    return (
                                        <ToastAlert
                                            status={"error"}
                                            title={"Update Failed"}
                                            description={accountData?.message}
                                        />
                                    );
                                },
                            });
                        }
                    }}>
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
