import {useNavigation} from "@react-navigation/native";
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Pressable,
    ScrollView,
    Text,
} from "native-base";
import React from "react";
import {CheckoutCard} from "../components/common/CheckoutCard";
import {Container} from "../components/common/Container";
import {SummeryCard} from "../components/common/SummeryCard";
import Icon from "react-native-vector-icons/Ionicons";
import {DeliveryList} from "../components/common/DeliveryList";

export const DeliveryLocation = () => {
    const navigation = useNavigation();
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
                        <Center mt={5}>
                            <Heading>Delivery</Heading>
                        </Center>
                        <Box
                            p={4}
                            borderBottomWidth="1"
                            borderStyle={"dotted"}
                            borderColor="primary.600">
                            <Text>Name: Ram Baran Yadav</Text>
                            <Text>Phone: 9865468907</Text>
                            <Text>Location: This and that</Text>
                        </Box>
                        <Box
                            p={4}
                            mt={2}
                            mx={2}
                            bg={"coolGray.300"}
                            borderRadius={10}
                            borderWidth={1}
                            borderColor={"coolGray.300"}>
                            <Flex
                                direction="row"
                                justifyContent={"space-between"}
                                alignItems={"center"}>
                                <Heading fontSize={20}>Ordered Items</Heading>
                                <Text fontSize={14}>Order Id: #232323</Text>
                            </Flex>
                        </Box>
                        <DeliveryList />
                        <DeliveryList />
                        <DeliveryList />
                    </Box>
                </ScrollView>
                <SummeryCard
                    gross_total={150}
                    delivery_fee={50}
                    discount={50}
                    total={150}
                    link={"Payment"}
                />
            </Box>
        </Container>
    );
};
