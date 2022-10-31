import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StatusBar, useColorScheme} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";
import LandingScreen from "./src/screens/LandingScreen";
import {Box, NativeBaseProvider, Text, View} from "native-base";
import {theme} from "./src/utils/Theme";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import AwsomeIcon from "react-native-vector-icons/MaterialIcons";
import Account from "./src/screens/AccountScreen";
import {TouchableOpacity} from "react-native";
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import DetailScreen from "./src/screens/DetailScreen";
import {CheckoutCard} from "./src/components/common/CheckoutCard";
import {CheckoutScreen} from "./src/screens/CheckoutScreen";

const CustomTabButton = ({onPress}: any) => (
    <TouchableOpacity
        style={{top: -15, justifyContent: "center", alignItems: "center"}}
        onPress={onPress}>
        <Box
            height={70}
            width={70}
            bg={"primary.500"}
            alignItems={"center"}
            borderRadius={10}
            justifyContent={"center"}>
            <AwsomeIcon name={"add-shopping-cart"} size={30} color={"white"} />
        </Box>
    </TouchableOpacity>
);

const App = () => {
    // Geolocation.getCurrentPosition(info => console.log(info));
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const Stack = createNativeStackNavigator();

    const HomeStack = () => {
        return (
            <Stack.Navigator initialRouteName="Detail">
                <Stack.Screen
                    name="Index"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Detail"
                    component={DetailScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        );
    };
    const Tab = createBottomTabNavigator();
    const TabNavigation = () => {
        return (
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName: any;

                        if (route.name === "Home") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "Account") {
                            iconName = focused ? "person" : "person-outline";
                        } else if (route.name === "WishList") {
                            iconName = focused ? "heart" : "heart-outline";
                        } else if (route.name === "Cart") {
                            iconName = focused ? "cart" : "cart-outline";
                        } else if (route.name === "Shop") {
                            iconName = focused ? "cart" : "cart-outline";
                        }

                        return (
                            <Icon name={iconName} size={size} color={color} />
                        );
                    },
                    tabBarActiveTintColor: "red",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        position: "absolute",
                        alignItems: "center",
                        bottom: 15,
                        left: 15,
                        right: 15,
                        elevation: 0,
                        borderRadius: 15,
                        height: 70,
                        paddingBottom: 10,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                })}>
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{headerShown: false}}
                />
                <Tab.Screen
                    name="WishList"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <Tab.Screen
                    name="Shop"
                    component={HomeScreen}
                    options={{
                        tabBarButton: props => <CustomTabButton {...props} />,
                    }}
                />
                <Tab.Screen
                    name="Cart"
                    component={CheckoutScreen}
                    options={{headerShown: false}}
                />
                <Tab.Screen name="Account" component={Account} />
            </Tab.Navigator>
        );
    };

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
                <Stack.Navigator initialRouteName="BottomNavi">
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Signup"
                        component={SignupScreen}
                        options={{headerShown: false}}
                    />
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
