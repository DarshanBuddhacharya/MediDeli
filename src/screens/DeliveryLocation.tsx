import {useNavigation} from "@react-navigation/native";
import {
    Box,
    Center,
    Flex,
    Heading,
    Pressable,
    ScrollView,
    Text,
    useDisclose,
} from "native-base";
import React from "react";
import {Container} from "../components/common/Container";
import {SummeryCard} from "../components/common/SummeryCard";
import Icon from "react-native-vector-icons/Ionicons";
import {DeliveryList} from "../components/common/DeliveryList";
import {useAppSelector} from "../features/hooks";
import {PaymentOptions} from "../components/checkout/payment-options";

export const DeliveryLocation = () => {
    const navigation = useNavigation();

    const cartItems = useAppSelector(state => state.cart.cartItems);

    const cartPrice = useAppSelector(state => state.cart.totalPrice);

    const userData = useAppSelector(state => state.auth.user?.user);
    const {full_name, phone} = userData ?? {};
    return (
        <Container>
            <Box
                rounded="lg"
                overflow="hidden"
                flexDirection={"column"}
                justifyContent={"space-between"}
                h={"100%"}>
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
                        <Center mt={5}>
                            <Heading>Delivery</Heading>
                        </Center>
                        <Box
                            p={4}
                            borderBottomWidth="1"
                            borderStyle={"dotted"}
                            borderColor="primary.600">
                            <Text>Name: {full_name}</Text>
                            <Text>Phone: {phone}</Text>
                            <Text>Location: This and that</Text>
                        </Box>
                        <Box
                            p={4}
                            mt={2}
                            mx={2}
                            _light={{
                                bg: "coolGray.300",
                                borderColor: "coolGray.300",
                            }}
                            _dark={{
                                bg: "muted.800",
                                borderColor: "muted.500",
                            }}
                            borderRadius={10}
                            borderWidth={1}>
                            <Flex
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems={"center"}>
                                <Heading fontSize={20}>Ordered Items</Heading>
                                <Text fontSize={14}>Order Id: #232323</Text>
                            </Flex>
                        </Box>
                        <Flex direction="column-reverse">
                            {cartItems?.map((item, key) => (
                                <DeliveryList key={key} item={item} />
                            ))}
                        </Flex>
                    </Box>
                </ScrollView>
                {cartItems.length > 0 && (
                    <SummeryCard
                        type="delivery"
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
