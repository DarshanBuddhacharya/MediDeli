import {StatusBar, useColorScheme} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";
import {Container, NativeBaseProvider, Text, useColorMode} from "native-base";
import {theme} from "./src/utils/Theme";
import {useEffect, useState} from "react";

import {store} from "./store";

import {Provider} from "react-redux";

import {useAppDispatch, useAppSelector} from "./src/features/hooks";
import {calculateTotals} from "./src/features/cartSlice";
import {refresh} from "./src/features/auth/authSlice";
import Navigation from "./src/routes/Navigation";

const Root = () => {
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
        };
        fetchToken();
    }, []);

    return <Navigation />;
};

const App = () => {
    const {colorMode} = useColorMode();

    const backgroundStyle = {
        backgroundColor: colorMode ? Colors.darker : Colors.lighter,
    };
    return (
        <Provider store={store}>
            <NativeBaseProvider theme={theme}>
                <StatusBar
                    barStyle={colorMode ? "light-content" : "dark-content"}
                    hidden
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <Root />
            </NativeBaseProvider>
        </Provider>
    );
};

export default App;
