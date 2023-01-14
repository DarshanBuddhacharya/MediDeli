import {Box, Heading, ScrollView, Text} from "native-base";
import React from "react";
import {CheckoutCard} from "../components/common/CheckoutCard";
import {ClearButton} from "../components/common/ClearButton";
import {Container} from "../components/common/Container";
import {GoBackBtn} from "../components/common/GoBackBtn";
import {SummeryCard} from "../components/common/SummeryCard";
import {Fallback} from "../components/skeletons/Fallback";
import {useAppSelector} from "../features/hooks";

export type RootStackParamList = {
    Delivery: undefined;
};

export const CheckoutScreen = () => {
    const cartItems = useAppSelector(state => state.cart.cartItems);

    const cartPrice = useAppSelector(state => state.cart.totalPrice);

    return (
        <Container>
            <Box
                rounded="lg"
                overflow="hidden"
                flexDirection={"column"}
                justifyContent={"space-between"}
                h={"100%"}>
                <Box
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    pt={5}
                    pb={2}
                    px={2}>
                    <GoBackBtn is_relative />
                    <Heading>Checkout</Heading>
                    <ClearButton />
                </Box>

                <ScrollView>
                    <Box flexDirection={"column-reverse"}>
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
                    </Box>
                </ScrollView>
                {cartItems.length > 0 && (
                    <SummeryCard
                        type={"checkout"}
                        gross_total={cartPrice}
                        discount={50}
                        total={cartPrice}
                        link={"Delivery"}
                    />
                )}
            </Box>
        </Container>
    );
};
