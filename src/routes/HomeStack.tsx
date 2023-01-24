import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailPages/DetailScreen";
import {ListingScreen} from "../screens/ListingScreen";
import CategoryScreen from "../screens/Category/CategoryScreen";
import {createSharedElementStackNavigator} from "react-navigation-shared-element";

type HomeStackNavigator = {
    Index: undefined;
    ListingScreen: undefined;
    DetailScreen: {userId: string};
    CategoryScreen: undefined;
};

const Stack = createSharedElementStackNavigator<any>();

const HomeStack = () => {
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
                sharedElements={(route, otherRoute, showing) => {
                    const {data} = route.params;
                    return [
                        {
                            id: `category.${data.id}.title`,
                            animation: "fade",
                            resize: "clip",
                        },
                        {
                            id: `category.${data.id}.desc`,
                            animation: "fade",
                            resize: "clip",
                        },
                        {
                            id: `category.${data.id}.image`,
                            animation: "move",
                            resize: "clip",
                        },
                        {
                            id: `category.${data.id}.bg`,
                            animation: "fade-out",
                            resize: "clip",
                        },
                    ];
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
