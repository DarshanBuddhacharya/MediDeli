import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useAppSelector} from "../features/hooks";
import Icon from "react-native-vector-icons/Ionicons";
import HomeStack from "./HomeStack";
import {WishListScreen} from "../screens/WishListScreen";
import HomeScreen from "../screens/HomeScreen";
import {CustomTabButton} from "../screens/Navigation/CustomTabButton";
import CheckoutStack from "./CheckoutStack";
import Account from "../screens/AccountScreen";

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
            <Tab.Screen
                name="Account"
                component={Account}
                options={{headerShown: false}}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;
