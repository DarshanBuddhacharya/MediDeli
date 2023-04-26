import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAppSelector} from "../features/hooks";
import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import LandingScreen from "../screens/LandingScreen";
import TabNavigation from "./TabNavigation";
import {Container, useColorMode} from "native-base";
import {OnBoardingScreen} from "../screens/OnBoardingScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const auth = useAppSelector(state => state.auth.user?.token);

    const {colorMode} = useColorMode();

    return (
        <NavigationContainer
            theme={{
                dark: true,
                colors: {
                    background: colorMode === "dark" ? "#1f2937" : "#f4f4f5",
                    text: "inherit",
                    border: colorMode === "dark" ? "#1f2937" : "#f4f4f5",
                    primary: "red",
                    card: "red",
                    notification: "red",
                },
            }}>
            <Stack.Navigator>
                {!auth && (
                    <>
                        <Stack.Screen
                            name="OnBoarding"
                            component={OnBoardingScreen}
                            options={{headerShown: false}}
                        />
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

export default Navigation;
