import AsyncStorage from "@react-native-async-storage/async-storage";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Box, Center, Heading, Pressable, ScrollView, Text} from "native-base";
import React, {useEffect} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {CheckoutCard} from "../components/common/CheckoutCard";
import {Container} from "../components/common/Container";
import {GoBackBtn} from "../components/common/GoBackBtn";
import {SummeryCard} from "../components/common/SummeryCard";
import cartSlice from "../features/cartSlice";
import {useAppSelector} from "../features/hooks";

export type RootStackParamList = {
    Delivery: undefined;
};

export const CheckoutScreen = () => {
    const cartItems = useAppSelector(state => state.cart.cartItems);

    return (
        <Container>
            <Box
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                flexDirection={"column"}
                justifyContent={"space-between"}
                h={"100%"}
                borderWidth="1">
                <ScrollView>
                    <Box>
                        <GoBackBtn />
                        <Center>
                            <Heading mt={5}>Checkout</Heading>
                        </Center>
                        {cartItems?.map((item, index) => (
                            <CheckoutCard key={index} item={item} />
                        ))}
                    </Box>
                </ScrollView>
                <SummeryCard
                    gross_total={150}
                    delivery_fee={50}
                    discount={50}
                    total={150}
                    link={"Delivery"}
                />
            </Box>
        </Container>
    );
};
