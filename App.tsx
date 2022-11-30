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
import DetailScreen from "./src/screens/DetailPages/DetailScreen";
import {CheckoutScreen} from "./src/screens/CheckoutScreen";
import {DeliveryLocation} from "./src/screens/DeliveryLocation";
import {WishListScreen} from "./src/screens/WishListScreen";
import {useEffect, useState} from "react";
import axios from "axios";
import {REACT_APP_DEV_MODE} from "@env";
import {ListingScreen} from "./src/screens/ListingScreen";

import {Provider, useDispatch} from "react-redux";

import {store} from "./store";
import {useAppDispatch, useAppSelector} from "./src/features/hooks";

type HomeStackNavigator = {
    Index: undefined;
    ListingScreen: undefined;
    DetailScreen: {userId: string};
};

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

const HomeStack = () => {
    const Stack = createNativeStackNavigator<HomeStackNavigator>();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Index"
                component={HomeScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="DetailScreen"
                component={DetailScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ListingScreen"
                component={ListingScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

const CheckoutStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Checkout">
            <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Delivery"
                component={DeliveryLocation}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

const TabNavigation = () => {
    const Tab = createBottomTabNavigator();
    const countCart = useAppSelector(state => state.cart.totalItems);
    const countWishList = useAppSelector(state => state.wishList.totalWishList);
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

                    return <Icon name={iconName} size={size} color={color} />;
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
                component={WishListScreen}
                options={{
                    headerShown: false,
                    tabBarBadge: countWishList ? countWishList : undefined,
                }}
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
                component={CheckoutStack}
                options={{
                    headerShown: false,
                    tabBarBadge: countCart ? countCart : undefined,
                }}
            />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    );
};

const Navigation = () => {
    const auth = useAppSelector(state => state.auth.user?.token);
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!auth && (
                    <>
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
                    </>
                )}
                {auth && (
                    <>
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
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const Root = () => {
    const [isTryingLogin, setIsTryingLogin] = useState(true);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchToken = async () => {
            const storedAccess = await AsyncStorage.getItem("access");
            const storedRefresh = await AsyncStorage.getItem("refresh");
            const cart = await AsyncStorage.getItem("cart");
            const response = axios
                .post(`${REACT_APP_DEV_MODE}refresh/`, {
                    refresh: storedRefresh,
                })
                .then(res => console.log(res.data))
                .catch(err => {
                    console.log("taht", err.response.data), authCtx.logout();
                });
            if (storedAccess && storedRefresh) {
                authCtx.authenticate({
                    access: storedAccess,
                    refresh: storedRefresh,
                });
            }
            if (auth) {
                dispatch(authenticate(auth.token));
            }
            setIsTryingLogin(false);
        };
        fetchToken();
    }, []);

    if (isTryingLogin) {
        return <Text>Loading</Text>;
    }
    return <Navigation />;
};

const App = () => {
    // Geolocation.getCurrentPosition(info => console.log(info));
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    // const config = {
    //     dependencies: {
    //         "linear-gradient": require("react-native-linear-gradient").default,
    //     },
    // };
    return (
        <NativeBaseProvider theme={theme}>
            <Provider store={store}>
                <StatusBar
                    barStyle={isDarkMode ? "light-content" : "dark-content"}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <Root />
            </Provider>
        </NativeBaseProvider>
    );
};

export default App;
