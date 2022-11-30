import AsyncStorage from "@react-native-async-storage/async-storage";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Box, Center, Heading, Pressable, ScrollView, Text} from "native-base";
import React, {useEffect} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {CheckoutCard} from "../components/common/CheckoutCard";
import {ClearButton} from "../components/common/ClearButton";
import {Container} from "../components/common/Container";
import {GoBackBtn} from "../components/common/GoBackBtn";
import {SummeryCard} from "../components/common/SummeryCard";
import {TrashButton} from "../components/common/TrashButton";
import {Fallback} from "../components/skeletons/Fallback";
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
                flexDirection={"column"}
                justifyContent={"space-between"}
                h={"100%"}>
                <ScrollView>
                    <Box
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        pt={5}
                        px={2}>
                        <GoBackBtn is_relative />
                        <Heading>Checkout</Heading>
                        <ClearButton />
                    </Box>
                    {cartItems.length > 0 ? (
                        cartItems?.map((item, index) => (
                            <CheckoutCard key={index} item={item} />
                        ))
                    ) : (
                        <Fallback
                            title={"Looks like your Cart is Empty"}
                            link={"Home"}
                            imageUrl={require("../../assets/Images/cart.png")}
                        />
                    )}
                </ScrollView>
                {cartItems.length > 0 && (
                    <SummeryCard
                        gross_total={150}
                        delivery_fee={50}
                        discount={50}
                        total={150}
                        link={"Delivery"}
                    />
                )}
            </Box>
        </Container>
    );
};
