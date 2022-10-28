import {useNavigation} from "@react-navigation/native";
import {Box} from "native-base";
import React from "react";
import {View, Text, Button} from "react-native";
import {useLocation} from "../hooks/use-location";

const LandingScreen = ({navigation}: any) => {
    const {position, getCurrentPosition} = useLocation();

    // const navigation = useNavigation();

    if (position) {
        setTimeout(() => {
            navigation.navigate("BottomNavi", {screen: "HomeNavigation"});
        }, 1000);
    }
    return (
        <View>
            <Text>
                Hello world{position && position.lat},
                {position && position.long}
            </Text>
            <Button title="location" onPress={() => getCurrentPosition()} />
        </View>
    );
};

export default LandingScreen;
