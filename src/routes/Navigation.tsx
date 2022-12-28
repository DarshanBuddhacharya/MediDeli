import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAppSelector} from "../features/hooks";
import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import LandingScreen from "../screens/LandingScreen";
import TabNavigation from "./TabNavigation";

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

export default Navigation;