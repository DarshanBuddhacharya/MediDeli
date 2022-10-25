import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Fragment, useEffect, useState} from "react";
import {
    Alert,
    Button,
    PermissionsAndroid,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";
import Geolocation from "@react-native-community/geolocation";
import {useLocation} from "./src/hooks/use-location";

const App = () => {
    // Geolocation.getCurrentPosition(info => console.log(info));
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const Stack = createNativeStackNavigator();

    const {position, getCurrentPosition} = useLocation();
    return (
        <Fragment>
            <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View>
                <Text>
                    Hello world{position && position.lat},
                    {position && position.long}
                </Text>
                <Button title="location" onPress={() => getCurrentPosition()} />
            </View>
        </Fragment>
    );
};

export default App;
