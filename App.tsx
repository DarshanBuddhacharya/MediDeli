import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StatusBar, useColorScheme} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";
import LandingScreen from "./src/screens/LandingScreen";
import {NativeBaseProvider, Text} from "native-base";
import {theme} from "./src/utils/Theme";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import Account from "./src/screens/AccountScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import DetailScreen from "./src/screens/DetailPages/DetailScreen";
import {CheckoutScreen} from "./src/screens/CheckoutScreen";
import {DeliveryLocation} from "./src/screens/DeliveryLocation";
import {WishListScreen} from "./src/screens/WishListScreen";
import {useEffect, useState} from "react";
import {ListingScreen} from "./src/screens/ListingScreen";

import {store} from "./store";

import {Provider} from "react-redux";

import {useAppDispatch, useAppSelector} from "./src/features/hooks";
import {calculateTotals} from "./src/features/cartSlice";
import {refresh} from "./src/features/auth/authSlice";
import {CustomTabButton} from "./src/screens/Navigation/CustomTabButton";

type HomeStackNavigator = {
    Index: undefined;
    ListingScreen: undefined;
    DetailScreen: {userId: string};
};

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
                    tabBarButton: () => <CustomTabButton />,
                }}
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                    },
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
    const cartItems = useAppSelector(state => state.cart.cartItems);
    const auth = useAppSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(calculateTotals());
    }, [cartItems]);

    useEffect(() => {
        const fetchToken = async () => {
            if (auth?.token) {
                dispatch(refresh(auth.token.refresh));
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
        <Provider store={store}>
            <NativeBaseProvider theme={theme}>
                <StatusBar
                    barStyle={isDarkMode ? "light-content" : "dark-content"}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <Root />
            </NativeBaseProvider>
        </Provider>
    );
};

export default App;
