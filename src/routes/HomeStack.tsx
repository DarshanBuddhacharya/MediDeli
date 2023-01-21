import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailPages/DetailScreen";
import {ListingScreen} from "../screens/ListingScreen";
import CategoryScreen from "../screens/Category/CategoryScreen";

type HomeStackNavigator = {
    Index: undefined;
    ListingScreen: undefined;
    DetailScreen: {userId: string};
    CategoryScreen: undefined;
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
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
