import {Box, Center, Heading, ScrollView, Text} from "native-base";
import React from "react";
import {CheckoutCard} from "../components/common/CheckoutCard";
import {Container} from "../components/common/Container";
import {SummeryCard} from "../components/common/SummeryCard";

export const CheckoutScreen = () => {
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
                        <Center>
                            <Heading mt={5}>Checkout</Heading>
                        </Center>
                        <CheckoutCard />
                        <CheckoutCard />
                        <CheckoutCard />
                        <CheckoutCard />
                    </Box>
                </ScrollView>
                <SummeryCard />
            </Box>
        </Container>
    );
};
