import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CheckoutScreen} from "../screens/CheckoutScreen";
import {DeliveryLocation} from "../screens/DeliveryLocation";

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
export default CheckoutStack;
