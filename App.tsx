import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Fragment, useEffect, useState} from "react";
import {Button, StatusBar, Text, useColorScheme, View} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";
import Geolocation from "@react-native-community/geolocation";
import {useLocation} from "./src/hooks/use-location";
import LandingScreen from "./src/screens/LandingScreen";
import {createSwitchNavigator} from "react-navigation";
import {NativeBaseProvider} from "native-base";
import {theme} from "./src/utils/Theme";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import Settings from "./src/screens/Settings";

const App = () => {
    // Geolocation.getCurrentPosition(info => console.log(info));
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const Tab = createBottomTabNavigator();
    const TabNavigation = () => {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="HomeNavigation"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        );
    };
    const Stack = createNativeStackNavigator();
    // const config = {
    //     dependencies: {
    //         "linear-gradient": require("react-native-linear-gradient").default,
    //     },
    // };

    return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <StatusBar
                    barStyle={isDarkMode ? "light-content" : "dark-content"}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={LandingScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="BottomNavi"
                        component={TabNavigation}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default App;
