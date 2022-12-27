import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Account from "../screens/AccountScreen";
import {AccountForm} from "../screens/AccountForm";

const AccountStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AccountScreen"
                component={Account}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="AccountForm"
                component={AccountForm}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

export default AccountStack;
