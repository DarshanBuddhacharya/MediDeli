import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Box, Center, Heading, Pressable, ScrollView, Text} from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {CheckoutCard} from "../components/common/CheckoutCard";
import {Container} from "../components/common/Container";
import {SummeryCard} from "../components/common/SummeryCard";

export type RootStackParamList = {
    Delivery: undefined;
};

export const CheckoutScreen = ({
    navigation,
}: {
    navigation: NativeStackNavigationProp<RootStackParamList, "Delivery">;
}) => {
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
                        <Pressable
                            flexDirection={"row"}
                            position={"absolute"}
                            pt={5}
                            onPress={() => navigation.goBack()}>
                            <Icon
                                name="chevron-back"
                                color={"#d52d3a"}
                                size={24}
                            />
                            <Text>Back</Text>
                        </Pressable>
                        <Center>
                            <Heading mt={5}>Checkout</Heading>
                        </Center>
                        <CheckoutCard />
                        <CheckoutCard />
                        <CheckoutCard />
                        <CheckoutCard />
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
