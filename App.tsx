import {StatusBar, useColorScheme} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";
import {NativeBaseProvider, Text} from "native-base";
import {theme} from "./src/utils/Theme";
import {useEffect, useState} from "react";

import {store} from "./store";

import {Provider} from "react-redux";

import {useAppDispatch, useAppSelector} from "./src/features/hooks";
import {calculateTotals} from "./src/features/cartSlice";
import {refresh} from "./src/features/auth/authSlice";
import Navigation from "./src/routes/Navigation";

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
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
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
